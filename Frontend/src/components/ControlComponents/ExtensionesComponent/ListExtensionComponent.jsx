import React, { Component } from 'react';
import '../../StyleGlobal/Style.css';
import UnidadService from '../../../services/Control/UnidadService';
import ExtensionService from '../../../services/Control/ExtensionsService';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Importa la extensión jspdf-autotable
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'; // Importa Reactstrap para el modal
import Select from 'react-select'

class ListExtensionComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            unidades: [],
            extensiones:[],
            isModalOpen: false, // Estado para controlar la apertura/cierre del modal
            colegiaturaToDeleteId: null, // Estado para almacenar el ID de la colegiatura a eliminar

            unidad_academica: '',
        };

        this.addUnidad = this.addUnidad.bind(this);
        this.updateUnidad = this.updateUnidad.bind(this);
        this.deleteUnidad = this.deleteUnidad.bind(this);
        this.viewUnidad = this.viewUnidad.bind(this);
        this.exportToExcel = this.exportToExcel.bind(this);
        this.exportToPDF = this.exportToPDF.bind(this); // Método para exportar a PDF
        this.onChangeUnidadHandler = this.onChangeUnidadHandler.bind(this);
    }

    deleteUnidad(id) {
        // Llamada a la API REST
        UnidadService.checkUnidadDependersByUnidadId(id).then( res => {
            if(res.data === false) {
                UnidadService.deleteUnidadById(id).then(() => {
                    this.setState({ unidades: this.state.unidades.filter((unidad) => unidad.id !== id),
                        isModalOpen: false, // Cierra el modal después de eliminar
                        colegiaturaToDeleteId: null, // Restablece el ID de la colegiatura
                    });
                }).catch(() => {
                    alert("Error al intentar eliminar la extension academica...");
                    this.props.history.push('/list-extension');
                });
            } else {
                alert("La unidad academica no es posible eliminar porque esta presente en otros modulos. \n" +
                "por favor verifique: Areas Academicas, Docentes, Carrera Por Unidad, Oferta Academica, Proyecciones Asignatura/Tiempo Completo");
                this.setState({
                    isModalOpen: false, // Cierra el modal después de eliminar
                    colegiaturaToDeleteId: null}) // Restablece el ID de la colegiatura)

                this.props.history.push('/list-extension');
            }
        }).catch(() => {
            alert("Error al intentar eliminar la extension academica...");
            this.props.history.push('/list-extension');
        });            
    }

    viewUnidad(id) {
        this.props.history.push(`view-extension/${id}`);
    }

    updateUnidad(id) {
        this.props.history.push(`update-extension/${id}`);
    }

    componentDidMount(){
        this.getUnidadList();
        
    }

    addUnidad() {
        this.props.history.push('/add-extension/');
    }

    onChangeUnidadHandler = (event) => {
        this.setState({ unidad_academica: event.label });
        this.setState({ id: event.value })
        this.setState({ clave_dgp: event.dgp })
        this.setState({ direccion_completa: event.direccion })

        this.getExtensiones(event.value);
    }

    async getUnidadList() {
        let options = null;

        await UnidadService.getAllUnidades().then(res => {
            const data = res.data;
            options = data.map(d => ({
                "value": d.id,
                "label": d.nombre_completo,
                "dgp": d.clave_dgp,
                'direccion': d.direccion_completa,
            }))
        }).catch(() => {
            alert("Error al intentar traer las UAs...");
            this.props.history.push('/list-extension');
        });
        
        this.setState({unidades: options})
    }

    async getExtensiones(id_unidad) {
        await ExtensionService.getAllExtensionsByUnidadId(id_unidad).then(res => {
            this.setState({ extensiones: res.data });
            }).catch(() => {
                alert("Error al intentar traer todas la extensiones academicas...");
                this.props.history.push('/list-extension');
            });
    }

    exportToExcel() {
        const { unidades } = this.state;

        const ws = XLSX.utils.json_to_sheet(unidades);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Unidades');
        XLSX.writeFile(wb, 'unidades.xlsx');
    }

    exportToPDF() {
        const { unidades } = this.state;

        const doc = new jsPDF();
        doc.text('Lista de Unidades', 10, 10);

        const columns = ['Clave DGP', 'Abreviatura', 'Nombre Completo', 'Tipo Unidad', 'Nombre Corto', 'Dirección Completa','Fecha de creacion','Fecha de actualizacion'];
        const data = unidades.map((unidad) => [
            unidad.clave_dgp,
            unidad.abreviatura,
            unidad.nombre_completo,
            unidad.tipo_unidad,
            unidad.nombre_corto,
            unidad.direccion_completa,
            unidad.fecha_creacion,
            unidad.fecha_actualizacion,

        ]);

        doc.autoTable({
            startY: 20,
            head: [columns],
            body: data,
        });

        doc.save('unidades.pdf');
    }
  // Método para abrir el modal
    toggleModal = (colegiaturaId) => {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
            colegiaturaToDeleteId: colegiaturaId, // Establece el ID de la colegiatura a eliminar
        });
    }

    // Método para cerrar el modal
    closeModal = () => {
        this.setState({
            isModalOpen: false,
            colegiaturaToDeleteId: null, // Restablece el ID de la colegiatura
        });
    }

    render() {
        const boton = {
            marginLeft: '1rem',
            marginRight: '1rem',
        };

        return (
            <div className="container">
                <h2 className="text-center mt-5 mb-5 Title">LISTA DE EXTENSIONES ACADÉMICAS</h2>
                <div className="row">
                <div className="col-5">
                <div style={{ marginTop: '4.5%' }}>
                        <Select                        
                            rules={{ required: true }}
                            options={this.state.unidades}
                            onChange={(e) => this.onChangeUnidadHandler(e)}
                            value={{ label: this.state.unidad_academica === '' ? "Seleccione Unidad Académica..." : this.state.unidad_academica}}
                        />
                    </div>
                    </div>
                    <div className="col-7">
                    <button style={{ width: '29%' , marginRight: '5rem' }} className="btn btn-primary mb-4" onClick={this.addUnidad}>
                        Agregar Extension
                    </button>
                    <button style={{ width: '25%', marginLeft: '1rem'}} className="btn  btn-outline-success mb-4" onClick={this.exportToExcel}>
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
                                <th className="table-title">Clave DGP</th>
                                <th className="table-title">Abreviatura</th>
                                <th className="table-title">Nombre Completo</th>
                                <th className="table-action">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.extensiones.map((unidad, index) => (
                                <tr key={unidad.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                                    <td>{index + 1}</td>
                                    <td className="table-conten">{unidad.clave_dgp}</td>
                                    <td className="table-conten">{unidad.abreviatura}</td>
                                    <td className="table-conten">{unidad.nombre_completo}</td>
                                    <td className="table-action">
                                        <button onClick={() => this.updateUnidad(unidad.id)} className="btn btn-warning mt-0">
                                            Actualizar
                                        </button>
                                        <button className="btn btn-danger mt-0" style={boton}
                                                onClick={() => this.toggleModal(unidad.id)} // Abre el modal y pasa el ID de la colegiatura
                                            > Eliminar</button>
                                        <button onClick={() => this.viewUnidad(unidad.id)} className="btn btn-info mt-0">
                                            Ver
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.closeModal}>
                    <ModalHeader>Confirmar Eliminación</ModalHeader>
                    <ModalBody>
                        ¿Estás seguro de que deseas eliminar esta Unidad académica?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={() => this.deleteUnidad(this.state.colegiaturaToDeleteId)}>Eliminar</Button>
                        <Button color="secondary" onClick={this.closeModal}>Cancelar</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ListExtensionComponent;
