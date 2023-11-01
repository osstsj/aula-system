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
        });
    }

    back() {
        this.props.history.push('/list-colegiatura');
    }

    render() {
        
        return (
            <div className="mt-5 container"  >
                <div className="card col-md-6 offset-md-3" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                    <div className="card-header">
                        <h3 className="text-center">Colegiatura a detalle</h3>
                    </div>
                    
                    <div className="card-body">
                        <div className="row">
                            <div className="col">
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
                            <div className="col">
                                <div className="form-outline">
                                    <label className=""><b>Descripcion:</b></label>
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
                            <div className="col">
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
                            <div className="col">
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
                            <div className="col">
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
                        <button className = "btn btn-secondary" onClick={this.back.bind(this)} style= {{marginLeft: "10px"}}>Regresar</button>
                    </div>
                </div>
            </div>

        )
    }
}

export default viewColegiaturaComponent;