import React, { Component } from 'react';
import '../../StyleGlobal/Style.css';
import PlantelService from '../../../services/Control/PlantelService';

class UpdatePlantelComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: this.props.match.params.id,
            tipo_unidad: '', 
            clave_dgp: '', 
            abreviatura: '',
            nombre_corto: '', 
            nombre_completo: '', 
            direccion_completa: ''
        }
        this.changeTipoUnidadHandler = this.changeTipoUnidadHandler.bind(this);
        this.changeClaveDGPHandler = this.changeClaveDGPHandler.bind(this);
        this.changeAbreviaturaHandler = this.changeAbreviaturaHandler.bind(this);
        this.changeNombreCortoHandler = this.changeNombreCortoHandler.bind(this);
        this.changeNombreCompletoHandler = this.changeNombreCompletoHandler.bind(this);
        this.changeDireccionCompletaHandler = this.changeDireccionCompletaHandler.bind(this);
        this.updatePlantel= this.updatePlantel.bind(this);
    }

    componentDidMount() {
        PlantelService.getPlantelById(this.state.id).then((res) => {
            let plantel = res.data;
            this.setState({
                tipo_unidad: plantel.tipo_unidad, 
                clave_dgp: plantel.clave_dgp, 
                abreviatura: plantel.abreviatura,
                nombre_corto: plantel.nombre_corto, 
                nombre_completo: plantel.nombre_completo,
                direccion_completa: plantel.direccion_completa
            });
        });
    }

    updatePlantel = (e) =>{
        e.preventDefault();
        let plantel = {
            tipo_unidad: this.state.tipo_unidad, 
            clave_dgp: this.state.clave_dgp, 
            abreviatura: this.state.abreviatura,
            nombre_corto: this.state.nombre_corto, 
            nombre_completo: this.state.nombre_completo,
            direccion_completa: this.state.direccion_completa
        };
        
        console.log('plantel=> ' + JSON.stringify(plantel));
        
        PlantelService.updatePlantelById(plantel, this.state.id).then(res => {
            this.props.history.push('/list-plantel');
        });
    }

    changeTipoUnidadHandler = (event) => {
        this.setState({tipo_unidad: event.target.value});
    }
    changeClaveDGPHandler = (event) => {
        this.setState({clave_dgp: event.target.value});
    }
    changeAbreviaturaHandler = (event) => {
        this.setState({abreviatura: event.target.value});
    }
    changeNombreCortoHandler = (event) => {
        this.setState({nombre_corto: event.target.value});
    }
    changeNombreCompletoHandler = (event) => {
        this.setState({nombre_completo: event.target.value})
    }
    changeDireccionCompletaHandler = (event) => {
        this.setState({direccion_completa: event.target.value});
    }
 
    cancel(){
        this.props.history.push('/list-plantel');
    }


    render() {

       
        return (
            <div  className=''>
                <div className = "container" >
                        <div className = "row">
                        <div className="card col-md-6 offset-md-3 offset-md-3 mt-5" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                            <div className="card-body">
                                <div className="card-header text-center">
                                    <h2 className="h3">Agregar Plantel</h2>
                                </div>
                                <br />
                                <form>
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-outline">
                                                <label className="">Tipo de Unidad: </label>
                                                <select 
                                                    name="tipoUnidad" 
                                                    className="form-control" 
                                                    value={this.state.tipo_unidad} 
                                                    onChange={this.changeTipoUnidadHandler} 
                                                    required
                                                >
                                                    <option value=""  disabled>Seleccione una opcion...</option>
                                                    <option value="Unidad">Unidad</option>
                                                    <option value="Extension">Extension</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-outline">
                                                <label className="">Clave DGP: </label>
                                                <input 
                                                    placeholder="Ingrese clave DGP..." 
                                                    name="claveDGP" className="form-control" 
                                                    value={this.state.clave_dgp} 
                                                    onChange={this.changeClaveDGPHandler} 
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col">
                                            <div className="form-outline">
                                                <label className="mt-1">Abreviatura: </label>
                                                <input 
                                                    placeholder="Ingrese abreviatura del plantel..." 
                                                    name="abreviatura" 
                                                    className="form-control" 
                                                    value={this.state.abreviatura} 
                                                    onChange={this.changeAbreviaturaHandler} 
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-outline">
                                                <label className="mt-1">Nombre Corto: </label>
                                                <input 
                                                    placeholder="Ingrese nombre corto..." 
                                                    name="nombreCorto" className="form-control" 
                                                    value={this.state.nombre_corto} 
                                                    onChange={this.changeNombreCortoHandler}
                                                />
                                            </div>
                                        </div>
                                    </div>   

                                    <div className="row">
                                        <div className="col">
                                            <div className="form-outline">
                                                <label className="mt-1">Nombre Completo: </label>
                                                <input 
                                                    placeholder="Ingrese nombre completo..." 
                                                    name="nombreCompleto" 
                                                    className="form-control" 
                                                    value={this.state.nombre_completo} 
                                                    onChange={this.changeNombreCompletoHandler}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                       
                                        <div className="form-group">
                                            <label className="mt-3">Direccion completa: </label>
                                            <textarea 
                                                name="direccionCompleta" 
                                                className="form-control" 
                                                value={this.state.direccion_completa} 
                                                onChange={this.changeDireccionCompletaHandler}
                                            > </textarea>
                                        </div>

                                    <br />
                                        <div className="card-footer text-muted">
                                            <button className = "btn btn-warning" onClick={this.updatePlantel}>Actualizar</button>
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

export default UpdatePlantelComponent;