import React, { Component } from 'react';
import CarreraPorUnidadService from '../../../services/Control/CarreraPorUnidadService';
import CarreraService from '../../../services/Control/CarreraService';
import UnidadService from '../../../services/Control/UnidadService';

import Select from 'react-select'
import '../../StyleGlobal/Style.css'

class CreateCarreraPorUnidadComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            carreras: [],
            unidades: [],
            modalidades: [],
            niveles: [],
            id_unidad: null,

            carrera_nombre: '',
            unidad_academica: '',
            modalidad: '',
            nivel: '',
            isLoading: false, // Nuevo estado para controlar la visibilidad del spinner

        }

    }

    createCarreraPorUnidad = (e) => {
        // Validar que los campos requeridos no estén vacíos
        if (this.state.carrera_nombre.trim() === '' || this.state.unidad_academica.trim() === '' || this.state.modalidad.trim() === '' || this.state.nivel.trim() === '') {
            alert('Por favor complete todos los campos requeridos.');
            return;
        }
        e.preventDefault();
        let cPorU = {
            carrera_nombre: this.state.carrera_nombre.trim(),
            modalidad: this.state.modalidad.trim(),
            nivel: this.state.nivel.trim()
        }
        // Mostrar el spinner al iniciar la acción
        this.setState({ isLoading: true });
        console.log('Carrera por unidad academica: ' + JSON.stringify(cPorU));

        CarreraPorUnidadService.createCarreraPorUnidad(cPorU, this.state.id_unidad).then(
            res => {
                this.props.history.push('/list-carrera_por_unidad')
        }).catch(() => {
            alert("Error al intentar crear la carrera por unidad...");
            this.props.history.push('/list-carrera_por_unidad');
        });

    }
    componentDidMount() {
        this.getCarrerasList();
        this.getUnidadList();
        this.getModalidad();
        this.getNivel();
    }

    async getCarrerasList() {
        let options = null;
        
        await CarreraService.getAllCarreras().then(res => {
            const data = res.data;
            options = data.map(d => ({
                "value": d.nombre,
                "label": d.nombre
            }))
        }).catch(() => {
            alert("Error al intentar traer las carreras...");
            this.props.history.push('/list-carrera_por_unidad');
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
            this.props.history.push('/list-carrera_por_unidad');
        });
        this.setState({unidades: options})
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
    changeUnidadesHandler = (event) => {
        this.setState({ unidad_academica: event.label });
        this.setState({ id_unidad: event.id });
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
                <div className="row justify-content-center">
                    <div className="card col-9 mt-3 " style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }} >
                        <div className="card-body">
                            <div className="card-header text-center" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                                <h2 className='h3 Title'   >Agregar Carrera Por Unidad Académica</h2>
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
                                                value={{ label: this.state.carrera_nombre === "" ? "Seleccione un carrera..." : this.state.carrera_nombre }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col">
                                        <div className="form-outline">
                                            <label>Nivel Académico</label>
                                            <Select
                                                options={this.state.niveles}
                                                onChange={(e) => this.changeNivelHandler(e)}
                                                value={{ label: this.state.nivel === "" ? "Seleccione un nivel académico..." : this.state.nivel }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col">
                                        <div className="form-outline">
                                            <label>Lista de Unidades Académicas</label>
                                            <Select
                                                options={this.state.unidades}
                                                onChange={(e) => this.changeUnidadesHandler(e)}
                                                value={{ label: this.state.unidad_academica === "" ? "Seleccione una UA..." : this.state.unidad_academica }}
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
                                                value={{ label: this.state.modalidad === "" ? "Seleccione una modalidad..." : this.state.modalidad }}
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
                                <button className="btn btn-primary mt-0" onClick={this.createCarreraPorUnidad}>Agregar</button>
                            )}
                            <button className="btn btn-danger mt-0" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default CreateCarreraPorUnidadComponent;
