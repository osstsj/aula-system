import React, {Component} from "react";
import '../../StyleGlobal/Style.css';
import UnidadService from '../../../services/Control/UnidadService';
import ExtensionService from '../../../services/Control/ExtensionsService';
import ExtensionsService from "../../../services/Control/ExtensionsService";

class ViewExtensionComponent extends Component {
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
        ExtensionsService.getExtensionById(this.state.id).then((res) => {
            let unidad = res.data;
            this.setState({
                tipo_unidad: unidad.tipo_unidad, 
                clave_dgp: unidad.clave_dgp, 
                abreviatura: unidad.abreviatura,
                nombre_corto: unidad.nombre_corto, 
                nombre_completo: unidad.nombre_completo, 
                direccion_completa: unidad.direccion_completa,
                fecha_creacion: unidad.fecha_creacion,
                fecha_actualizacion: unidad.fecha_actualizacion
            });
        }).catch(() => {
            alert("Error al intentar traer la unidad académica...");
            this.props.history.push('/list-unidad');
        });

        // ExtensionService.getAllExtensionsByUnidadId(this.state.id).then(res => {
        //     this.setState({ extensiones: res.data });
        // }).catch(() => {
        //     alert("Error al intentar traer todas la extensiones academicas...");
        //     this.props.history.push('/list-unidad');
        // });
    }

    cancel(){
        this.props.history.push('/list-extension');
    }

    render() {
       
        const handleImprimir = () => {
            window.print();
          };
        return (
            <div className="container" >
                <div className="row justify-content-center">
                    <div className="card col-9 mt-4" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>                        
                        <div className="card-body">
                            <div className="card-header text-center" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                                <h2 className="h3 Title">Unidad Académica  a Detalle</h2>
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
                                        <label className=""><b>Dirección  completa:</b> </label>
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

                            <hr />
                            </div>
                            <br />
                        <div className="card-footer text-muted">
                            <button className = "btn btn-secondary mt-0" onClick={this.cancel.bind(this)} style= {{marginLeft: "10px"}}>Regresar</button>
                            <button className="btn btn-secondary mt-0" onClick={handleImprimir} style={{ marginLeft: "10px", backgroundColor: "rgb(0, 128, 0)" }}>Imprimir</button>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewExtensionComponent;