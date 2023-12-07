import React, { Component } from 'react';
import AsignaturaProyeccionService from '../../../../services/Proyecciones/AsignaturaProyeccionService';
import '../../../StyleGlobal/Style.css';
import FolioAsignaturaService from '../../../../services/Proyecciones/FolioAsignaturaService';
import Select from 'react-select'
import UnidadService from "../../../../services/Control/UnidadService";
import DocenteService from "../../../../services/Control/DocenteService";

class ComparacionAsigntaturaDocenteComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id_unidad: null,
            folios: [],
            folios2: [],
            docentes:[],

            folio1: '',
            folio2: '',

            nombre_Ua: null,
            nombre_Docente: null,
            com_Subtotal_1: null,
            com_Subtotal_2: null,
            com_Total: null,
            unidad: '',
            docente: '',

            id_folio_1: null,
            id_folio_2: null,
            id_docente: null,

            unidades: [],
            comparaciones:[],

            bandera: null,
            com_Subtotal_1: null,
            com_Subtotal_2: null,
            com_Total: null,
            nombre_Docente: null,
            nombre_Ua: null,
            subtotal_1_1: null,
            subtotal_1_2: null,
            subtotal_2_1: null,
            subtotal_2_2: null,
            total_1: null,
            total_2: null,

        };
        this.onChangeUnidadHandler = this.onChangeUnidadHandler.bind(this);


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
        await FolioAsignaturaService.getAllFoliosByUA(id_unidad).then(res => { 
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


    async showListComparacionAsignatura(id_folio_1, id_folio_2, id_docente) {
        let options = null;

        await AsignaturaProyeccionService.showComparativeAsignaturaByIdsFoliosAndIdDocente(id_folio_1, id_folio_2, id_docente).then(res => {
            options = res.data;
            this.setState({
                bandera: options.bandera,
                com_Subtotal_1: options.com_Subtotal_1,
                com_Subtotal_2: options.com_Subtotal_2,
                com_Total: options.com_Total,
                nombre_Docente: options.nombre_Docente,
                nombre_Ua: options.nombre_Ua,
                subtotal_1_1: options.subtotal_1_1,
                subtotal_1_2: options.subtotal_1_2,
                subtotal_2_1: options.subtotal_2_1,
                subtotal_2_2: options.subtotal_2_2,
                total_1: options.total_1,
                total_2: options.total_2,
            })
        }).catch(() => {
            alert("Error al intentar traer las comparaciones...");
            this.props.history.push('/');
        });
    }


    async getDocenteList(id_unidad) {
        let options = null;
        await DocenteService.getAllDocentesByCategoriaPTCAsignatura(id_unidad).then(res => {
            const data = res.data;
            options = data.map(d => ({
                "value": d.nombre_completo,
                "label": d.nombre_completo,
                "id": d.id,
            }))
            this.setState({ docentes: options });
        }).catch(() => {
            alert("Error al intentar traer los docentes...");
            this.props.history.push('/');
        });
    }


    onChangeFolio1Handler = (event) => {
        this.setState({ folio1: event.label });
        this.setState({ id_folio_1: event.id});

        if ((this.state.id_docente === null) || (this.state.id_folio_2 === null))  {
            return;
        } else {
            this.showListComparacionAsignatura(event.id, this.state.id_folio_2, this.state.id_docente);
        }
    }
    onChangeFolio2Handler = (event) => {
        this.setState({ folio2: event.label });
        this.setState({ id_folio_2: event.id });

        if ((this.state.id_docente === null) || (this.state.id_folio_1 === null))  {
            return;
        } else {
            this.showListComparacionAsignatura(this.state.id_folio_1, event.id, this.state.id_docente);
        }
    }

    onChangeUnidadHandler = (event) => {
        this.setState({folio1: ''});
        this.setState({folio2: ''});
        this.setState({docente: ''});
        this.setState({ unidad: event.label });

        this.getFolioById(event.id);
        this.getDocenteList(event.id);
    }

    onChangeDocenteHandler = (event) => {
        this.setState({ docente: event.label });
        this.setState({ id_docente: event.id });

        if ((this.state.id_folio_1 === null) || (this.state.id_folio_2 === null)) {
            return;
        } else {
            this.showListComparacionAsignatura(this.state.id_folio_1, this.state.id_folio_2, event.id );
        }
    }

 
    render() {
        const boton = {
            marginLeft: '1rem',
            marginRight: '1rem',
        };

        return (
            <div className="container">
                <h2 className="text-center mt-5 mb-3 Title">COMPARACIÓN DE FOLIOS DE PROYECCIONES ACADÉMICAS, DE DOCENTE POR ASIGNATURA DEL TECNOLÓGICO SUPERIOR DE JALISCO</h2>
                <div className="row justify-content-center mb-4">
                    <fieldset className="border border-info p-0 mb-3">
                        {/* <legend className="w-auto text-left h6">Referencia</legend> */}
                        <div className="col" style={{"text-align": "center"}}>
                            <span><small><b>Selección:</b> Folio 1 (Anterior: [ZA - 1 - 2024 A]), Folio 2 (Reciente:[ ZA - 4 - 2024 B ])<br /></small></span>
                            <span><small><b>Cálculo Comparación:</b> [ ZA - 4 - 2024 B ] - [ZA - 1 - 2024 A]</small></span><br />
                            <span><small><b>Bandera:</b> Rojo: comparación menor a 5 | Negro: comparación mayor que o igual 0 y menor que 5 | Verde: comparación mayor que 5</small></span>
                        </div>
                       
                    </fieldset>
                </div>

                <div className="row mb-3">                     
                        <div className="col-3">
                            <div>
                                <Select
                                    rules={{ required: true }}
                                    options={this.state.unidades}
                                    onChange={(e) => this.onChangeUnidadHandler(e)}
                                    value={{ label: this.state.unidad == "" ? "Seleccione UA..." : this.state.unidad }}
                                />
                            </div>
                        </div>
                        <div className="col-3">
                            <div>
                                <Select
                                    rules={{ required: true }}
                                    options={this.state.docentes}
                                    onChange={(e) => this.onChangeDocenteHandler(e)}
                                    value={{ label: this.state.docente == "" ? "Seleccione Docente..." : this.state.docente }}
                                />
                            </div>
                        </div>
                        <div className="col-3">
                            <Select
                                rules={{ required: true }}
                                options={this.state.folios}
                                onChange={(e) => this.onChangeFolio1Handler(e)}
                                value={{ label: this.state.folio1 === '' ? "Seleccione folio 1..." : this.state.folio1}}
                            />

                       
                        </div>
                        <div className="col-3">
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
                                <th className="table-title">COM Subtotal1 <br /> Horas de apoyo a la docencia <br />{this.state.folio1}</th>
                                <th className="table-title">COM Subtotal1 <br /> Horas de apoyo a la docencia <br /> {this.state.folio2}</th>
                                <th className="table-title">Comparativa Subtotal1 <br /> Horas de apoyo a la docencia <br /> ({this.state.folio2}) - ({this.state.folio1})</th>
                                <th className="table-title">COM Subtotal2 <br /> Horas Institucional <br /> {this.state.folio1}</th>
                                <th className="table-title">COM Subtotal2 <br /> Horas Institucional <br /> {this.state.folio2}</th>
                                <th className="table-title">Comparativa Subtotal2 <br /> Horas Institucional <br /> ({this.state.folio2}) - ({this.state.folio1})</th>
                                <th className="table-title">COM Total <br /> {this.state.folio1}</th>
                                <th className="table-title">COM Total <br /> {this.state.folio2}</th>
                                <th className="table-title">Comparativa Total <br /> ({this.state.folio2}) - ({this.state.folio1})</th>
                            </tr>
                        </thead>
                        <tbody>
                                <tr>
                                    <td></td>
                                    <td className={this.state.bandera === 'ROJO' ? 'table-conten text-danger' : this.state.bandera === 'VERDE' ? 'table-conten text-success' : 'table-conten'}>{this.state.nombre_Ua}</td>
                                    <td className={this.state.bandera === 'ROJO' ? 'table-conten text-danger' : this.state.bandera === 'VERDE' ? 'table-conten text-success' : 'table-conten'}>{this.state.nombre_Docente}</td>
                                    <td className={this.state.bandera === 'ROJO' ? 'table-conten text-danger' : this.state.bandera === 'VERDE' ? 'table-conten text-success' : 'table-conten'}>{this.state.subtotal_1_1}</td>
                                    <td className={this.state.bandera === 'ROJO' ? 'table-conten text-danger' : this.state.bandera === 'VERDE' ? 'table-conten text-success' : 'table-conten'}>{this.state.subtotal_1_2}</td>
                                    <td className={this.state.bandera === 'ROJO' ? 'table-conten text-danger' : this.state.bandera === 'VERDE' ? 'table-conten text-success' : 'table-conten'}>{this.state.com_Subtotal_1}</td>
                                    <td className={this.state.bandera === 'ROJO' ? 'table-conten text-danger' : this.state.bandera === 'VERDE' ? 'table-conten text-success' : 'table-conten'}>{this.state.subtotal_2_1}</td>
                                    <td className={this.state.bandera === 'ROJO' ? 'table-conten text-danger' : this.state.bandera === 'VERDE' ? 'table-conten text-success' : 'table-conten'}>{this.state.subtotal_2_2}</td>
                                    <td className={this.state.bandera === 'ROJO' ? 'table-conten text-danger' : this.state.bandera === 'VERDE' ? 'table-conten text-success' : 'table-conten'}>{this.state.com_Subtotal_2}</td>
                                    <td className={this.state.bandera === 'ROJO' ? 'table-conten text-danger' : this.state.bandera === 'VERDE' ? 'table-conten text-success' : 'table-conten'}>{this.state.total_1}</td>
                                    <td className={this.state.bandera === 'ROJO' ? 'table-conten text-danger' : this.state.bandera === 'VERDE' ? 'table-conten text-success' : 'table-conten'}>{this.state.total_2}</td>
                                    <td className={this.state.bandera === 'ROJO' ? 'table-conten text-danger' : this.state.bandera === 'VERDE' ? 'table-conten text-success' : 'table-conten'}>{this.state.com_Total}</td>
                                </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}


export default ComparacionAsigntaturaDocenteComponent;