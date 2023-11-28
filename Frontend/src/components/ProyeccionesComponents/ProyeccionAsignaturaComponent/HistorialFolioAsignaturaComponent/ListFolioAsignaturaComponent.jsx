import React, { Component } from 'react';
import '../../../StyleGlobal/Style.css';
import FolioAsignaturaService from "../../../../services/Proyecciones/FolioAsignaturaService";
import UnidadService from "../../../../services/Control/UnidadService";
import Select from 'react-select'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'; // Importa Reactstrap para el modal

class ListFolioAsignaturaComponent extends Component {
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

 
    viewProyeccion(id_folio) {
        this.props.history.push(`/list-proyeccion_asignatura/${id_folio}`);
    }


    componentDidMount(){
        //promise
        FolioAsignaturaService.getAllFolios().then((res) => {
            this.setState({folios: res.data});
        }).catch(() => {
            alert("Error al intentar traer los folios...");
            this.props.history.push('/list-folio-asignatura');
        });

        this.getUnidadList();
    }

    addFolio() {
        this.props.history.push(`/create-folio-asignatura`);
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

        FolioAsignaturaService.getAllFoliosByUA(event.id).then(
            res => this.setState({ folios: res.data })
        );
    }

    deleteFolioById(id) {
        FolioAsignaturaService.checkFolioAsignaturaDependers(id).then( res => {
            if (res.data === false ) {
                FolioAsignaturaService.deleteFolioAsignaturaById(id).then( () => {
                    this.setState({
                        folios: this.state.folios.filter(folio => folio.id != id),
                        isModalOpen: false, // Cierra el modal después de eliminar
                        folioToDeleteId: null, // Restablece el ID de la colegiatura
                    })
                }).catch(() => {
                    alert("Error al intentar eliminar la proyeccion asignatura...");
                    this.props.history.push('/list-folio-asignatura');
                });
            } else {
                alert("El folio asignatura no es posible eliminar porque esta presente en otros modulos. \n" +
                "por favor verifique: Proyecciones Asignatura");
                this.setState({
                    isModalOpen: false, // Cierra el modal después de eliminar
                    folioToDeleteId: null}) // Restablece el ID de la colegiatura)

                this.props.history.push('/list-folio-asignatura');
            }
        }).catch(() => {
            alert("Error al intentar eliminar la proyeccion asignatura...");
            this.props.history.push('/list-folio-asignatura');
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
        const boton = {
            marginLeft: '1rem',
            marginRight: '1rem',
        };

        return (
            <div className="container">
                <div className="row">
                <h2 className="text-center mt-5 mb-5 Title">HISTORIAL DE FOLIOS DE PROYECCIONES ACADEMICAS, POR ASIGNATURA DEL TECNOLÓGICO SUPERIROR DE JALISCO</h2>
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
                                         <button onClick={() => this.viewProyeccion(folio.id)} className="btn btn-info mt-0">
                                            Ver Proyecion
                                        </button>
                                        <button className="btn btn-danger mt-0" style={boton}
                                                onClick={() => this.toggleModal(folio.id)} // Abre el modal y pasa el ID de la colegiatura
                                            > Eliminar Folio</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Modal isOpen={this.state.isModalOpen} toggle={this.closeModal}>
                    <ModalHeader>Confirmar Eliminación</ModalHeader>
                    <ModalBody>
                        ¿Estás seguro de que deseas eliminar este docente?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={() => this.deleteFolioById(this.state.folioToDeleteId)}>Eliminar Folio</Button>
                        <Button color="secondary" onClick={this.closeModal}>Cancelar</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ListFolioAsignaturaComponent;
