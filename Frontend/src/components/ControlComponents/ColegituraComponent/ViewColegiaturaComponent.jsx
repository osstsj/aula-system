import React, { Component } from 'react';
import '../../StyleGlobal/Style.css'

import ColegiaturaService from '../../../services/Control/ColegiaturaService';

class viewColegiaturaComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            id: this.props.match.params.id,
            clave: 0, 
            descripcion: '', 
            monto: 0,
            colegiatura_estatus: '',
            comentarios: '',
            fecha_creacion: '',
            fecha_actualizacion: ''
        }      
    }

    componentDidMount() {
        ColegiaturaService.getColegiaturaById(this.state.id).then(res => {
            let colegiatura = res.data;

            this.setState({
                clave: colegiatura.clave,
                descripcion: colegiatura.descripcion,
                monto: colegiatura.monto,
                colegiatura_estatus: colegiatura.colegiatura_estatus,
                comentarios: colegiatura.comentarios,
                fecha_creacion: colegiatura.fecha_creacion,
                fecha_actualizacion: colegiatura.fecha_actualizacion
            });
        }).catch(() => {
            alert("Error al intentar traer la colegiatura...");
            this.props.history.push('/list-colegiatura');
        });
    }

    back() {
        this.props.history.push('/list-colegiatura');
    }

    render() {
        const handleImprimir = () => {
            window.print();
          };
        return (
            <div className="mt-4 container"  >
                <div className="row justify-content-center">
                    <div className="card col-9" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>                  
                        <div className="card-body">
                            <div className="card-header text-center" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                                <h3 className="h3 Title">Colegiatura a Detalle</h3>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-4">
                                    <div className="form-outline">
                                        <label className=""><b>Clave:</b></label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <div className=""><i>{this.state.clave}</i></div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-4">
                                    <div className="form-outline">
                                        <label className=""><b>Descripción:</b></label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <div className=""><i>{this.state.descripcion}</i></div>
                                    </div>
                                </div>
                            </div>
                            <br />

                            <div className="row">
                                <div className="col-4">
                                    <div className="form-outline">
                                        <label className=""><b>Monto:</b></label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <div className=""><i>{this.state.monto}</i></div>
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
                                        <div className=""><i>{this.state.colegiatura_estatus}</i></div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-4">
                                    <div className="form-outline">
                                        <label className=""><b>Comentarios:</b></label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <div className=""><i>{this.state.comentarios === '' ? 'No hay comentarios':this.state.comentarios }</i></div>
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
                                        <label className=""><b>Fecha de creación:</b></label>
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
                                        <label className=""><b>Fecha de actualización:</b></label>
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
                            <button className = "btn btn-secondary mt-0" onClick={this.back.bind(this)} style= {{marginLeft: "10px"}}>Regresar</button>
                            <button className="btn btn-secondary mt-0" onClick={handleImprimir} style={{ marginLeft: "10px", backgroundColor: "rgb(0, 128, 0)" }}>Imprimir</button>

                        </div>
                    </div>
                </div>                
            </div>

        )
    }
}

export default viewColegiaturaComponent;