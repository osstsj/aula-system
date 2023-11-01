import React, {Component} from "react";
import '../../StyleGlobal/Style.css'
import AreaService from '../../../services/Control/AreaService';

class ViewCarreraComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                id: this.props.match.params.id,
                area: '',
                responsable: '',
                unidad_academica: '',
                fecha_creacion: '',
                fecha_actualizacion: ''
            }
        }

    componentDidMount() {
        AreaService.getAreaById(this.state.id).then((res) => {
            let areaRes = res.data;
            this.setState({
                area: areaRes.area,
                responsable: areaRes.responsable,
                unidad_academica: areaRes.unidad_academica,
                fecha_creacion: areaRes.fecha_creacion,
                fecha_actualizacion: areaRes.fecha_actualizacion
            });
        });
    }

    cancel(){
        this.props.history.push('/list-area');
    }

    render() {

        return (
            <div className="mt-5 container "  >
                <div className="card col-md-6 offset-md-3" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                    <div className="card-header">
                        <h3 className="text-center">Area Escolar a detalle</h3>
                    </div>
                    
                    <div className="card-body">
                        <div className="row">
                            <div className="col">
                                <div className="form-outline">
                                    <label className=""><b>Area:</b></label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-outline">
                                    <div className=""><i>{this.state.area}</i></div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="form-outline">
                                    <label className=""><b>Responsable:</b></label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-outline">
                                    <div className=""><i>{this.state.responsable}</i></div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="form-outline">
                                    <label className=""><b>Unidad academica:</b></label>
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
        )
    }
}

export default ViewCarreraComponent;