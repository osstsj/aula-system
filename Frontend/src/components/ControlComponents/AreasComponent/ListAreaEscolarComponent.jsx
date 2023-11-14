import React, { Component } from 'react';
import '../../StyleGlobal/Style.css'
import AreaEscolarService from '../../../services/Control/AreaEscolarService';
import * as XLSX from 'xlsx';  // Importa la librería XLSX
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Importa la extensión jspdf-autotable
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'; // Importa Reactstrap para el modal

class ListAreaEscolarComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            areas: [],
            isModalOpen: false, // Estado para controlar la apertura/cierre del modal
            areaToDeleteId: null, // Estado para almacenar el ID de la colegiatura a eliminar
        }

        this.addArea = this.addArea.bind(this);
        this.deleteAreaById = this.deleteAreaById.bind(this);
        this.viewAreaById = this.viewAreaById.bind(this);
        this.updateAreaById = this.updateAreaById.bind(this);
        this.exportToExcel = this.exportToExcel.bind(this);  // Método para exportar a Excel
        this.exportToPDF = this.exportToPDF.bind(this); // Método para exportar a PDF
    }

    deleteAreaById(id) {
        AreaEscolarService.deleteAreaEscolarById(id).then(() => {
            this.setState({
                areas: this.state.areas.filter(area => area.id !== id),
                isModalOpen: false, // Cierra el modal después de eliminar
                areaToDeleteId: null, // Restablece el ID de la colegiatura
            });
        }).catch(() => {
            alert("Error al intentar eliminar las Areas...");
            this.props.history.push('/list-area');
        });
    }

    viewAreaById(id) {
        this.props.history.push(`/view-area/${id}`);
    }

    updateAreaById(id) {
        this.props.history.push(`/update-area/${id}`);
    }

    addArea() {
        this.props.history.push('/add-area');
    }

    componentDidMount() {
        AreaEscolarService.getAllAreaEscolar().then((res) => {
            this.setState({ areas: res.data });
        }).catch(() => {
            alert("Error al intentar traer las Areas...");
            this.props.history.push('/list-area');
        });
    }

    exportToExcel() {
        const { areas } = this.state;

        // Crear una nueva hoja de cálculo
        const ws = XLSX.utils.json_to_sheet(areas);

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
        XLSX.utils.book_append_sheet(wb, ws, 'areas');  // 'areas' es el nombre de la hoja

        // Generar el archivo XLSX
        XLSX.writeFile(wb, 'areas.xlsx');  // 'areas.xlsx' es el nombre del archivo
    }
    exportToPDF() {
        const { areas } = this.state;

        const doc = new jsPDF();
        doc.text('Lista de areas', 10, 10);

        const columns = ['area', ' responsable', 'unidad_academica', 'fecha de creacion', 'fecha de actualizacion'];
        const data = areas.map((area) => [
            area.area,
            area.responsable,
            area.unidad_academica.nombre_completo,
            area.fecha_creacion,
            area.fecha_actualizacion,
        ]);

        doc.autoTable({
            startY: 20,
            head: [columns],
            body: data,
        });

        doc.save('areas.pdf');
    }
    // Método para abrir el modal
    toggleModal = (areaId) => {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
            areaToDeleteId: areaId, // Establece el ID de la colegiatura a eliminar
        });
    }

    // Método para cerrar el modal
    closeModal = () => {
        this.setState({
            isModalOpen: false,
            areaToDeleteId: null, // Restablece el ID de la colegiatura
        });
    }
    render() {
        const boton = {
            marginLeft: '1rem',
            marginRight: '1rem'
        }


        return (
            <div className='container'>
                <h2 className='text-center mt-5 mb-5 Title'>LISTA DE ÁREAS ACADÉMICAS</h2>
                <button style={{ width: '20%' }} className="btn btn-primary mb-4" onClick={this.addArea}>Agragar Área Académica</button>
                <button style={{ width: '15%', marginLeft: '1rem' }} className="btn btn-outline-success mb-4" onClick={this.exportToExcel}>Exportar a Excel</button> {/* Botón de exportar a Excel */}
                <button style={{ width: '15%', marginLeft: '1rem' }} className="btn btn-outline-dark mb-4" onClick={this.exportToPDF}>
                    Exportar a PDF
                </button>
                <div className="row" style={{ overflowX: 'auto' }}>
                    <table className="table table-striped table-bordered" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                        <thead>
                            <tr>
                                <th></th>
                                <th className='table-title'>Área </th>
                                <th className='table-title'>Responsable</th>
                                <th className='table-title'>Unidad académica</th>
                                <th className='table-action'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.areas.map((area, index) =>
                                    <tr key={area.id}>
                                        <td >{index + 1}</td>
                                        <td className='table-conten'>{area.area}</td>
                                        <td className='table-conten'>{area.responsable}</td>
                                        <td className='table-conten'>{area.unidad_academica.nombre_completo}</td>
                                        <td className='table-action'>
                                            <button onClick={() => this.updateAreaById(area.id)} className="btn btn-warning  mt-0">Actualizar</button>
                                            <button className="btn btn-danger mt-0" style={boton}
                                                onClick={() => this.toggleModal(area.id)} // Abre el modal y pasa el ID de la colegiatura
                                            > Eliminar</button>
                                            <button onClick={() => this.viewAreaById(area.id)} className="btn btn-info mt-0">Ver</button>
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
                        ¿Estás seguro de que deseas eliminar esta area?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={() => this.deleteAreaById(this.state.areaToDeleteId)}>Eliminar</Button>
                        <Button color="secondary" onClick={this.closeModal}>Cancelar</Button>
                    </ModalFooter>
                </Modal>
            </div>

        )
    }

}

export default ListAreaEscolarComponent;