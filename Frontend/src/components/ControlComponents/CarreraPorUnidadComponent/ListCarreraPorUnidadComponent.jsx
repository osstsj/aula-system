import React, { Component } from 'react';
import CarreraPorUnidadService from '../../../services/Control/CarreraPorUnidadService';
import * as XLSX from 'xlsx';  // Importa la librería XLSX
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Importa la extensión jspdf-autotable
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'; // Importa Reactstrap para el modal

//rcc->enter
class ListCarreraPorUnidadComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            unidades: [],
            isModalOpen: false, // Estado para controlar la apertura/cierre del modal
            unidadeToDeleteId: null, // Estado para almacenar el ID de la colegiatura a eliminar
        }
        this.deleteCarreraPorUnidad = this.deleteCarreraPorUnidad.bind(this);
        this.exportToExcel = this.exportToExcel.bind(this);  // Método para exportar a Excel  
        this.exportToPDF = this.exportToPDF.bind(this); // Método para exportar a PDF

        this.addUnidad = this.addUnidad.bind(this);

    }

    deleteCarreraPorUnidad(id) {
        // rest api
        CarreraPorUnidadService.deleteCarreraPorUnidadlById(id).then(res => {
            this.setState({
                unidades: this.state.unidades.filter(unidad => unidad.id !== id),
                isModalOpen: false, // Cierra el modal después de eliminar
                unidadeToDeleteId: null, // Restablece el ID de la colegiatura
            });
        });
    }
    viewCarreraPorUnidad(id) {
        this.props.history.push(`view-carrera_por_unidad/${id}`);
    }

    editCarreraPorUnidad(id) {
        this.props.history.push(`update-carrera-por-unidad/${id}`);
    }

    componentDidMount() {
        //promise
        CarreraPorUnidadService.getAllCarrerasPorUnidad().then((res) => {
            this.setState({ unidades: res.data });
        });
    }
    addUnidad() {
        this.props.history.push('/add-carrera_por_unidad');
    }


    exportToExcel() {
        const { unidades } = this.state;

        // Crear una nueva hoja de cálculo
        const ws = XLSX.utils.json_to_sheet(unidades);

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
        ];
        ws['!cols'] = colWidths;

        // Crear un nuevo libro de trabajo
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'unidades');  // 'unidades' es el nombre de la hoja

        // Generar el archivo XLSX
        XLSX.writeFile(wb, 'unidades.xlsx');  // 'unidades.xlsx' es el nombre del archivo
    }
    exportToPDF() {
        const { unidades } = this.state;

        const doc = new jsPDF();
        doc.text('Lista de unidades', 10, 10);

        const columns = [' Carrera', ' Nivel', ' Plantel', 'Modalidad'];
        const data = unidades.map((unidad) => [
            unidad.carrera_nombre,
            unidad.nivel,
            unidad.unidad_academica,
            unidad.modalidad,
        ]);

        doc.autoTable({
            startY: 20,
            head: [columns],
            body: data,
        });

        doc.save('unidades.pdf');
    }
    // Método para abrir el modal
    toggleModal = (unidadId) => {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
            unidadeToDeleteId: unidadId, // Establece el ID de la colegiatura a eliminar
        });
    }

    // Método para cerrar el modal
    closeModal = () => {
        this.setState({
            isModalOpen: false,
            unidadeToDeleteId: null, // Restablece el ID de la colegiatura
        });
    }
    render() {
        const boton = {
            marginLeft: '1rem',
            marginRight: '1rem'
        }

        return (
            <div className='container' >
                <h2 className="text-center mt-5 mb-5 Title">LISTA DE CARRERAS POR UNIDADES ACADÉMICAS</h2>
                <button style={{ width: '20%' }} className="btn btn-primary mb-4" onClick={this.addUnidad}>Agregar Unidad cadémica</button>
                <button style={{ width: '15%', marginLeft: '1rem' }} className="btn  btn-outline-success mb-4" onClick={this.exportToExcel}>Exportar a Excel</button> {/* Botón de exportar a Excel */}
                <button style={{ width: '15%', marginLeft: '1rem' }} className="btn  btn-outline-dark mb-4" onClick={this.exportToPDF}>
                    Exportar a PDF
                </button>
                <div className="row" style={{ overflowX: 'auto' }}>
                    <table className="table table-striped table-bordered" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                        <thead>
                            <tr>
                                <th></th>
                                <th className='table-title'>Carrera</th>
                                <th className='table-title'>Nivel Académico</th>
                                <th className='table-title'>Plantel</th>
                                <th className='table-title'>Modalidad</th>
                                <th className='table-action'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.unidades.map((unidad, index) =>
                                    <tr key={unidad.id} >
                                        <td >{index + 1}</td>
                                        <td className='table-conten'>{unidad.carrera_nombre}</td>
                                        <td className='table-conten'>{unidad.nivel}</td>
                                        <td className='table-conten'>{unidad.unidad_academica}</td>
                                        <td className='table-conten'>{unidad.modalidad}</td>
                                        <td className='table-action'>
                                            <button onClick={() => this.editCarreraPorUnidad(unidad.id)} className="btn btn-warning mt-0">Actualizar</button>
                                            <button className="btn btn-danger mt-0" style={boton}
                                                onClick={() => this.toggleModal(unidad.id)} // Abre el modal y pasa el ID de la colegiatura
                                            > Eliminar</button>
                                            <button onClick={() => this.viewCarreraPorUnidad(unidad.id)} className="btn btn-info mt-0">Ver</button>
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
                        ¿Estás seguro de que deseas eliminar esta Carrera por  Unidad?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={() => this.deleteCarreraPorUnidad(this.state.unidadeToDeleteId)}>Eliminar</Button>
                        <Button color="secondary" onClick={this.closeModal}>Cancelar</Button>
                    </ModalFooter>
                </Modal>
            </div>


        );
    }
}

export default ListCarreraPorUnidadComponent;