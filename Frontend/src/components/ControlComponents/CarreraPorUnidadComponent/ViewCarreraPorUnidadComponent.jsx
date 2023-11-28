import React, {Component} from "react";
import CarreraPorUnidadService from '../../../services/Control/CarreraPorUnidadService';
import '../../StyleGlobal/Style.css'


class ViewCarreraPorUnidadComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            carrera_nombre: '',
            unidad_academica: '',
            modalidad: '',
            nivel: '',
            fecha_creacion:'',
            fecha_actualizacion:''
            
            }
        }
        componentDidMount() {
            CarreraPorUnidadService.getCarreraPorUnidadById(this.state.id).then((res) => {
                let carrera = res.data;
                this.setState({
                    carrera_nombre: carrera.carrera_nombre.nombre_completo, 
                    unidad_academica: carrera.unidad_academica.nombre_completo, 
                    modalidad: carrera.modalidad,
                    nivel: carrera.nivel,
                    fecha_creacion: carrera.fecha_creacion,
                    fecha_actualizacion: carrera.fecha_actualizacion
                });
            }).catch(() => {
                alert("Error al intentar traer la carrera por unidad...");
                this.props.history.push('/list-carrera_por_unidad');
            });
        }
    cancel(){
        this.props.history.push('/list-carrera_por_unidad');
    }

    render() {
       
        return (
        <div className="container">
             <div className="row justify-content-center">
                <div className="card col-9 mt-4" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>                    
                    <div className="card-body">
                        <div className="card-header text-center" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                            <h3 className="h3 Title"> Carrera por Unidade Académica  a Detalle</h3>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-4">
                                <div className="form-outline">
                                    <label className=""><b>Carrera:</b> </label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-outline">
                                    <div className="">{this.state.carrera_nombre}</div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-4">
                                <div className="form-outline">
                                    <label className=""><b>Nivel Académico</b> </label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-outline">
                                    <div className=""><i>{this.state.nivel}</i></div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-4">
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
                        
                        <div className="row">
                            <div className="col-4">
                                <div className="form-outline">
                                    <label className=""><b>Modalidad:</b></label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-outline">
                                    <div className=""><i>{this.state.modalidad}</i></div>
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

                    </div>
                        <br />
                    <div className="card-footer text-muted">
                        <button className = "btn btn-secondary mt-0" onClick={this.cancel.bind(this)} style= {{marginLeft: "10px"}}>Regresar</button>
                    </div>
                </div>
            </div>  
            </div>
        )
    }
}

export default ViewCarreraPorUnidadComponent;