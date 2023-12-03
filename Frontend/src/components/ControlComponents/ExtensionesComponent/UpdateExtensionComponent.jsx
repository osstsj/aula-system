import React, { Component } from 'react';
import '../../StyleGlobal/Style.css';
import UnidadService from '../../../services/Control/UnidadService';
import ExtensionsService from '../../../services/Control/ExtensionsService';

class UpdateExtensionComponent extends Component {
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
        
        this.updateUnidad = this.updateUnidad.bind(this);
    }

    componentDidMount() {
        ExtensionsService.getExtensionById(this.state.id).then((res) => {
            let unidad = res.data;
            this.setState({
                tipo_unidad: unidad.tipo_unidad, 
                clave_dgp: unidad.clave_dgp, 
                abreviatura: unidad.abreviatura,
                nombre_corto: unidad.nombre_corto, 
                nombre_completo: unidad.nombre_completo,
                direccion_completa: unidad.direccion_completa
            });
        }).catch(() => {
            alert("Error al intentar trear la unidad academica...");
            this.props.history.push('/list-extension');
        });
    }

    updateUnidad = (e) =>{
        e.preventDefault();
        let unidad = {
            tipo_unidad: this.state.tipo_unidad.trim(), 
            clave_dgp: this.state.clave_dgp.trim(), 
            abreviatura: this.state.abreviatura.trim(),
            nombre_corto: this.state.nombre_corto.trim(), 
            nombre_completo: this.state.nombre_completo.trim(),
            direccion_completa: this.state.direccion_completa.trim()
        };
        
        console.log('unidad=> ' + JSON.stringify(unidad));
        
        ExtensionsService.updateExtensionById(this.state.id, unidad).then(() => {
            this.props.history.push('/list-extension');
        }).catch(() => {
            alert("Error al intentar actualizar la unidad académica...");
            this.props.history.push('/list-extension');
        });;
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
        this.props.history.push('/list-extension');
    }


    render() {

       
        return (
            <div  className=''>
                <div className = "container" >
                        <div className = "row justify-content-center">
                        <div className="card col-9 mt-4" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                            <div className="card-body">
                                <div className="card-header text-center" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                                    <h2 className="h3 Title">Actualizar Unidad Académica</h2>
                                </div>
                                <br />
                                <form>
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-outline">
                                                <label className="">Tipo de Unidad: </label>
                                                <select 
                                                disabled
                                                    name="tipoUnidad" 
                                                    className="form-control" 
                                                    value={this.state.tipo_unidad} 
                                                    onChange={this.changeTipoUnidadHandler} 
                                                    required
                                                >
                                                    <option value=""  disabled>Seleccione una opcion...</option>
                                                    {/* <option value="Unidad">Unidad</option> */}
                                                    <option value="Extension" selected>Extension</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-outline">
                                                <label className="">Clave DGP: </label>
                                                <input 
                                                readOnly
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
                                                    placeholder="Ingrese abreviatura de la UA..." 
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
                                            <label className="mt-3">Dirección  completa: </label>
                                            <textarea 
                                             readOnly
                                                name="direccionCompleta" 
                                                className="form-control" 
                                                value={this.state.direccion_completa} 
                                                onChange={this.changeDireccionCompletaHandler}
                                            > </textarea>
                                        </div>

                                    <br />
                                        <div className="card-footer text-muted">
                                            <button className = "btn btn-warning mt-0" onClick={this.updateUnidad}>Actualizar</button>
                                            <button className = "btn btn-danger mt-0" onClick={this.cancel.bind(this)} style= {{marginLeft: "10px"}}>Cancelar</button>
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

export default UpdateExtensionComponent;