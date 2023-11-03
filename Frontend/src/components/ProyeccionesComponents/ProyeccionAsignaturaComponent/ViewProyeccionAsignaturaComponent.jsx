import React, { Component } from 'react';
import AsignaturaProyeccionService from '../../../services/Proyecciones/AsignaturaProyeccionService';

class ViewProyeccionAsignaturaComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
                // profe_asignatura
                clave_programa: "",
                codigo_nomina: "",
                grado_academico: "",
                nombre_docente: "",

                // horas_sustantivas_atencion_alumnos
                    // horas_asignatura: 
                    a: 0,
                    b: 0,

                horas_frente_grupo: 0,
                    
                    // academias
                    presidente: 0,
                    secretario: 0,
                    
                    // asesorias
                    asesoria_academica: 0,
                    educacion_dual: 0,
                    residencias_profesionales: 0,
                    titulacion: 0,
                    tutorias: 0,

                actividades_complementarias: 0,
                subtotal_1: 0,

                // horas_necesidad_institucional
                invesigacion_educativa: 0,
                apoyo_operativo: 0,
                subtotal_2: 0,
            
            total: 0,
            unidad_academica: "",
            observaciones: "",
            fecha_creacion: "",
            fecha_actualizacion: "" 
        }
    }

    componentDidMount() {
        AsignaturaProyeccionService.getProyeccionesAsignaturaById(this.state.id)
        .then(res =>  {
            let asignatura = res.data;

            this.setState({
                // Asignatura
                    // profe_asignatura: 
                    clave_programa: asignatura.profe_asignatura.clave_programa,
                    codigo_nomina: asignatura.profe_asignatura.codigo_nomina,
                    grado_academico: asignatura.profe_asignatura.grado_academico,
                    nombre_docente: asignatura.profe_asignatura.nombre_docente,

                    // horas_sustantivas_atencion_alumnos
                        // horas_asignatura
                        a: asignatura.horas_sustantivas_atencion_alumnos.horas_asignatura.a,
                        b: asignatura.horas_sustantivas_atencion_alumnos.horas_asignatura.b,

                    horas_frente_grupo:asignatura.horas_sustantivas_atencion_alumnos.horas_frente_grupo,

                        // academias
                        presidente: asignatura.horas_sustantivas_atencion_alumnos.academias.presidente,
                        secretario: asignatura.horas_sustantivas_atencion_alumnos.academias.secretario,

                        // asesorias
                        residencias_profesionales: asignatura.horas_sustantivas_atencion_alumnos.asesorias.residencias_profesionales,
                        educacion_dual: asignatura.horas_sustantivas_atencion_alumnos.asesorias.educacion_dual,
                        titulacion: asignatura.horas_sustantivas_atencion_alumnos.asesorias.titulacion,
                        asesorias_academica: asignatura.horas_sustantivas_atencion_alumnos.asesorias.asesoria_academica,
                        tutorias: asignatura.horas_sustantivas_atencion_alumnos.asesorias.tutorias,

                    actividades_complementarias: asignatura.horas_sustantivas_atencion_alumnos.actividades_complementarias,
                    subtotal_1: asignatura.horas_sustantivas_atencion_alumnos.subtotal_1,

                    // horas_necesidad_institucional
                    invesigacion_educativa: asignatura.horas_necesidad_institucional.invesigacion_educativa,
                    apoyo_operativo: asignatura.horas_necesidad_institucional.apoyo_operativo,
                    subtotal_2: asignatura.horas_necesidad_institucional.subtotal_2,

                total: asignatura.total,
                unidad_academica: asignatura.unidad_academica,
                observaciones: asignatura.observaciones,
                fecha_creacion: asignatura.fecha_creacion,
                fecha_actualizacion: asignatura.fecha_actualizacion
            });
        });
    }

    back(){
        this.props.history.push('/list-proyeccion_asignatura');
    }


    render() {
        const main={
            minHeight:'100vh',
            display:'flex',
            flexDirection:'column',
            marginBottom:'2rem'
            
        }

        return (
            <div className="mt-4 container" >
                <div className="row justify-content-center">
                    <div className="card col-9" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>                     
                        <div className="card-body">
                            <div className="card-header" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                                <h3 className="text-center"><b>{this.state.id} - Proyeccion Por Asignatura Unidad Academica "{this.state.unidad_academica}"</b></h3>
                            </div>
                            <br />
                            
                            <div className="col">
                                <div className="row mb-2">
                                    <label className="h5"><b>PROFESORES DE ASIGNATURA</b></label>
                                </div>
                                <div className="row">
                                    <div className="col-5">
                                        <div className="form-outline">
                                            <label className="">Clave de Programa Educativo:</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-outline">
                                            <div className=""><i>{this.state.clave_programa}</i></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-5">
                                        <div className="form-outline">
                                            <label className="">Código de  Nómina:</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-outline">
                                            <div className=""><i>{this.state.codigo_nomina}</i></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-5">
                                        <div className="form-outline">
                                            <label className="">Grado Académico:</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-outline">
                                            <div className=""><i>{this.state.grado_academico}</i></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-5">
                                        <div className="form-outline">
                                            <label className="">Nombre del Docente:</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-outline">
                                            <div className=""><i>{this.state.nombre_docente}</i></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            
                            <div className="col">
                                <div className="row">
                                    <label className="h5"><b>HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS</b></label>
                                </div>
                                <div className="row mb-1">
                                    <label className="h6"><b>Horas de Asignatura</b></label>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-outline">
                                            <label className="">A:</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-outline">
                                            <div className=""><i>{this.state.a}</i></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-outline">
                                            <label className="">B:</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-outline">
                                            <div className=""><i>{this.state.b}</i></div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* Horas Frente Grupo */}
                            <div className="row mt-3 mb-3">
                                <div className="col">
                                    <div className="form-outline">
                                        <label className="">Horas Frente a Grupo:</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <div className=""><i>{this.state.horas_frente_grupo}</i></div>
                                    </div>
                                </div>
                            </div>

                            <div className="col">
                                <div className="row mb-1 mt-3">
                                        <label><b>Academias</b></label>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-outline">
                                            <label className="">Presidente:</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-outline">
                                            <div className=""><i>{this.state.presidente}</i></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-outline">
                                            <label className="">Secretario:</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-outline">
                                            <div className=""><i>{this.state.secretario}</i></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col">
                                <div className="row mb-1 mt-3">
                                        <label><b>Asesorías</b></label>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-outline">
                                            <label className="">Asesorias Académicas:</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-outline">
                                            <div className=""><i>{this.state.asesoria_academica}</i></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-outline">
                                            <label className="">Educacion Dual:</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-outline">
                                            <div className=""><i>{this.state.educacion_dual}</i></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-outline">
                                            <label className="">Residencias Profesionales:</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-outline">
                                            <div className=""><i>{this.state.residencias_profesionales}</i></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-outline">
                                            <label className="">Titulación:</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-outline">
                                            <div className=""><i>{this.state.titulacion}</i></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-outline">
                                            <label className="">Tutorias:</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-outline">
                                            <div className=""><i>{this.state.tutorias}</i></div>
                                        </div>
                                    </div>
                                </div>

                                
                            </div>

                            <div className="row">
                                <div className="col">
                                    <div className="form-outline">
                                        <label className="">Actividades Complementarias:</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <div className=""><i>{this.state.actividades_complementarias}</i></div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-1 mt-3">
                                <div className="col">
                                    <div className="form-outline">
                                        <label className=""><b>Subtotal 1:</b></label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <div className=""><i>{this.state.subtotal_1}</i></div>
                                    </div>
                                </div>
                            </div>

                            <hr />
                        
                            <div className="col">
                                <div className="row">
                                    <label className="h5"><b>HORAS NECESIDAD INSTITUCIONAL</b></label>
                                </div>
                            </div>
                        
                            <div className="row">
                                <div className="col">
                                    <div className="form-outline">
                                        <label className="">Investigacion educativa, desarrrollo tecnológico:</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <div className=""><i>{this.state.invesigacion_educativa}</i></div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="form-outline">
                                        <label className="">Apoyo Operativo:</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <div className=""><i>{this.state.apoyo_operativo}</i></div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-1 mt-3">
                                <div className="col">
                                    <div className="form-outline">
                                        <label className=""><b>Subtotal 2:</b></label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <div className=""><i>{this.state.subtotal_2}</i></div>
                                    </div>
                                </div>
                            </div>
                            <hr />

                            <div className="row">
                                <div className="col">
                                    <div className="form-outline">
                                        <label className=""><b>Total:</b></label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <div className=""><i>{this.state.total}</i></div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="form-outline">
                                        <label className=""><b>OBSERVACIONES:</b></label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <div className=""><i>{this.state.observaciones}</i></div>
                                    </div>
                                </div>
                            </div>
                            <hr />

                            <div className="col">
                                <div className="row">
                                    <label className="h5"><b>Fechas de Actividades</b></label>
                                </div>
                            </div>
                            
                            <div className="row mt-2">
                                <div className="col-5">
                                    <div className="form-outline">
                                        <label className=""><b>Creado por:</b></label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <div className="">{this.state.fecha_creacion}</div>
                                    </div>
                                </div>
                            </div>                            
                            <div className="row">
                                <div className="col-5">
                                    <div className="form-outline">
                                        <label className="">Fecha y hora de creacion:</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <div className=""><i>{this.state.fecha_creacion}</i></div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="row mt-2">
                                <div className="col-5">
                                    <div className="form-outline">
                                        <label className=""><b>Modificado por:</b></label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <div className="">{this.state.fecha_creacion}</div>
                                    </div>
                                </div>
                            </div>      
                            <div className="row">
                                <div className="col-5">
                                    <div className="form-outline">
                                        <label className="">Fecha y hora de ultima modificaion:</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <div className=""><i>{this.state.fecha_actualizacion}</i></div>
                                    </div>
                                </div>
                            </div>                            
                            

                            <br />
                            <div className="card-footer text-muted">
                                <button className = "btn btn-secondary mt-0" onClick={this.back.bind(this)} style= {{marginLeft: "10px"}}>Regresar</button>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default ViewProyeccionAsignaturaComponent;