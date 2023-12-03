import React, { Component } from 'react';
import AsignaturaProyeccionService from '../../../services/Proyecciones/AsignaturaProyeccionService';
import '../../StyleGlobal/Style.css';
import * as XLSX from 'xlsx';  // Importa la librería XLSX
import FolioAsignaturaService from '../../../services/Proyecciones/FolioAsignaturaService';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class ListProyeccionAsignaturaComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id, // id_folio

            areColumnsVisible: true, // Estado inicial para controlar la visibilidad de las columnas
            areColumns2Visible: true,

            unidad: '',

            asignaturas: [],
            isModalOpen: false,
            docenteToDeleteId: null, 
        };

        this.viewProyeccionAsignatura = this.viewProyeccionAsignatura.bind(this);
        this.addAsignatura = this.addAsignatura.bind(this);
        this.exportToExcel = this.exportToExcel.bind(this);  // Método para exportar a Excel
        this.updateProyeccionAsignatura = this.updateProyeccionAsignatura.bind(this);
    }

    componentDidMount() {
        AsignaturaProyeccionService.getAllProyeccionesAsignaturaByFolio(this.state.id).then(res =>
            this.setState({ asignaturas: res.data }))
            .catch(() => {
                alert("Error al traer las proyecciones de asignatura por folio...");
                this.props.history.push('/');
            });

            this.getUnidadFromFolioId();
    }

    async getUnidadFromFolioId() {
        await FolioAsignaturaService.getFolioById(this.state.id).then(res => {
            const data = res.data;
            
            this.setState({ unidad: data.unidad_academica.nombre_completo})
        }).catch(() => {
            alert("Error al intentar traer las UAs...");
            this.props.history.push('/');
        });
    }

    updateProyeccionAsignatura(id) {
        this.props.history.push(`/update-proyeccion_asignatura/${id}`);
    }

    deleteAsignaturaById(id) {
        AsignaturaProyeccionService.deleteProyeccionById(id).then(() => {
            this.setState({
                asignaturas: this.state.asignaturas.filter(asignatura => asignatura.id !== id),
                isModalOpen: false,
                asignaturaToDeleteId: null,
            })
        }).catch(() => {
            alert("Error al intentar eliminar la proyeccion?...");
            this.props.history.push('/');
        });
    }
    viewProyeccionAsignatura(id) {
        this.props.history.push(`/view-proyeccion_asignatura/${id}`);
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

    addAsignatura() {
        this.props.history.push(`/add-proyeccion_asignatura/${this.state.id}`);
    }

    exportToExcel() {
        const { asignaturas } = this.state; // Reemplaza con los datos reales

        // Combina los datos de asignaturas en una sola estructura
        const datosCombinados = asignaturas.map((asignatura) => ({
            "No. Folio": asignatura.folio.folio,
            "Clave de Programa Educativo": asignatura.profe_asignatura.clave_programa.carrera_nombre.clave_programa,
            "Código de Nómina": asignatura.profe_asignatura.nombre_docente.codigo_nomina,
            "Grado Académico": asignatura.profe_asignatura.grado_academico,
            "Nombre del Docente": asignatura.profe_asignatura.nombre_docente.nombre_completo,
            "No. de Folio": asignatura.folio.folio,
            "Clave de Programa Educativo": asignatura.profe_asignatura.clave_programa.carrera_nombre.clave_programa,
            "Código de Nómina": asignatura.profe_asignatura.nombre_docente.codigo_nomina,
            "Grado Académico": asignatura.profe_asignatura.grado_academico,
            "Nombre del Docente": asignatura.profe_asignatura.nombre_docente.nombre_completo,
            "Hora de asignatura (A)": asignatura.horas_sustantivas_atencion_alumnos.horas_asignatura.a,
            "Hora de asignatura (B)": asignatura.horas_sustantivas_atencion_alumnos.horas_asignatura.b,
            "Horas frente al grupo": asignatura.horas_sustantivas_atencion_alumnos.horas_frente_grupo,
            "Academias - Presidente": asignatura.horas_sustantivas_atencion_alumnos.academias.presidente,
            "Academias - Secretario": asignatura.horas_sustantivas_atencion_alumnos.academias.secretario,
            "Asesorías - Residencia Profesional": asignatura.horas_sustantivas_atencion_alumnos.asesorias.residencias_profesionales,
            "Asesorías - Educación Dual": asignatura.horas_sustantivas_atencion_alumnos.asesorias.educacion_dual,
            "Asesorías - Titulación": asignatura.horas_sustantivas_atencion_alumnos.asesorias.titulacion,
            "Asesorías Académicas": asignatura.horas_sustantivas_atencion_alumnos.asesorias.asesorias_academica,
            "Tutorías": asignatura.horas_sustantivas_atencion_alumnos.asesorias.tutorias,
            "Actividades Complementarias": asignatura.horas_sustantivas_atencion_alumnos.actividades_complementarias,
            "Subtotal 1": asignatura.horas_sustantivas_atencion_alumnos.subtotal_1,
            "Investigación Educativa, Desarrollo Tecnológico": asignatura.horas_necesidad_institucional.invesigacion_educativa,
            "Apoyo Operativo": asignatura.horas_necesidad_institucional.apoyo_operativo,
            "Subtotal 2": asignatura.horas_necesidad_institucional.subtotal_2,
            "Total": asignatura.total,
            "Observaciones": asignatura.observaciones,
            "Fecha Solicitud de Modificación": asignatura.fecha_actualizacion,
            "Carga Horaria Anterior": asignatura.carga_horaria_anterior,
            "Categoría de Horas de Asignatura Anterior": asignatura.categoria_horas_asignatura_anterior,
            "Carga Horaria Nueva": asignatura.carga_horaria_nueva,
            "Tipo de Horas de Asignatura Nueva": asignatura.categoria_tipo_horas_asignatura_nueva,
            "La Modificación Se Aplica A Partir de (Fecha)": asignatura.modifica_aplica_en,
            "No. Oficio Respuesta": asignatura.oficio_respuesta,
            "No. de Oficio Academia": asignatura.oficio_academia,
            "Fecha en que RH Aplica en el Sistema": asignatura.fecha_rh_aplica_sistema,
            "Observaciones Modificación": asignatura.observaciones_modificacion,
            // Agrega más campos según sea necesario
        }));
        // Crea una nueva hoja de Excel
        const ws = XLSX.utils.json_to_sheet(datosCombinados);

        // Establece el ancho de las columnas
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
            { wch: 30 },
            { wch: 30 },
            { wch: 30 },
            { wch: 30 },
            { wch: 30 },
            { wch: 30 },
            { wch: 30 },
            { wch: 30 },
            { wch: 30 },
            { wch: 30 },
            { wch: 30 },
            { wch: 30 },
            // Agrega más anchos de columna según sea necesario
        ];
        ws['!cols'] = colWidths;

        // Crea un nuevo libro de trabajo
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Asignaturas');  // Cambia el nombre de la hoja si lo deseas

        // Genera el archivo XLSX
        XLSX.writeFile(wb, 'asignaturas.xlsx');  // Cambia el nombre del archivo de salida si lo deseas
    }

    // Método para abrir el modal
    toggleModal = (id_asignatura) => {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
            docenteToDeleteId: id_asignatura, // Establece el ID de la colegiatura a eliminar
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
        const { areColumnsVisible } = this.state;
        const { areColumns2Visible } = this.state;
        const boton = {
            marginLeft: '1rem',
            marginRight: '1rem'
        }
        let A = 0;
        let B = 0;
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
        
        this.state.asignaturas.map((asignatura) => {
            A+= asignatura.horas_sustantivas_atencion_alumnos.horas_asignatura.a;
            B += asignatura.horas_sustantivas_atencion_alumnos.horas_asignatura.b;
            Horas_frente_al_grupo += asignatura.horas_sustantivas_atencion_alumnos.horas_frente_grupo;
            Presidente += asignatura.horas_sustantivas_atencion_alumnos.academias.presidente;
            Secretario += asignatura.horas_sustantivas_atencion_alumnos.academias.secretario;
            Residencia_Profesional += asignatura.horas_sustantivas_atencion_alumnos.asesorias.residencias_profesionales;
            Educacion_Dual += asignatura.horas_sustantivas_atencion_alumnos.asesorias.educacion_dual;
            Titulacion += asignatura.horas_sustantivas_atencion_alumnos.asesorias.titulacion;
            Asesorias_Academicas += asignatura.horas_sustantivas_atencion_alumnos.asesorias.asesorias_academica;
            Actividades_Complementarias += asignatura.horas_sustantivas_atencion_alumnos.actividades_complementarias;
            Tutorias += asignatura.horas_sustantivas_atencion_alumnos.asesorias.tutorias;
            Subtotal_1 += asignatura.horas_sustantivas_atencion_alumnos.subtotal_1;
            Investigacion += asignatura.horas_necesidad_institucional.invesigacion_educativa;
            Apoyo_Operativo += asignatura.horas_necesidad_institucional.apoyo_operativo;
            Subtotal_2 += asignatura.horas_necesidad_institucional.subtotal_2;
            TOTAL += asignatura.total;
        });
        

        return (
            <div className='container'>
                <h2 className="text-center mt-5 mb-5 Title">PROYECCIONES POR ASIGNATURA</h2>
                <div className="row">
                    <div className="col">
                        <button onClick={this.addAsignatura} style={{ marginRight: '2%' }} className="btn btn-outline-dark mb-4" >Agregar proyección</button>
                        <button onClick={this.toggleColumns} style={{ marginRight: '2%' }} className="btn btn-success mb-4" >Comprimir Actual</button>
                        <button onClick={this.toggleColumn2s} style={{ marginRight: '27.8%' }} className="btn btn-primary mb-4" >Comprimir Anterior</button>
                        <button className="btn btn-outline-success mb-4" onClick={this.exportToExcel}>Exportar a Excel</button> {/* Botón de exportar a Excel */}
                       {/* <button className="btn btn-outline-info mb-4" onClick={this.exportToPDF}>Exportar a PDF</button> {/* Botón de exportar a Excel */}
                       </div>

                </div>
                <div>

                </div>
                <div className="row" style={{ overflowX: 'auto', boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>

                                <th className='Title-Table' colSpan="36">UNIDAD ACADÉMICA: {this.state.unidad}</th>
                            </tr>
                            <tr>
                                <th rowSpan="3" className={`text-center table-id ${areColumns2Visible || areColumnsVisible ? '' : 'collapse'
                                    }`}></th>
                                <th className={`text-center text-white table-green  ${areColumnsVisible ? '' : 'collapse'
                                    }`} colSpan="5">PROFESORES DE ASIGNATURA</th>
                                <th className={`text-center text-white table-green  ${areColumnsVisible ? '' : 'collapse'
                                    }`} colSpan="12">HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS</th>
                                <th className={`text-center text-white table-green  ${areColumnsVisible ? '' : 'collapse'
                                    }`} colSpan="3">HORAS NECESIDAD INSTITUCIONAL</th>
                                <th className={`text-center text-white table-green  ${areColumnsVisible ? '' : 'collapse'
                                    }`} rowspan="3">TOTAL</th>
                                <th className={`text-center text-white table-green  ${areColumnsVisible ? '' : 'collapse'
                                    }`} rowspan="3" colSpan="3">OBSERVACIONES</th>
                                <th className={`text-center text-white table-blue  ${areColumns2Visible ? '' : 'collapse'
                                    }`} colSpan="10">DATOS PARA MODIFICACIÓN</th>
                                <th rowSpan="3" className={`text-center  table-acciones  ${areColumns2Visible || areColumnsVisible ? '' : 'collapse'
                                    }`}> ACCIONES</th>
                            </tr>
                            <tr>
                                <th className={`text-center text-white table-green  ${areColumnsVisible ? '' : 'collapse'
                                    }`} rowspan="2">No. Folio</th>
                                <th rowspan="2" className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`}>Clave de Programa  Educativo</th>
                                <th rowspan="2" className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`}>Código de  Nómina</th>
                                <th rowspan="2" className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`}>Grado Académico</th>
                                <th rowspan="2" className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`}>Nombre del Docente</th>
                                <th className={`text-center text-white table-green   ${areColumnsVisible ? '' : 'collapse'
                                    }`} colSpan="2">Hora de asignatura</th>
                                <th className={`text-center text-white table-green   ${areColumnsVisible ? '' : 'collapse'
                                    }`} rowspan="2">Horas frente al grupo</th>
                                <th className={`text-center text-white table-green   ${areColumnsVisible ? '' : 'collapse'
                                    }`} colSpan="2">Academias</th>
                                <th className={`text-center text-white table-green   ${areColumnsVisible ? '' : 'collapse'
                                    }`} colSpan="5">Asesorías</th>
                                <th className={`text-center text-white table-green   ${areColumnsVisible ? '' : 'collapse'
                                    }`} rowspan="2">Actividades Complementarias</th>
                                <th className={`text-center text-white table-green   ${areColumnsVisible ? '' : 'collapse'
                                    }`} rowspan="2">Subtotal 1</th>
                                <th className={`text-center text-white table-green   ${areColumnsVisible ? '' : 'collapse'
                                    }`} rowspan="2">Investigación educativa, desarrrollo tecnológico</th>
                                <th className={`text-center text-white table-green   ${areColumnsVisible ? '' : 'collapse'
                                    }`} rowspan="2">Apoyo Operativo</th>
                                <th className={`text-center text-white table-green   ${areColumnsVisible ? '' : 'collapse'
                                    }`} rowspan="2">Subtotal 2</th>
                                <th rowspan="2" className={`text-center text-white table-blue ${areColumns2Visible ? '' : 'collapse'
                                    }`}>FECHA SOLICITUD DE MODIFICACIÓN</th>
                                <th rowspan="2" className={`text-center text-white table-blue ${areColumns2Visible ? '' : 'collapse'
                                    }`}>CARGA HORARIA ANTERIOR</th>
                                <th rowspan="2" className={`text-center text-white table-blue ${areColumns2Visible ? '' : 'collapse'
                                    }`}>CATEGORIA DE HORAS DE ASIGNATRURA ANTERIOR</th>
                                <th rowspan="2" className={`text-center text-white table-blue ${areColumns2Visible ? '' : 'collapse'
                                    }`}>CARGA HORARIA NUEVA</th>
                                <th rowspan="2" className={`text-center text-white table-blue ${areColumns2Visible ? '' : 'collapse'
                                    }`}>TIPO DE HORAS DE ASIGNATRURA NUEVA</th>
                                <th rowspan="2" className={`text-center text-white table-blue ${areColumns2Visible ? '' : 'collapse'
                                    }`}>LA MODIFICACIÓN SE APLICA A PARTIR DE (FECHA):</th>
                                <th rowspan="2" className={`text-center text-white table-blue ${areColumns2Visible ? '' : 'collapse'
                                    }`}>NO. OFICIO RESPUESTA</th>
                                <th rowspan="2" className={`text-center text-white table-blue ${areColumns2Visible ? '' : 'collapse'
                                    }`}>NO. DE OFICIO ACADEMIA</th>
                                <th rowspan="2" className={`text-center text-white table-blue   ${areColumns2Visible ? '' : 'collapse'
                                    }`}>FECHA EN QUE RH APLICA  EN EL SISTEMA</th>
                                <th rowspan="2" className={`text-center text-white table-blue   ${areColumns2Visible ? '' : 'collapse'
                                    }`}>OBSERVACIONES</th>

                            </tr>
                            <tr>
                                <th colSpan="1" className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`} >A</th>
                                <th colSpan="1" className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`} >B</th>
                                <th className={`text-center text-white table-green   ${areColumnsVisible ? '' : 'collapse'
                                    }`} >Presidente</th>
                                <th className={`text-center text-white table-green   ${areColumnsVisible ? '' : 'collapse'
                                    }`} >Secretario</th>
                                <th className={`text-center text-white table-green   ${areColumnsVisible ? '' : 'collapse'
                                    }`} >Residencia Profesional</th>
                                <th className={`text-center text-white table-green   ${areColumnsVisible ? '' : 'collapse'
                                    }`} >Educación Dual</th>
                                <th className={`text-center text-white table-green   ${areColumnsVisible ? '' : 'collapse'
                                    }`} >Titulación</th>
                                <th className={`text-center text-white table-green   ${areColumnsVisible ? '' : 'collapse'
                                    }`} >Asesorias Académicas</th>
                                <th className={`text-center text-white table-green   ${areColumnsVisible ? '' : 'collapse'
                                    }`} >Tutorias</th>
                            </tr>
                        </thead>
                        <tbody className={2 === 0 ? 'even-row' : 'odd-row'}>
                            {
                                this.state.asignaturas.map((asignatura, index) => 
                                    <tr key={asignatura.id}>
                                        {/* ---------------------- Tabla de proyeccion profesor por asignatura ------------------- */}
                                        <td className={`text-center table-id ${areColumns2Visible || areColumnsVisible ? '' : 'collapse'
                                            }`}>{index + 1}</td>
                                        <td align="center" className={`text-center table-content  ${areColumnsVisible ? '' : 'collapse'
                                            }`}>{asignatura.folio.folio}</td>

                                        {/* PROFESORES DE ASIGNATURA - Clave de Programa Educativo */}
                                        <td align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                            }`}>{asignatura.profe_asignatura.clave_programa.carrera_nombre.clave_programa}</td>

                                        {/* PROFESORES DE ASIGNATURA - Código de Nómina */}
                                        <td align="center" className={`text-center table-content  ${areColumnsVisible ? '' : 'collapse'
                                            }`}>{asignatura.profe_asignatura.nombre_docente.codigo_nomina}</td>

                                        {/* PROFESORES DE ASIGNATURA - Grado Académico */}
                                        <td align="center" className={`text-center table-content  ${areColumnsVisible ? '' : 'collapse'
                                            }`}>{asignatura.profe_asignatura.grado_academico}</td>

                                        {/* PROFESORES DE ASIGNATURA - Nombre del Docente */}
                                        <td align="center" className={`text-center table-content  ${areColumnsVisible ? '' : 'collapse'
                                            }`}>{asignatura.profe_asignatura.nombre_docente.nombre_completo}</td>

                                        {/*HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Hora de asignatura - A */}
                                        <td align="center" className={`text-center table-content  ${areColumnsVisible ? '' : 'collapse'
                                            }`}>{asignatura.horas_sustantivas_atencion_alumnos.horas_asignatura.a}</td>

                                        {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - B */}
                                        <td align="center" className={`text-center table-content  ${areColumnsVisible ? '' : 'collapse'
                                            }`}>{asignatura.horas_sustantivas_atencion_alumnos.horas_asignatura.b}</td>

                                        {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Horas frente al grupo */}
                                        <td align="center" className={`text-center table-content  ${areColumnsVisible ? '' : 'collapse'
                                            }`}>{asignatura.horas_sustantivas_atencion_alumnos.horas_frente_grupo}</td>


                                        {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Academias - Presidente */}
                                        <td align="center" className={`text-center table-content  ${areColumnsVisible ? '' : 'collapse'
                                            }`}>{asignatura.horas_sustantivas_atencion_alumnos.academias.presidente}</td>

                                        {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Academias -Secretario */}
                                        <td align="center" className={`text-center table-content  ${areColumnsVisible ? '' : 'collapse'
                                            }`}>{asignatura.horas_sustantivas_atencion_alumnos.academias.secretario}</td>

                                        {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Asesorias - Residencia Profesional */}
                                        <td align="center" className={`text-center table-content  ${areColumnsVisible ? '' : 'collapse'
                                            }`}>{asignatura.horas_sustantivas_atencion_alumnos.asesorias.residencias_profesionales}</td>

                                        {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Asesorias - Educación Dual */}
                                        <td align="center" className={`text-center table-content  ${areColumnsVisible ? '' : 'collapse'
                                            }`}>{asignatura.horas_sustantivas_atencion_alumnos.asesorias.educacion_dual}</td>

                                        {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Asesorias - Titulación */}
                                        <td align="center" className={`text-center table-content  ${areColumnsVisible ? '' : 'collapse'
                                            }`}>{asignatura.horas_sustantivas_atencion_alumnos.asesorias.titulacion}</td>

                                        {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Asesorias - Asesorias Académicas */}
                                        <td align="center" className={`text-center table-content  ${areColumnsVisible ? '' : 'collapse'
                                            }`}>{asignatura.horas_sustantivas_atencion_alumnos.asesorias.asesorias_academica}</td>

                                        {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Asesorias - Tutorias */}
                                        <td align="center" className={`text-center table-content  ${areColumnsVisible ? '' : 'collapse'
                                            }`}>{asignatura.horas_sustantivas_atencion_alumnos.asesorias.tutorias}</td>

                                        {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Actividades Complementarias */}
                                        <td align="center" className={`text-center table-content  ${areColumnsVisible ? '' : 'collapse'
                                            }`}>{asignatura.horas_sustantivas_atencion_alumnos.actividades_complementarias}</td>

                                        {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Subtotal 1 */}
                                        <td align="center" className={`text-center table-content  ${areColumnsVisible ? '' : 'collapse'
                                            }`}>{asignatura.horas_sustantivas_atencion_alumnos.subtotal_1}</td>

                                        {/* HORAS NECESIDAD INSTITUCIONAL - Investigacion educativa, desarrrollo tecnológico */}
                                        <td align="center" className={`text-center table-content  ${areColumnsVisible ? '' : 'collapse'
                                            }`}>{asignatura.horas_necesidad_institucional.invesigacion_educativa}</td>

                                        {/* HORAS NECESIDAD INSTITUCIONAL - Apoyo Operativo */}
                                        <td align="center" className={`text-center table-content  ${areColumnsVisible ? '' : 'collapse'
                                            }`}>{asignatura.horas_necesidad_institucional.apoyo_operativo}</td>

                                        {/* HORAS NECESIDAD INSTITUCIONAL - Subtotal 2 */}
                                        <td align="center" className={`text-center table-content  ${areColumnsVisible ? '' : 'collapse'
                                            }`}>{asignatura.horas_necesidad_institucional.subtotal_2}</td>

                                        {/* TOTAL */}
                                        <td align="center" className={`text-center table-content  ${areColumnsVisible ? '' : 'collapse'
                                            }`}>{asignatura.total}</td>

                                        {/* OBSERVACIONES */}
                                        <td colSpan="3" align="center" className={`text-center table-content  ${areColumnsVisible ? '' : 'collapse'
                                            }`}>{asignatura.observaciones}</td>

                                        {/* ----------------- Table de cambios ------------------------ */}
                                        {/* FECHA SOLICITUD DE MODIFICACIÓN */}
                                        <td align="center" className={`text-center table-content  ${areColumns2Visible ? '' : 'collapse'
                                            }`}>{asignatura.fecha_actualizacion}</td>

                                        {/* CARGAHORARIA  ANTERIOR */}
                                        <td align="center" className={`text-center table-content  ${areColumns2Visible ? '' : 'collapse'
                                            }`} >{asignatura.carga_horaria_anterior}</td>

                                        {/* CATEGORIA DE HORAS DE ASIGNATRURA ANTERIOR */}
                                        <td align="center" className={`text-center table-content  ${areColumns2Visible ? '' : 'collapse'
                                            }`} >{asignatura.categoria_horas_asignatura_anterior}</td>

                                        {/* CARGA HORARIA NUEVA */}
                                        <td align="center" className={`text-center table-content  ${areColumns2Visible ? '' : 'collapse'
                                            }`} >{asignatura.carga_horaria_nueva}</td>

                                        {/* TIPO DE HORAS DE ASIGNATRURA NUEVA */}
                                        <td align="center" className={`text-center table-content  ${areColumns2Visible ? '' : 'collapse'
                                            }`} >{asignatura.categoria_tipo_horas_asignatura_nueva}</td>

                                        {/* LA MODIFICACIÓN SE APLICA A PARTIR DE (FECHA): */}
                                        <td align="center" className={`text-center table-content  ${areColumns2Visible ? '' : 'collapse'
                                            }`} >{asignatura.modifica_aplica_en}-</td>

                                        {/* NO. OFICIO RESPUESTA */}
                                        <td align="center" className={`text-center table-content  ${areColumns2Visible ? '' : 'collapse'
                                            }`} >{asignatura.oficio_respuesta}-</td>

                                        {/* NO. DE OFICIO ACADEMIA */}
                                        <td align="center" className={`text-center table-content  ${areColumns2Visible ? '' : 'collapse'
                                            }`} >{asignatura.oficio_academia}-</td>

                                        {/* FECHA EN QUE RH APLICA EN EL SISTEMA */}
                                        <td align="center" className={`text-center table-content  ${areColumns2Visible ? '' : 'collapse'
                                            }`} >{asignatura.fecha_rh_aplica_sistema}-</td>

                                        {/* OBSERVACIONES */}
                                        <td align="center" className={`text-center table-content  ${areColumns2Visible ? '' : 'collapse'
                                            }`} >{asignatura.observaciones_modificacion}</td>
                                        <td align="center" className={`text-center table-content ${areColumns2Visible || areColumnsVisible ? '' : 'collapse'
                                            }`}>
                                            <button onClick={() => this.updateProyeccionAsignatura(asignatura.id)} className="btn btn-warning mt-0">Modificar</button>
                                            <button style={boton} onClick={() => this.toggleModal(asignatura.id)} className="btn btn-danger mt-0">Eliminar</button>
                                            <button onClick={() => this.viewProyeccionAsignatura(asignatura.id)} className="btn btn-info mt-0">Ver</button>
                                        </td>

                                    </tr>
                                )
                            }
                                    <tr>
                                            {/* ---------------------- Totales de proyeccion profesor por asignatura ------------------- */}
                                            <td className={`text-center table-id${areColumns2Visible || areColumnsVisible ? '' : 'collapse'
                                                }`}>{}</td>
                                            <td align="center" className={`text-center table-content${areColumnsVisible ? '' : 'collapse'
                                                }`}></td>

                                            {/* PROFESORES DE ASIGNATURA - Clave de Programa Educativo */}
                                            <td align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                                }`}></td>

                                            {/* PROFESORES DE ASIGNATURA - Código de Nómina */}
                                            <td align="center" className={`text-center table-content  ${areColumnsVisible ? '' : 'collapse'
                                                }`}></td>

                                            {/* PROFESORES DE ASIGNATURA - Grado Académico */}
                                            <td align="center" className={`text-center table-content  ${areColumnsVisible ? '' : 'collapse'
                                                }`}></td>

                                            {/* PROFESORES DE ASIGNATURA - Nombre del Docente */}
                                            <td align="center" className={`text-center table-content table-grey ${areColumnsVisible ? '' : 'collapse'
                                                }`}><b>TOTALES</b></td>

                                            {/*HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Hora de asignatura - A */}
                                            <td align="center" className={`text-center table-content table-grey ${areColumnsVisible ? '' : 'collapse'
                                                }`}><b>{A}</b></td>

                                            {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - B */}
                                            <td align="center" className={`text-center table-content table-grey ${areColumnsVisible ? '' : 'collapse'
                                                }`}><b>{B}</b></td>

                                            {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Horas frente al grupo */}
                                            <td align="center" className={`text-center table-content  table-grey ${areColumnsVisible ? '' : 'collapse'
                                                }`}><b>{Horas_frente_al_grupo}</b></td>


                                            {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Academias - Presidente */}
                                            <td align="center" className={`text-center table-content  table-grey ${areColumnsVisible ? '' : 'collapse'
                                                }`}><b>{Presidente}</b></td>

                                            {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Academias -Secretario */}
                                            <td align="center" className={`text-center table-content  table-grey ${areColumnsVisible ? '' : 'collapse'
                                                }`}><b>{Secretario}</b></td>

                                            {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Asesorias - Residencia Profesional */}
                                            <td align="center" className={`text-center table-content table-grey ${areColumnsVisible ? '' : 'collapse'
                                                }`}><b>{Residencia_Profesional}</b></td>

                                            {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Asesorias - Educación Dual */}
                                            <td align="center" className={`text-center table-content table-grey  ${areColumnsVisible ? '' : 'collapse'
                                                }`}><b>{Educacion_Dual}</b></td>

                                            {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Asesorias - Titulación */}
                                            <td align="center" className={`text-center table-content  table-grey ${areColumnsVisible ? '' : 'collapse'
                                                }`}><b>{Titulacion}</b></td>

                                            {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Asesorias - Asesorias Académicas */}
                                            <td align="center" className={`text-center table-content table-grey ${areColumnsVisible ? '' : 'collapse'
                                                }`}><b>{Asesorias_Academicas}</b></td>

                                            {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Asesorias - Tutorias */}
                                            <td align="center" className={`text-center table-content  table-grey ${areColumnsVisible ? '' : 'collapse'
                                                }`}><b>{Tutorias}</b></td>

                                            {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Actividades Complementarias */}
                                            <td align="center" className={`text-center table-content  table-grey ${areColumnsVisible ? '' : 'collapse'
                                                }`}><b>{Actividades_Complementarias}</b></td>

                                            {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Subtotal 1 */}
                                            <td align="center" className={`text-center table-content table-grey ${areColumnsVisible ? '' : 'collapse'
                                                }`}><b>{Subtotal_1}</b></td>

                                            {/* HORAS NECESIDAD INSTITUCIONAL - Investigacion educativa, desarrrollo tecnológico */}
                                            <td align="center" className={`text-center table-content table-grey ${areColumnsVisible ? '' : 'collapse'
                                                }`}><b>{Investigacion}</b></td>

                                            {/* HORAS NECESIDAD INSTITUCIONAL - Apoyo Operativo */}
                                            <td align="center" className={`text-center table-content table-grey ${areColumnsVisible ? '' : 'collapse'
                                                }`}><b>{Apoyo_Operativo}</b></td>

                                            {/* HORAS NECESIDAD INSTITUCIONAL - Subtotal 2 */}
                                            <td align="center" className={`text-center table-content table-grey ${areColumnsVisible ? '' : 'collapse'
                                                }`}><b>{Subtotal_2}</b></td>

                                            {/* TOTAL */}
                                            <td align="center" className={`text-center table-content table-grey ${areColumnsVisible ? '' : 'collapse'
                                                }`}><b>{TOTAL}</b></td>

                                            {/* OBSERVACIONES */}
                                            <td colSpan="3" align="center" className={`text-center table-content  ${areColumnsVisible ? '' : 'collapse'
                                                }`}></td>

                                            {/* ----------------- Table de cambios ------------------------ */}
                                            {/* FECHA SOLICITUD DE MODIFICACIÓN */}
                                            <td align="center" className={`text-center table-content  ${areColumns2Visible ? '' : 'collapse'
                                                }`}></td>

                                            {/* CARGAHORARIA  ANTERIOR */}
                                            <td align="center" className={`text-center table-content  ${areColumns2Visible ? '' : 'collapse'
                                                }`} ></td>

                                            {/* CATEGORIA DE HORAS DE ASIGNATRURA ANTERIOR */}
                                            <td align="center" className={`text-center table-content  ${areColumns2Visible ? '' : 'collapse'
                                                }`} ></td>

                                            {/* CARGA HORARIA NUEVA */}
                                            <td align="center" className={`text-center table-content  ${areColumns2Visible ? '' : 'collapse'
                                                }`} ></td>

                                            {/* TIPO DE HORAS DE ASIGNATRURA NUEVA */}
                                            <td align="center" className={`text-center table-content  ${areColumns2Visible ? '' : 'collapse'
                                                }`} ></td>

                                            {/* LA MODIFICACIÓN SE APLICA A PARTIR DE (FECHA): */}
                                            <td align="center" className={`text-center table-content  ${areColumns2Visible ? '' : 'collapse'
                                                }`} ></td>

                                            {/* NO. OFICIO RESPUESTA */}
                                            <td align="center" className={`text-center table-content  ${areColumns2Visible ? '' : 'collapse'
                                                }`} ></td>

                                            {/* NO. DE OFICIO ACADEMIA */}
                                            <td align="center" className={`text-center table-content  ${areColumns2Visible ? '' : 'collapse'
                                                }`} ></td>

                                            {/* FECHA EN QUE RH APLICA EN EL SISTEMA */}
                                            <td align="center" className={`text-center table-content  ${areColumns2Visible ? '' : 'collapse'
                                                }`} ></td>

                                            {/* OBSERVACIONES */}
                                            <td align="center" className={`text-center table-content  ${areColumns2Visible ? '' : 'collapse'
                                                }`} ></td>
                                            <td align="center" className={`text-center table-content ${areColumns2Visible || areColumnsVisible ? '' : 'collapse' }`}>
                                            
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
                        <Button color="danger" onClick={() => this.deleteAsignaturaById(this.state.docenteToDeleteId)}>Eliminar</Button>
                        <Button color="secondary" onClick={this.closeModal}>Cancelar</Button>
                    </ModalFooter>
                </Modal>

            </div>


        );
    }
}

export default ListProyeccionAsignaturaComponent;