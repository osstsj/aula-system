import React, { Component } from 'react';
import CarreraPorUnidadService from '../../../services/Control/CarreraPorUnidadService';
import Select from 'react-select'
import axios from 'axios';
import '../../StyleGlobal/Style.css'

class CreateCarreraPorUnidadComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            carreras: [],
            planteles: [],
            modalidades: [],
            niveles: [],

            carrera_nombre: '',
            unidad_academica: '',
            modalidad: '',
            nivel: '',
            isLoading: false, // Nuevo estado para controlar la visibilidad del spinner

        }

    }

    saveCarreraPorUnidad = (e) => {
        // Validar que los campos requeridos no estén vacíos
        if (this.state.carrera_nombre.trim() === '' || this.state.unidad_academica.trim() === '' || this.state.modalidad.trim() === '' || this.state.nivel.trim() === '') {
            alert('Por favor complete todos los campos requeridos.');
            return;
        }
        e.preventDefault();
        let cPorU = {
            carrera_nombre: this.state.carrera_nombre,
            unidad_academica: this.state.unidad_academica,
            modalidad: this.state.modalidad,
            nivel: this.state.nivel
        }
        // Mostrar el spinner al iniciar la acción
        this.setState({ isLoading: true });
        console.log('Carrera por unidad academica: ' + JSON.stringify(cPorU));

        CarreraPorUnidadService.createCarreraPorUnidad(cPorU).then(
            res => {
                this.props.history.push('/list-carrera_por_unidad')
            });

    }
    componentDidMount() {
        this.getCarrerasList();
        this.getPlantelesList();
        this.getModalidad();
        this.getNivel();
    }

    async getCarrerasList() {
        const res = await axios.get(process.env.REACT_APP_LOCAL_API_BASE_URL  + 'carreras');
        const data = res.data;

        let options = data.map(d => ({
            "value": d.nombre,
            "label": d.nombre
        }))
        this.setState({ carreras: options });
    }

    async getPlantelesList() {
        const res = await axios.get(process.env.REACT_APP_LOCAL_API_BASE_URL  + "planteles");
        const data = res.data;

        let options = data.map(d => ({
            "value": d.nombre_completo,
            "label": d.nombre_completo
        }))
        this.setState({ planteles: options });
    }

    getModalidad() {
        const modalidadList = [
            { value: 'ESCOLARIZADA', label: 'ESCOLARIZADA' },
            { value: 'MIXTA', label: 'MIXTA' }
        ]
        this.setState({ modalidades: modalidadList })
    }

    getNivel() {
        const nivelList = [
            { value: 'LICENCIATURA', label: 'LICENCIATURA' },
            { value: 'INGENIERIA', label: 'INGENIERIA' },
            { value: 'MAESTRIA', label: 'MAESTRIA' },
            { value: 'DOCTORADO', label: 'DOCTORADO' },
        ]

        this.setState({ niveles: nivelList });
    }

    changeCarrerasHandler = (event) => {
        this.setState({ carrera_nombre: event.label });
    }
    changePlantelesHandler = (event) => {
        this.setState({ unidad_academica: event.label });
    }
    changeModalidadHandler = (event) => {
        this.setState({ modalidad: event.label });
    }
    changeNivelHandler = (event) => {
        this.setState({ nivel: event.label });
    }

    cancel() {
        this.props.history.push('/list-carrera_por_unidad');
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3 mt-5 " style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }} >
                        <div className="card-body">
                            <div className="card-header text-center" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                                <h2 className='h3 Title'   >Agregar Carrera Por Unidad</h2>
                            </div>
                            <br />
                            <form>
                                <div className="row mb-3">
                                    <div className="col">
                                        <div className="form-outline">
                                            <label>Lista de Carreras</label>
                                            <Select
                                                rules={{ required: true }}
                                                options={this.state.carreras}
                                                onChange={(e) => this.changeCarrerasHandler(e)}
                                                placeholder="Seleccione un carrera..."
                                                value={{ label: this.state.carrera_nombre == "" ? "Seleccione un carrera..." : this.state.carrera_nombre }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col">
                                        <div className="form-outline">
                                            <label>Nivel Academico</label>
                                            <Select
                                                options={this.state.niveles}
                                                onChange={(e) => this.changeNivelHandler(e)}
                                                placeholder="Seleccione un nivel academico..."
                                                value={{ label: this.state.nivel == "" ? "Seleccione un nivel academico..." : this.state.nivel }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col">
                                        <div className="form-outline">
                                            <label>Lista de Planteles</label>
                                            <Select
                                                options={this.state.planteles}
                                                onChange={(e) => this.changePlantelesHandler(e)}
                                                placeholder="Seleccione un plantel..."
                                                value={{ label: this.state.unidad_academica == "" ? "Seleccione un plantel..." : this.state.unidad_academica }}
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
                                                value={{ label: this.state.modalidad == "" ? "Seleccione una modalidad..." : this.state.modalidad }}
                                            />
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
                                <button className="btn btn-primary" onClick={this.saveCarreraPorUnidad}>Agregar</button>
                            )}
                            <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default CreateCarreraPorUnidadComponent;
