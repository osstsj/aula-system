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
                    carrera_nombre: carrera.carrera_nombre, 
                    unidad_academica: carrera.unidad_academica, 
                    modalidad: carrera.modalidad,
                    nivel: carrera.nivel,
                    fecha_creacion: carrera.fecha_creacion,
                    fecha_actualizacion: carrera.fecha_actualizacion
                });
            });
        }
    cancel(){
        this.props.history.push('/list-carrera_por_unidad');
    }

    render() {
        const main={
            minHeight:'100vh',
            display:'flex',
            flexDirection:'column',
            marginBottom:'2rem'
            
        }
       
        return (
        <div className="container">
             <div className="mt-5">
                <div className="card col-md-6 offset-md-3" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                    <div className="card-header">
                        <h3 className="text-center"> Carrera por  Unidades a Detalle</h3>
                    </div>
                    
                    <div className="card-body">
                        <div className="row">
                            <div className="col">
                                <div className="form-outline">
                                    <label className=""><b>Carrera:</b> </label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-outline">
                                    <div className=""><i>{this.state.carrera_nombre}</i></div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="form-outline">
                                    <label className=""><b>Nivel Academico</b> </label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-outline">
                                    <div className=""><i>{this.state.nivel}</i></div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="form-outline">
                                    <label className=""><b>Plantel:</b></label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-outline">
                                    <div className=""><i>{this.state.unidad_academica}</i></div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="col">
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

                        <div className="row">
                            <div className="col">
                                <div className="form-outline">
                                    <label className=""><b>Fecha de creacion:</b></label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-outline">
                                    <div className=""><i>{this.state.fecha_creacion}</i></div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="form-outline">
                                    <label className=""><b>Fecha de actualizacion:</b></label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-outline">
                                    <div className=""><i>{this.state.fecha_actualizacion}</i></div>
                                </div>
                            </div>
                        </div>

                    </div>
                        <br />
                    <div className="card-footer text-muted">
                        <button className = "btn btn-secondary" onClick={this.cancel.bind(this)} style= {{marginLeft: "10px"}}>Regresar</button>
                    </div>
                </div>
            </div>  
            </div>
        )
    }
}

export default ViewCarreraPorUnidadComponent;