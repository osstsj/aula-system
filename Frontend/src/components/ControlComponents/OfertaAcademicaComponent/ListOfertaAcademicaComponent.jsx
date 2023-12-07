import React, { Component } from 'react';
import '../../StyleGlobal/Style.css'
import OfertaAcademicaService from '../../../services/Control/OfertaAcademicaService';
import * as XLSX from 'xlsx';  // Importa la librería XLSX
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Importa la extensión jspdf-autotable
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'; // Importa Reactstrap para el modal


//rcc->enter
class ListOfertaAcademicaComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ofertas: [],
            isModalOpen: false, // Estado para controlar la apertura/cierre del modal
            ofertaToDeleteId: null, // Estado para almacenar el ID de la colegiatura a eliminar
        }

        this.addUnidad = this.addUnidad.bind(this);
        this.updateCarreraPorUnidad = this.updateCarreraPorUnidad.bind(this);
        this.deleteOfertasAcademicas = this.deleteOfertasAcademicas.bind(this);
        this.viewCarreraPorUnidad = this.viewCarreraPorUnidad.bind(this);
        this.exportToExcel = this.exportToExcel.bind(this);  // Método para exportar a Excel
        this.exportToPDF = this.exportToPDF.bind(this); // Método para exportar a PDF


    }

    deleteOfertasAcademicas(id) {
        // rest api
        OfertaAcademicaService.deleteOfertaAcademicalById(id).then(res => {
            this.setState({
                ofertas: this.state.ofertas.filter(unidad => unidad.id !== id),
                isModalOpen: false, // Cierra el modal después de eliminar
                ofertaToDeleteId: null, // Restablece el ID de la colegiatura
            });
        }).catch(() => {
            alert("Error al intentar eliminar la oferta academica...");
            this.props.history.push('/list-oferta-academica');
        });
    }
    viewCarreraPorUnidad(id) {
        this.props.history.push(`view-oferta-academica/${id}`);
    }

    updateCarreraPorUnidad(id) {
        this.props.history.push(`update-oferta-academica/${id}`);
    }

    componentDidMount() {
        //promise
        OfertaAcademicaService.getAllOfertasAcademicas().then(
            res => {
                this.setState({ ofertas: res.data });
        }).catch(() => {
            alert("Error al intentar traer las ofertas academicas...");
            this.props.history.push('/list-oferta-academica');
        });
    }
    addUnidad() {
        this.props.history.push('/add-oferta-academica');
    }

    exportToExcel() {
        const { ofertas } = this.state;

       
        const datosParaExportar = ofertas.map(oferta => ({
            id: oferta.id,
            unidad_academica: oferta.unidad_academica.nombre_completo,
            carrera: oferta.carrera.nombre,
            modalidad: oferta.modalidad,
            turno: oferta.turno,
            periodo: oferta.periodo,
            fecha_creacion: oferta.fecha_creacion,
            fecha_actualizacion: oferta.fecha_actualizacion,
        }));
        
 // Crear una nueva hoja de cálculo
 const ws = XLSX.utils.json_to_sheet(datosParaExportar);
        // Agregar filas en blanco entre los datos y la línea de separación
        const filasEnBlanco = Array(5).fill({}); // Agregar 5 filas vacías
        XLSX.utils.sheet_add_json(ws, filasEnBlanco, { skipHeader: true, origin: -1 });


        // Agregar una fila de separación al final
        const separador = { A: "______________________", B: "", C: "", D: "", E: "______________________", F: "" };
        XLSX.utils.sheet_add_json(ws, [separador], { skipHeader: true, header: ["A", "B", "C", "D", "E", "F"], origin: -1 });

        // Agregar una fila con el nombre debajo de la línea de separación
        const nombre = { A: "  Luis jose", B: "", C: "", D: "", E: "            jose juan", F: "" };
        XLSX.utils.sheet_add_json(ws, [nombre], { skipHeader: true, header: ["A", "B", "C", "D", "E", "F"], origin: -1 });

        // Configurar el ancho automático de las columnas
        const colWidths = [
            { wch: 15 }, // A
            { wch: 15 }, // B
            { wch: 15 }, // C
            { wch: 15 }, // D
            { wch: 15 }, // E
            { wch: 15 }, // E
            { wch: 15 }, // E
            { wch: 15 }, // E
            { wch: 15 }, // E{ wch: 15 }, // E
            
        ];
        ws['!cols'] = colWidths;

        // Crear un nuevo libro de trabajo
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'ofertas');  // 'ofertas' es el nombre de la hoja

        // Generar el archivo XLSX
        XLSX.writeFile(wb, 'ofertas.xlsx');  // 'ofertas.xlsx' es el nombre del archivo
    }

    exportToPDF() {
        const { ofertas } = this.state;

        const doc = new jsPDF();
        doc.text('Lista de ofertas', 10, 10);

        const columns = [' unidad', ' carrera', ' modalidad', 'turno', 'periodo', 'fecha de creación', 'fecha de actualización'];
        const data = ofertas.map((oferta) => [
            oferta.unidad_academica.nombre_completo,
            oferta.carrera.nombre,
            oferta.modalidad,
            oferta.turno,
            oferta.periodo,
            oferta.fecha_creacion,
            oferta.fecha_actualizacion
        ]);

        doc.autoTable({
            startY: 20,
            head: [columns],
            body: data,
        });

        doc.save('ofertas.pdf');
    }

    // Método para abrir el modal
    toggleModal = (ofertaId) => {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
            ofertaToDeleteId: ofertaId, // Establece el ID de la colegiatura a eliminar
        });
    }

    // Método para cerrar el modal
    closeModal = () => {
        this.setState({
            isModalOpen: false,
            ofertaToDeleteId: null, // Restablece el ID de la colegiatura
        });
    }
    render() {
        const boton = {
            marginLeft: '1rem',
            marginRight: '1rem'
        }

        return (
            <div className='container'>
                <h2 className="text-center mt-5 mb-5 Title">LISTA DE OFERTAS ACADÉMICAS</h2>
                <button style={{ width: '20%' }} className="btn btn-primary mb-4" onClick={this.addUnidad}>Agregar Oferta Académica</button>
                <button style={{ width: '15%', marginLeft: '1rem' }} className="btn btn-outline-success mb-4" onClick={this.exportToExcel}>Exportar a Excel</button> {/* Botón de exportar a Excel */}
                <button style={{ width: '15%', marginLeft: '1rem' }} className="btn btn-outline-dark mb-4" onClick={this.exportToPDF}>
                    Exportar a PDF
                </button>
                <div className="row" style={{ overflowX: 'auto' }}>
                    <table className="table table-striped table-bordered" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                        <thead>
                            <tr>
                                <th ></th>
                                <th className='table-title'>Unidad</th>
                                <th className='table-title'> Carrera</th>
                                <th className='table-title'>Modalidad</th>
                                <th className='table-title'>Turno</th>
                                <th className='table-title'>Periodo</th>
                                <th className='table-action'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.ofertas.map((oferta, index) =>
                                    <tr key={oferta.id}>
                                        <td >{index + 1}</td>
                                        <td className='table-conten'>{oferta.unidad_academica.nombre_completo}</td>
                                        <td className='table-conten'>{oferta.carrera.nombre}</td>
                                        <td className='table-conten'>{oferta.modalidad}</td>
                                        <td className='table-conten'>{oferta.turno}</td>
                                        <td className='table-conten'>{oferta.periodo}</td>
                                        <td className='table-action' >
                                            <button onClick={() => this.updateCarreraPorUnidad(oferta.id)} className="btn btn-warning mt-0">Actualizar</button>
                                            <button className="btn btn-danger mt-0" style={boton}
                                                onClick={() => this.toggleModal(oferta.id)} // Abre el modal y pasa el ID de la colegiatura
                                            > Eliminar</button>
                                            <button onClick={() => this.viewCarreraPorUnidad(oferta.id)} className="btn btn-info mt-0">Ver</button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.closeModal}>
                    <ModalHeader>Confirmar Eliminación</ModalHeader>
                    <ModalBody>
                        ¿Estás seguro de que deseas eliminar esta Oferta Academica?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={() => this.deleteOfertasAcademicas(this.state.ofertaToDeleteId)}>Eliminar</Button>
                        <Button color="secondary" onClick={this.closeModal}>Cancelar</Button>
                    </ModalFooter>
                </Modal>
            </div>


        );
    }
}

export default ListOfertaAcademicaComponent;