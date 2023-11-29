import React, { Component } from 'react';
import FulltimeProyeccionService from '../../../../services/Proyecciones/FulltimeProyeccionService';
import '../../../StyleGlobal/Style.css';
import * as XLSX from 'xlsx';  // Importa la librería XLSX
import FolioFulltimeService from '../../../../services/Proyecciones/FolioFulltimeService';
import Select from 'react-select'
import UnidadService from "../../../../services/Control/UnidadService";


class ComparacionFulltimeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id_unidad: null,
            folios: [],
            folios2: [],

            folio1: '',
            folio2: '',

            nombre_Ua: null,
            nombre_Docente: null,
            com_Horas_grupo: null,
            com_Total: null,
            unidad: '',

            id_folio_1: null,
            id_folio_2: null,

            unidades: [],
            comparaciones:[],


        };
        this.onChangeUnidadHandler = this.onChangeUnidadHandler.bind(this);

    }

 
    viewProyeccion(id_folio) {
        this.props.history.push(`/list-proyeccion_asignatura/${id_folio}`);
    }


    componentDidMount(){

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
            this.props.history.push('/');
        });
        this.setState({unidades: options})
    }

    async getFolioById(id_unidad) {
        let options = null;
        await FolioFulltimeService.getAllFoliosByUA(id_unidad).then(res => { 
            const data = res.data;
            options = data.map(d => ({
                "value": d.folio,
                "label": d.folio,
                "id": d.id,
            }))
        }).catch(() => {
            alert("Error al intentar traer el folio por id...");
            this.props.history.push('/');
        });

        this.setState({ folios: options});
        this.setState({ folios2: options});
    }


    async showListComparacionFulltime(id_folio_1, id_folio_2) {
        let options = null;

        await FulltimeProyeccionService.showComparativeFulltomeByIdsFolios(id_folio_1, id_folio_2).then(res => {
            options = res.data;
        }).catch(() => {
            alert("Error al intentar traer las comparaciones...");
            this.props.history.push('/');
        });
        this.setState({comparaciones: options})
    }

    onChangeFolio1Handler = (event) => {
        this.setState({ folio1: event.label });
        this.setState({ id_folio_1: event.id});

        if (this.state.id_folio_2 === null ) {
            return;
        } else {
            this.showListComparacionFulltime(event.id, this.state.id_folio_2);
        }
    }
    onChangeFolio2Handler = (event) => {
        this.setState({ folio2: event.label });
        this.setState({ id_folio_2: event.id });

        if (this.state.id_folio_1 === null ) {
            return;
        } else {
            this.showListComparacionFulltime(this.state.id_folio_1, event.id);
        }
    }

    onChangeUnidadHandler = (event) => {
        this.setState({folio1: ''});
        this.setState({folio2: ''});
        this.setState({ unidad: event.label });
        this.getFolioById(event.id);
    }



    render() {
        const boton = {
            marginLeft: '1rem',
            marginRight: '1rem',
        };

        return (
            <div className="container">
                <h2 className="text-center mt-5 mb-5 Title">COMPARACION DE FOLIOS DE PROYECCIONES ACADEMICAS, TIEMPO COMPLETO DEL TECNOLÓGICO SUPERIROR DE JALISCO</h2>
                    
                    <div className="row mb-3">
                        <div className="col-4">
                            <div>
                                <Select
                                    rules={{ required: true }}
                                    options={this.state.unidades}
                                    onChange={(e) => this.onChangeUnidadHandler(e)}
                                    placeholder="Seleccione un carrera..."
                                    value={{ label: this.state.unidad == "" ? "Seleccione unidad académica..." : this.state.unidad }}
                                />
                            </div>
                        </div>
                        <div className="col-4">
                            <Select
                                rules={{ required: true }}
                                options={this.state.folios}
                                onChange={(e) => this.onChangeFolio1Handler(e)}
                                value={{ label: this.state.folio1 === '' ? "Seleccione folio 1..." : this.state.folio1}}
                            />

                       
                        </div>
                        <div className="col-4">
                            <div>
                                <Select
                                    rules={{ required: true }}
                                    options={this.state.folios2}
                                    onChange={(e) => this.onChangeFolio2Handler(e)}
                                    placeholder="Seleccione un carrera..."
                                    value={{ label: this.state.folio2 == '' ? "Seleccione folio 2..." : this.state.folio2 }}
                                />
                            </div>
                        </div>
                    </div>
                <div className="row" style={{ overflowX: 'auto' }}>
                    <table className="table table-striped table-bordered" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                        <thead>
                            <tr>
                                <th></th>
                                <th className="table-title">UA</th>
                                <th className="table-title">Nombre del Docente</th>
                                <th className="table-title"> COM Horas Frente a Grupo</th>
                                <th className="table-action">COM Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.comparaciones.map((comparacion, index) => (
                                <tr key={{}} className={(index % 2 === 0 ? 'even-row' : 'odd-row') && (comparacion.com_Total < 0 ? 'style: red' : 'style: black')}>
                                    <td>{index + 1}</td>
                                    <td className="table-conten">{comparacion.nombre_Ua}</td>
                                    <td className="table-conten">{comparacion.nombre_Docente}</td>
                                    <td className="table-conten">{comparacion.com_Horas_grupo}</td>
                                    <td className="table-conten">{comparacion.com_Total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}


export default ComparacionFulltimeComponent;