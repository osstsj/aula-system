import React, {Component} from "react";
import '../../StyleGlobal/Style.css';
import PlantelService from '../../../services/Control/PlantelService';

class ViewPlantelComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                id: this.props.match.params.id,
                tipo_unidad: '', 
                clave_dgp: '', 
                abreviatura: '',
                nombre_corto: '', 
                nombre_completo: '', 
                direccion_completa: '',
                fecha_creacion: '',
                fecha_actualizacion: ''
            }
        }

    componentDidMount() {
        PlantelService.getPlantelById(this.state.id).then((res) => {
            let plantel = res.data;
            this.setState({
                tipo_unidad: plantel.tipo_unidad, 
                clave_dgp: plantel.clave_dgp, 
                abreviatura: plantel.abreviatura,
                nombre_corto: plantel.nombre_corto, 
                nombre_completo: plantel.nombre_completo, 
                direccion_completa: plantel.direccion_completa,
                fecha_creacion: plantel.fecha_creacion,
                fecha_actualizacion: plantel.fecha_actualizacion
            });
        });
    }

    cancel(){
        this.props.history.push('/list-plantel');
    }

    render() {
       
        return (
            <div className="mt-5 container" >
               <div className="card col-md-6 offset-md-3 offset-md-3 mt-4" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                    <div className="card-header">
                        <h3 className="text-center">Plantel a detalle</h3>
                    </div>
                    
                    <div className="card-body">
                        <div className="row">
                            <div className="col">
                                <div className="form-outline">
                                    <label className=""><b>Tipo de Unidad:</b> </label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-outline">
                                    <div className=""><i>{this.state.tipo_unidad}</i></div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="form-outline">
                                    <label className=""><b>Clave DGP:</b> </label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-outline">
                                    <div className=""><i>{this.state.clave_dgp}</i></div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
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
                            <div className="col">
                                <div className="form-outline">
                                    <label className=""><b>Nombre Corto:</b></label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-outline">
                                    <div className=""><i>{this.state.nombre_corto}</i></div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="form-outline">
                                    <label className=""><b>Nombre Completo:</b></label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-outline">
                                    <div className="">{this.state.nombre_completo}</div>
                                </div>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col">
                                <div className="form-outline">
                                    <label className=""><b>Direccion completa:</b> </label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-outline">
                                    <div className=""><i>{this.state.direccion_completa}</i></div>
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
                                    <div className="">{this.state.fecha_creacion}</div>
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
                                    <div className="">{this.state.fecha_actualizacion}</div>
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
        )
    }
}

export default ViewPlantelComponent;