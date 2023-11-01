import React, { Component } from 'react';
import ColegiaturaService from '../../../services/Control/ColegiaturaService';

class CreateColegiaturaComponent extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            // clave: 0,
            clave: '',
            descripcion: '', 
            // monto: 0,
            monto: '',
            colegiatura_estatus: '',
            comentarios: '',
            isLoading: false, // Nuevo estado para controlar la visibilidad del spinner
        }


        this.onChangeClaveHandler = this.onChangeClaveHandler.bind(this);
        this.onChangeDescripcionHandler = this.onChangeDescripcionHandler.bind(this);
        this.onChangeMontoHandler = this.onChangeMontoHandler.bind(this);
        this.onChangeColegiaturaStatusHandler = this.onChangeColegiaturaStatusHandler.bind(this);
        
    }

    createColegiatura = (e) =>{
           // Validar que los campos requeridos no estén vacíos
    if (this.state.clave.trim() === '' || this.state.descripcion.trim() === '' || this.state.monto.trim() === '' || this.state.colegiatura_estatus.trim() === '' || this.state.comentarios.trim() === '') {
        alert('Por favor complete todos los campos requeridos.');
        return;
    }
        e.preventDefault();
        
        let colegiatura = {
            // clave: parseFloat(this.state.clave),
            clave: this.state.clave.trim(),
            descripcion: this.state.descripcion.trim(), 
            // monto: parseFloat(this.state.monto),
            monto: this.state.monto.trim(),
            colegiatura_estatus: this.state.colegiatura_estatus.trim(), 
            comentarios: this.state.comentarios.trim()
        };
        // Mostrar el spinner al iniciar la acción
        this.setState({ isLoading: true });
        console.log('Colegiatura=> ' + JSON.stringify(colegiatura));
        
        ColegiaturaService.createColegiatura(colegiatura).then(res => {
            this.props.history.push('/list-colegiatura');
        });
    }

    onChangeClaveHandler = (event) => {
        this.setState({clave: event.target.value});
    }
    onChangeDescripcionHandler = (event) => {
        this.setState({descripcion: event.target.value});
    }
    onChangeMontoHandler = (event) => {
        this.setState({monto: event.target.value});
    }
    onChangeColegiaturaStatusHandler = (event) => {
        this.setState({colegiatura_estatus: event.target.value});
    }
    onChangeComentariosHandler = (event) => {
        this.setState({comentarios: event.target.value});
    }
  
  
    cancel(){
        this.props.history.push('/list-colegiatura');
    }


    render() {

        return (
            <div className=''>
                <div className = "container" >
                        <div className = "row justify-content-center">
                            <div className = "card col-8 mt-4" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                            <div className="card-body">
                                <div className="card-header text-center" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                                    <h2 className="h3 Title">Agregar Colegiatura</h2>
                                </div>
                                <br />
                                <form>
                                    <div className="row">                                
                                        <div className="col-6">
                                            <div className="form-outline">
                                                <label className="">Clave : </label>
                                                <input placeholder="Ingrese Clave de la colegiatura..."  
                                                    // type='number'
                                                    name="clave"
                                                    className="form-control" 
                                                    value={this.state.clave} 
                                                    onChange={this.onChangeClaveHandler} 
                                                    required
                                                />
                                            </div>
                                            <small  className="form-text text-muted mb-2">Ingrese cantidad numerica.</small> 
                                        </div>
                                    </div>
                                    <div className="row">                                
                                        <div className="col">
                                            <div className="form-outline mb-2">
                                                <label className="mt-2">Descripción: </label>
                                                <textarea name="Descripción completa" 
                                                    className="form-control"
                                                    placeholder="Ingrese la descripcion completa de la colegiatura..."
                                                    value={this.state.descripcion}
                                                    onChange={this.onChangeDescripcionHandler}
                                                    required
                                                > 
                                                </textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-outline">
                                                <label className="mt-2">Monto: </label>
                                                <div class="input-group">  
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text">$</span>
                                                    </div>
                                                    <input
                                                        // type='number'
                                                        placeholder="Ingrese monto de la colegiatura..." 
                                                        name="clave" 
                                                        className="form-control"
                                                        value={this.state.monto} 
                                                        onChange={this.onChangeMontoHandler}
                                                        required
                                                    />  
                                                </div>
                                                <small  className="form-text text-muted mb-2">Ingrese cantidad numerica.</small> 
                                            </div>  
                                        </div>    

                                        <div className="col">
                                            <div className="form-outline">
                                                <label className="mt-2">Estatus: </label>
                                                <select name="estatus" className='form-control'  
                                                    required
                                                    value={this.state.colegiatura_estatus}
                                                    onChange={this.onChangeColegiaturaStatusHandler}
                                                >
                                                    <option value="" disabled selected>Seccione un estatus...</option>
                                                    <option value="VIGENTE">VIGENTE</option>
                                                    <option value="CANCELADO">CANCELADO</option>
                                                </select>
                                            </div>
                                        </div>                                   
                                    </div> 
        
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-outline">
                                                <label className="mt-2">Comentarios: </label>
                                                <div class="input-group">
                                                    <textarea type='text' 
                                                        placeholder="Ingrese comentarios (opcional)..." 
                                                        name="clave" 
                                                        className="form-control"
                                                        value={this.state.comentarios} 
                                                        onChange={this.onChangeComentariosHandler}
                                                        required>
                                                    </textarea>                                                  
                                                </div>
                                            </div>
                                        </div>                                    
                                    </div> 

                                    <br />
                                        <div className="card-footer text-muted ">
                                            
                                            {this.state.isLoading ? (
                                            // Mostrar el spinner si isLoading es true
                                            <div className="text-center">
                                                <div className="spinner-border" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            </div>
                                        ) : (
<button className = "btn btn-primary" onClick={this.createColegiatura} 
                                            > Guadar
                                            </button>                                        )} 
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

export default CreateColegiaturaComponent;