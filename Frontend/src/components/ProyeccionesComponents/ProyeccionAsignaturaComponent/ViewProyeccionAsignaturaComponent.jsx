import React, { Component } from 'react';
import AsignaturaProyeccionService from '../../../services/Proyecciones/AsignaturaProyeccionService';
import '../../StyleGlobal/Style.css'

class ViewProyeccionAsignaturaComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id, // asignatura id
                // profe_asignatura
                clave_programa: "",
                codigo_nomina: "",
                grado_academico: "",
                nombre_docente: "",
                folio: "",
                id_folio: null,

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
                folio: asignatura.folio.folio,
                id_folio: asignatura.folio.id,
                    // profe_asignatura: 
                    clave_programa: asignatura.profe_asignatura.clave_programa.carrera_nombre.clave_programa,
                    codigo_nomina: asignatura.profe_asignatura.nombre_docente.codigo_nomina,
                    grado_academico: asignatura.profe_asignatura.grado_academico,
                    nombre_docente: asignatura.profe_asignatura.nombre_docente.nombre_completo,
                   

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
                    //carga nuevas 
                    carga_horaria_nueva:asignatura.carga_horaria_nueva,
                    categoria_tipo_horas_asignatura_nueva:asignatura.categoria_tipo_horas_asignatura_nueva,
                    //carga anterior 
                    carga_horaria_anterior:asignatura.carga_horaria_anterior,
                    categoria_horas_asignatura_anterior:asignatura.categoria_horas_asignatura_anterior,

                total: asignatura.total,
                unidad_academica: asignatura.unidad_academica.nombre_completo,
                observaciones: asignatura.observaciones,
                fecha_creacion: asignatura.fecha_creacion,
                fecha_actualizacion: asignatura.fecha_actualizacion
            });
        })
        .catch(() => {
            alert("Error al intentar traer la proyeccion por asignatura");
            this.props.history.push('/');
        })
    }

    back(id){
        this.props.history.push(`/list-proyeccion_asignatura/${this.state.id_folio}`);
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
                                <h3 className="text-center"><b>Folio: {this.state.folio} <br />Proyección Por Asignatura #{this.state.id} <br /> Unidad Académica: {this.state.unidad_academica}</b></h3>
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
                                            <label className="">Tutorias:</label>
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
                                        <label className="">Investigación educativa, desarrrollo tecnológico:</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <div className="">{this.state.invesigacion_educativa}</div>
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
                                        <label className="">Fecha y hora de ultima modificaión:</label>
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
                                        <label className="">Carga horaria nueva :</label>
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
                                        <label className="">Asignatura Nueva:</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <div className="">{this.state.categoria_tipo_horas_asignatura_nueva}</div>
                                    </div>
                                </div>
                            </div> 
                            <div className="row">
                                <div className="col-5">
                                    <div className="form-outline">
                                        <label className="">Carga horaria anterior:</label>
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
                                        <label className="">Asignatura anterior:</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <div className="">{this.state.categoria_horas_asignatura_anterior}</div>
                                    </div>
                                </div>
                            </div> 

                            <br />
                            <div className="card-footer text-muted">
                                <button className = "btn btn-secondary mt-0" onClick={() => this.back(this.state.id)} style= {{marginLeft: "10px"}}>Regresar</button>
                                <button className="btn btn-secondary mt-0" onClick={handleImprimir} style={{ marginLeft: "10px", backgroundColor: "rgb(0, 128, 0)" }}>Imprimir</button>

                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default ViewProyeccionAsignaturaComponent;