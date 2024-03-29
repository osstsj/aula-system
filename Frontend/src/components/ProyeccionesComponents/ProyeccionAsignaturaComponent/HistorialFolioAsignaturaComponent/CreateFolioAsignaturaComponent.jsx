// por defecto agregar tipo de folio "asignatura: 'asignatura'"
//letra, numero[0-9], periodo, A o B // todo debe guardarse en mayuscula
//E - 09 - 2023 - B
// <input type="number" min="1900" max="2099" step="1" value="2016" />
// al final debe mostrar en un modal con el folio generado para que el usuario confirme 
// y se pueda proceder con el registro.

import React, { Component } from "react";
import FolioAsignaturaService from "../../../../services/Proyecciones/FolioAsignaturaService";
import UnidadService from "../../../../services/Control/UnidadService";

import '../../../StyleGlobal/Style.css';
import Select from 'react-select'

class CreateFolioAsignaturaComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id_unidad: null,
            numero: 0,
            periodo: 0,

            unidad_academica: '',
            unidades: [],
            periodos: [],

            isLoading: false, // Nuevo estado para controlar la visibilidad del spinner
            periodoAoB: '', // Inicializa el valor según tu necesidad

            tipo_folio: "ASIGNATURA",

        }
    }
    componentDidMount() {
        this.getUnidadList();
        this.getPeriodo();
    }
    
    createFolio = (e) => {
        e.preventDefault();
        // Validar que los campos requeridos no estén vacíos
        if (this.state.unidad_academica === '' || 
            this.state.numero === 0 || 
            this.state.periodo === 0 ||  this.state.periodo === '' ||
            this.state.periodoAoB === ''
        ) {
            alert('Por favor complete todos los campos requeridos.');
            return;
        }

        let folio = {
            numero: this.state.numero,
            periodo: this.state.periodo,
            periodoAoB: this.state.periodoAoB,
            tipo_folio: this.state.tipo_folio,
        }
        // Mostrar el spinner al iniciar la acción
        this.setState({ isLoading: true });

        console.log('folio=>' + JSON.stringify(folio));
        
        FolioAsignaturaService.createFolio(folio, this.state.id_unidad).then(() => {
            this.props.history.push('/list-folio-asignatura');
        }).catch(() => {
            alert("Error al intentar crear el folio...");
            this.props.history.push('/');
        });
    }

    async getSecuenciaNumero(id_unidad, 
        periodo, periodoAoB) {
        let secuencia = 0;

        await FolioAsignaturaService.getSecuenciaNumero(id_unidad, 
            periodo, periodoAoB).then(res => {
                secuencia = res.data;
        }).catch(() => {
            alert("Error al intentar traer las secuencias...");
            this.props.history.push('/');
        });
        this.setState({numero: secuencia})
    }

    async getUnidadList() {
        let options = null;

        await UnidadService.getAllUnidades().then(res => {
            const data = res.data;
            options = data.map(d => ({
               "value": d.tipo_unidad,
                "label": d.abreviatura,
                "abreviatura": d.abreviatura,
                'id': d.id,
            }))
        }).catch(() => {
            alert("Error al intentar traer las UAs...");
            this.props.history.push('/');
        });
        this.setState({unidades: options})
    }

    getPeriodo() {
        const  periodoList = [
            { value: 2023, label: '2023' },
            { value: 2024, label: '2024' },{ value: 2025, label: '2025' },{ value: 2026, label: '2026' },
            { value: 2027, label: '2027' },{ value: 2028, label: '2028' },{ value: 2029, label: '2029' },
            { value: 2030, label: '2030' },{ value: 2031, label: '2031' },{ value: 2032, label: '2032' },
            { value: 2033, label: '2033' },{ value: 2034, label: '2035' },{ value: 2036, label: '2036' },
            { value: 2037, label: '2037' },{ value: 2038, label: '2039' },{ value: 2040, label: '2040' },
            { value: 2041, label: '2041' },{ value: 2042, label: '2042' },{ value: 2043, label: '2043' },
            { value: 2044, label: '2044' },{ value: 2045, label: '2045' },{ value: 2046, label: '2046' },
            { value: 2047, label: '2047' },{ value: 2048, label: '2048' },{ value: 2050, label: '2050' },
            { value: 2051, label: '2051' },{ value: 2052, label: '2052' },{ value: 2053, label: '2053' },
            { value: 2054, label: '2054' },{ value: 2055, label: '2055' },{ value: 2056, label: '2056' },
            { value: 2057, label: '2058' },{ value: 2059, label: '2059' },{ value: 2060, label: '2060' }
        ];

        this.setState({ periodos: periodoList });
    }

    

    onChangeUnidadHandler = (event) => {
        this.setState({ unidad_academica: event.abreviatura });
        this.setState({ id_unidad: event.id });

        if ((this.state.periodo !== 0) & (this.state.periodoAoB !== '')) {
            this.getSecuenciaNumero(event.id,  this.state.periodo, this.state.periodoAoB);
        }
    }
    onChangePeriodoSelectHandler = (event) => {
        this.setState({ periodo: event.value });

        if ((this.state.id_unidad !== null) & (this.state.periodoAoB !== '')) {
            this.getSecuenciaNumero(this.state.id_unidad,  event.value, this.state.periodoAoB);
        }
    }

    onChangePeriodoAoBHandler = (event) => {
        this.setState({ periodoAoB: event.target.value });

        if ((this.state.id_unidad !== null) & (this.state.periodo !== 0)) {
            this.getSecuenciaNumero(this.state.id_unidad, this.state.periodo, event.target.value);
        }
    }

    cancel() {
        this.props.history.push('/list-folio-asignatura');
    }


    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="card col-11 mt-3" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                        <div className="card-body">
                            <div className="card-header text-center" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                                <h2 className="h3 Title">Agregar Folio - Proyección  por Asignatura</h2>
                            </div>
                            <br />
                            <form>
                                <div className="row justify-content-center">
                                    <div className="col" style={{"text-align": "center"}}>
                                        <span><small>Estructura: Abreviatura UA - No Secuencia - Periodo A o B <br /></small></span>
                                        <span><small>Ejemplo: ZA - 3 - 2024 A</small></span>
                                    </div>
                                </div>
                                

                                <br />
                                <fieldset className="border border-info p-3">
                                    <legend className="w-auto text-left h6">Nuevo Folio:</legend>

                                    <div className="row mb-3">
                                        <div className="col-4">
                                            <div className="form-outline">
                                                <label>Unidad Académica:</label>

                                                <Select
                                                    rules={{ required: true }}
                                                    options={this.state.unidades}
                                                    onChange={(e) => this.onChangeUnidadHandler(e)}
                                                    value={{ label: this.state.unidad_academica === '' ? "Seleccione UA..." : this.state.unidad_academica}}
                                                />
                                            </div>
                                        </div>

                                        <div className="col">
                                            <div className="form-outline">
                                                <label>Número:</label>
                                                <input
                                                readOnly
                                                    type="number"
                                                    name=""
                                                    id=""
                                                    min="0"
                                                    // max="2099"
                                                    className="form-control"
                                                    style={{'width' : '10rem'}}
                                                    placeholder="Secuencia..."
                                                    value={this.state.numero}
                                                    required />
                                            </div>
                                        </div>

                                        <div className="col">
                                            <div className="form-outline">
                                                <label>Periodo:</label>

                                                <Select
                                                    rules={{ required: true }}
                                                    options={this.state.periodos}
                                                    onChange={(e) => this.onChangePeriodoSelectHandler(e)}
                                                    value={{ label: this.state.periodo === 0 ? "Periodo..." : this.state.periodo}}
                                                />
                                            </div>
                                        </div>

                                        <div className="col">
                                            <label className="">Seleccione A o B: </label>
                                            <div className="row">
                                                <div className="col">
                                                    <div className="form-outline">
                                                        <div>
                                                            <div>
                                                                <input
                                                                    type="radio"
                                                                    name="periodoAoB"
                                                                    value="A"
                                                                    checked={this.state.periodoAoB === 'A'}
                                                                    onChange={this.onChangePeriodoAoBHandler}
                                                                    style= {{ margin: "0.4rem"}}
                                                                    required
                                                                />
                                                                <label htmlFor="periodoAoB_A">A</label>

                                                            </div>                                                        
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col">
                                                    <div className="form-outline">
                                                        <div>                                                            
                                                            <input
                                                                type="radio"
                                                                name="periodoAoB"
                                                                value="B"
                                                                checked={this.state.periodoAoB === 'B'}
                                                                onChange={this.onChangePeriodoAoBHandler}
                                                                style= {{ margin: "0.4rem"}}
                                                                required                                                                
                                                            />
                                                            <label htmlFor="periodoAoB_B">B</label>                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </fieldset>
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
                                <button className="btn btn-primary mt-0" onClick={this.createFolio}>Agregar</button>
                            )}
                            <button className="btn btn-danger mt-0" style={{ marginLeft: "10px" }} onClick={this.cancel.bind(this)}>Cancelar</button>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateFolioAsignaturaComponent;