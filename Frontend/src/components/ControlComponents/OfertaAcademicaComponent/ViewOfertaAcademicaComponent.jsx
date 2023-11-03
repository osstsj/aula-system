import React, {Component} from "react";
import OfertaAcademicaService from '../../../services/Control/OfertaAcademicaService';

class ViewOfertaAcademicaComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            unidad: '',
            carrera: '',
            modalidad: '',
            turno: '',
            periodo: '',
            fecha_creacion: '',
            fecha_actualizacion: ''
            }
        }
        componentDidMount() {
            OfertaAcademicaService.getOfertaAcademicaById(this.state.id).then((res) => {
                let oferta = res.data;
                this.setState({
                    unidad: oferta.unidad, 
                    carrera: oferta.carrera, 
                    modalidad: oferta.modalidad,
                    turno: oferta.turno,
                    periodo: oferta.periodo,
                    fecha_creacion: oferta.fecha_creacion,
                    fecha_actualizacion: oferta.fecha_actualizacion
                });
            });
        }
    cancel(){
        this.props.history.push('/list-oferta-academica');
    }

    render() {
        const main={
            minHeight:'100vh',
            display:'flex',
            flexDirection:'column',
            marginBottom:'2rem'
            
        }
       
        return (
        <div className=" container">
             <div className="row justify-content-center"  >
                <div className="card col-9 mt-4" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                    <div className="card-body">
                        <div className="card-header text-center" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                            <h3 className="h3 Title"> Oferta Académica  a Detalle</h3>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-4">
                                <div className="form-outline">
                                    <label className=""><b>Unidad:</b> </label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-outline">
                                    <div className=""><i>{this.state.unidad}</i></div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-4">
                                <div className="form-outline">
                                    <label className=""><b>Carrera:</b> </label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-outline">
                                    <div className=""><i>{this.state.carrera}</i></div>
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
                        
                        <div className="row">
                            <div className="col-4">
                                <div className="form-outline">
                                    <label className=""><b>Turno:</b></label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-outline">
                                    <div className=""><i>{this.state.turno}</i></div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-4">
                                <div className="form-outline">
                                    <label className=""><b>Periodo:</b></label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-outline">
                                    <div className="">{this.state.periodo}</div>
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
                        <button className = "btn btn-secondary mt-0" onClick={this.cancel.bind(this)} style= {{marginLeft: "10px"}}>Regresar</button>
                    </div>
                </div>
            </div>  
            </div>
        )
    }
}

export default ViewOfertaAcademicaComponent;