import React, { Component } from 'react';
import '../../StyleGlobal/Style.css';
import DocenteService from '../../../services/Control/DocenteService';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Importa la extensión jspdf-autotable
import swal from 'sweetalert';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'; // Importa Reactstrap para el modal

class ListDocenteComponent extends Component {
    constructor(props) {
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

    deleteDocenteById(id) {
        DocenteService.checkDocenteDependersById(id).then(res => {
            if (res.data === false) {
                // rest api
                DocenteService.deleteDocenteById(id).then( () => {
                    this.setState({
                        docentes: this.state.docentes.filter(docente => docente.id !== id),
                        isModalOpen: false, // Cierra el modal después de eliminar
                        docenteToDeleteId: null, // Restablece el ID de la colegiatura
                    })
                }).catch(() => {
                    swal("Oops!","Error al intentar eliminar la carrera por unidad...\n" +
                    "por favor verifique: Proyecciones Asignatura/Tiempo Completo", "error");
                    this.props.history.push('/list-docente');
                });
            } else {
                swal("Oops!", "El docente no es posible eliminar porque esta presente en otros modulos.\n" +
                "por favor verifique: Proyecciones Asignatura/Tiempo Completo", "error");

                this.setState({
                    isModalOpen: false, // Cierra el modal después de eliminar
                    docenteToDeleteId: null}) // Restablece el ID de la colegiatura)

                this.props.history.push('/list-docente');
            }
        })       
    }

    viewDocenteById(id) {
        this.props.history.push(`view-docente/${id}`);
    }

    editDocenteById(id) {
        this.props.history.push(`update-docente/${id}`);

    }

    componentDidMount() {
        //promise
        DocenteService.getAllDocentes().then((res) => {
            this.setState({ docentes: res.data });
        }).catch(() => {
            alert("Error al intentar trear al los docentes...");
            this.props.history.push('/list-docente');
        });
    }

    addDocente() {
        this.props.history.push('/add-docente/');
    }

    exportToExcel() {
        const { docentes } = this.state;
    
        // Modificar la estructura de los datos para incluir la información de la unidad académica
        const datosParaExportar = docentes.map(docente => ({
            id: docente.id,
            nombre: docente.nombre,
            apellido_paterno: docente.apellido_paterno,
            apellido_materno: docente.apellido_materno,
            unidad_academica: docente.unidad_academica.nombre_completo,
            categoria: docente.categoria,
            actividad: docente.actividad,
            fecha_creacion: docente.fecha_creacion,
            fecha_actualizacion: docente.fecha_actualizacion
        }));
    
        // Crear una nueva hoja de cálculo
        const ws = XLSX.utils.json_to_sheet(datosParaExportar);
        const colWidths = [
            { wch: 5 },  
            { wch: 15 }, 
            { wch: 25 }, 
            { wch: 15 }, 
            { wch: 15 },
            { wch: 15 },
            { wch: 20 }, 
            { wch: 20 },
            { wch: 20 },
        ];
        ws['!cols'] = colWidths;
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

        const columns = ['Nombre', 'Apellido Paternno', 'Apellido Materno', 'Unidad Academica', 'Categoria', 'Actividad', 'Fecha Creacion', 'Fecha de Actualizacion'];
        
        const data = docentes.map((docente) => [
            docente.nombre,
             docente.apellido_paterno,
             docente.apellido_materno,
              docente.unidad_academica.nombre_completo,
             docente.categoria,
             docente.actividad,
             docente.fecha_creacion,
             docente.fecha_actualizacion
         ]);

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
        const boton = {
            marginLeft: '1rem',
            marginRight: '1rem'
        }

        return (
            <div className='container'>
                <h2 className="text-center mt-5 mb-5 Title" >LISTA DE DOCENTES</h2>
                <button style={{ width: '15%' }} className="btn btn-primary mb-4" onClick={this.addDocente}>
                    Agregar Docente
                </button>
                <button style={{ width: '15%', marginLeft: '1rem' }} className="btn  btn-outline-success mb-4" onClick={this.exportToExcel}>
                    Exportar a Excel
                </button>
                <button style={{ width: '15%', marginLeft: '1rem' }} className="btn btn-outline-dark  mb-4" onClick={this.exportToPDF}>
                    Exportar a PDF
                </button>
                <div className="row" style={{ overflowX: 'auto' }}>
                    <table className="table table-striped table-bordered" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                        <thead >
                            <tr >
                                <th></th>
                                <th className='table-title'>Nombre completo</th>
                                <th className='table-title'>Unidad Académica</th>
                                <th className='table-title'>Categoría</th>
                                <th className='table-title'>Actividad</th>
                                <th className='table-title'>Estatus</th>
                                <th className='table-action'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody >
                            {
                                this.state.docentes.map((docente, index) =>
                                    <tr key={docente.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}
                                        >
                                        <td>{index + 1}</td>
                                        <td className={docente.estatus === 'Activo' ? 'table-conten':'table-conten text-secondary'}>
                                            {docente.nombre_completo}
                                        </td>
                                        <td className={docente.estatus === 'Activo' ? 'table-conten':'table-conten text-secondary'}>
                                            {docente.unidad_academica.nombre_completo}
                                        </td>
                                        <td className={docente.estatus === 'Activo' ? 'table-conten':'table-conten text-secondary'}>
                                            {docente.categoria}
                                        </td>
                                        <td className={docente.estatus === 'Activo' ? 'table-conten':'table-conten text-secondary'}>
                                            {docente.actividad}
                                        </td>
                                        <td className={docente.estatus === 'Activo' ? 'table-conten':'table-conten text-secondary'}>
                                            {docente.estatus}
                                        </td>
                                        <td className='table-action'>
                                            <button onClick={() => this.editDocenteById(docente.id)} className="btn btn-warning mt-0">Actualizar</button>
                                            <button className="btn btn-danger mt-0" style={boton}
                                                onClick={() => this.toggleModal(docente.id)} // Abre el modal y pasa el ID de la colegiatura
                                            > Eliminar</button>
                                            <button onClick={() => this.viewDocenteById(docente.id)} className="btn btn-info mt-0">Ver</button>
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