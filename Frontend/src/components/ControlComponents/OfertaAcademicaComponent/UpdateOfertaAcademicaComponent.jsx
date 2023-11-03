import React, { Component } from 'react';
import OfertaAcademicaService from '../../../services/Control/OfertaAcademicaService';
import Select from 'react-select'
import axios from 'axios';
import '../../StyleGlobal/Style.css'
require('dotenv').config();


class UpdateOfertaAcademicaComponent extends Component {
  
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            //inicializacion para lista de select
            unidades: [],
            carreras: [],
            modalidades: [],
            niveles: [],

            unidad: '',
            carrera: '',
            modalidad: '',
            turno: '',
            periodo: ''
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
            });
        });
        this.getUnidadList();
        this.getCarrerasList();
        this.getModalidad();
        this.getTurnos();
    }
    updateCarreraById = (e) =>{
        e.preventDefault();
        let oferta = {
            unidad: this.state.unidad.trim(), 
            carrera: this.state.carrera.trim(), 
            modalidad: this.state.modalidad.trim(),
            turno: this.state.turno.trim(),
            periodo: this.state.periodo.trim()
        };
        
        console.log('oferta => ' + JSON.stringify(oferta));
        
        OfertaAcademicaService.updateOfertaAcademicaById(oferta, this.state.id).then(res => {
            this.props.history.push('/list-oferta-academica');
        });
    }
    async getUnidadList() {
        const res = await axios.get(process.env.REACT_APP_LOCAL_API_BASE_URL + 'planteles');
        const data = res.data;

        let options = data.map(d => ({
            "value": d.nombre_completo,
            "label": d.nombre_completo
        }))
        this.setState({ unidades: options });
    }


    async getCarrerasList() {
        const res = await axios.get(process.env.REACT_APP_LOCAL_API_BASE_URL + 'carreras');
        const data = res.data;

        let options = data.map(d => ({
            "value": d.nombre,
            "label": d.nombre
        }))
        this.setState({ carreras: options });
    }

   
    getModalidad() {
        const modalidadList = [
            { value: 'ESCOLARIZADA', label: 'ESCOLARIZADA' },
            { value: 'MIXTA', label: 'MIXTA' }
        ]
        this.setState({ modalidades: modalidadList })
    }

    getTurnos() {
        const nivelList = [
            { value: 'MATUTINO', label: 'MATUTINO' },
            { value: 'VESPERTINO', label: 'VESPERTINO' },
            { value: 'MIXTO', label: 'MIXTO' },
        ]

        this.setState({ turnos: nivelList });
    }


    changeunidadesHandler  = (event) => {
        this.setState({unidad: event.label});
    }

    changeCarreraHandler = (event) => {
        this.setState({carrera: event.label});
    }
    
    changeModalidadHandler = (event) => {
        this.setState({modalidad: event.label});
    }

    changeTurnoHandler = (event) => {
        this.setState({turno: event.label});
    }
    changePeriodoHandler = (event) => {
        this.setState({periodo: event.target.value});
    }

    
   
    cancel(){
        this.props.history.push('/list-oferta-academica');
    }
    render() {
         return (
            <div className="container"   >
                <div className="row justify-content-center">
                    <div className="card col-8 mt-4" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                        <div className="card-body">
                            <div className="card-header text-center" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                                <h2 className='h3 Title'>Actualizar Oferta Académica</h2>
                            </div>
                            <br />
                            <form>
                                 <div className="row mb-3">
                                    <div className="col">
                                        <div className="form-outline">
                                            <label>Lista de Unidad</label>
                                            <Select 
                                                 options={this.state.unidades} 
                                                onChange={this.changeunidadesHandler} 
                                                value={{ label: this.state.unidad }}

                                                 />
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col">
                                        <div className="form-outline">
                                        <label>Lista de Carrera</label>
                                            <Select 
                                            placeholder="Seleccione una lista de planteles..."
                                            options={this.state.carreras} 
                                            onChange={this.changeCarreraHandler}
                                            value={{ label: this.state.carrera }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col">
                                        <div className="form-outline">
                                        <label>Modalidades</label>
                                            <Select
                                             options={this.state.modalidades} 
                                            onChange={this.changeModalidadHandler}
                                             value={{ label: this.state.modalidad }}
                                              />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-outline">
                                            <label>Turno</label>
                                            <Select
                                             placeholder="Seleccione una nivel Academico..."
                                             options={this.state.turnos} 
                                            onChange={this.changeNivelHandler}
                                             value={{ label: this.state.turno }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                        <div className="col">
                                            <div className="form-outline">
                                                <label className="">Periodo: </label>
                                                <input placeholder="Ingrese periodo..." name="periodo" className="form-control" 
                                                    value={this.state.periodo} onChange={this.changePeriodoHandler}  required/>
                                            </div>
                                        </div>
                                    </div>
                                <br></br>
                                <div className="card-footer text-muted">
                                <button className = "btn btn-warning mt-0" onClick={this.updateCarreraById}>Actualizar</button>
                                <button className = "btn btn-danger mt-0"  onClick={this.cancel.bind(this)}   style= {{marginLeft: "10px"}}>Cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UpdateOfertaAcademicaComponent;