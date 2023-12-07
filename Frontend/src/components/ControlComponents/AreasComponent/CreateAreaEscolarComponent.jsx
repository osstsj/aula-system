import React, { Component } from 'react';
import AreaEscolarService from '../../../services/Control/AreaEscolarService';
import UnidadService from '../../../services/Control/UnidadService';
import Select from 'react-select'
import '../../StyleGlobal/Style.css'

class CreateAreaEscolarComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            unidades: [],
            id_unidad: null,

            area: '',
            responsable: '',
            unidad_academica: '',
            isLoading: false, // Nuevo estado para controlar la visibilidad del spinner
            alert: null, // Nuevo estado para mostrar alerta
        }

        this.onChangeAreasHandler = this.onChangeAreasHandler.bind(this);
        this.onChangeResponsableHandler = this.onChangeResponsableHandler.bind(this);
        this.onChangeUnidadAcademicaHandler = this.onChangeUnidadAcademicaHandler.bind(this);
    }

    componentDidMount() {
        this.getUnidadList();
    }

    createAreaEscolar = (e) => {
        // Validar que los campos requeridos no estén vacíos
        if (this.state.area.trim() === '' || this.state.responsable.trim() === '' || this.state.unidad_academica.trim() === '') {
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

        let area = {
            area: this.state.area,
            responsable: this.state.responsable,
        }

        // Mostrar el spinner al iniciar la acción
        this.setState({ isLoading: true });

        console.log('Area Escolar => ' + JSON.stringify(area));
        AreaEscolarService.createAreaEscolar(area, this.state.id_unidad)
            .then(() => {
                this.props.history.push('/list-area')
            })
            .catch(() => {
                this.setState({
                    alert: (
                        <div className="alert alert-dismissible alert-danger">
                            <strong>Error:</strong> Error al intentar crear el área.
                        </div>
                    ),
                });
                this.props.history.push('/list-area');
            });
    }

    async getUnidadList() {
        let options = null;

        await UnidadService.getAllUnidades()
            .then(res => {
                const data = res.data;
                options = data.map(d => ({
                    "value": d.nombre_completo,
                    "label": d.nombre_completo,
                    "id": d.id,
                }))
            })
            .catch(() => {
                this.setState({
                    alert: (
                        <div className="alert alert-dismissible alert-danger">
                            <strong>Error:</strong> Error al intentar traer las UAs...
                        </div>
                    ),
                });
                this.props.history.push('/list-area');
            });
        this.setState({ unidades: options })
    }

    onChangeAreasHandler = (event) => {
        this.setState({ area: event.target.value, alert: null });
    }
    onChangeResponsableHandler = (event) => {
        this.setState({ responsable: event.target.value , alert: null});
    }
    onChangeUnidadAcademicaHandler = (event) => {
        this.setState({ unidad_academica: event.label});
        this.setState({ id_unidad: event.id , alert: null });
    }

    cancel() {
        this.props.history.push('list-area');
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="card col-9 mt-4" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                        <div className="card-body">
                            <div className="card-header text-center" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                                <h2 className='h3 Title'>Agregar Área Escolar</h2>
                            </div>
                            <br />
                            <form>
                                <div className="row mb-3">
                                    <div className="col">
                                        <div className="form-outline">
                                            <label>Área</label>
                                            <input
                                                type="text"
                                                placeholder="Ingrese nombre del área..."
                                                className="form-control"
                                                name="area"
                                                value={this.state.area}
                                                onChange={this.onChangeAreasHandler}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col">
                                        <div className="form-outline">
                                            <label>Responsable</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder='Ingrese nombre del responsable...'
                                                value={this.state.responsable}
                                                onChange={this.onChangeResponsableHandler}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col">
                                        <div className="form-outline">
                                            <label>Unidad académica</label>
                                            <Select
                                                value={{
                                                    label: this.state.unidad_academica === '' ?
                                                        "Seleccione unidad académica..." : this.state.unidad_academica
                                                }}
                                                options={this.state.unidades}
                                                onChange={(e) => this.onChangeUnidadAcademicaHandler(e)}
                                                required
                                            />
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
                                <button className="btn btn-primary mt-0" onClick={this.createAreaEscolar}>Guardar</button>
                            )}
                            <button className="btn btn-danger mt-0" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateAreaEscolarComponent;
