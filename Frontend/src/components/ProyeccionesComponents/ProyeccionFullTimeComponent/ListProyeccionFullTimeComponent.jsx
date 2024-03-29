import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../Style/Table.css';
import '../../StyleGlobal/Style.css'
import FulltimeProyeccionService from '../../../services/Proyecciones/FulltimeProyeccionService';
import FolioFulltimeService from '../../../services/Proyecciones/FolioFulltimeService';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as XLSX from 'xlsx';  // Importa la librería XLSX
import jsPDF from 'jspdf';

class ListProyeccionFullTimeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id, // id_folio

            areColumnsVisible: true, // Estado inicial para controlar la visibilidad de las columnas
            areColumns2Visible: true,

            unidad: '',

            fulltimes: [],
            isModalOpen: false,
            asignaturaToDeleteId: null, 
        };

        this.viewProyeccionFulltime = this.viewProyeccionFulltime.bind(this);
        this.addFulltime = this.addFulltime.bind(this);
        this.updateProyeccionFulltime = this.updateProyeccionFulltime.bind(this);
        this.exportToExcel = this.exportToExcel.bind(this);  // Método para exportar a Excel
        this.exportToPDF = this.exportToPDF.bind(this); // Método para exportar a PDF

    }

    componentDidMount() {
        FulltimeProyeccionService.getAllProyeccionesFulltimeByFolio(this.state.id).then(res =>
            this.setState({ fulltimes: res.data }))
            .catch(() => {
                alert("Error al traer las proyecciones tiempo completo por folio...");
                this.props.history.push('/');
            });

            this.getUnidadFromFolioId();
    }

    async getUnidadFromFolioId() {
        await FolioFulltimeService.getFolioById(this.state.id).then(res => {
            const data = res.data;
            
            this.setState({ unidad: data.unidad_academica.nombre_completo})
        }).catch(() => {
            alert("Error al intentar traer las UAs...");
            this.props.history.push('/');
        });
    }


    addFulltime() {
        this.props.history.push(`/add-proyeccion_fulltime/${this.state.id}`);
    }

    updateProyeccionFulltime(id) {
        this.props.history.push(`/update-proyeccion_fulltime/${id}`);
    }

    viewProyeccionFulltime(id) {
        this.props.history.push(`/view-proyeccion_fulltime/${id}`);
    }

    deleteProyeccionFulltime(id) {
        FulltimeProyeccionService.deleteFulltimeById(this.state.id).then(() => {
            this.setState({
                fulltimes: this.state.fulltimes.filter(fulltime => fulltime.id !== id),
                isModalOpen: false,
                asignaturaToDeleteId: null,
            })
        }).catch(() => {
            alert("Error al intentar traer las UAs...");
            this.props.history.push('/');
        });
    }

    // Función para alternar la visibilidad de las columnas
    toggleColumns = () => {
        this.setState((prevState) => ({
            areColumnsVisible: !prevState.areColumnsVisible,
        }));
    };
    toggleColumn2s = () => {
        this.setState((prevState) => ({
            areColumns2Visible: !prevState.areColumns2Visible,
        }));
    };

     // Método para abrir el modal
     toggleModal = (id_asignatura) => {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
            asignaturaToDeleteId: id_asignatura, // Establece el ID de la colegiatura a eliminar
        });
    }
    exportToExcel() {
        const { fulltimes } = this.state; // Replace with your actual data
    
        const datosCombinados = fulltimes.map((fulltime) => ({
            "No. Folio": fulltime.folio.folio,
            "Clave de Programa Educativo": fulltime.profesor_fulltime.clave_programa.carrera_nombre.clave_programa,
            "Código de Nómina": fulltime.profesor_fulltime.nombre_docente.codigo_nomina,
            "Grado Académico": fulltime.profesor_fulltime.grado_academico,
            "Nombre del Docente": fulltime.profesor_fulltime.nombre_docente.nombre_completo,
            "Hora de asignatura (A)": fulltime.horas_sustantivas_atencion_alumnos_fulltime.ptc,
            "Hora de asignatura (B)": fulltime.horas_sustantivas_atencion_alumnos_fulltime.horas_frente_grupo,
            "Horas frente al grupo": fulltime.horas_sustantivas_atencion_alumnos_fulltime.horas_frente_grupo,
            "Academias - Presidente": fulltime.horas_sustantivas_atencion_alumnos_fulltime.academias.presidente,
            "Academias - Secretario": fulltime.horas_sustantivas_atencion_alumnos_fulltime.academias.secretario,
            "Asesorías - Residencia Profesional": fulltime.horas_sustantivas_atencion_alumnos_fulltime.asesorias.residencias_profesionales,
            "Asesorías - Educación Dual": fulltime.horas_sustantivas_atencion_alumnos_fulltime.asesorias.educacion_dual,
            "Asesorías - Titulación": fulltime.horas_sustantivas_atencion_alumnos_fulltime.asesorias.titulacion,
            "Asesorías Académicas": fulltime.horas_sustantivas_atencion_alumnos_fulltime.asesorias.asesorias_academica,
            "Tutorías": fulltime.horas_sustantivas_atencion_alumnos_fulltime.asesorias.tutorias,
            "Actividades Complementarias": fulltime.horas_sustantivas_atencion_alumnos_fulltime.actividades_complementarias,
            "Subtotal 1": fulltime.horas_sustantivas_atencion_alumnos_fulltime.subtotal_1,
            "Investigación Educativa, Desarrollo Tecnológico": fulltime.horas_necesidad_institucional_fulltime.proyecto_investigacion,
            "Apoyo Operativo": fulltime.horas_necesidad_institucional_fulltime.apoyo_operativo,
            "Subtotal 2": fulltime.horas_necesidad_institucional_fulltime.subtotal_2,
            "Total": fulltime.total,
            "Observaciones": fulltime.observaciones,
            "Fecha Solicitud de Modificación": fulltime.fecha_actualizacion,
            "Carga Horaria Anterior": fulltime.carga_horaria_anterior,
            "Categoría de Horas de Asignatura Anterior": fulltime.nivel_ptc_anterior,
            "Carga Horaria Nueva": fulltime.carga_horaria_nueva,
            "Tipo de Horas de Asignatura Nueva": fulltime.nivel_ptc_nuevo,
            "La Modificación Se Aplica A Partir de (Fecha)": fulltime.modifica_aplica_en,
            "No. Oficio Respuesta": fulltime.oficio_respuesta,
            "No. de Oficio Academia": fulltime.oficio_academia,
            "Fecha en que RH Aplica en el Sistema": fulltime.fecha_rh_aplica_sistema,
            "Observaciones Modificación": fulltime.observacion_modificacion,
            // Add more fields as needed
        }));
    
        const ws = XLSX.utils.json_to_sheet(datosCombinados);
    
        const colWidths = [
            { wch: 5 },  // No.
            { wch: 30 }, // Clave de Programa Educativo
            { wch: 20 }, // Código de Nómina
            { wch: 15 }, // Grado Académico
            { wch: 20 }, // Nombre del Docente
            { wch: 10 }, // Hora de asignatura (A)
            { wch: 10 }, // Hora de asignatura (B)
            { wch: 10 }, // Horas frente al grupo
            { wch: 20 }, // Academias - Presidente
            { wch: 20 }, // Academias - Secretario
            { wch: 20 }, // Asesorías - Residencia Profesional
            { wch: 20 }, // Asesorías - Educación Dual
            { wch: 20 }, // Asesorías - Titulación
            { wch: 20 }, // Asesorías Académicas
            { wch: 10 }, // Tutorías
            { wch: 20 }, // Actividades Complementarias
            { wch: 10 }, // Subtotal 1
            { wch: 20 }, // Investigación Educativa, Desarrollo Tecnológico
            { wch: 20 }, // Apoyo Operativo
            { wch: 10 }, // Subtotal 2
            { wch: 10 }, // Total
            { wch: 30 }, // Observaciones
            { wch: 30 },
            { wch: 30 },
            // Add more column widths as needed
        ];
        ws['!cols'] = colWidths;
    
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Fulltimes'); // Change sheet name if desired
    
        XLSX.writeFile(wb, 'fulltimes.xlsx'); // Change output file name if desired
    }
    exportToPDF() {
        const { fulltimes } = this.state; // Replace with your actual data
    
        const doc = new jsPDF();
        doc.text('Lista de fulltimes', 10, 10);
    
        const columns = [
            'No. Folio', 'Clave de Programa Educativo', 'Código de Nómina', 'Grado Académico', 'Nombre del Docente',
            'Hora de asignatura (A)', 'Hora de asignatura (B)', 'Horas frente al grupo', 'Academias - Presidente',
            'Academias - Secretario', 'Asesorías - Residencia Profesional', 'Asesorías - Educación Dual',
            'Asesorías - Titulación', 'Asesorías Académicas', 'Tutorías', 'Actividades Complementarias',
            'Subtotal 1', 'Investigación Educativa, Desarrollo Tecnológico', 'Apoyo Operativo', 'Subtotal 2',
            'Total', 'Observaciones', 'Fecha Solicitud de Modificación', 'Carga Horaria Anterior',
            'Categoría de Horas de Asignatura Anterior', 'Carga Horaria Nueva', 'Tipo de Horas de Asignatura Nueva',
            'La Modificación Se Aplica A Partir de (Fecha)', 'No. Oficio Respuesta', 'No. de Oficio Academia',
            'Fecha en que RH Aplica en el Sistema', 'Observaciones Modificación',
            // Add more fields as needed
        ];
    
        const data = fulltimes.map((fulltime) => [
            fulltime.folio.folio,
            fulltime.profesor_fulltime.clave_programa.carrera_nombre.clave_programa,
            fulltime.profesor_fulltime.nombre_docente.codigo_nomina,
            fulltime.profesor_fulltime.grado_academico,
            fulltime.profesor_fulltime.nombre_docente.nombre_completo,
            fulltime.horas_sustantivas_atencion_alumnos_fulltime.ptc,
            fulltime.horas_sustantivas_atencion_alumnos_fulltime.horas_frente_grupo,
            fulltime.horas_sustantivas_atencion_alumnos_fulltime.horas_frente_grupo,
            fulltime.horas_sustantivas_atencion_alumnos_fulltime.academias.presidente,
            fulltime.horas_sustantivas_atencion_alumnos_fulltime.academias.secretario,
            fulltime.horas_sustantivas_atencion_alumnos_fulltime.asesorias.residencias_profesionales,
            fulltime.horas_sustantivas_atencion_alumnos_fulltime.asesorias.educacion_dual,
            fulltime.horas_sustantivas_atencion_alumnos_fulltime.asesorias.titulacion,
            fulltime.horas_sustantivas_atencion_alumnos_fulltime.asesorias.asesorias_academica,
            fulltime.horas_sustantivas_atencion_alumnos_fulltime.asesorias.tutorias,
            fulltime.horas_sustantivas_atencion_alumnos_fulltime.actividades_complementarias,
            fulltime.horas_sustantivas_atencion_alumnos_fulltime.subtotal_1,
            fulltime.horas_necesidad_institucional_fulltime.proyecto_investigacion,
            fulltime.horas_necesidad_institucional_fulltime.apoyo_operativo,
            fulltime.horas_necesidad_institucional_fulltime.subtotal_2,
            fulltime.total,
            fulltime.observaciones,
            fulltime.fecha_actualizacion,
            fulltime.carga_horaria_anterior,
            fulltime.nivel_ptc_anterior,
            fulltime.carga_horaria_nueva,
            fulltime.nivel_ptc_nuevo,
            fulltime.modifica_aplica_en,
            fulltime.oficio_respuesta,
            fulltime.oficio_academia,
            fulltime.fecha_rh_aplica_sistema,
            fulltime.observacion_modificacion,
            // Add more fields as needed
        ]);
    
        doc.autoTable({
            startY: 20,
            head: [columns],
            body: data,
        });
    
        doc.save('fulltimes.pdf');
    }
    
    // Método para cerrar el modal
    closeModal = () => {
        this.setState({
            isModalOpen: false,
            asignaturaToDeleteId: null, // Restablece el ID de la colegiatura
        });
    }
    render() {
        const { areColumnsVisible } = this.state;
        const { areColumns2Visible } = this.state;

        const boton= {
            marginLeft:'1rem',
            marginRight:'1rem'
            }
           

        let Horas_frente_al_grupo= 0;
        let Presidente=0;
        let Secretario= 0;
        let Residencia_Profesional= 0;
                                
        let Educacion_Dual=0;
        let Titulacion= 0; 
        let Asesorias_Academicas= 0; 
        let Tutorias= 0;
        let Actividades_Complementarias= 0; 
        let Subtotal_1 =0;
        let Investigacion= 0; 
        let Apoyo_Operativo= 0;
        let Subtotal_2= 0;
        let TOTAL = 0;

        this.state.fulltimes.map((fulltime) => {
            Horas_frente_al_grupo += fulltime.horas_sustantivas_atencion_alumnos_fulltime.horas_frente_grupo;
            Presidente += fulltime.horas_sustantivas_atencion_alumnos_fulltime.academias.presidente;
            Secretario += fulltime.horas_sustantivas_atencion_alumnos_fulltime.academias.secretario;
            Residencia_Profesional += fulltime.horas_sustantivas_atencion_alumnos_fulltime.asesorias.residencias_profesionales;
            Educacion_Dual += fulltime.horas_sustantivas_atencion_alumnos_fulltime.asesorias.educacion_dual;
            Asesorias_Academicas += fulltime.horas_sustantivas_atencion_alumnos_fulltime.asesorias.asesorias_academica;
            Actividades_Complementarias += fulltime.horas_sustantivas_atencion_alumnos_fulltime.actividades_complementarias;
            Tutorias += fulltime.horas_sustantivas_atencion_alumnos_fulltime.asesorias.tutorias;
            Titulacion += fulltime.horas_sustantivas_atencion_alumnos_fulltime.asesorias.titulacion;
            Subtotal_1 += fulltime.horas_sustantivas_atencion_alumnos_fulltime.subtotal_1;
            Investigacion += fulltime.horas_necesidad_institucional_fulltime.proyecto_investigacion;
            Apoyo_Operativo += fulltime.horas_necesidad_institucional_fulltime.apoyo_operativo;
            Subtotal_2 += fulltime.horas_necesidad_institucional_fulltime.subtotal_2;
            TOTAL += fulltime.total;
        });


        return (
            <div className='container' >
                <h2 className="text-center mt-5 mb-5 Title" >PROYECCIONES TIEMPO COMPLETO</h2>
                <div>
                <button onClick={this.addFulltime} style={{ marginRight: '2%' }} className="btn btn-outline-dark mb-4" >Agregar proyección</button>
                        <button onClick={this.toggleColumns} style={{ marginRight: '2%' }} className="btn btn-success mb-4" >Comprimir Actual</button>
                        <button onClick={this.toggleColumn2s} style={{ marginRight: '27.8%' }} className="btn btn-primary mb-4" >Comprimir Anterior</button>
                        <button className="btn btn-outline-success mb-4" onClick={this.exportToExcel}>Exportar a Excel</button> {/* Botón de exportar a Excel */}
                       {/* <button className="btn btn-outline-info mb-4" onClick={this.exportToPDF}>Exportar a PDF</button> {/* Botón de exportar a Excel */}

                </div>
                <div className="row" style={{ overflowX: 'auto',boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)'  }}>
                    <table className="table table-striped table-bordered" border="3" cellspacing="0" cellpadding="0">
                        <thead>
                            <tr>
                                <th className='Title-Table' colSpan="36">UNIDAD ACADÉMICA: {this.state.unidad}</th>
                            </tr>
                            <tr>
                                <th rowSpan="3"className={`text-center table-id ${areColumns2Visible ||areColumnsVisible ? '' : 'collapse'
                                    }`}></th>
                                <th className={`text-center text-white table-green   ${areColumnsVisible ? '' : 'collapse'
                                    }`} colSpan="5">PROFESORES DE TIEMPO COMPLETO</th>
                                <th  className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`} colSpan="11">HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS</th>
                                <th  className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`} colSpan="2">HORAS NECESIDAD INSTITUCIONAL</th>
                                <th  className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`} colSpan="1">Total</th>
                                <th  className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`} rowSpan="3" colSpan="1">Total</th>
                                <th  className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`} rowSpan="3" colSpan="3">OBSERVACIONES</th>
                                <th  className={`text-center text-white table-blue  ${areColumns2Visible ? '' : 'collapse'
                                    }`} colSpan="10">DATOS PARA MODIFICACIÓN</th>
                                <th rowSpan="3" className={`text-center  table-acciones  ${areColumns2Visible ||areColumnsVisible ? '' : 'collapse'
                                    }`}> ACCIONES</th>
                            </tr>
                            <tr>
                                <th rowSpan="2"  className={`text-center text-white  table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`}>No. Folio</th>
                                <th rowSpan="2"  className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`} >Clave de Programa  Educativo</th>
                                <th rowSpan="2"  className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`} >No. de Nómina</th>
                                <th rowSpan="2"  className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`} >Grado Académico</th>
                                <th rowSpan="2"  className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`} >Nombre del Docente</th>
                                <th rowSpan="2"  className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`} >Nivel de  (PTC)</th>
                                <th rowSpan="2"  className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`} >Horas frente a Grupo</th>
                                <th colSpan="2"  className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`} >Academia</th>
                              
                                <th colSpan="5"  className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`} >Asesorías</th>
                                <th rowSpan="2"  className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`} >Actividades complementarias</th>
                                <th rowSpan="2"  className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`} >Subtotal 1</th>
                                <th rowSpan="2"  className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`} >Proyectos de Investigación</th>
                                <th rowSpan="2"  className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`} >Apoyo operativo</th>
                                <th rowSpan="2"  className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`} >subtotal 2</th>
                                <th rowSpan="2"  className={`text-center text-white table-blue  ${areColumns2Visible ? '' : 'collapse'
                                    }`}>FECHA SOLICITUD DE MODIFICACIÓN</th>
                                <th rowSpan="2"  className={`text-center text-white table-blue  ${areColumns2Visible ? '' : 'collapse'
                                    }`}>CARGA HORARIA ANTERIOR (Horas frente a Grupo)</th>
                                <th rowSpan="2"  className={`text-center text-white table-blue  ${areColumns2Visible ? '' : 'collapse'
                                    }`}>NIVEL DE PTC ANTERIOR</th>
                                <th rowSpan="2"  className={`text-center text-white table-blue  ${areColumns2Visible ? '' : 'collapse'
                                    }`}>CARGA HORARIA NUEVA (Horas frente a Grupo)</th>
                                <th rowSpan="2"  className={`text-center text-white table-blue  ${areColumns2Visible ? '' : 'collapse'
                                    }`}>NIVEL DE PTC NUEVO</th>
                                <th rowSpan="2"  className={`text-center text-white table-blue  ${areColumns2Visible ? '' : 'collapse'
                                    }`}>LA MODIFICACIÓN SE APLICA A PARTIR DE (FECHA):</th>
                                <th rowSpan="2"  className={`text-center text-white table-blue  ${areColumns2Visible ? '' : 'collapse'
                                    }`}>NO. OFICIO RESPUESTA</th>
                                <th rowSpan="2"  className={`text-center text-white table-blue  ${areColumns2Visible ? '' : 'collapse'
                                    }`}>NO. DE OFICIO ACADEMIA</th>
                                <th rowSpan="2"  className={`text-center text-white table-blue  ${areColumns2Visible ? '' : 'collapse'
                                    }`}>FECHA EN QUE RH APLICA  EN EL SISTEMA</th>
                                <th rowSpan="2"  className={`text-center text-white table-blue  ${areColumns2Visible ? '' : 'collapse'
                                    }`}>OBSERVACIONES</th>
                            </tr>
                            <tr>
                                <th className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`}>Presidente</th>
                                <th className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`}>Secretario</th>
                                <th className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`}>Residencia Profesional</th>
                                <th className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`}>Dual</th>
                                <th className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`}>Titulación</th>
                                <th className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`}>Asesorias Académicas</th>
                                <th className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`}>Tutorias</th>

                            </tr>
                        </thead>
                        <tbody className={ 2 === 0 ? 'even-row' : 'odd-row'}>
                        {
                            this.state.fulltimes.map((fulltime, index) =>
                            <tr key={fulltime.id}>
                                <td  className={`text-center table-id ${areColumns2Visible ||areColumnsVisible ? '' : 'collapse'
                                    }`}>{index + 1}</td>
                                <td scope="row"  align="center"  className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}>{fulltime.folio.folio}</td>
                                
                                {/* PROFESORES FULLTIME - Clave de Programa Educativo */}
                                <td  align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}> {fulltime.profesor_fulltime.clave_programa.carrera_nombre.clave_programa} </td>
                                
                                {/* PROFESORES FULLTIME- Código de Nómina */}
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}>{fulltime.profesor_fulltime.nombre_docente.codigo_nomina}</td>
                                
                                {/* PROFESORES DE FULLTIME - Grado Académico */}
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}>{fulltime.profesor_fulltime.grado_academico}</td>

                                {/* PROFESORES DE FULLTIME - Nombre del Docente */}
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}>{fulltime.profesor_fulltime.nombre_docente.nombre_completo}</td>
                                
                                {/*HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - PTC*/}
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}>{fulltime.horas_sustantivas_atencion_alumnos_fulltime.ptc}</td>

                                {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Horas frente al grupo */}
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}>{fulltime.horas_sustantivas_atencion_alumnos_fulltime.horas_frente_grupo}</td>
                                
                                {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Academias - Presidente */}
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}>{fulltime.horas_sustantivas_atencion_alumnos_fulltime.academias.presidente}</td>

                                {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Academias -Secretario */}
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}>{fulltime.horas_sustantivas_atencion_alumnos_fulltime.academias.secretario}</td>
                               
                            
                                
                                {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Asesorias - Residencia Profesional */}
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}>{fulltime.horas_sustantivas_atencion_alumnos_fulltime.asesorias.residencias_profesionales}</td>
                                
                                {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Asesorias - Educación Dual */}
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}>{fulltime.horas_sustantivas_atencion_alumnos_fulltime.asesorias.educacion_dual}</td>
                                
                                {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Asesorias - Titulación */}
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}> {fulltime.horas_sustantivas_atencion_alumnos_fulltime.asesorias.tutorias}</td>
                                
                                {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Asesorias - Asesorias Académicas */}
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}> {fulltime.horas_sustantivas_atencion_alumnos_fulltime.asesorias.asesorias_academica}</td>
                                
                                {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Asesorias - Tutorias */}
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}> {fulltime.horas_sustantivas_atencion_alumnos_fulltime.asesorias.tutorias}</td>
                                
                                {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Actividades Complementarias */}
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}>{fulltime.horas_sustantivas_atencion_alumnos_fulltime.actividades_complementarias}</td>
                                
                                {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Subtotal 1 */}
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}>{fulltime.horas_sustantivas_atencion_alumnos_fulltime.subtotal_1}</td>
                                
                                {/* HORAS NECESIDAD INSTITUCIONAL - Proyectos de Investigación */}
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}>{fulltime.horas_necesidad_institucional_fulltime.proyecto_investigacion}</td>
                                
                                {/* HORAS NECESIDAD INSTITUCIONAL - Apoyo Operativo */}
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}>{fulltime.horas_necesidad_institucional_fulltime.apoyo_operativo}</td>

                                {/* HORAS NECESIDAD INSTITUCIONAL - Subtotal 2 */}
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}>{fulltime.horas_necesidad_institucional_fulltime.subtotal_2}</td>

                                {/* TOTAL */}
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}>{fulltime.total}</td>

                                {/* OBSERVACIONES */}
                                <td colSpan="3" align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}>{fulltime.observaciones}</td>
                                
                                {/* ----------------- Table de cambios ------------------------ */}
                                {/* FECHA SOLICITUD DE MODIFICACIÓN */}
                                <td  align="center" className={`text-center table-content ${areColumns2Visible ? '' : 'collapse'
                                    }`}> {fulltime.fecha_actualizacion}	</td>
                                
                                {/* CARGAHORARIA  ANTERIOR */}
                                <td  align="center" className={`text-center table-content ${areColumns2Visible ? '' : 'collapse'
                                    }`}>  {fulltime.carga_horaria_anterior}</td>
                                
                                {/* NIVEL DE PTC ANTERIOR */}
                                <td  align="center" className={`text-center table-content ${areColumns2Visible ? '' : 'collapse'
                                    }`}>  {fulltime.nivel_ptc_anterior}	</td>
                               
                               {/* CARGA HORARIA NUEVA */}
                                <td  align="center" className={`text-center table-content ${areColumns2Visible ? '' : 'collapse'
                                    }`}>  {fulltime.carga_horaria_nueva} </td>
                               
                               {/* NIVEL DE PTC NUEVO */}
                                <td  align="center" className={`text-center table-content ${areColumns2Visible ? '' : 'collapse'
                                    }`}>  {fulltime.nivel_ptc_nuevo}		</td>
                               
                               {/* LA MODIFICACIÓN SE APLICA A PARTIR DE (FECHA): */}
                               <td  align="center" className={`text-center table-content ${areColumns2Visible ? '' : 'collapse'
                                    }`}> -	</td>
                                
                                {/* NO. OFICIO RESPUESTA */}
                                <td  align="center" className={`text-center table-content ${areColumns2Visible ? '' : 'collapse'
                                    }`}>  -	</td>
                                
                                {/* NO. DE OFICIO ACADEMIA */}
                                <td  align="center" className={`text-center table-content ${areColumns2Visible ? '' : 'collapse'
                                    }`}>  -	</td>

                                {/* FECHA EN QUE RH APLICA EN EL SISTEMA */}                            
                                <td  align="center" className={`text-center table-content ${areColumns2Visible ? '' : 'collapse'
                                    }`}>  -	</td>
                               
                               {/* OBSERVACIONES */}
                                <td  align="center" className={`text-center table-content ${areColumns2Visible ? '' : 'collapse'
                                    }`}>  {fulltime.observacion_modificacion}	</td>
                                     <td align="center" className={`text-center table-content ${areColumns2Visible ||areColumnsVisible ? '' : 'collapse'
                                    }`}>    <button onClick={() => this.updateProyeccionFulltime(fulltime.id)} className="btn btn-warning">Modificar</button>
                                    <button style={boton} onClick={() => this.toggleModal(fulltime.id)} className="btn btn-danger">Eliminar</button>
                                    <button onClick={() => this.viewProyeccionFulltime(fulltime.id)} className="btn btn-info">Ver</button>	</td>
                            </tr>
                           )
                        }  

                            <tr>
                                <td  className={`text-center table-id ${areColumns2Visible ||areColumnsVisible ? '' : 'collapse'
                                    }`}></td>
                                <td scope="row"  align="center"  className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}></td>
                                
                                {/* PROFESORES FULLTIME - Clave de Programa Educativo */}
                                <td  align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}>  </td>
                                
                                {/* PROFESORES FULLTIME- Código de Nómina */}
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}></td>
                                
                                {/* PROFESORES DE FULLTIME - Grado Académico */}
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}></td>

                                {/* PROFESORES DE FULLTIME - Nombre del Docente */}
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}></td>
                                
                                {/*HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - PTC*/}
                                <td   align="center" className={`text-center table-content table-grey ${areColumnsVisible ? '' : 'collapse'
                                    }`}><b>TOTALES</b></td>

                                {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Horas frente al grupo */}
                                <td   align="center" className={`text-center table-content table-grey ${areColumnsVisible ? '' : 'collapse'
                                    }`}><b>{Horas_frente_al_grupo}</b></td>
                                
                                {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Academias - Presidente */}
                                <td   align="center" className={`text-center table-content  table-grey ${areColumnsVisible ? '' : 'collapse'
                                    }`}><b>{Presidente}</b></td>

                                {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Academias -Secretario */}
                                <td   align="center" className={`text-center table-content  table-grey ${areColumnsVisible ? '' : 'collapse'
                                    }`}><b>{Secretario}</b></td>
                               
                            
                                
                                {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Asesorias - Residencia Profesional */}
                                <td   align="center" className={`text-center table-content table-grey ${areColumnsVisible ? '' : 'collapse'
                                    }`}><b>{Residencia_Profesional}</b></td>
                                
                                {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Asesorias - Educación Dual */}
                                <td   align="center" className={`text-center table-content table-grey ${areColumnsVisible ? '' : 'collapse'
                                    }`}><b>{Educacion_Dual}</b></td>
                                
                                {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Asesorias - Titulación */}
                                <td   align="center" className={`text-center table-content table-grey ${areColumnsVisible ? '' : 'collapse'
                                    }`}><b>{Titulacion}</b> </td>
                                
                                {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Asesorias - Asesorias Académicas */}
                                <td   align="center" className={`text-center table-content table-grey ${areColumnsVisible ? '' : 'collapse'
                                    }`}> <b>{Tutorias}</b></td>
                                
                                {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Asesorias - Tutorias */}
                                <td   align="center" className={`text-center table-content table-grey ${areColumnsVisible ? '' : 'collapse'
                                    }`}>  <b>{Tutorias}</b></td>
                                
                                {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Actividades Complementarias */}
                                <td   align="center" className={`text-center table-content table-grey ${areColumnsVisible ? '' : 'collapse'
                                    }`}><b>{Actividades_Complementarias}</b></td>
                                
                                {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Subtotal 1 */}
                                <td   align="center" className={`text-center table-content table-grey ${areColumnsVisible ? '' : 'collapse'
                                    }`}><b>{Subtotal_1}</b></td>
                                
                                {/* HORAS NECESIDAD INSTITUCIONAL - Proyectos de Investigación */}
                                <td   align="center" className={`text-center table-content table-grey ${areColumnsVisible ? '' : 'collapse'
                                    }`}>{Investigacion}</td>
                                
                                {/* HORAS NECESIDAD INSTITUCIONAL - Apoyo Operativo */}
                                <td   align="center" className={`text-center table-content table-grey ${areColumnsVisible ? '' : 'collapse'
                                    }`}><b>{Apoyo_Operativo}</b></td>

                                {/* HORAS NECESIDAD INSTITUCIONAL - Subtotal 2 */}
                                <td   align="center" className={`text-center table-content table-grey ${areColumnsVisible ? '' : 'collapse'
                                    }`}><b>{Subtotal_2}</b></td>

                                {/* TOTAL */}
                                <td   align="center" className={`text-center table-content table-grey ${areColumnsVisible ? '' : 'collapse'
                                    }`}><b>{TOTAL}</b></td>

                                {/* OBSERVACIONES */}
                                <td colSpan="3" align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}></td>
                                
                                {/* ----------------- Table de cambios ------------------------ */}
                                {/* FECHA SOLICITUD DE MODIFICACIÓN */}
                                <td  align="center" className={`text-center table-content ${areColumns2Visible ? '' : 'collapse'
                                    }`}> 	</td>
                                
                                {/* CARGAHORARIA  ANTERIOR */}
                                <td  align="center" className={`text-center table-content ${areColumns2Visible ? '' : 'collapse'
                                    }`}>  </td>
                                
                                {/* NIVEL DE PTC ANTERIOR */}
                                <td  align="center" className={`text-center table-content ${areColumns2Visible ? '' : 'collapse'
                                    }`}>  	</td>
                               
                               {/* CARGA HORARIA NUEVA */}
                                <td  align="center" className={`text-center table-content ${areColumns2Visible ? '' : 'collapse'
                                    }`}>  </td>
                               
                               {/* NIVEL DE PTC NUEVO */}
                                <td  align="center" className={`text-center table-content ${areColumns2Visible ? '' : 'collapse'
                                    }`}>  		</td>
                               
                               {/* LA MODIFICACIÓN SE APLICA A PARTIR DE (FECHA): */}
                               <td  align="center" className={`text-center table-content ${areColumns2Visible ? '' : 'collapse'
                                    }`}> -	</td>
                                
                                {/* NO. OFICIO RESPUESTA */}
                                <td  align="center" className={`text-center table-content ${areColumns2Visible ? '' : 'collapse'
                                    }`}>  -	</td>
                                
                                {/* NO. DE OFICIO ACADEMIA */}
                                <td  align="center" className={`text-center table-content ${areColumns2Visible ? '' : 'collapse'
                                    }`}>  -	</td>

                                {/* FECHA EN QUE RH APLICA EN EL SISTEMA */}                            
                                <td  align="center" className={`text-center table-content ${areColumns2Visible ? '' : 'collapse'
                                    }`}>  -	</td>
                               
                               {/* OBSERVACIONES */}
                                <td  align="center" className={`text-center table-content ${areColumns2Visible ? '' : 'collapse'
                                    }`}> 	</td>
                                     <td align="center" className={`text-center table-content ${areColumns2Visible ||areColumnsVisible ? '' : 'collapse'
                                    }`}>   
                                </td>
                            </tr>
                        </tbody>
                        
                    </table>
                </div>

                <Modal isOpen={this.state.isModalOpen} toggle={this.closeModal}>
                    <ModalHeader>Confirmar Eliminación</ModalHeader>
                    <ModalBody>
                        ¿Estás seguro de que deseas eliminar esta proyección?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={() => this.deleteProyeccionFulltime(this.state.asignaturaToDeleteId)}>Eliminar</Button>
                        <Button color="secondary" onClick={this.closeModal}>Cancelar</Button>
                    </ModalFooter>
                </Modal>

            </div>


        );
    }
}

export default ListProyeccionFullTimeComponent;