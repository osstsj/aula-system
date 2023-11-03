import React, {Component} from 'react';
import AreaService from '../../../services/Control/AreaService';
import Select from 'react-select'
import axios from 'axios';
import '../../StyleGlobal/Style.css'



class CreateAreaComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            planteles:[],

            area: '',
            responsable: '',
            unidad_academica:'',
            isLoading: false, // Nuevo estado para controlar la visibilidad del spinner

        }

        this.onChangeAreasHandler = this.onChangeAreasHandler.bind(this);
        this.onChangeResponsableHandler = this.onChangeResponsableHandler.bind(this);
        this.onChangeUnidadAcademicaHandler = this.onChangeUnidadAcademicaHandler.bind(this);
    }

    componentDidMount() {
        this.getPlantelesList();
    }

    saveArea = (e) => {
         // Validar que los campos requeridos no estén vacíos
         if (this.state.area.trim() === '' || this.state.responsable.trim() === '' || this.state.unidad_academica.trim() === '' ) {
            alert('Por favor complete todos los campos requeridos.');
            return;
        }
        e.preventDefault();

        let area = {
            area: this.state.area.trim(),
            responsable: this.state.responsable.trim(),
            unidad_academica: this.state.unidad_academica.trim()
        }
          // Mostrar el spinner al iniciar la acción
          this.setState({ isLoading: true });
        console.log('Area => ' + JSON.stringify(area));
        AreaService.createArea(area).then(
            res => {
                this.props.history.push('list-area')
            }
        );

            
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
        this.props.history.push('list-area');
    }


    render() {

        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="card col-9 mt-4" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                        <div className="card-body">
                            <div className="card-header text-center" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                                <h2 className='h3 Title'>Agregar Área  Escolar</h2>
                            </div>
                            <br />
                        <form>
                            <div className="row mb-3">
                                <div className="col">
                                    <div className="form-outline">
                                        <label>Área</label>
                                        <input type="text" 
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
                                                label: this.state.unidad_academica === '' ? 
                                                "Seleccione unidad académica...": this.state.unidad_academica
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
                        {this.state.isLoading ? (
                                // Mostrar el spinner si isLoading es true
                                <div className="text-center">
                                    <div className="spinner-border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            ) : (
                                <button className="btn btn-primary mt-0" onClick={this.saveArea}>Guardar</button>
                                )}
                            <button className="btn btn-danger mt-0" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancelar</button>
                        </div>
                    </div>
                    </div>
            </div>

        )
    }
}

export default CreateAreaComponent;