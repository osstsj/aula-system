import React, { Component } from 'react';
import '../../StyleGlobal/Style.css'
import ColegiaturaService from '../../../services/Control/ColegiaturaService';

class UpdateColegiaturaComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            id: this.props.match.params.id,
            // clave: 0
            clave: '',
            descripcion: '', 
            monto: '',
            // monto: 0,
            colegiatura_estatus: '',
            comentarios: ''
        }      
    }

    componentDidMount() {
        ColegiaturaService.getColegiaturaById(this.state.id).then(res => {
            let colegiatura = res.data;

            this.setState({
                clave: colegiatura.clave,
                descripcion: colegiatura.descripcion,
                monto: colegiatura.monto,
                colegiatura_estatus: colegiatura.colegiatura_estatus,
                comentarios: colegiatura.comentarios
            });
        });
    }

    updateColegiatura = (e) =>{
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
        
        console.log('Colegiatura=> ' + JSON.stringify(colegiatura));
        
        ColegiaturaService.updateColegiaturaById(colegiatura, this.state.id).then(res => {
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
                                    <h2 className="h3 Title">Actualizar Colegiatura</h2>
                                </div>
                                <br />
                                <form>
                                    <div className="row">                                
                                        <div className="col">
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
                                        </div>
                                    </div>
                                    <div className="row">                                
                                        <div className="col">
                                            <div className="form-outline">
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
                                                        required/>                                                   
                                                </div>
                                            </div>
                                        </div>                                    
                                    </div> 
                                    <div className="row">
                                         <div className="col">
                                            <div className="form-outline">
                                                <label className="mt-2">Estatus: </label>
                                                <select name="estatus" className='form-control'  
                                                    required
                                                    value={this.state.colegiatura_estatus}
                                                    onChange={this.onChangeColegiaturaStatusHandler}
                                                >
                                                    <option value="" disabled selected>Seccione un estatus...</option>
                                                    <option value="ACTIVA">VIGENTE</option>
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
                                            <button className = "btn btn-warning" onClick={this.updateColegiatura}>Actualizar</button>
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

export default UpdateColegiaturaComponent;