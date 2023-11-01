import React, {Component} from 'react'
import AreaService from '../../../services/Control/AreaService';
import Select from 'react-select'
import axios from 'axios';
import '../../StyleGlobal/Style.css'



class UpdateAreaComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            planteles: [],
            id: this.props.match.params.id,
            area: '',
            responsable: '',
            unidad_academica: ''
        }

        this.onChangeAreasHandler = this.onChangeAreasHandler.bind(this);
        this.onChangeResponsableHandler = this.onChangeResponsableHandler.bind(this);
        this.onChangeUnidadAcademicaHandler = this.onChangeUnidadAcademicaHandler.bind(this);
    }

    updateArea = (e) => {
        e.preventDefault();
        
        let area = {
            area: this.state.area,
            responsable: this.state.responsable,
            unidad_academica: this.state.unidad_academica
        }

        console.log('Area =>' + JSON.stringify(area));
        AreaService.updateAreaById(area, this.state.id).then(
            res => {
                this.props.history.push('/list-area')
            }
        );
    }

    componentDidMount() {
        AreaService.getAreaById(this.state.id).then((res) => {
            let areaRes = res.data;
            this.setState({
                area: areaRes.area,
                responsable: areaRes.responsable,
                unidad_academica: areaRes.unidad_academica
            });
        });

        this.getPlantelesList();
    }

    async getPlantelesList() {
        const res = await axios.get(process.env.REACT_APP_LOCAL_API_BASE_URL  + "planteles");
        const data = res.data;

        let options = data.map(d => ({
            "value": d.nombre_completo,
            "label": d.nombre_completo
        }))
        this.setState({planteles: options});
    }

    onChangeAreasHandler = (event) => {
        this.setState({area: event.target.value});
    }
    onChangeResponsableHandler = (event) => {
        this.setState({responsable: event.target.value});
    }
    onChangeUnidadAcademicaHandler = (event) => {
        this.setState({unidad_academica: event.label});
    }
    
    cancel() {
        this.props.history.push('/list-area');
    }

    render() {
        return (
            <div className="container" >
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3 mt-5" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                        <div className="card-body">
                            <div className="card-header text-center">
                                <h2 className='h3'>Agregar Area Escolar</h2>
                            </div>
                            <br />
                        <form>
                            <div className="row mb-3">
                                <div className="col">
                                    <div className="form-outline">
                                        <label>Area</label>
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
                                    <label>Unidad academica</label>
                                        <Select 
                                            value=
                                            {{
                                                label: this.state.unidad_academica
                                            }}
                                            options={this.state.planteles}
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
                            <button className="btn btn-warning" onClick={this.updateArea}>Actualizar</button>
                            <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancelar</button>
                        </div>
                    </div>
                    </div>
            </div>

        )
    }
}

export default UpdateAreaComponent;
