import React, { Component } from 'react';
import CarreraPorUnidadService from '../../../services/Control/CarreraPorUnidadService';
import Select from 'react-select'
import axios from 'axios';
import '../../StyleGlobal/Style.css'



class UpdateCarreraPorUnidadComponent extends Component {
  
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            //inicializacion para lista de select
            carreras:[],
            planteles:[],
            modalidades:[],
            niveles:[],
            
            carrera_nombre: '',
            unidad_academica: '',
            modalidad: '',
            nivel: ''
        }
        
    }
    componentDidMount() {
        CarreraPorUnidadService.getCarreraPorUnidadById(this.state.id).then((res) => {
            let unidad = res.data;
            this.setState({
                carrera_nombre: unidad.carrera_nombre, 
                unidad_academica: unidad.unidad_academica, 
                modalidad: unidad.modalidad,
                nivel: unidad.nivel
            });
        });

        this.getCarrerasList();
        this.getPlantelesList();
        this.getModalidad();
        this.getNivel();
    }
    updateCarrera = (e) =>{
        e.preventDefault();
        let unidad = {
            carrera_nombre: this.state.carrera_nombre.trim(), 
            unidad_academica: this.state.unidad_academica.trim(), 
            modalidad: this.state.modalidad.trim(),
            nivel: this.state.nivel.trim()
        };
        
        console.log('unidad => ' + JSON.stringify(unidad));
        
        CarreraPorUnidadService.updateCarreraPorUnidadById(unidad, this.state.id).then(res => {
            this.props.history.push('/list-carrera_por_unidad');
        });
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


    changeCarrerasHandler  = (event) => {
        this.setState({carrera_nombre: event.label});
    }

    changePlantelesHandler = (event) => {
        this.setState({unidad_academica: event.label});
    }
    
    changeModalidadHandler = (event) => {
        this.setState({modalidad: event.label});
    }

    changeNivelHandler = (event) => {
        this.setState({nivel: event.label});
    }

    
   
    cancel(){
        this.props.history.push('/list-carrera_por_unidad');
    }
    render() {
       
         return (
            <div className="container"  >
                <div className="row justify-content-center">
                    <div className="card col-9 mt-4">
                        <div className="card-body">
                            <div className="card-header text-center" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                                <h2 className='h3 Title'>Actualizar Carrera Por Unidad Academica</h2>
                            </div>
                            <br />
                            <form>
                                 <div className="row mb-3">
                                    <div className="col">
                                        <div className="form-outline">
                                            <label>Lista de Carreras</label>
                                            <Select 
                                                 options={this.state.carreras} 
                                                onChange={this.changeCarrerasHandler} 
                                                value={{ label: this.state.carrera_nombre }}

                                                 />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="row mb-3">
                                    <div className="col">
                                        <div className="form-outline">
                                            <label>Niveles Academico</label>
                                            <Select
                                             placeholder="Seleccione una nivel Academico..."
                                             options={this.state.niveles} 
                                            onChange={this.changeNivelHandler}
                                             value={{ label: this.state.nivel }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col">
                                        <div className="form-outline">
                                        <label>Lista de Planteles</label>
                                            <Select 
                                            placeholder="Seleccione una lista de planteles..."
                                            options={this.state.planteles} 
                                            onChange={this.changePlantelesHandler}
                                            value={{ label: this.state.unidad_academica }} />
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col">
                                        <div className="form-outline">
                                        <label>Modalidades</label>
                                            <Select
                                             options={this.state.modalidades} 
                                            onChange={this.changeModalidadHandler}
                                             value={{ label: this.state.modalidad }}
                                              />
                                        </div>
                                    </div>
                                </div>
                                <br></br>
                                <div className="card-footer text-muted">
                                <button className = "btn btn-warning" onClick={this.updateCarrera}>Actualizar</button>
                                <button className = "btn btn-danger"  onClick={this.cancel.bind(this)}   style= {{marginLeft: "10px"}}>Cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UpdateCarreraPorUnidadComponent;