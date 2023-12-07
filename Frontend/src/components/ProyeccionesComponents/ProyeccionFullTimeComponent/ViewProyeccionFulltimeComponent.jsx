import React, { Component } from 'react';
import FulltimeProyeccionService from '../../../services/Proyecciones/FulltimeProyeccionService';

class ViewProyeccionFulltimeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
                // profe_asignatura
                clave_programa: "",
                codigo_nomina: "",
                grado_academico: "",
                nombre_docente: "",
                folio: "",
                id_folio: null,

                // horas_sustantivas_atencion_alumnos
                // Nivel de PTC
                ptc: "",
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
                proyecto_investigacion: 0,
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
        FulltimeProyeccionService.getProyeccioneFulltimeById(this.state.id)
        .then(res =>  {
            let fulltime = res.data;

            this.setState({
                // fulltime
                folio: fulltime.folio.folio,
                id_folio: fulltime.folio.id,
                    // profesor_fulltime 
                    clave_programa: fulltime.profesor_fulltime.clave_programa.carrera_nombre.clave_programa,
                    codigo_nomina: fulltime.profesor_fulltime.nombre_docente.codigo_nomina,
                    grado_academico: fulltime.profesor_fulltime.grado_academico,
                    nombre_docente: fulltime.profesor_fulltime.nombre_docente.nombre_completo,
                   

                    // horas_sustantivas_atencion_alumnos
                    ptc: fulltime.horas_sustantivas_atencion_alumnos_fulltime.ptc,
                    horas_frente_grupo:fulltime.horas_sustantivas_atencion_alumnos_fulltime.horas_frente_grupo,

                        // academias
                        presidente: fulltime.horas_sustantivas_atencion_alumnos_fulltime.academias.presidente,
                        secretario: fulltime.horas_sustantivas_atencion_alumnos_fulltime.academias.secretario,

                        // asesorias
                        residencias_profesionales: fulltime.horas_sustantivas_atencion_alumnos_fulltime.asesorias.residencias_profesionales,
                        educacion_dual: fulltime.horas_sustantivas_atencion_alumnos_fulltime.asesorias.educacion_dual,
                        titulacion: fulltime.horas_sustantivas_atencion_alumnos_fulltime.asesorias.titulacion,
                        asesorias_academica: fulltime.horas_sustantivas_atencion_alumnos_fulltime.asesorias.asesorias_academica,
                        tutorias: fulltime.horas_sustantivas_atencion_alumnos_fulltime.asesorias.tutorias,

                    actividades_complementarias: fulltime.horas_sustantivas_atencion_alumnos_fulltime.actividades_complementarias,
                    subtotal_1: fulltime.horas_sustantivas_atencion_alumnos_fulltime.subtotal_1,

                    // horas_necesidad_institucional
                    proyecto_investigacion: fulltime.horas_necesidad_institucional_fulltime.proyecto_investigacion,
                    apoyo_operativo: fulltime.horas_necesidad_institucional_fulltime.apoyo_operativo,
                    subtotal_2: fulltime.horas_necesidad_institucional_fulltime.subtotal_2,
                    //carga nueva 
                    carga_horaria_nueva:fulltime.carga_horaria_nueva,
                    nivel_ptc_nuevo:fulltime.nivel_ptc_nuevo,
                    //carga anterior
                    carga_horaria_anterior:fulltime.carga_horaria_anterior,
                    nivel_ptc_anterior:fulltime.nivel_ptc_anterior,

                total: fulltime.total,
                unidad_academica: fulltime.unidad_academica.nombre_completo,
                observaciones: fulltime.observaciones,
                fecha_creacion: fulltime.fecha_creacion,
                fecha_actualizacion: fulltime.fecha_actualizacion
            });
        })
        // .catch(() => {
        //     alert("Error al intentar traer la proyeccion por fulltime");
        //     this.props.history.push('/');
        // })
    }

    back(){
        this.props.history.push(`/list-proyeccion_fulltime/${this.state.id_folio}`);
    }


    render() {
        
        const handleImprimir = () => {
            window.print();
          };
        return (
            <div className="mt-4 container" >
                <div className="row justify-content-center">
                    <div className="card col-9" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>                     
                        <div className="card-body">
                            <div className="card-header" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                                <h3 className="text-center"><b>Folio: {this.state.folio} <br />Proyeccion Por Asignatura #{this.state.id} <br /> Unidad Académica: {this.state.unidad_academica}</b></h3>
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
                                            <div className="">{this.state.clave_programa}</div>
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
                                            <div className="">{this.state.codigo_nomina}</div>
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
                                            <div className="">{this.state.grado_academico}</div>
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
                                            <div className="">{this.state.nombre_docente}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-5">
                                        <div className="form-outline">
                                            <label className="">PTC del Docente:</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-outline">
                                            <div className="">{this.state.ptc}</div>
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
                                            <div className="">{this.state.a}</div>
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
                                            <div className="">{this.state.b}</div>
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
                                        <div className="">{this.state.horas_frente_grupo}</div>
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
                                            <div className="">{this.state.presidente}</div>
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
                                            <div className="">{this.state.secretario}</div>
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
                                            <label className="">Asesorías Académicas:</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-outline">
                                            <div className="">{this.state.asesoria_academica}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-outline">
                                            <label className="">Educación Dual:</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-outline">
                                            <div className="">{this.state.educacion_dual}</div>
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
                                            <div className="">{this.state.residencias_profesionales}</div>
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
                                            <div className="">{this.state.titulacion}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-outline">
                                            <label className="">Tutorías:</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-outline">
                                            <div className="">{this.state.tutorias}</div>
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
                                        <div className="">{this.state.actividades_complementarias}</div>
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
                                        <div className="">{this.state.subtotal_1}</div>
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
                                        <label className="">Proyectos de Investigación:</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <div className="">{this.state.proyecto_investigacion}</div>
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
                                        <div className="">{this.state.apoyo_operativo}</div>
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
                                        <div className="">{this.state.subtotal_2}</div>
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
                                        <div className="">{this.state.total}</div>
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
                                        <div className="">{this.state.observaciones}</div>
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
                                        <label className="">Fecha y hora de creación:</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <div className="">{this.state.fecha_creacion}</div>
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
                                        <label className="">Fecha y hora de ultima modificación:</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <div className="">{this.state.fecha_actualizacion}</div>
                                    </div>
                                </div>
                            </div>                            
                            <div className="row">
                                <div className="col-5">
                                    <div className="form-outline">
                                        <label className="">Carga horarias nueva:</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <div className="">{this.state.carga_horaria_nueva}</div>
                                    </div>
                                </div>
                            </div> 
                            <div className="row">
                                <div className="col-5">
                                    <div className="form-outline">
                                        <label className="">Nivel de PTC Nuevo:</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <div className="">{this.state.nivel_ptc_nuevo}</div>
                                    </div>
                                </div>
                            </div> 
                                
                            <div className="row">
                                <div className="col-5">
                                    <div className="form-outline">
                                        <label className="">fulltime.carga_horaria_anterior:</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <div className="">{this.state.carga_horaria_anterior}</div>
                                    </div>
                                </div>
                            </div>     
                            <div className="row">
                                <div className="col-5">
                                    <div className="form-outline">
                                        <label className="">Nivel de PTC anterior:</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <div className="">{this.state.nivel_ptc_anterior}</div>
                                    </div>
                                </div>
                            </div>     


                            <br />
                            <div className="card-footer text-muted">
                                <button className = "btn btn-secondary mt-0" onClick={this.back.bind(this)} style= {{marginLeft: "10px"}}>Regresar</button>
                                <button className="btn btn-secondary mt-0" onClick={handleImprimir} style={{ marginLeft: "10px", backgroundColor: "rgb(0, 128, 0)" }}>Imprimir</button>

                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default ViewProyeccionFulltimeComponent;