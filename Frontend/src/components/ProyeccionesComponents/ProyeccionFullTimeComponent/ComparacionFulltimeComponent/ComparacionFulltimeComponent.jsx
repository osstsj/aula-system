import React, { Component } from 'react';
import FulltimeProyeccionService from '../../../../services/Proyecciones/FulltimeProyeccionService';
import '../../../StyleGlobal/Style.css';
import * as XLSX from 'xlsx';  // Importa la librería XLSX
import FolioFulltimeService from '../../../../services/Proyecciones/FolioFulltimeService';
import Select from 'react-select'
import UnidadService from "../../../../services/Control/UnidadService";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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
    exportToExcel = () => {
        const { comparaciones } = this.state;
    
        // Modificar la estructura de los datos para incluir la información de la unidad académica
        const datosParaExportar = comparaciones.map((comparacion, index) => ({
            '#': index + 1,
            'UA': comparacion.nombre_Ua,
            'Nombre del Docente': comparacion.nombre_Docente,
            ['COM Horas Grupo ' + this.state.folio1]: comparacion.horas_Grupo_1,
            ['COM Horas Grupo ' + this.state.folio2]: comparacion.horas_Grupo_2,
            ['Comparativa Horas Grupo ' + '(' + this.state.folio2 + ') - (' + this.state.folio1 + ')']: comparacion.com_Horas_grupo,
            ['Comparativa Total ' + '(' + this.state.folio2 + ') - (' + this.state.folio1 + ')']: comparacion.com_Total,
            ['COM Total ' + this.state.folio1]: comparacion.total_1,
            ['COM Total ' + this.state.folio2]: comparacion.total_2,
        }));
    
        // Crear una nueva hoja de cálculo
        const ws = XLSX.utils.json_to_sheet(datosParaExportar);
        const colWidths = [
            { wch: 5 },
            { wch: 25 },
            { wch: 25 },
            { wch: 25 },
            { wch: 25 },
            { wch: 25 },
            { wch: 25 },
            { wch: 25 },
            { wch: 25 },
            { wch: 25 },
        ];
        ws['!cols'] = colWidths;
    
        // Crear un nuevo libro de trabajo
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Comparaciones');
    
        // Generar el archivo XLSX
        XLSX.writeFile(wb, 'comparaciones-fulltime.xlsx');
    }
    exportToPDF = () => {
        const { comparaciones } = this.state;
    
        // Modificar la estructura de los datos para incluir la información de la unidad académica
        const datosParaExportar = comparaciones.map((comparacion, index) => ({
            '#': index + 1,
            'UA': comparacion.nombre_Ua,
            'Nombre del Docente': comparacion.nombre_Docente,
            ['COM Horas Grupo ' + this.state.folio1]: comparacion.horas_Grupo_1,
            ['COM Horas Grupo ' + this.state.folio2]: comparacion.horas_Grupo_2,
            ['Comparativa Horas Grupo ' + '(' + this.state.folio2 + ') - (' + this.state.folio1 + ')']: comparacion.com_Horas_grupo,
            ['Comparativa Total ' + '(' + this.state.folio2 + ') - (' + this.state.folio1 + ')']: comparacion.com_Total,
            ['COM Total ' + this.state.folio1]: comparacion.total_1,
            ['COM Total ' + this.state.folio2]: comparacion.total_2,
        }));
    
        // Crear una nueva instancia de jsPDF
        const pdf = new jsPDF();
    
        // Configurar la tabla
        pdf.autoTable({
            head: [Object.keys(datosParaExportar[0])],
            body: datosParaExportar.map(obj => Object.values(obj)),
            startY: 20,
        });
    
        // Guardar el archivo PDF
        pdf.save('comparaciones-fulltime.pdf');
    }
    



    render() {
        const boton = {
            marginLeft: '1rem',
            marginRight: '1rem',
        };

        return (
            <div className="container">
                <h2 className="text-center mt-5 mb-5 Title">COMPARACIÓN DE FOLIOS DE PROYECCIONES ACADÉMICAS, TIEMPO COMPLETO DEL TECNOLÓGICO SUPERIOR DE JALISCO</h2>
                    <div className="row justify-content-center mb-4">
                        <fieldset className="border border-info p-0 mb-3">
                            {/* <legend className="w-auto text-left h6">Referencia</legend> */}
                            <div className="col" style={{"text-align": "center"}}>
                                <span><small><b>Selección:</b> Folio 1 (Anterior: [ZA - 1 - 2024 A]), Folio 2 (Reciente:[ ZA - 4 - 2024 B ])<br /></small></span>
                                <span><small><b>Cálculo Comparación:</b> [ ZA - 4 - 2024 B ] (Horas Frente a Grupo) - [ZA - 1 - 2024 A] (Horas Frente a Grupo)</small></span><br />
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
                                    placeholder="Seleccione un carrera..."
                                    value={{ label: this.state.unidad == "" ? "Seleccione unidad académica..." : this.state.unidad }}
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
                        <div className="col-3">
                        <button style={{ marginLeft: '1rem',marginTop:'0rem' }} className="btn  btn-outline-success mb-4" onClick={this.exportToExcel}>
                    Exp a Excel
                </button>
                <button style={{ marginLeft: '1rem',marginTop:'0rem' }} className="btn  btn-outline-dark mb-4" onClick={this.exportToPDF}>
                    Exp a PDF
                </button>
                        </div>
                    </div>
                <div className="row" style={{ overflowX: 'auto' }}>
                    <table className="table table-striped table-bordered" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                        <thead>
                            <tr>
                                <th></th>
                                <th className="table-title">UA</th>
                                <th className="table-title">Nombre del Docente</th>
                                <th className="table-title"> COM Horas Frente a Grupo <br /> Horas de apoyo a la docencia <br /> {this.state.folio1}</th>
                                <th className="table-title"> COM Horas Frente a Grupo <br /> Horas de apoyo a la docencia <br /> {this.state.folio2}</th>
                                <th className="table-title"> Comparación Horas Frente a Grupo <br /> Horas de apoyo a la docencia <br /> ({this.state.folio2}) - ({this.state.folio1})</th>
                                <th className="table-title">COM Total <br /> {this.state.folio1}</th>
                                <th className="table-title">COM Total <br /> {this.state.folio2}</th>
                                <th className="table-title">Comparativa Total <br /> ({this.state.folio2}) - ({this.state.folio1})</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.comparaciones.map((comparacion, index) => (
                                <tr key={{}} className={(index % 2 === 0 ? 'even-row' : 'odd-row')}>
                                    <td>{index + 1}</td>
                                    <td className={comparacion.bandera === 'ROJO' ? 'table-conten text-danger' : comparacion.bandera === 'VERDE' ? 'table-conten text-success' : 'table-conten'}>{comparacion.nombre_Ua}</td>
                                    <td className={comparacion.bandera === 'ROJO' ? 'table-conten text-danger' : comparacion.bandera === 'VERDE' ? 'table-conten text-success' : 'table-conten'}>{comparacion.nombre_Docente}</td>
                                    <td className={comparacion.bandera === 'ROJO' ? 'table-conten text-danger' : comparacion.bandera === 'VERDE' ? 'table-conten text-success' : 'table-conten'}>{comparacion.horas_Grupo_1}</td>
                                    <td className={comparacion.bandera === 'ROJO' ? 'table-conten text-danger' : comparacion.bandera === 'VERDE' ? 'table-conten text-success' : 'table-conten'}>{comparacion.horas_Grupo_2}</td>
                                    <td className={comparacion.bandera === 'ROJO' ? 'table-conten text-danger' : comparacion.bandera === 'VERDE' ? 'table-conten text-success' : 'table-conten'}>{comparacion.com_Horas_Grupo}</td>
                                    <td className={comparacion.bandera === 'ROJO' ? 'table-conten text-danger' : comparacion.bandera === 'VERDE' ? 'table-conten text-success' : 'table-conten'}>{comparacion.total_1}</td>
                                    <td className={comparacion.bandera === 'ROJO' ? 'table-conten text-danger' : comparacion.bandera === 'VERDE' ? 'table-conten text-success' : 'table-conten'}>{comparacion.total_2}</td>
                                    <td className={comparacion.bandera === 'ROJO' ? 'table-conten text-danger' : comparacion.bandera === 'VERDE' ? 'table-conten text-success' : 'table-conten'}>{comparacion.com_Total}</td>
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