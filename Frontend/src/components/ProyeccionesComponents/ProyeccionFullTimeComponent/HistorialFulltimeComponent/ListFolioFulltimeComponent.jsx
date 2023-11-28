import React, { Component } from 'react';
import '../../../StyleGlobal/Style.css';
import UnidadService from '../../../../services/Control/UnidadService';
import Select from 'react-select'
import FolioFulltimeService from '../../../../services/Proyecciones/FolioFulltimeService';

class ListFolioFulltimeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id_unidad: null,
            folios: [],

            unidad: '',
            unidades: [],

            isModalOpen: false, // Estado para controlar la apertura/cierre del modal
            folioToDeleteId: null, // Estado para almacenar el ID de la colegiatura a eliminar
        };

        this.addFolio = this.addFolio.bind(this);
        this.deleteFolioById = this.deleteFolioById.bind(this);

        this.onChangeUnidadHandler = this.onChangeUnidadHandler.bind(this);
    }


    componentDidMount(){
        //promise
        FolioFulltimeService.getAllFolios().then((res) => {
            this.setState({folios: res.data});
        }).catch(() => {
            alert("Error al intentar traer los folios...");
            this.props.history.push('/list-folio-fulltime');
        });

        this.getUnidadList();
    }

    viewProyeccion(id_folio) {
        this.props.history.push(`/list-proyeccion_fulltime/${id_folio}`);
    }


    addFolio() {
        this.props.history.push(`/create-folio-fulltime`);
    }

    
    async getUnidadList() {
        let options = null;

        await UnidadService.getAllUnidades().then(res => {
            const data = res.data;
            options = data.map(d => ({
                "value": d.nombre_completo,
                "label": d.nombre_completo,
                "id": d.id,
            }))
        }).catch(() => {
            alert("Error al intentar traer las UAs...");
            this.props.history.push('/');
        });
        this.setState({unidades: options})
    }
    

    onChangeUnidadHandler = (event) => {
        this.setState({ unidad: event.label });
        // this.setState({ asignaturas: this.state.asignaturas.filter((asignatura) => asignatura.unidad_academica === this.state.unidad)})

        FolioFulltimeService.getAllFoliosByUA(event.id).then(
            res => this.setState({ folios: res.data })
        );
    }


    deleteFolioById(id) {
        FolioFulltimeService.checkFolioFulltimeDependers(id).then( res => {
            if (res.data === false ) {
                FolioFulltimeService.deleteFolioFulltimeById(id).then( () => {
                    this.setState({
                        folios: this.state.folios.filter(folio => folio.id != id),
                        isModalOpen: false, // Cierra el modal después de eliminar
                        folioToDeleteId: null, // Restablece el ID de la colegiatura
                    })
                }).catch(() => {
                    alert("Error al intentar eliminar la proyeccion asignatura...");
                    this.props.history.push('/list-folio-fulltime');
                });
            } else {
                alert("El folio asignatura no es posible eliminar porque esta presente en otros modulos. \n" +
                "por favor verifique: Proyecciones Asignatura");
                this.setState({
                    isModalOpen: false, // Cierra el modal después de eliminar
                    folioToDeleteId: null}) // Restablece el ID de la colegiatura)

                this.props.history.push('/list-folio-fulltime');
            }
        }).catch(() => {
            alert("Error al intentar eliminar la proyeccion asignatura...");
            this.props.history.push('/list-folio-fulltime');
        });
    }

    toggleModal = (folioId) => {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
            folioToDeleteId: folioId, // Establece el ID de la colegiatura a eliminar
        });
    }

    // Método para cerrar el modal
    closeModal = () => {
        this.setState({
            isModalOpen: false,
            folioToDeleteId: null, // Restablece el ID de la colegiatura
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                <h2 className="text-center mt-5 mb-5 Title">HISTORIAL DE FOLIOS DE PROYECCIONES ACADEMICAS, DE PROFESORES DE TIEMPO COMPLETO DEL TECNOLÓGICO SUPERIROR DE JALISCO</h2>
                    <div className="col-4">
                        <div style={{ marginTop: '5.6%' }}>
                            <Select
                                rules={{ required: true }}
                                options={this.state.unidades}
                                onChange={(e) => this.onChangeUnidadHandler(e)}
                                placeholder="Seleccione un carrera..."
                                value={{ label: this.state.unidad == "" ? "Seleccione unidad académica..." : this.state.unidad }}
                            />
                        </div>
                    </div>
                    <div className="col-8">
                        <button style={{ width: '28%' , marginRight: '8rem'}} className="btn btn-primary mb-4" onClick={this.addFolio}>
                            Agregar Nuevo Folio
                        </button>
                        <button style={{ width: '25%', marginLeft: '1rem' }} className="btn  btn-outline-success mb-4" onClick={this.exportToExcel}>
                            Exportar a Excel
                        </button>
                        <button style={{ width: '25%',marginLeft: '1rem' }} className="btn  btn-outline-dark mb-4" onClick={this.exportToPDF}>
                            Exportar a PDF
                        </button>
                    </div>
                </div>
                <div className="row" style={{ overflowX: 'auto' }}>
                    <table className="table table-striped table-bordered" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                        <thead>
                            <tr>
                                <th></th>
                                <th className="table-title">Folio</th>
                                <th className="table-title">Fecha de Creacion</th>
                                <th className="table-title">Estatus</th>
                                <th className="table-action">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.folios.map((folio, index) => (
                                <tr key={folio.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                                    <td>{index + 1}</td>
                                    <td className="table-conten">{folio.folio}</td>
                                    <td className="table-conten">{folio.fecha_creacion}</td>
                                    <td className="table-conten">"Activo/Cerrado"</td>
                                    <td className="table-action">
                                        {/* <button onClick={() => this.editPlantel(folio.id)} className="btn btn-warning mt-0">
                                            Actualizar
                                        </button>
                                        <button style={boton} onClick={() => this.deletePlantel(folio.id)} className="btn btn-danger mt-0">
                                            Eliminar
                                        </button> */}
                                        {/* <button onClick={() => this.viewProyeccion(folio.id === null | undefined ? )} className="btn btn-info mt-0"> */}
                                         <button onClick={() => this.viewProyeccion(folio.id)} className="btn btn-info mt-0">
                                            Ver Proyeciones
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListFolioFulltimeComponent;
