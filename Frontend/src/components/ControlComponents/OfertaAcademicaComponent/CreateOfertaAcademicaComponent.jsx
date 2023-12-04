import React, { Component } from 'react';
import OfertaAcademicaService from '../../../services/Control/OfertaAcademicaService';
import UnidadService from '../../../services/Control/UnidadService';
import CarreraService from '../../../services/Control/CarreraService';
import Select from 'react-select'
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

            id_unidad: null,
            id_carrera: null,

            unidad: '',
            carrera: '',
            modalidad: '',
            turno: '',
            periodo: '',
            isLoading: false, // Nuevo estado para controlar la visibilidad del spinner      
            alert:null
        }

    }

    saveOfertaAcademica = (e) => {
        // Validar que los campos requeridos no estén vacíos
        if ( this.state.unidad.trim() === '' || 
        this.state.carrera.trim() === '' || 
        this.state.modalidad.trim() === '' || 
        this.state.turno.trim() === '' || 
        this.state.periodo.trim() === '') {
            this.setState({
                alert: (
                    <div className="alert alert-dismissible alert-danger">
                         Por favor complete todos los campos requeridos.
                    </div>
                ),
            });
            return;
        }

        e.preventDefault();
        let oferta = {
            modalidad: this.state.modalidad.trim(),
            turno: this.state.turno.trim(),
            periodo: this.state.periodo.trim()

        }
        // Mostrar el spinner al iniciar la acción
        this.setState({ isLoading: true });
        console.log('Oferta academicas : ' + JSON.stringify(oferta));

        OfertaAcademicaService.createOfertaAcademica(oferta, this.state.id_unidad, this.state.id_carrera).then(
            () => {
                this.props.history.push('/list-oferta-academica')
        }).catch(() => {
            alert("Error al intentar crear la oferta academica...");
            this.props.history.push('/list-oferta-academica');
        });

    }

    componentDidMount() {

        this.getUnidadList();
        this.getCarrerasList();
        this.getModalidad();
        this.getTurno();
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
        this.setState({ id_unidad: event.id, alert:null})
    }
    changeCarreraHandler = (event) => {
        this.setState({ carrera: event.label });
        this.setState({ id_carrera: event.id, alert:null})
    }
    changeModalidadHandler = (event) => {
        this.setState({ modalidad: event.label, alert:null });
    }
    changeTurnoHandler = (event) => {
        this.setState({ turno: event.label, alert:null });
    }
    changePeriodoHandler = (event) => {
        this.setState({ periodo: event.target.value, alert:null });
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

                        {this.state.alert}

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