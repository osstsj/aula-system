import React, { Component } from 'react';
import CarreraPorUnidadService from '../../../services/Control/CarreraPorUnidadService';
import UnidadService from '../../../services/Control/UnidadService';
import CarreraService from '../../../services/Control/CarreraService';
import Select from 'react-select'
import '../../StyleGlobal/Style.css'
import swal from 'sweetalert';



class UpdateCarreraPorUnidadComponent extends Component {
  
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            id_unidad: null,
            id_carrera: null,

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
                carrera_nombre: unidad.carrera_nombre.nombre, 
                unidad_academica: unidad.unidad_academica.nombre_completo, 
                id_unidad: unidad.unidad_academica.id,
                modalidad: unidad.modalidad,
                nivel: unidad.nivel
            });
        }).catch(() => {
            alert("Error al intentar traer la carrera por unidad...");
            this.props.history.push('/list-carrera_por_unidad');
        });

        this.getCarrerasList();
        this.getUnidadList();
        this.getModalidad();
        this.getNivel();
    }
    updateCarrera = (e) =>{
        e.preventDefault();
        let unidad = {
            modalidad: this.state.modalidad.trim(),
            nivel: this.state.nivel.trim()
        };
        
        console.log('unidad => ' + JSON.stringify(unidad));
        // por si quieren meter gol por la URL
        CarreraPorUnidadService.checkCarreraPorUnidadById(this.state.id).then( res => {
            if (res.data ===  false) {
                CarreraPorUnidadService.updateCarreraPorUnidadById(this.state.id, unidad, this.state.id_unidad, this.state.id_carrera).then(
                    () => {
                    this.props.history.push('/list-carrera_por_unidad');
                }).catch(() => {
                    alert("Error al intentar actualizar la carrera por unidad...");
                    this.props.history.push('/list-carrera_por_unidad');
                });
            } else {
                swal("Oops!", "La carrera por unidad no es posible eliminar porque esta presente en otros módulos.\n" +
                "por favor verifique: Proyecciones Asignatura/Tiempo Completo", "error");

                this.props.history.push('/list-carrera_por_unidad');
            }
        })
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
            { value: 'MIXTA', label: 'MIXTA' },
            { value: 'A DISTANCIA', label: 'A DISTANCIA' }
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
        this.setState({id_carrera: event.id});
    }

    changeUnidadesHandler = (event) => {
        this.setState({unidad_academica: event.label});
        this.setState({id: event.id});
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
                                <h2 className='h3 Title'>Actualizar Carrera Por Unidad Académica</h2>
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
                                            <label>Niveles Académico</label>
                                            <Select
                                             placeholder="Seleccione una nivel académico..."
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
                                        <label>Lista de Unidades Académicas</label>
                                            <Select 
                                            placeholder="Seleccione una lista de planteles..."
                                            options={this.state.unidades} 
                                            onChange={this.changeUnidadesHandler}
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
                                <button className = "btn btn-warning mt-0" onClick={this.updateCarrera}>Actualizar</button>
                                <button className = "btn btn-danger mt-0"  onClick={this.cancel.bind(this)}   style= {{marginLeft: "10px"}}>Cancelar</button>
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