import React, { Component } from 'react';
import '../../StyleGlobal/Style.css';
import PlantelService from '../../../services/Control/PlantelService';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Importa la extensión jspdf-autotable

class ListPlantelComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            planteles: [],
        };

        this.addPlantel = this.addPlantel.bind(this);
        this.editPlantel = this.editPlantel.bind(this);
        this.deletePlantel = this.deletePlantel.bind(this);
        this.viewPlantel = this.viewPlantel.bind(this);
        this.exportToExcel = this.exportToExcel.bind(this);
        this.exportToPDF = this.exportToPDF.bind(this); // Método para exportar a PDF
    }

    deletePlantel(id) {
        // Llamada a la API REST
        PlantelService.deletePlantelById(id).then((res) => {
            this.setState({ planteles: this.state.planteles.filter((plantel) => plantel.id !== id) });
        });
    }

    viewPlantel(id) {
        this.props.history.push(`view-plantel/${id}`);
    }

    editPlantel(id) {
        this.props.history.push(`update-plantel/${id}`);
    }

    componentDidMount(){
        //promise
        PlantelService.getAllPlanteles().then((res) => {
            this.setState({planteles: res.data});
        });
    }

    addPlantel() {
        this.props.history.push('/add-plantel/');
    }

    exportToExcel() {
        const { planteles } = this.state;

        const ws = XLSX.utils.json_to_sheet(planteles);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Planteles');
        XLSX.writeFile(wb, 'planteles.xlsx');
    }

    exportToPDF() {
        const { planteles } = this.state;

        const doc = new jsPDF();
        doc.text('Lista de Planteles', 10, 10);

        const columns = ['Clave DGP', 'Abreviatura', 'Nombre Completo', 'Tipo Unidad', 'Nombre Corto', 'Dirección Completa'];
        const data = planteles.map((plantel) => [
            plantel.clave_dgp,
            plantel.abreviatura,
            plantel.nombre_completo,
            plantel.tipo_unidad,
            plantel.nombre_corto,
            plantel.direccion_completa,
        ]);

        doc.autoTable({
            startY: 20,
            head: [columns],
            body: data,
        });

        doc.save('planteles.pdf');
    }

    render() {
        const boton = {
            marginLeft: '1rem',
            marginRight: '1rem',
        };

        return (
            <div className="container">
                <h2 className="text-center mt-5 Title">LISTA DE PLANTELES</h2>
                <button style={{ width: '15%' }} className="btn btn-primary mb-4" onClick={this.addPlantel}>
                    Agregar plantel
                </button>
                <button style={{ width: '15%', marginLeft: '1rem' }} className="btn  btn-outline-success mb-4" onClick={this.exportToExcel}>
                    Exportar a Excel
                </button>
                <button style={{ width: '15%',marginLeft: '1rem' }} className="btn  btn-outline-dark mb-4" onClick={this.exportToPDF}>
                    Exportar a PDF
                </button>
                <div className="row" style={{ overflowX: 'auto' }}>
                    <table className="table table-striped table-bordered" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                        <thead>
                            <tr>
                                <th></th>
                                <th className="table-title">Clave DGP</th>
                                <th className="table-title">Abreviatura</th>
                                <th className="table-title">Nombre Completo</th>
                                <th className="table-action">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.planteles.map((plantel, index) => (
                                <tr key={plantel.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                                    <td>{index + 1}</td>
                                    <td className="table-conten">{plantel.clave_dgp}</td>
                                    <td className="table-conten">{plantel.abreviatura}</td>
                                    <td className="table-conten">{plantel.nombre_completo}</td>
                                    <td className="table-action">
                                        <button onClick={() => this.editPlantel(plantel.id)} className="btn btn-warning">
                                            Actualizar
                                        </button>
                                        <button style={boton} onClick={() => this.deletePlantel(plantel.id)} className="btn btn-danger">
                                            Eliminar
                                        </button>
                                        <button onClick={() => this.viewPlantel(plantel.id)} className="btn btn-info">
                                            Ver
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListPlantelComponent;
