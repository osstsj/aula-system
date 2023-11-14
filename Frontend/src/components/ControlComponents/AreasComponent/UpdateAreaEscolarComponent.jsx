import React, {Component} from 'react'
import AreaEscolarService from '../../../services/Control/AreaEscolarService';
import UnidadService from '../../../services/Control/UnidadService';
import Select from 'react-select'
import '../../StyleGlobal/Style.css'



class UpdateAreaEscolarComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            unidades: [],
            id: this.props.match.params.id,
            id_unidad: null,
            area: '',
            responsable: '',
            unidad_academica: ''
        }

        this.onChangeAreasHandler = this.onChangeAreasHandler.bind(this);
        this.onChangeResponsableHandler = this.onChangeResponsableHandler.bind(this);
        this.onChangeUnidadAcademicaHandler = this.onChangeUnidadAcademicaHandler.bind(this);
    }

    updateAreaEscolar = (e) => {
        e.preventDefault();
        
        let area = {
            area: this.state.area,
            responsable: this.state.responsable,
        }

        console.log('Area =>' + JSON.stringify(area));
        AreaEscolarService.updateAreaEscolarById(area, this.state.id, this.state.id_unidad).then(
            res => {
                this.props.history.push('/list-area')
            }
        );
    }

    componentDidMount() {
        AreaEscolarService.getAreaEscolarById(this.state.id).then((res) => {
            let areaRes = res.data;
            this.setState({
                area: areaRes.area,
                responsable: areaRes.responsable,
                unidad_academica: areaRes.unidad_academica.nombre_completo,
                id_unidad: areaRes.unidad_academica.id,
            });
        });

        this.getUnidadList();
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
            this.props.history.push('/list-area');
        });
        this.setState({unidades: options})
    }

    onChangeAreasHandler = (event) => {
        this.setState({area: event.target.value});
    }
    onChangeResponsableHandler = (event) => {
        this.setState({responsable: event.target.value});
    }
    onChangeUnidadAcademicaHandler = (event) => {
        this.setState({unidad_academica: event.label});
        this.setState({id_unidad: event.id});
    }
    
    cancel() {
        this.props.history.push('/list-area');
    }

    render() {
        return (
            <div className="container" >
                <div className="row justify-content-center">
                    <div className="card card col-9 mt-4" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                        <div className="card-body">
                            <div className="card-header text-center" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                                <h2 className="h3 Title">Actualizar Área Escolar</h2>
                            </div>
                            <br />
                        <form>
                            <div className="row mb-3">
                                <div className="col">
                                    <div className="form-outline">
                                        <label>Área</label>
                                        <input type="text" 
                                            placeholder="Ingrese nombre del area..." 
                                            className="form-control"  name="area"
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
                                        <input type="text" className="form-control" 
                                            placeholder='Ingrese nombre del Responsable...'
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
                                            value=
                                            {{
                                                label: this.state.unidad_academica
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
                            <button className="btn btn-warning mt-0" onClick={this.updateAreaEscolar}>Actualizar</button>
                            <button className="btn btn-danger mt-0" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancelar</button>
                        </div>
                    </div>
                    </div>
            </div>

        )
    }
}

export default UpdateAreaEscolarComponent;
