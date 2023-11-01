import React, {Component} from "react";
import '../../StyleGlobal/Style.css';
import PlantelService from '../../../services/Control/PlantelService';
import ExtensionService from '../../../services/Control/ExtensionsService';

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
                fecha_actualizacion: '', 

                extensiones: [],
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

        ExtensionService.getAllExtensionsByPlantelId(this.state.id).then(res => {
            this.setState({ extensiones: res.data });
        })
    }

    cancel(){
        this.props.history.push('/list-plantel');
    }

    render() {
       
        return (
            <div className="container" >
                <div className="row justify-content-center">
                    <div className="card col-9 mt-4" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>                        
                        <div className="card-body">
                            <div className="card-header text-center" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                                <h2 className="h3 Title">Unidad Academica a Detalle</h2>
                            </div>
                                <br />
                            <div className="row">
                                <div className="col-4">
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
                                <div className="col-4">
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
                                <div className="col-4">
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
                                <div className="col-4">
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
                                <div className="col-4">
                                    <div className="form-outline">
                                        <label className=""><b>Actualizacion realizada por:</b></label>
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
                                        <label className=""><b>Fecha de actualizacion:</b></label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <div className="">{this.state.fecha_actualizacion}</div>
                                    </div>
                                </div>
                            </div>                            

                            <hr />
                            <label className="mb-3"><b>Extensiones: </b><br /></label>
                            
                            { this.state.extensiones.map((extension, index) => (
                                <>

                                    <div className="row">
                                        <div className="col-4">
                                            <div className="form-outline">
                                                <label className="">Extension: </label>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-outline">
                                                <div className=""><i>{index + 1}</i></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">
                                            <div className="form-outline">
                                                <label className="">Tipo de Unidad: </label>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-outline">
                                                <div className=""><i>{extension.tipo_unidad}</i></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-4">
                                            <div className="form-outline">
                                                <label className="">Clave DGP: </label>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-outline">
                                                <div className=""><i>{extension.clave_dgp}</i></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-4">
                                            <div className="form-outline">
                                                <label className="">Abreviatura:</label>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-outline">
                                                <div className=""><i>{extension.abreviatura}</i></div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="row">
                                        <div className="col-4">
                                            <div className="form-outline">
                                                <label className="">Nombre Corto:</label>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-outline">
                                                <div className=""><i>{extension.nombre_corto}</i></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-4">
                                            <div className="form-outline">
                                                <label className="">Nombre Completo:</label>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-outline">
                                                <div className="">{extension.nombre_completo}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-4">
                                            <div className="form-outline">
                                                <label className="">Direccion completa: </label>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-outline">
                                                <div className=""><i>{extension.direccion_completa}</i></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mt-2">
                                        <div className="col-4">
                                            <div className="form-outline">
                                                <label className="">Creado por:</label>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-outline">
                                                <div className="">{extension.fecha_creacion}</div>
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
                                                <div className="">{extension.fecha_creacion}</div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="row">
                                        <div className="col-4">
                                            <div className="form-outline">
                                                <label className="">Fecha de actualizacion:</label>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-outline">
                                                <div className="">{extension.fecha_actualizacion}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-4">
                                            <div className="form-outline">
                                                <label className="">Actualizacion realizada por:</label>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-outline">
                                                <div className="">{extension.fecha_actualizacion}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                </>
                            ))}
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

export default ViewPlantelComponent;