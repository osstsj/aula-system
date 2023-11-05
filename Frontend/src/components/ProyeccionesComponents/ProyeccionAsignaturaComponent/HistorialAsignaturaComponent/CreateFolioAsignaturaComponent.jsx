// por defecto agregar tipo de folio "asignatura: 'asignatura'"
//letra, numero[0-9], periodo, A o B // todo debe guardarse en mayuscula
//E - 09 - 2023 - B
// <input type="number" min="1900" max="2099" step="1" value="2016" />
// al final debe mostrar en un modal con el folio generado para que el usuario confirme 
// y se pueda proceder con el registro.

import React, { Component } from "react";
import FolioService from "../../../../services/Proyecciones/FolioService";
import '../../../StyleGlobal/Style.css';

class CreateFolioAsignaturaComponent extends Component{
    constructor(props) {
        super(props)

        this.state = {
            letra: '',
            numero: 0,
            periodo: 0,
            periodoAoB: '',

            isLoading: false, // Nuevo estado para controlar la visibilidad del spinner
        }
    }

    createFolio = (e) => {
        e.preventDefault();
         // Validar que los campos requeridos no estén vacíos
        if (this.state.letra.trim() === '' || this.state.numero === 0 || this.state.periodo === 0 || this.state.periodoAoB.trim() === '') {
            alert('Por favor complete todos los campos requeridos.');
        return;
        }

        let folio = { 
            letra: this.state.letra.trim().toUpperCase(),
            numero: this.state.numero,
            periodo: this.state.periodo,
            periodoAoB: this.state.periodoAoB.trim().toUpperCase()
        }
        // Mostrar el spinner al iniciar la acción
        this.setState({ isLoading: true });
                
        console.log('folio=>' + JSON.stringify(folio));
        FolioService.createFolio(folio).then(() => {
            this.props.history.push('/list-folio-asignatura');
        });
    }

    onChangeLetraHandler = (event) => {
        this.setState({letra: event.target.value});
    }
    onChangeNumeroHandler = (event) =>  {
        // if (event.target.value.isString)
        this.setState({numero: event.target.value});
    }
    onChangePeriodoHandler = (event) => {
        this.setState({periodo: event.target.value});
    }
    onChangePeriodoAoBHandler = (event) => {
            this.setState({periodoAoB: event.target.value});
    }
     
    cancel() {
        this.props.history.push('/list-folio-asignatura');
    }


    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="card col-9 mt-3" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                        <div className="card-body">
                            <div className="card-header text-center" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                                <h2 className="h3 Title">Agregar Folio - Proyeccion por Asignatura</h2>
                            </div>
                            <br />
                            <form>
                                <div className="row justify-content-center">
                                    <small>Ejemplo: E9 - 2023B</small>
                                </div>
                                <br />
                                <fieldset>
                                    <legend>Select a maintenance drone:</legend>

                                <div className="row mb-3">
                                    <div className="col">
                                        <div className="form-outline">
                                            <label>Ingrese Letra:</label>
                                            <input 
                                                type="text" 
                                                name="" id="" 
                                                className="form-control" 
                                                // pattern="[A-Za-z]{1}" 
                                                title= "Ingrese solo una letra..."
                                                value={this.state.letra}
                                                onChange={this.onChangeLetraHandler}
                                                required/>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="form-outline">
                                            <label>Ingrese Numero:</label>
                                            <input 
                                                type="number" 
                                                name="" 
                                                id="" 
                                                className="form-control" 
                                                title="Ingrese solo numeros..."
                                                value={this.state.numero}
                                                onChange={this.onChangeNumeroHandler}
                                                required/>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="form-outline">
                                            <label>Ingrese Periodo:</label>
                                            <input 
                                                type="number" 
                                                name="" id="" 
                                                className="form-control" 
                                                min="2022" 
                                                max="2099" 
                                                step="1" 
                                                title="Ingrese solo numeros..."
                                                onChange={this.onChangePeriodoHandler}
                                                value={this.state.periodo}
                                                required/>
                                        </div>
                                    </div>

                                    <div className="col">
                                    <label className="">Seleccione A o B: </label>
                                        <div className="row">
                                            <div className="col">
                                                <div className="form-outline">
                                                    <div>                                                  
                                                        <select name="" className='form-control'  
                                                            style={{width: '270%'}}
                                                            value={this.state.periodoAoB}
                                                            onChange={this.onChangePeriodoAoBHandler} 
                                                            required
                                                        >
                                                            <option value="" disabled>Seleccione A o B...</option>
                                                            <option value="A">A</option>
                                                            <option value="B">B</option>
                                                        </select>

                                                        {/* <input 
                                                            type="radio" 
                                                            id="a" 
                                                            name="drone"  
                                                            value={this.state.periodoAoB = 'A'}
                                                            onChange={(e) => this.onChangePeriodoAoBHandler(e)}
                                                            style={{ margin: "0.4rem"}}
                                                        />
                                                        <label for="a">A</label> */}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="col">
                                                <div className="form-outline">
                                                    <div>
                                                        {/* <input 
                                                            type="radio" 
                                                            id="b" 
                                                            name="drone" 
                                                            value={this.state.periodoAoB = 'B'}
                                                            onChange={(e) => this.onChangePeriodoAoBHandler(e)}
                                                            style={{ margin: "0.4rem"}}
                                                            />
                                                        <label for="b">B</label> */}
                                                    </div>
                                                </div>
                                            </div>                 
                                        </div>
                                                              
                                    </div>

                                    <div className="col">
                                        <div className="form-outline">
                                            <label>Tipo de Folio:</label>
                                            <input 
                                                readOnly={true}
                                                type="text" 
                                                name="" 
                                                id="" 
                                                value={"Asignatura"}
                                                className="form-control" 
                                                // title= "Ingrese solo una letra..."
                                                />
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
                            <button className="btn btn-danger mt-0" style={{ marginLeft: "10px" }}  onClick={this.cancel.bind(this)}>Cancelar</button>
                        
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateFolioAsignaturaComponent;