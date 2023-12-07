import React, {Component} from "react";
import '../../StyleGlobal/Style.css';
import DocenteService from '../../../services/Control/DocenteService';

class ViewPlantelComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                id: this.props.match.params.id,
                nombre: '', 
                apellido_paterno: '', 
                apellido_materno: '',
                unidad_academica: '', 
                categoria: '',
                actividad: '',
                estatus: '',
                grado_academico: '',
                fecha_creacion: '',
                fecha_actualizacion: '',
                ultima_horas: null,
                folio_ultimo_registro_y_tipo_folio: null,

            }
        }

    componentDidMount() {
        DocenteService.getDocenteById(this.state.id).then((res) => {
            let docente = res.data;
            this.setState({
                nombre: docente.nombre, 
                apellido_paterno: docente.apellido_paterno, 
                apellido_materno: docente.apellido_materno,
                unidad_academica: docente.unidad_academica.nombre_completo, 
                categoria: docente.categoria, 
                actividad: docente.actividad,
                estatus: docente.estatus,
                codigo_nomina: docente.codigo_nomina,
                grado_academico: docente.grado_academico,
                fecha_creacion: docente.fecha_creacion,
                fecha_actualizacion: docente.fecha_actualizacion,
                ultima_horas: docente.ultima_horas,
                folio_ultimo_registro_y_tipo_folio: docente.folio_ultimo_registro_y_tipo_folio,                
            });
        }).catch(() => {
            alert("Error al intentar traer al docente...");
            this.props.history.push('/list-docente');
        });
    }

    back(){
        this.props.history.push('/list-docente');
    }

    render() {
        const handleImprimir = () => {
            window.print();
          };
        return (
            <div className="mt-4 container">
                <div className="row justify-content-center" >
                <div className="card col-7 mt-4" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                    <div className="card-body">
                        <div className="card-header text-center" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                            <h2 className="h3 Title">Docente a Detalle</h2>
                        </div>
                        <br />
                            <div className="row">
                                <div className="col">
                                    <div className="form-outline">
                                        <label className=""><b>Nombre(s):</b> </label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <div className=""><i>{this.state.nombre}</i></div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <div className="form-outline">
                                        <label className=""><b>Apellido Paterno:</b> </label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <div className=""><i>{this.state.apellido_paterno}</i></div>
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col">
                                    <div className="form-outline">
                                        <label className=""><b>Apellido Materno:</b></label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <div className=""><i>{this.state.apellido_materno}</i></div>
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col">
                                    <div className="form-outline">
                                        <label className=""><b>Nivel Académico:</b></label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <div className=""><i>{this.state.grado_academico}</i></div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="row mb-3">
                                <div className="col">
                                    <div className="form-outline">
                                        <label className=""><b>Unidad Académica:</b></label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <div className=""><i>{this.state.unidad_academica}</i></div>
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col">
                                    <div className="form-outline">
                                        <label className=""><b>Categoría:</b></label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <div className="">{this.state.categoria}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col">
                                    <div className="form-outline">
                                        <label className=""><b>Actividad:</b> </label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <div className=""><i>{this.state.actividad}</i></div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col">
                                    <div className="form-outline">
                                        <label className=""><b>Código Nómina:</b> </label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <div className=""><i>{this.state.codigo_nomina}</i></div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="form-outline">
                                        <label className=""><b>Estatus:</b> </label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <div className=""><i>{this.state.estatus}</i></div>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <hr />

                            <div className="row mt-2">
                                    <div className="col-4">
                                        <div className="form-outline">
                                            <label className=""><b>Horas en proyección:</b></label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-outline">
                                            <div className="">{this.state.ultima_horas}</div>
                                        </div>
                                    </div>
                            </div>
                            <div className="row mt-2">
                                    <div className="col-4">
                                        <div className="form-outline">
                                            <label className=""><b>Folio de Ultimo Registro y Tipo Folio:</b></label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-outline">
                                            <div className="">{this.state.folio_ultimo_registro_y_tipo_folio}</div>
                                        </div>
                                    </div>
                            </div>
                            <div className="row mt-2">
                                    <div className="col-4">
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

                            <div className="row mb-3">
                                <div className="col-4">
                                    <div className="form-outline">
                                        <label className="">Fecha de creación:</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <div className="">{this.state.fecha_creacion}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <div className="form-outline">
                                        <label className=""><b>Actualización  realizada por:</b></label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <div className="">{this.state.fecha_actualizacion}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <div className="form-outline">
                                        <label className="">Fecha de actualización:</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <div className="">{this.state.fecha_actualizacion}</div>
                                    </div>
                                </div>
                            </div>
                        
                                <br />
                        </div>
                            <br />
                        <div className="card-footer text-muted">
                            <button className = "btn btn-secondary mt-0" onClick={this.back.bind(this)} style= {{marginLeft: "10px"}}>Regresar</button>
                            <button className="btn btn-secondary mt-0" onClick={handleImprimir} style={{ marginLeft: "10px", backgroundColor: "rgb(0, 128, 0)" }}>Imprimir</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewPlantelComponent;