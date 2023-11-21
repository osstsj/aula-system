import React, { Component } from 'react';
import '../../StyleGlobal/Style.css'
import CarreraService from '../../../services/Control/CarreraService';

class UpdateCarreraComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: this.props.match.params.id,
            abreviatura: '', 
            nombre: '', 
            // dgp: 0,
            dgp: '',
            plan_estudio: '', 
            estatus: ''
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
                estatus: carrera.estatus
            });
        }).catch(() => {
            alert("Error al intentar traer la carrera...");
            this.props.history.push('/list-carrera');
        });
    }

    updateCarrera = (e) =>{
        e.preventDefault();
        let carrera = {
            abreviatura: this.state.abreviatura.trim(), 
            nombre: this.state.nombre.trim(), 
            plan_estudio: this.state.plan_estudio.trim(),
            dgp: this.state.dgp, 
            estatus: this.state.estatus.trim()
        };
        
        console.log('carrera => ' + JSON.stringify(carrera));
        
        CarreraService.updateCarreralById(carrera, this.state.id).then(res => {
            this.props.history.push('/list-carrera');
        }).catch(() => {
            alert("Error al intentar actualizar la carrera...");
            this.props.history.push('/list-carrera');
        });
    }

    changeAbreviaturataHandler  = (event) => {
        this.setState({abreviatura: event.target.value});
    }

    changeNombreHandler = (event) => {
        this.setState({nombre: event.target.value});
    }
    
    changePlanEstudioHandler = (event) => {
        this.setState({plan_estudio: event.target.value});
    }

    changeDGPHandler = (event) => {
        this.setState({dgp: event.target.value});
    }

    changeEstatusHandler = (event) => {
        this.setState({estatus: event.target.value});
    }
 
    cancel(){
        this.props.history.push('/list-carrera');
    }


    render() {
        return (
            <div>
                <div className = "container" >
                        <div className = "row justify-content-center">
                            <div className = "card col-9 mt-4" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                            <div className="card-body">
                                <div className="card-header text-center" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                                    <h2 className="h3 Title">Actualizar Carrera</h2>
                                </div>
                                <br />
                                <form>
                                    <div className="row mb-3">
                                        <div className="col-4">
                                            <div className="form-outline">
                                                <label className="">Abreviatura: </label>
                                                <input 
                                                    placeholder="Ingrese Abreviatura..." 
                                                    name="abreviatura" className="form-control" 
                                                    value={this.state.abreviatura} 
                                                    onChange={this.changeAbreviaturataHandler} 
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-outline">
                                                <label className="">Nombre: </label>
                                                <input placeholder="Ingrese nombre..." 
                                                    name="nombre" 
                                                    className="form-control" 
                                                    value={this.state.nombre} 
                                                    onChange={this.changeNombreHandler} 
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                     <div className="row mb-3">
                                        <div className="col">
                                            <div className="form-outline">
                                                <label className="">DGP: </label>
                                                <input 
                                                    // type='number'
                                                    placeholder="Ingrese DGP..." 
                                                    name="dgp" 
                                                    className="form-control" 
                                                    value={this.state.dgp} 
                                                    onChange={this.changeDGPHandler} 
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-outline">
                                                <label className="">Estatus: </label>
                                                <select 
                                                    name="estatus" 
                                                    className='form-control' 
                                                    value={this.state.estatus}
                                                    onChange={this.changeEstatusHandler} 
                                                    required
                                                >
                                                    <option value="" disabled>Seccione un estatus...</option>
                                                    <option value="Activa">Activa</option>
                                                    <option value="Inactiva">Inactiva</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col">
                                            <div className="form-outline">
                                                <label className="">Plan Estudio: </label>
                                                <input 
                                                    placeholder="Ingrese Plan Estudio..." 
                                                    name="planEstudio" className="form-control" 
                                                    value={this.state.plan_estudio} 
                                                    onChange={this.changePlanEstudioHandler} 
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                       <br />
                                        <div className="card-footer text-muted">
                                            <button className = "btn btn-warning mt-0" onClick={this.updateCarrera}>Actualizar</button>
                                            <button className = "btn btn-danger mt-0" onClick={this.cancel.bind(this)} style= {{marginLeft: "10px"}}>Cancelar</button>
                                        </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UpdateCarreraComponent;