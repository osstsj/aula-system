// por defecto agregar tipo de folio "asignatura: 'asignatura'"
//letra, numero[0-9], periodo, A o B // todo debe guardarse en mayuscula
//E - 09 - 2023 - B
// <input type="number" min="1900" max="2099" step="1" value="2016" />
// al final debe mostrar en un modal con el folio generado para que el usuario confirme 
// y se pueda proceder con el registro.

import React, { Component } from "react";

class CreateFolioAsignaturaComponent extends Component{
    constructor(props) {
        super(props)

        this.state = {
            letra: '',
            numero: 0,
            periodo: 0,
            periodoAoB: '',

            folio: '',

            isLoading: false, // Nuevo estado para controlar la visibilidad del spinner
        }
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
                                    <small>Ejemplo: E - 9 - 2023 - B</small>
                                </div>
                                <br />
                                <div className="row mb-3">
                                    <div className="col">
                                        <div className="form-outline">
                                            <label>Ingrese Letra:</label>
                                            <input 
                                                type="text" 
                                                name="" id="" 
                                                className="form-control" 
                                                pattern="[A-Za-z]{1}" 
                                                title= "Ingrese solo una letra..."
                                                value={this.state.letra}
                                                required/>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="form-outline">
                                            <label>Ingrese Numero</label>
                                            <input 
                                                type="number" 
                                                name="" 
                                                id="" 
                                                className="form-control" 
                                                title="Ingrese solo numeros..."
                                                
                                                required/>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="form-outline">
                                            <label>Ingrese Periodo</label>
                                            <input 
                                                type="number" 
                                                name="" id="" 
                                                className="form-control" 
                                                min="2022" 
                                                max="2099" 
                                                step="1" 
                                                title="Ingrese solo numeros..."
                                                required/>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="form-outline">
                                            <label>Ingrese A o B</label>
                                            <input 
                                                type="text" 
                                                name="" 
                                                id="" 
                                                className="form-control" 
                                                title= "Ingrese solo una letra..."
                                                pattern="[A-Za-z]{1}" required/>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="form-outline">
                                            <label>Tipo de Folio</label>
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
                                <button className="btn btn-primary">Agregar</button>
                            )}
                            <button className="btn btn-danger" style={{ marginLeft: "10px" }}>Cancelar</button>
                        
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateFolioAsignaturaComponent;