import React, { Component } from 'react';
import OfertaAcademicaService from '../../../services/Control/OfertaAcademicaService';
import Select from 'react-select'
import axios from 'axios';
import '../../StyleGlobal/Style.css'
require('dotenv').config();

class CreateOfertaAcademicaComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            unidades: [],
            carreras: [],
            modalidades: [],
            turnos: [],

            unidad: '',
            carrera: '',
            modalidad: '',
            turno: '',
            periodo: '',
            isLoading: false, // Nuevo estado para controlar la visibilidad del spinner      
        }

    }

    saveOfertaAcademica = (e) => {
        // Validar que los campos requeridos no estén vacíos
        if ( this.state.unidad.trim() === '' || this.state.carrera.trim() === '' || this.state.modalidad.trim() === '' || this.state.turno.trim() === '' || this.state.periodo.trim() === '') {
            alert('Por favor complete todos los campos requeridos.');
            return;
        }
        e.preventDefault();
        let oferta = {
            unidad: this.state.unidad.trim(),
            carrera: this.state.carrera.trim(),
            modalidad: this.state.modalidad.trim(),
            turno: this.state.turno.trim(),
            periodo: this.state.periodo.trim()

        }
        // Mostrar el spinner al iniciar la acción
        this.setState({ isLoading: true });
        console.log('Oferta academicas : ' + JSON.stringify(oferta));

        OfertaAcademicaService.createOfertaAcademica(oferta).then(
            res => {
                this.props.history.push('/list-oferta-academica')
            });

    }

    componentDidMount() {

        this.getUnidadList();
        this.getCarrerasList();
        this.getModalidad();
        this.getTurno();
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

    getTurno() {
        const TurnoList = [
            { value: 'MATUTINO', label: 'MATUTINO' },
            { value: 'VESPERTINO', label: 'VESPERTINO' },
            { value: 'MIXTO', label: 'MIXTO' },
        ]

        this.setState({ turnos: TurnoList });
    }

    changeUnidadHandler = (event) => {
        this.setState({ unidad: event.label });
    }
    changeCarreraHandler = (event) => {
        this.setState({ carrera: event.label });
    }
    changeModalidadHandler = (event) => {
        this.setState({ modalidad: event.label });
    }
    changeTurnoHandler = (event) => {
        this.setState({ turno: event.label });
    }
    changePeriodoHandler = (event) => {
        this.setState({ periodo: event.target.value });
    }
    cancel() {
        this.props.history.push('/list-oferta-academica');
    }
    render() {
        return (
            <div className="container" >
                <div className="row justify-content-center">
                    <div className="card col-8 mt-4" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                        <div className="card-body">
                            <div className="card-header text-center" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }} >
                                <h2 className='h3 Title'>Agregar Oferta Académica</h2>
                            </div>
                            <br />
                            <form>
                                <div className="row mb-3">
                                    <div className="col">
                                        <div className="form-outline">
                                            <label>Lista de Unidad</label>
                                            <Select
                                                rules={{ required: true }}
                                                options={this.state.unidades}
                                                onChange={(e) => this.changeUnidadHandler(e)}
                                                placeholder="Seleccione un carrera..."
                                                value={{ label: this.state.unidad === "" ? "Seleccione unidad académica..." : this.state.unidad }}
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
                                                onChange={(e) => this.changeCarreraHandler(e)}
                                                placeholder="Seleccione un plantel..."
                                                value={{ label: this.state.carrera === "" ? "Seleccione una carrera..." : this.state.carrera }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col">
                                        <div className="form-outline">
                                            <label>Modalidades</label>
                                            <Select
                                                options={this.state.modalidades}
                                                onChange={(e) => this.changeModalidadHandler(e)}
                                                placeholder="Seleccione un modalidad..."
                                                value={{ label: this.state.modalidad === "" ? "Seleccione una modalidad..." : this.state.modalidad }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col">
                                        <div className="form-outline">
                                            <label>Turno</label>
                                            <Select
                                                options={this.state.turnos}
                                                onChange={(e) => this.changeTurnoHandler(e)}
                                                placeholder="Seleccione un nivel academico..."
                                                value={{ label: this.state.turno === "" ? "Seleccione un turno..." : this.state.turno }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col">
                                        <div className="form-outline">
                                            <label className="">Periodo: </label>
                                            <input placeholder="Ingrese periodo...(ejemplo: Agosto 2023)" name="periodo" className="form-control"
                                                value={this.state.periodo} onChange={this.changePeriodoHandler} required />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <br />
                        <div className="card-footer text-muted">
                            {this.state.isLoading ? (
                                // Mostrar el spinner si isLoading es true
                                <div className="text-center">
                                    <div className="spinner-border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            ) : (
                                <button className="btn btn-primary mt-0" onClick={this.saveOfertaAcademica}>Agregar</button>
                            )}
                            <button className="btn btn-danger mt-0" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default CreateOfertaAcademicaComponent;