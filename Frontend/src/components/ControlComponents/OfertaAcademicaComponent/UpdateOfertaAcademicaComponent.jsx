import React, { Component } from 'react';
import OfertaAcademicaService from '../../../services/Control/OfertaAcademicaService';
import UnidadService from '../../../services/Control/UnidadService';
import CarreraService from '../../../services/Control/CarreraService';
import Select from 'react-select'
import '../../StyleGlobal/Style.css'
require('dotenv').config();


class UpdateOfertaAcademicaComponent extends Component {
  
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            id_unidad: null,
            id_carrera: null,
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
                unidad: oferta.unidad_academica.nombre_completo, 
                id_unidad: oferta.unidad_academica.id,
                carrera: oferta.carrera.nombre, 
                id_carrera: oferta.carrera.id,
                modalidad: oferta.modalidad,
                turno: oferta.turno,
                periodo: oferta.periodo,
            });
        }).catch(() => {
            alert("Error al intentar traer la oferta academica...");
            this.props.history.push('/list-oferta-academica');
        });


        this.getUnidadList();
        this.getCarrerasList();
        this.getModalidad();
        this.getTurnos();
    }
    updateCarreraById = (e) =>{
        e.preventDefault();
        let oferta = {
            modalidad: this.state.modalidad.trim(),
            turno: this.state.turno.trim(),
            periodo: this.state.periodo.trim()
        };
        
        console.log('oferta => ' + JSON.stringify(oferta));

        OfertaAcademicaService.updateOfertaAcademicaById(
            this.state.id, oferta, this.state.id_unidad, this.state.id_carrera)
        .then(
                () => {
                    this.props.history.push('/list-oferta-academica');
        }).catch(() => {
            alert("Error al intentar actualizar la oferta academica...");
            this.props.history.push('/list-oferta-academica');
        });
    }

    
    async getCarrerasList() {
        let options = null;
        
        await CarreraService.getAllCarreras().then(res => {
            const data = res.data;
            options = data.map(d => ({
                "value": d.nombre,
                "label": d.nombre,
                "id": d.id,
            }))
        }).catch(() => {
            alert("Error al intentar traer las carreras...");
            this.props.history.push('/list-oferta-academica');
        });
        this.setState({ carreras: options });
    }

    async getUnidadList() {
        let options = null;

        await UnidadService.getAllUnidades().then(res => {
            const data = res.data;
            options = data.map(d => ({
                "value": d.nombre_completo,
                "label": d.nombre_completo,
                "id": d.id,
            }))
        }).catch(() => {
            alert("Error al intentar traer las UAs...");
            this.props.history.push('/list-oferta-academica');
        });
        this.setState({unidades: options})
    }

   
    getModalidad() {
        const modalidadList = [
            { value: 'ESCOLARIZADA', label: 'ESCOLARIZADA' },
            { value: 'MIXTA', label: 'MIXTA' },
            { value: 'A DISTANCIA', label: 'A DISTANCIA' }
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
        this.setState({id_unidad: event.id});
    }

    changeCarreraHandler = (event) => {
        this.setState({carrera: event.label});
        this.setState({id_carrera: event.id});
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
                                             placeholder="Seleccione una nivel Académico..."
                                             options={this.state.turnos} 
                                            onChange={this.changeTurnoHandler}
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