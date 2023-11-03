import React, { Component } from 'react';
import '../../StyleGlobal/Style.css';
import DocenteService from '../../../services/Control/DocenteService';
import PlantelService from '../../../services/Control/PlantelService';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Importa la extensión jspdf-autotable
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'; // Importa Reactstrap para el modal

class ListDocenteComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            docentes: [],
            isModalOpen: false, // Estado para controlar la apertura/cierre del modal
            docenteToDeleteId: null, // Estado para almacenar el ID de la colegiatura a eliminar
        }

        this.addDocente = this.addDocente.bind(this);
        this.editDocenteById = this.editDocenteById.bind(this);
        this.deleteDocenteById = this.deleteDocenteById.bind(this);
        this.viewDocenteById = this.viewDocenteById.bind(this);
        this.exportToExcel = this.exportToExcel.bind(this);
        this.exportToPDF = this.exportToPDF.bind(this); // Método para exportar a PDF
    }

    deleteDocenteById(id){
        // rest api
        DocenteService.deleteDocenteById(id).then(res => {
            this.setState({docentes: this.state.docentes.filter(docente => docente.id !== id),
                isModalOpen: false, // Cierra el modal después de eliminar
                docenteToDeleteId: null, // Restablece el ID de la colegiatura
            });
        });
    }

    viewDocenteById(id){
        this.props.history.push(`view-docente/${id}`);
    }

    editDocenteById(id){
        this.props.history.push(`update-docente/${id}`);
    }

    componentDidMount(){
        //promise
        DocenteService.getAllDocentes().then((res) => {
            this.setState({docentes: res.data});
        });
    }

    addDocente(){
        this.props.history.push('/add-docente/');
    }
    
    exportToExcel() {
        const { docentes } = this.state;

        // Crear una nueva hoja de cálculo
        const ws = XLSX.utils.json_to_sheet(docentes);

        // Crear un nuevo libro de trabajo
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Docentes');

        // Generar el archivo XLSX
        XLSX.writeFile(wb, 'docentes.xlsx');
    }
    exportToPDF() {
        const { docentes } = this.state;

        const doc = new jsPDF();
        doc.text('Lista de docentes', 10, 10);

        const columns = ['Nombre', 'Apellido Paternno', 'Apellido Materno','Unidad Academica','Categoria','Actividad','Fecha Creacion','Fecha de Actualizacion'];
        const data = '';
        // const data = docentes.map((docente) => [
        //     docente.nombre,
        //     docente.apellido_paterno,
        //     docente.apellido_materno,
        //     // docente.unidad_academica,
        //     docente.categoria,
        //     docente.actividad,
        //     docente.fecha_creacion,
        //     docente.fecha_actualizacion
        // ]);

        doc.autoTable({
            startY: 20,
            head: [columns],
            body: data,
        });

        doc.save('docentes.pdf');
    }
    // Método para abrir el modal
    toggleModal = (docenteId) => {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
            docenteToDeleteId: docenteId, // Establece el ID de la colegiatura a eliminar
        });
    }

    // Método para cerrar el modal
    closeModal = () => {
        this.setState({
            isModalOpen: false,
            docenteToDeleteId: null, // Restablece el ID de la colegiatura
        });
    }
    render() { 
         const boton= {
            marginLeft:'1rem',
            marginRight:'1rem'
        }
       
        return (
            <div  className='container'>
                <h2 className="text-center mt-5 mb-5 Title" >LISTA DE DOCENTES</h2>
                <button style={{width:'15%'}} className="btn btn-primary mb-4" onClick={this.addDocente}>
                    Agregar Docente
                </button>
                <button style={{ width: '15%',marginLeft:'1rem' }} className="btn  btn-outline-success mb-4" onClick={this.exportToExcel}>
                    Exportar a Excel
                </button>
                <button style={{ width: '15%',marginLeft:'1rem' }} className="btn btn-outline-dark  mb-4" onClick={this.exportToPDF}>
                    Exportar a PDF
                </button>
                <div className="row"  style={{ overflowX: 'auto' }}>
                    <table className="table table-striped table-bordered"  style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                        <thead >
                            <tr >
                                <th></th>
                                <th className='table-title'>Nombre</th>
                                <th className='table-title'>Apellido Paterno</th>                               
                                <th className='table-title'>Apellido Materno</th>
                                <th className='table-title'>Unidad Academica</th>
                                <th className='table-title'>Categoria</th>
                                <th className='table-title'>Actividad</th>
                                <th className='table-action'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody >
                            {
                                this.state.docentes.map((docente, index )=>
                                <tr key={docente.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                                    <td>{index + 1}</td>
                                        <td className='table-conten'>{docente.nombre}</td>
                                        <td className='table-conten'>{docente.apellido_paterno}</td>
                                        <td className='table-conten'>{docente.apellido_materno}</td>
                                        <td className='table-conten'>{docente.plantel.nombre_completo}</td>
                                        <td className='table-conten'>{docente.categoria}</td>
                                        <td className='table-conten'>{docente.actividad}</td>
                                        <td className='table-action'>
                                            <button onClick={()=> this.editDocenteById(docente.id)} className="btn btn-warning">Actualizar</button>
                                            <button className="btn btn-danger" style={boton}
                                            onClick={() => this.toggleModal(docente.id)} // Abre el modal y pasa el ID de la colegiatura
                                        > Eliminar</button>  
                                         <button onClick={()=> this.viewDocenteById(docente.id)} className="btn btn-info">Ver</button>
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
                    ¿Estás seguro de que deseas eliminar este docente?
                </ModalBody>
                <ModalFooter>
                <Button color="danger" onClick={() => this.deleteDocenteById(this.state.docenteToDeleteId)}>Eliminar</Button>
                    <Button color="secondary" onClick={this.closeModal}>Cancelar</Button>
                </ModalFooter>
                </Modal>
            </div>


        );
    }
}

export default ListDocenteComponent;