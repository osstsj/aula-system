import React, {Component} from "react";
import '../../StyleGlobal/Style.css'
import CarreraService from '../../../services/Control/CarreraService';

class ViewCarreraComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            abreviatura: '', 
            nombre: '', 
            dgp: '',
            plan_estudio: '', 
            estatus: '',
            fecha_creacion: '',
            fecha_actualizacion:''
            }
        }

    componentDidMount() {
        CarreraService.getCarreraById(this.state.id).then((res) => {
            let carrera = res.data;
            this.setState({
                abreviatura: carrera.abreviatura, 
                nombre: carrera.nombre, 
                plan_estudio: carrera.plan_estudio,
                dgp: carrera.dgp, 
                estatus: carrera.estatus,
                fecha_creacion: carrera.fecha_creacion,
                fecha_actualizacion: carrera.fecha_actualizacion
            });
        });
    }

    cancel(){
        this.props.history.push('/list-carrera');
    }

    render() {
        return (
            <div className="mt-4 container">
                <div className="row justify-content-center">
                    <div className="card col-9" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>                        
                        <div className="card-body">
                            <div  className="card-header text-center" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                                <h3 className="h3 Title">Carrera a detalle</h3>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-4">
                                    <div className="form-outline">
                                        <label className=""><b>Abreviatura:</b></label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <div className=""><i>{this.state.abreviatura}</i></div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-4">
                                    <div className="form-outline">
                                        <label className=""><b>Nombre:</b></label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <div className=""><i>{this.state.nombre}</i></div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-4">
                                    <div className="form-outline">
                                        <label className=""><b>DGP:</b></label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <div className=""><i>{this.state.dgp}</i></div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="col-4">
                                    <div className="form-outline">
                                        <label className=""><b>Estatus:</b></label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <div className=""><i>{this.state.estatus}</i></div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-4">
                                    <div className="form-outline">
                                        <label className=""><b>Plan estudio:</b></label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <div className="">{this.state.plan_estudio}</div>
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
                                        <label className="">Fecha de creacion:</label>
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
                                        <label className=""><b>Actualización realizada por:</b></label>
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
                            <button className = "btn btn-secondary  mt-0" onClick={this.cancel.bind(this)} style= {{marginLeft: "10px"}}>Regresar</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewCarreraComponent;