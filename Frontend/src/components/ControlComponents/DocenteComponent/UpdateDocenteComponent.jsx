import React, { Component } from 'react';
import DocenteService from '../../../services/Control/DocenteService';
import '../../StyleGlobal/Style.css';
import Select from 'react-select'
import axios from 'axios';

class UpdateDocenteComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: this.props.match.params.id,
            nombre: '', 
            apellido_paterno: '', 
            apellido_materno: '',
            unidad_academica: '', 
            categoria: '',
            actividad: '',

            unidades: [],
            categorias: [],
            actividades: [],
        }
    }

    updateDocenteById = (e) =>{
        e.preventDefault();
        // let docente = {
        //     nombre: this.state.nombre.trim(), 
        //     apellido_paterno: this.state.apellido_paterno.trim(), 
        //     apellido_materno: this.state.apellido_materno.trim(),
        //     unidad_academica: this.state.unidad_academica.trim(), 
        //     categoria: this.state.categoria.trim(),
        //     actividad: this.state.actividad.trim()
        // };
        
        // console.log('docente=> ' + JSON.stringify(docente));
        
        // DocenteService.updateDocenteById(docente, this.state.id).then(res => {
        //     this.props.history.push('/list-docente');
        // });
    }

    componentDidMount() {        
    //     DocenteService.getDocenteById(this.state.id).then(res => {
    //         let docente = res.data;

    //         this.setState({
    //             nombre: docente.nombre, 
    //             apellido_paterno: docente.apellido_paterno, 
    //             apellido_materno: docente.apellido_materno,
    //             unidad_academica: docente.unidad_academica, 
    //             categoria: docente.categoria,
    //             actividad: docente.actividad
    //         });
    //    });

        this.getUnidadList();
        this.getActividad();
        this.getCategoria();
    }

    async getUnidadList() {
        const res = await axios.get(process.env.REACT_APP_LOCAL_API_BASE_URL + 'planteles');
        const data = res.data;

        let options = data.map(d => ({
            "value": d.nombre_completo,
            "label": d.nombre_completo
        }))
        this.setState({ unidades: options });
    }

    getCategoria() {
        const categoriaList = [
            { value: 'DIRECTOR UNIDAD ACADÉMICA', label: 'DIRECTOR UNIDAD ACADÉMICA' },
            { value: 'JEFE DE DIVISIÓN', label: 'JEFE DE DIVISIÓN' },
            { value: 'PROFESOR ASIGNATURA A', label: 'PROFESOR ASIGNATURA A' },
            { value: 'PROFESOR ASIGNATURA B', label: 'PROFESOR ASIGNATURA B' },
            { value: 'PROFESOR ASOCIADO A', label: 'PROFESOR ASOCIADO A' },
            { value: 'PROFESOR ASOCIADO B', label: 'PROFESOR ASOCIADO B' },
            { value: 'PROFESOR ASOCIADO C', label: 'PROFESOR ASOCIADO C' },
            { value: 'CAPTURISTA', label: 'CAPTURISTA' },
            { value: 'TECNICO DOCENTE', label: 'TECNICO DOCENTE' }

        ]
        this.setState({ categorias: categoriaList })
    }

    getActividad() {
        const actividadList = [
            { value: 'CON ASIGNATURA', label: 'CON ASIGNATURA' },
            { value: 'EXTRAESCOLARES', label: 'EXTRAESCOLARES' }

        ]
        this.setState({ actividades: actividadList })
    }

    onChangeNombreHandler = (event) => {
        this.setState({nombre: event.target.value});
    }
    onChangeApellidoPaternoHandler = (event) => {
        this.setState({ apellido_paterno: event.target.value});
    }
    onChangeApellidoMaternoHandler = (event) => {
        this.setState({ apellido_materno: event.target.value});
    }
    onChangeUnidadAcademicaHandler = (event) => {
        this.setState({ unidad_academica: event.label });
    }
    onChangeCategoriaHandler = (event) => {
        this.setState({categoria: event.label});
    }
    onChangeActividadHandler = (event) => {
        this.setState({actividad: event.label});
    }
   
    cancel(){
        this.props.history.push('/list-docente');
    }


    render() {
        const main={
            minHeight:'100vh',
            display:'flex',
            flexDirection:'column',
            marginBottom:'2rem'
            
        }
       
        return (
            <div  className='' >
                <div className = "">
                        <div className = "row justify-content-center">
                            <div className="card col-9 mt-4" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                                <div className="card-body">
                                    <div className="card-header text-center" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                                        <h2 className="h3 Title">Actualizar Docente</h2>
                                    </div>
                                    <br />
                                    <form>
                                        <div className="row mb-3">
                                            <div className="col-6">
                                                <div className="form-outline">
                                                    <label className="">Nombre(s): </label>
                                                    <input 
                                                        placeholder="Ingrese nombre(s) del docente..." 
                                                        className="form-control" 
                                                        value={this.state.nombre} 
                                                        onChange={this.onChangeNombreHandler} 
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="form-outline">
                                                    <label className="">Apellido Paterno: </label>
                                                    <input 
                                                        placeholder="Ingrese apellido paterno..." 
                                                        className="form-control" 
                                                        value={this.state.apellido_paterno} 
                                                        onChange={this.onChangeApellidoPaternoHandler} 
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="form-outline">
                                                    <label className="">Apellido Materno: </label>
                                                    <input 
                                                        placeholder="Ingrese apellido materno..." 
                                                        className="form-control" 
                                                        value={this.state.apellido_materno} 
                                                        onChange={this.onChangeApellidoMaternoHandler} 
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mb-3 mt-4">
                                            <div className="col-3">
                                                <div className="form-outline">
                                                <label>Lista de Lista de UAs</label>
                                                    <Select
                                                    rules={{ required: true }}
                                                        options={this.state.unidades}
                                                        onChange={(e) => this.onChangeUnidadAcademicaHandler(e)}
                                                        placeholder="Seleccione un carrera..."
                                                        value={{ label: this.state.unidad_academica == "" ? "Seleccione UA..." : this.state.unidad_academica }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="form-outline">
                                                <label>Lista de Categorias</label>
                                                    <Select
                                                    rules={{ required: true }}
                                                        options={this.state.categorias}
                                                        onChange={(e) => this.onChangeCategoriaHandler(e)}
                                                        placeholder="Seleccione un carrera..."
                                                        value={{ label: this.state.categoria == "" ? "Seleccione una categoria..." : this.state.categoria }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="form-outline">
                                                <label>Lista de actividades</label>
                                                    <Select
                                                    rules={{ required: true }}
                                                        options={this.state.actividades}
                                                        onChange={(e) => this.onChangeActividadHandler(e)}
                                                        placeholder="Seleccione un carrera..."
                                                        value={{ label: this.state.actividad == "" ? "Seleccione una actividad..." : this.state.actividad }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-3">
                                                <div className="form-outline">
                                                <label>Estatus</label>
                                                    <select name="" id="" className='form-control'>
                                                        <option value="" selected>Nuevo</option>
                                                        <option value="">Baja</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        

                                        <br />
                                            <div className="card-footer text-muted">
                                                <button className = "btn btn-primary" onClick={this.updateDocenteById}>Guardar</button>
                                                <button className = "btn btn-danger" onClick={this.cancel.bind(this)} style= {{marginLeft: "10px"}}>Cancelar</button>
                                            </div>
                                    </form>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UpdateDocenteComponent;