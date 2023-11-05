import React, { Component } from 'react';
import '../../../StyleGlobal/Style.css';
import FolioService from "../../../../services/Proyecciones/FolioService";

class ListFolioAsignaturaComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            folios: [],
        };

        this.addFolio = this.addFolio.bind(this);
        // this.editFolios = this.editFolios.bind(this);
        // this.deleteFolios = this.deleteFolios.bind(this);
        // this.viewFolios = this.viewFolios.bind(this);
    }

    deleteFolio(id) {
        // Llamada a la API REST
        // PlantelService.deletePlantelById(id).then((res) => {
        //     this.setState({ planteles: this.state.planteles.filter((plantel) => plantel.id !== id) });
        // });
    }

    viewProyeccion(id_folio) {
        this.props.history.push(`/list-proyeccion_asignatura/${id_folio}`);
    }

    // editFolio(id) {
    //     this.props.history.push(`update-plantel/${id}`);
    // }

    componentDidMount(){
        //promise
        FolioService.getAllFolios().then((res) => {
            this.setState({folios: res.data});
        }).catch(() => {
            alert("No se cuenta con proyecciones con este folio");
            this.props.history.push('/list-folio-asignatura');
        });
    }

    addFolio() {
        this.props.history.push(`/create-folio-asignatura`);
    }

  

    render() {
        const boton = {
            marginLeft: '1rem',
            marginRight: '1rem',
        };

        return (
            <div className="container">
                <h2 className="text-center mt-5 mb-5 Title">HISTORIAL DE FOLIOS DE PROYECCIONES ACADEMICAS DEL TECNOLÓGICO SUPERIROR DE JALISCO</h2>
                <button style={{ width: '20%' }} className="btn btn-primary mb-4" onClick={this.addFolio}>
                    Agregar Nuevo Folio
                </button>
                <button style={{ width: '15%', marginLeft: '1rem' }} className="btn  btn-outline-success mb-4" onClick={this.exportToExcel}>
                    Exportar a Excel
                </button>
                <button style={{ width: '15%',marginLeft: '1rem' }} className="btn  btn-outline-dark mb-4" onClick={this.exportToPDF}>
                    Exportar a PDF
                </button>
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

export default ListFolioAsignaturaComponent;
