import React, { Component } from 'react';
import '../../StyleGlobal/Style.css'
import CarreraService from '../../../services/Control/CarreraService';
import * as XLSX from 'xlsx';  // Importa la librería XLSX
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Importa la extensión jspdf-autotable
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'; // Importa Reactstrap para el modal


class ListCarreraComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            carreras: [],
            isModalOpen: false, // Estado para controlar la apertura/cierre del modal
            carreraToDeleteId: null, // Estado para almacenar el ID de la colegiatura a eliminar
        }
        this.addCarrera = this.addCarrera.bind(this);
        this.updateCarrera = this.updateCarrera.bind(this);
        this.deleteCarrera = this.deleteCarrera.bind(this);
        this.exportToExcel = this.exportToExcel.bind(this);  // Método para exportar a Excel
        this.exportToPDF = this.exportToPDF.bind(this); // Método para exportar a PDF

    }

    deleteCarrera(id) {
        // rest api
        CarreraService.deleteCarreralById(id).then(res => {
            this.setState({
                carreras: this.state.carreras.filter(carrera => carrera.id !== id),
                isModalOpen: false, // Cierra el modal después de eliminar
                carreraToDeleteId: null, // Restablece el ID de la colegiatura
            });

        }).catch(() => {
            alert("Error al intentar eliminar la carrera...");
            this.props.history.push('/list-carrera');
        });
    }

    viewCarrera(id) {
        this.props.history.push(`view-carrera/${id}`);
    }

    updateCarrera(id) {
        this.props.history.push(`update-carrera/${id}`);
    }

    componentDidMount() {
        //promise
        CarreraService.getAllCarreras().then((res) => {
            this.setState({ carreras: res.data });
        }).catch(() => {
            alert("Error al intentar traer las carreras...");
            this.props.history.push('/list-carrera');
        });
    }

    addCarrera() {
        this.props.history.push('/add-carrera/');
    }

    exportToExcel() {
        const { carreras } = this.state;

        // Crear una nueva hoja de cálculo
        const ws = XLSX.utils.json_to_sheet(carreras);

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
        XLSX.utils.book_append_sheet(wb, ws, 'carreras');  // 'carreras' es el nombre de la hoja

        // Generar el archivo XLSX
        XLSX.writeFile(wb, 'carreras.xlsx');  // 'carreras.xlsx' es el nombre del archivo
    }
    exportToPDF() {
        const { carreras } = this.state;

        const doc = new jsPDF();
        doc.text('Lista de carreras', 10, 10);

        const columns = [' abreviatura', ' nombre', 'dgp', ' plan_estudio', 'estatus', 'fecha de creacion', ' fecha de actualizacion'];
        const data = carreras.map((carrera) => [
            carrera.abreviatura,
            carrera.nombre,
            carrera.dgp,
            carrera.plan_estudio,
            carrera.estatus,
            carrera.fecha_creacion,
            carrera.fecha_actualizacion
        ]);

        doc.autoTable({
            startY: 20,
            head: [columns],
            body: data,
        });

        doc.save('carreras.pdf');
    }
    // Método para abrir el modal
    toggleModal = (carreraId) => {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
            carreraToDeleteId: carreraId, // Establece el ID de la colegiatura a eliminar
        });
    }

    // Método para cerrar el modal
    closeModal = () => {
        this.setState({
            isModalOpen: false,
            carreraToDeleteId: null, // Restablece el ID de la colegiatura
        });
    }
    render() {
        const boton= {
            marginLeft:'1rem',
            marginRight:'1rem'
        }

        return (
            <div className='container'>
                <h2 className="text-center mt-5 mb-5 Title">LISTA DE CARRERAS</h2>
                <button style={{ width: '15%' }} className="btn btn-primary mb-4" onClick={this.addCarrera}>Agregar carrera</button>
                <button style={{ width: '15%', marginLeft: '1rem' }} className="btn btn-outline-success mb-4" onClick={this.exportToExcel}>Exportar a Excel</button> {/* Botón de exportar a Excel */}
                <button style={{ width: '15%', marginLeft: '1rem' }} className="btn btn-outline-dark mb-4" onClick={this.exportToPDF}>
                    Exportar a PDF
                </button>
                <div className="row" style={{ overflowX: 'auto' }}>
                    <table className="table table-striped table-bordered" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                        <thead>
                            <tr>
                                <th></th>
                                <th className='table-title'>Nombre</th>
                                <th className='table-title'>Estatus</th>
                                <th className='table-title'>Plan de estudios</th>
                                <th className='table-action'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.carreras.map((carrera, index) =>
                                    <tr key={carrera.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                                        <td >{index + 1}</td>
                                        <td className={carrera.estatus === 'ACTIVA' ? 'table-conten':'table-conten text-secondary'}>{carrera.nombre}</td>
                                        <td className={carrera.estatus === 'ACTIVA' ? 'table-conten':'table-conten text-secondary'}>{carrera.estatus}</td>
                                        <td className={carrera.estatus === 'ACTIVA' ? 'table-conten':'table-conten text-secondary'}>{carrera.plan_estudio}</td>
                                        <td className='table-action'>
                                            <button onClick={() => this.updateCarrera(carrera.id)} className="btn btn-warning mt-0">Actualizar</button>
                                            <button className="btn btn-danger mt-0" style={boton}
                                                onClick={() => this.toggleModal(carrera.id)} // Abre el modal y pasa el ID de la colegiatura
                                            > Eliminar</button>
                                            <button onClick={() => this.viewCarrera(carrera.id)} className="btn btn-info mt-0">Ver</button>
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
                        ¿Estás seguro de que deseas eliminar esta carrera?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={() => this.deleteCarrera(this.state.carreraToDeleteId)}>Eliminar</Button>
                        <Button color="secondary" onClick={this.closeModal}>Cancelar</Button>
                    </ModalFooter>
                </Modal>
            </div>


        );
    }
}

export default ListCarreraComponent;
