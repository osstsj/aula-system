import React, { Component } from 'react';
import PlantelService from '../../../services/Control/PlantelService';
import ExtensionService from '../../../services/Control/ExtensionsService';
import '../../StyleGlobal/Style.css';
import Select from 'react-select'
import axios from 'axios';
require('dotenv').config();


class CreatePlantelComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: 0,
            tipo_unidad: '', 
            clave_dgp: '', 
            abreviatura: '',
            nombre_corto: '', 
            nombre_completo: '', 
            direccion_completa: '',

            disablePlantelList: false,
            direccion: '',
            
            unidad_academica: '',

            unidades: [],

            
        }
        this.changeTipoUnidadHandler = this.changeTipoUnidadHandler.bind(this);
        this.changeClaveDGPHandler = this.changeClaveDGPHandler.bind(this);
        this.changeAbreviaturaHandler = this.changeAbreviaturaHandler.bind(this);
        this.changeNombreCortoHandler = this.changeNombreCortoHandler.bind(this);
        this.changeNombreCompletoHandler = this.changeNombreCompletoHandler.bind(this);
        this.changeDireccionCompletaHandler = this.changeDireccionCompletaHandler.bind(this);
        this.createPlantel = this.createPlantel.bind(this);
        this.onChangeUnidadHandler = this.onChangeUnidadHandler.bind(this);
    }

    createPlantel = (e) =>{
        e.preventDefault();
        if (this.state.disablePlantelList == false) { 
            let plantel = {
                tipo_unidad: this.state.tipo_unidad.trim(), 
                clave_dgp: this.state.clave_dgp.trim(), 
                abreviatura: this.state.abreviatura.trim(),
                nombre_corto: this.state.nombre_corto.trim(), 
                nombre_completo: this.state.nombre_completo.trim(),
                direccion_completa: this.state.direccion_completa.trim(),
            };

            console.log('Unidad Academica => ' + JSON.stringify(plantel));
            
            PlantelService.createPlantel(plantel).then(res => {
                this.props.history.push('/list-plantel');
            });

        } else {
            PlantelService.getPlantelById(this.state.id).then((res) => {
                let plantel = res.data;

                let plantelExtensiones  = {
                    tipo_unidad: this.state.tipo_unidad.trim(),
                    clave_dgp: plantel.clave_dgp.trim(),
                    abreviatura:  this.state.abreviatura.trim(),
                    nombre_corto: this.state.nombre_corto.trim(),
                    nombre_completo: this.state.nombre_completo.trim(),
                    direccion_completa: plantel.direccion_completa.trim()              
                }
               

                console.log('Unidad Academica + Extension => ' + JSON.stringify(plantelExtensiones));
                ExtensionService.createExtensionByPlanteId(this.state.id, plantelExtensiones).then(res => {
                    this.props.history.push('/list-plantel');
                });
            });           
        }   
        
    }

    changeTipoUnidadHandler = (event) => {
        this.setState({tipo_unidad: event.target.value});
        if (event.target.value == 'Extension') {
            this.state.disablePlantelList= true;

            this.setState({clave_dgp: ''});
            this.setState({abreviatura: ''});
            this.setState({nombre_corto: ''});
            this.setState({nombre_completo: ''});
            this.setState({direccion_completa: ''});
            this.setState({unidad_academica: ''});
        } else {
            this.state.disablePlantelList=false;

            this.setState({clave_dgp: ''});
            this.setState({abreviatura: ''});
            this.setState({nombre_corto: ''});
            this.setState({nombre_completo: ''});
            this.setState({direccion_completa: ''});
            this.setState({unidad_academica: ''})
        }
    }
    changeClaveDGPHandler = (event) => {
            this.setState({clave_dgp: event.target.value});
       
    }
    changeAbreviaturaHandler = (event) => {
        this.setState({abreviatura: event.target.value});
    }
    changeNombreCortoHandler = (event) => {
        this.setState({nombre_corto: event.target.value});
        
    }
    changeNombreCompletoHandler = (event) => {
        this.setState({nombre_completo: event.target.value})       
    }
    changeDireccionCompletaHandler = (event) => {
        this.setState({direccion_completa: event.target.value});
    }
    onChangeUnidadHandler = (event) => {
        if (this.state.disablePlantelList === true) {
            this.setState({ unidad_academica: event.label });
            this.setState({ id: event.value })
            this.setState({ clave_dgp: event.dgp })
            this.setState({ direccion_completa: event.direccion })
        } else {
            this.state.disablePlantelList=false;
            this.setState({ unidad_academica: event.label });
        }        
    }
   
    cancel(){
        this.props.history.push('/list-plantel');
    }

    componentDidMount() {
        this.getUnidadList();
    }

    async getUnidadList() {
        const res = await axios.get(process.env.REACT_APP_LOCAL_API_BASE_URL  + "planteles");
        const data = res.data;

        let options = data.map(d => ({
            "value": d.id,
            "label": d.nombre_completo,
            "dgp": d.clave_dgp,
            'direccion': d.direccion_completa,
            'empty': '',
        }))
        this.setState({ unidades: options });
    }


    render() {
        const main={
            minHeight:'100vh',
            display:'flex',
            flexDirection:'column',
            marginBottom:'2rem'
            
        }
       
        return (
            <div  className='' >
                <div className = "container">
                        <div className = "row justify-content-center">
                        <div className="card col-9 mt-4" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                            <div className="card-body">
                                <div className="card-header text-center" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                                    <h2 className="h3 Title">Agregar Unidad Academica</h2>
                                </div>
                                <br />
                                <form>
                                    <div className="row mb-3">
                                    <div className="col">
                                            <div className="form-outline">
                                                <label className="">Unidad Academica: </label>
                                                <select 
                                                    name="tipoUnidad" 
                                                    className="form-control" 
                                                    value={this.state.tipo_unidad} 
                                                    onChange={this.changeTipoUnidadHandler} 
                                                    required
                                                >
                                                    <option value=""  disabled>Seleccione un tipo de UA...</option>
                                                    <option value="Unidad">Unidad academica</option>
                                                    <option value="Extension">Unidad academica con extension</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col">
                                            <div className="form-outline">
                                                <label className="">Lista de unidades academicas: </label>
                                                <Select
                                                    isDisabled={!this.state.disablePlantelList}
                                                    rules={{ required: true }}
                                                    options={this.state.unidades}
                                                    onChange={(e) => this.onChangeUnidadHandler(e)}
                                                    value={{ label: this.state.unidad_academica == '' ? "Seleccione UA..." : this.state.unidad_academica}}
                                                />
                                            </div>
                                        </div>

                                        
                                        <div className="col">
                                            <div className="form-outline">
                                                <label className="">Clave DGP: </label>
                                                <input 
                                                    readOnly= {this.state.disablePlantelList}
                                                    placeholder="Ingrese Clave DGP de UA..." 
                                                    name="ClaveDGP" className="form-control" 
                                                    value={this.state.clave_dgp} 
                                                    onChange={this.changeClaveDGPHandler} 
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col">
                                            <div className="form-outline">
                                                <label className="mt-1">Abreviatura UA: </label>
                                                <input 
                                                    placeholder="Ingrese abreviatura..." 
                                                    name="abreviatura" className="form-control" 
                                                    value={this.state.abreviatura} 
                                                    onChange={this.changeAbreviaturaHandler} 
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-outline">
                                                <label className="mt-1">Nombre Corto UA: </label>
                                                <input 
                                                    placeholder="Ingrese nombre corto de UA..." 
                                                    name="nombreCorto" 
                                                    className="form-control" 
                                                    value={this.state.nombre_corto} 
                                                    onChange={this.changeNombreCortoHandler}
                                                />
                                            </div>
                                        </div>
                                    </div>   

                                    <div className="row mb-3">
                                        <div className="col">
                                            <div className="form-outline">
                                                <label className="mt-1">Nombre Completo UA: </label>
                                                <input 
                                                    placeholder="Ingrese nombre completo de UA..." 
                                                    name="nombreCompleto" 
                                                    className="form-control" 
                                                    value={this.state.nombre_completo} 
                                                    onChange={this.changeNombreCompletoHandler}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                       
                                        <div className="form-group">
                                            <label className="mt-3">Direccion completa UA: </label>
                                            <textarea 
                                                readOnly= {this.state.disablePlantelList}
                                                name="direccionCompleta" 
                                                className="form-control" 
                                                value={this.state.direccion_completa} 
                                                onChange={this.changeDireccionCompletaHandler}
                                            > </textarea>
                                        </div>

                                    <br />
                                        <div className="card-footer text-muted">
                                            <button className = "btn btn-primary" onClick={this.createPlantel}>Guardar</button>
                                            <button className = "btn btn-danger" onClick={this.cancel.bind(this)} style= {{marginLeft: "10px"}}>Cancelar</button>
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

export default CreatePlantelComponent;