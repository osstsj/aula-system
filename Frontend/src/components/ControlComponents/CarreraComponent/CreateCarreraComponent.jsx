import React, { Component } from 'react';
import CarreraService from '../../../services/Control/CarreraService';

class CreateCarreraComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            abreviatura: '', 
            nombre: '',
            dgp: '',
            plan_estudio: '', 
            estatus: 'Activa',
            isLoading: false, // Nuevo estado para controlar la visibilidad del spinner
            alert:null,
            
        }

        this.changeAbreviaturataHandler = this.changeAbreviaturataHandler.bind(this)
        this.changeNombreHandler = this.changeNombreHandler.bind(this);
        this.changeDGPHandler = this.changeDGPHandler.bind(this);        
        this.changePlanEstudioHandler = this.changePlanEstudioHandler.bind(this);
        this.changeEstatusHandler = this.changeEstatusHandler.bind(this);
        this.createCarrera = this.createCarrera.bind(this);
    }

    createCarrera = (e) =>{
        e.preventDefault();
       // Validar que los campos requeridos no estén vacíos
    if (this.state.abreviatura.trim() === '' || this.state.nombre.trim() === '' || this.state.dgp.trim() === '' || this.state.estatus.trim() === '' || this.state.plan_estudio.trim() === '') {
        this.setState({
            alert: (
                <div className="alert alert-dismissible alert-danger">
                     Por favor complete todos los campos requeridos.
                </div>
            ),
        });
        return;
    }
        let carrera = {
            abreviatura: this.state.abreviatura.trim(), 
            nombre: this.state.nombre.trim(), 
            plan_estudio: this.state.plan_estudio.trim(), 
            dgp: parseInt(this.state.dgp), 
            estatus: this.state.estatus.trim()
        };
           // Mostrar el spinner al iniciar la acción
           this.setState({ isLoading: true });
        console.log('carrera=> ' + JSON.stringify(carrera));
        
        CarreraService.createCarrera(carrera).then(res => {
            this.props.history.push('/list-carrera');
        }).catch(() => {
            alert("Error al intentar crear la carrera...");
            this.props.history.push('/list-carrera');
        });
    }
    

    changeAbreviaturataHandler  = (event) => {
        this.setState({abreviatura: event.target.value, alert:null});
    }

    changeNombreHandler = (event) => {
        this.setState({nombre: event.target.value, alert:null});
    }
    
    changePlanEstudioHandler = (event) => {
        this.setState({plan_estudio: event.target.value, alert:null});
    }

    changeDGPHandler = (event) => {
        this.setState({dgp: event.target.value, alert:null});
    }

    changeEstatusHandler = (event) => {
        this.setState({estatus: event.target.value});
    }
 
    cancel(){
        this.props.history.push('/list-carrera');
    }
    

    render() {
        return (
            <div className=''>
                <div className = "container" >
                        <div className = "row justify-content-center">
                            <div className = "card col-9 mt-4" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                            <div className="card-body">
                                <div className="card-header text-center" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                                    <h2 className="h3 Title">Agregar Carrera</h2>
                                </div>
                                <br />
                                <form>
                                    <div className="row mb-3">
                                        <div className="col-4">
                                            <div className="form-outline">
                                                <label className="">Abreviatura: </label>
                                                <input 
                                                    placeholder="Ingrese abreviatura..." 
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
                                                <input 
                                                    placeholder="Ingrese nombre..." 
                                                    name="nombre" className="form-control" 
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
                                                 type="text"
                                                placeholder="Ingrese DGP..."
                                                name="DGP"
                                                className="form-control"
                                                value={this.state.dgp}
                                                onChange={this.changeDGPHandler}
                                                onInput={(e) => {
                                                    e.target.value = e.target.value.replace(/[^0-9]/g, ''); // Permite solo números
                                                }}
                                                required
                                                />

                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-outline">
                                                <label className="">Estatus: </label>
                                                <select name="estatus" className='form-control' 
                                                    value={this.state.estatus}
                                                    onChange={this.changeEstatusHandler} 
                                                    required
                                                    disabled
                                                >
                                                    {/* <option value="" disabled>Seccione un estatus...</option> */}
                                                    <option value="Activa" selected>Activa</option>
                                                    <option value="Inactiva">Inactiva</option>                                    
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col">
                                            <div className="form-outline">
                                                <label className="">Plan Estudio: </label>
                                                <input placeholder="Ingrese Plan Estudio..." 
                                                    name="planEstudio" 
                                                    className="form-control" 
                                                    value={this.state.plan_estudio} 
                                                    onChange={this.changePlanEstudioHandler} 
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <br />
                                        <div className="card-footer text-muted">
                                        {this.state.alert}

                                        {this.state.isLoading ? (
                                            // Mostrar el spinner si isLoading es true
                                            <div className="text-center">
                                                <div className="spinner-border" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <button className="btn btn-primary mt-0" onClick={this.createCarrera}>Guardar</button>
                                        )}                                            
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

export default CreateCarreraComponent;