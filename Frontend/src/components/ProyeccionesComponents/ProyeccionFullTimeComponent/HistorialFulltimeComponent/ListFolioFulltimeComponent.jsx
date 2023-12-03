import React, { Component } from 'react';
import '../../../StyleGlobal/Style.css';
import UnidadService from '../../../../services/Control/UnidadService';
import Select from 'react-select'
import FolioFulltimeService from '../../../../services/Proyecciones/FolioFulltimeService';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'; // Importa Reactstrap para el modal
import * as XLSX from 'xlsx';

import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Importa la extensión jspdf-autotable
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
        this.exportToExcel = this.exportToExcel.bind(this);

        this.exportToPDF = this.exportToPDF.bind(this); // Método para exportar a PDF
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
                    alert("Error al intentar eliminar la proyeccion tiempo completo...");
                    this.props.history.push('/list-folio-fulltime');
                });
            } else {
                alert("El folio tiempo completo no es posible eliminar porque esta presente en otros modulos. \n" +
                "por favor verifique: proyecciones Tiempo Completo.");
                this.setState({
                    isModalOpen: false, // Cierra el modal después de eliminar
                    folioToDeleteId: null}) // Restablece el ID de la colegiatura)

                this.props.history.push('/list-folio-fulltime');
            }
        }).catch(() => {
            alert("Error al intentar eliminar la proyeccion tiempo completo...");
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
    exportToPDF = () => {
        const { folios } = this.state;
    
        // Modificar la estructura de los datos para incluir la información del folio
        const datosParaExportar = folios.map((folio, index) => ({
            '#': index + 1,
            'Folio': folio.folio,
            'Fecha de Creacion': folio.fecha_creacion,
            'Estatus': 'Activo',
        }));
    
        // Verificar si hay datos para exportar
        if (datosParaExportar.length === 0) {
            console.error('No hay datos para exportar a PDF.');
            return;
        }
    
        // Crear una nueva instancia de jsPDF
        const pdf = new jsPDF();
    
        // Configurar la tabla
        pdf.autoTable({
            head: [Object.keys(datosParaExportar[0])],
            body: datosParaExportar.map(obj => Object.values(obj)),
            startY: 20,
        });
    
        // Guardar el archivo PDF
        pdf.save('folios.pdf');
    }
    exportToExcel = () => {
        const { folios } = this.state;

        // Modificar la estructura de los datos para incluir la información del folio
        const datosParaExportar = folios.map((folio, index) => ({
            '#': index + 1,
            'Folio': folio.folio,
            'Fecha de Creacion': folio.fecha_creacion,
            'Estatus': 'Activo',
        }));

        // Verificar si hay datos para exportar
        if (datosParaExportar.length === 0) {
            console.error('No hay datos para exportar a Excel.');
            return;
        }

        // Crear un nuevo libro de Excel
        const workbook = XLSX.utils.book_new();
        const sheetData = datosParaExportar.map(obj => Object.values(obj));
        const worksheet = XLSX.utils.aoa_to_sheet([Object.keys(datosParaExportar[0]), ...sheetData]);

        // Agregar la hoja de cálculo al libro
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Folios');

        // Guardar el archivo Excel
        XLSX.writeFile(workbook, 'folios.xlsx');
    }

    render() {
        const boton = {
            marginLeft: '1rem',
            marginRight: '1rem',
        };

        return (
            <div className="container">
                <div className="row">
                <h2 className="text-center mt-5 mb-5 Title">HISTORIAL DE FOLIOS DE PROYECCIONES ACADÉMICAS, DE PROFESORES DE TIEMPO COMPLETO DEL TECNOLÓGICO SUPERIOR DE JALISCO</h2>
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
                                <th className="table-title">Fecha de Creación</th>
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
                                    <td className="table-conten">"Activo"</td>
                                    <td className="table-action">
                                         <button onClick={() => this.viewProyeccion(folio.id)} className="btn btn-info mt-0">
                                            Ver Proyecciones
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

export default ListFolioFulltimeComponent;
