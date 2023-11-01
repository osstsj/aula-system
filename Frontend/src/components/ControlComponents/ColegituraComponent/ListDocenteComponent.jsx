import React, {Component} from "react";
import '../../StyleGlobal/Style.css'
import ColegiaturaService from '../../../services/Control/ColegiaturaService';
import * as XLSX from 'xlsx';  // Importa la librería XLSX
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Importa la extensión jspdf-autotable
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'; // Importa Reactstrap para el modal


class ListColegiaturaComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            colegiaturas:[],
            isModalOpen: false, // Estado para controlar la apertura/cierre del modal
            colegiaturaToDeleteId: null, // Estado para almacenar el ID de la colegiatura a eliminar
        }
        
        this.addColegiatura = this.addColegiatura.bind(this);
        this.editColegiaturaById = this.editColegiaturaById.bind(this);
        this.deleteColegiaturaById = this.deleteColegiaturaById.bind(this);
        this.viewColegiaturaById = this.viewColegiaturaById.bind(this);
        this.exportToExcel = this.exportToExcel.bind(this);  // Método para exportar a Excel
        this.exportToPDF = this.exportToPDF.bind(this); // Método para exportar a PDF
    }

    componentDidMount() {
        ColegiaturaService.getAllColegiaturas().then(
            res => {
                this.setState({colegiaturas: res.data});
            });
    }

    addColegiatura() {
        this.props.history.push('/add-colegiatura');
    }

    editColegiaturaById(id) {
        this.props.history.push(`/update-colegiatura/${id}`);
    }

    deleteColegiaturaById(id) {
        ColegiaturaService.deleteColegiaturaById(id).then(() => {
            this.setState({
                colegiaturas: this.state.colegiaturas.filter(colegiatura => colegiatura.id !== id),
                isModalOpen: false, // Cierra el modal después de eliminar
                colegiaturaToDeleteId: null, // Restablece el ID de la colegiatura
            });
        });
    }

    viewColegiaturaById(id) {
        this.props.history.push(`view-colegiatura/${id}`);
    }
    exportToExcel() {
        const { colegiaturas } = this.state;

        // Crear una nueva hoja de cálculo
        const ws = XLSX.utils.json_to_sheet(colegiaturas);

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
        XLSX.utils.book_append_sheet(wb, ws, 'colegiaturas');  // 'colegiaturas' es el nombre de la hoja

        // Generar el archivo XLSX
        XLSX.writeFile(wb, 'colegiaturas.xlsx');  // 'colegiaturas.xlsx' es el nombre del archivo
    }
    exportToPDF() {
        const { colegiaturas } = this.state;

        const doc = new jsPDF();
        doc.text('Lista de colegiaturas', 10, 10);

        const columns = [' clave',' descripcion',' monto', 'estatus','comentarios'];
        const data = colegiaturas.map((colegiatura) => [
            colegiatura. clave,
            colegiatura.descripcion,
            colegiatura. monto,
            colegiatura.colegiatura_estatus,
            colegiatura.comentarios,
        ]);

        doc.autoTable({
            startY: 20,
            head: [columns],
            body: data,
        });

        doc.save('colegiaturas.pdf');
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
        const boton= {
            marginLeft:'1rem',
            marginRight:'1rem'
        }

           
        return (
            <div className="container">
                <h2 className="text-center mt-5 mb-5 Title">LISTA DE COLEGIATURAS</h2>
                <button 
                    className="btn btn-primary mb-4" style={{width:'20%'}}
                    onClick={this.addColegiatura}>Agragar Colegiatura</button>
                    <button style={{ width: '15%',marginLeft:'1rem' }} className="btn btn-outline-success mb-4" onClick={this.exportToExcel}>Exportar a Excel</button> {/* Botón de exportar a Excel */}
                    <button style={{ width: '15%',marginLeft:'1rem' }} className="btn btn-outline-dark mb-4" onClick={this.exportToPDF}>
                    Exportar a PDF
                </button>
                <div className="row">
                <table className="table table-striped table-bordered"  style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                        <thead>
                            <tr>
                                <th></th>
                                <th className='table-title'>Clave</th>
                                <th className='table-title'>Descripcion</th>
                                <th className='table-title'>Monto</th>
                                <th className='table-title'>Estatus</th>
                                <th className='table-action'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.colegiaturas.map((colegiatura, index) => 
                                    <tr key={colegiatura.id}>
                                        <td >{index + 1}</td>
                                        <td className='table-conten'>{colegiatura.clave}</td>
                                        <td className='table-conten'>{colegiatura.descripcion}</td>
                                        <td className='table-conten'>{colegiatura.monto}</td>
                                        <td className='table-conten'>{colegiatura.colegiatura_estatus}</td>
                                        <td className='table-action'>
                                            <button 
                                                className="btn btn-warning"
                                                onClick={()=>this.editColegiaturaById(colegiatura.id)}
                                            >Actualizar
                                            </button>
                                            <button
                                            className="btn btn-danger"
                                            style={boton}
                                            onClick={() => this.toggleModal(colegiatura.id)} // Abre el modal y pasa el ID de la colegiatura
                                        >
                                            Eliminar
                                        </button>
                                            
                                            <button 
                                                className="btn btn-info"
                                                onClick={()=>this.viewColegiaturaById(colegiatura.id)}
                                            >Ver
                                            </button>
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
                    ¿Estás seguro de que deseas eliminar esta colegiatura?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={() => this.deleteColegiaturaById(this.state.colegiaturaToDeleteId)}>Eliminar</Button>
                    <Button color="secondary" onClick={this.closeModal}>Cancelar</Button>
                </ModalFooter>
            </Modal>
            </div>
        )
    }
}

export default ListColegiaturaComponent;