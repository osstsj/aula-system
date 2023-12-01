import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../Style/Table.css';
import '../../StyleGlobal/Style.css'
import FulltimeProyeccionService from '../../../services/Proyecciones/FulltimeProyeccionService';
import FolioFulltimeService from '../../../services/Proyecciones/FolioFulltimeService';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class ListProyeccionFullTimeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id, // id_folio

            areColumnsVisible: true, // Estado inicial para controlar la visibilidad de las columnas
            areColumns2Visible: true,

            unidad: '',

            fulltimes: [],
            isModalOpen: false,
            asignaturaToDeleteId: null, 
        };

        this.viewProyeccionFulltime = this.viewProyeccionFulltime.bind(this);
        this.addFulltime = this.addFulltime.bind(this);
        this.updateProyeccionFulltime = this.updateProyeccionFulltime.bind(this);
        // this.exportToExcel = this.exportToExcel.bind(this);  // Método para exportar a Excel
    }

    componentDidMount() {
        FulltimeProyeccionService.getAllProyeccionesFulltimeByFolio(this.state.id).then(res =>
            this.setState({ fulltimes: res.data }))
            .catch(() => {
                alert("Error al traer las proyecciones tiempo completo por folio...");
                this.props.history.push('/');
            });

            this.getUnidadFromFolioId();
    }

    async getUnidadFromFolioId() {
        await FolioFulltimeService.getFolioById(this.state.id).then(res => {
            const data = res.data;
            
            this.setState({ unidad: data.unidad_academica.nombre_completo})
        }).catch(() => {
            alert("Error al intentar traer las UAs...");
            this.props.history.push('/');
        });
    }


    addFulltime() {
        this.props.history.push(`/add-proyeccion_fulltime/${this.state.id}`);
    }

    updateProyeccionFulltime(id) {
        this.props.history.push(`/update-proyeccion_fulltime/${id}`);
    }

    viewProyeccionFulltime(id) {
        this.props.history.push(`/view-proyeccion_fulltime/${id}`);
    }

    deleteProyeccionFulltime(id) {
        FolioFulltimeService.deleteFolioFulltimeById(this.state.id).then(() => {
            this.setState({
                fulltimes: this.state.fulltimes.filter(fulltime => fulltime.id !== id),
                isModalOpen: false,
                asignaturaToDeleteId: null,
            })
        }).catch(() => {
            alert("Error al intentar traer las UAs...");
            this.props.history.push('/');
        });
    }

    // Función para alternar la visibilidad de las columnas
    toggleColumns = () => {
        this.setState((prevState) => ({
            areColumnsVisible: !prevState.areColumnsVisible,
        }));
    };
    toggleColumn2s = () => {
        this.setState((prevState) => ({
            areColumns2Visible: !prevState.areColumns2Visible,
        }));
    };

     // Método para abrir el modal
     toggleModal = (id_asignatura) => {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
            asignaturaToDeleteId: id_asignatura, // Establece el ID de la colegiatura a eliminar
        });
    }

    // Método para cerrar el modal
    closeModal = () => {
        this.setState({
            isModalOpen: false,
            asignaturaToDeleteId: null, // Restablece el ID de la colegiatura
        });
    }
    render() {
        const { areColumnsVisible } = this.state;
        const { areColumns2Visible } = this.state;

        const boton= {
            marginLeft:'1rem',
            marginRight:'1rem'
            }
           
        return (
            <div className='container' >
                <h2 className="text-center mt-5 mb-5 Title" >PROYECCIONES TIEMPO COMPLETO</h2>
                <div>
                <button onClick={this.addFulltime} style={{ marginRight: '2%' }} className="btn btn-outline-dark mb-4" >Agregar proyección</button>
                        <button onClick={this.toggleColumns} style={{ marginRight: '2%' }} className="btn btn-success mb-4" >Comprimir Actual</button>
                        <button onClick={this.toggleColumn2s} style={{ marginRight: '27.8%' }} className="btn btn-primary mb-4" >Comprimir Anterior</button>
                        <button className="btn btn-outline-success mb-4" onClick={this.exportToExcel}>Exportar a Excel</button> {/* Botón de exportar a Excel */}
                        <button className="btn btn-outline-info mb-4" onClick={{}}>Exportar a PDF</button> {/* Botón de exportar a Excel */}

                </div>
                <div className="row" style={{ overflowX: 'auto',boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)'  }}>
                    <table className="table table-striped table-bordered" border="3" cellspacing="0" cellpadding="0">
                        <thead>
                            <tr>
                                <th className='Title-Table' colSpan="36">UNIDAD ACADÉMICA: {this.state.unidad}</th>
                            </tr>
                            <tr>
                                <th rowSpan="3"className={`text-center table-id ${areColumns2Visible ||areColumnsVisible ? '' : 'collapse'
                                    }`}></th>
                                <th className={`text-center text-white table-green   ${areColumnsVisible ? '' : 'collapse'
                                    }`} colSpan="5">PROFESORES DE TIEMPO COMPLETO</th>
                                <th  className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`} colSpan="12">HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS</th>
                                <th  className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`} colSpan="2">HORAS NECESIDAD INSTITUCIONAL</th>
                                <th  className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`} colSpan="1">Total</th>
                                <th  className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`} rowSpan="3" colSpan="1">Total</th>
                                <th  className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`} rowSpan="3" colSpan="3">OBSERVACIONES</th>
                                <th  className={`text-center text-white table-blue  ${areColumns2Visible ? '' : 'collapse'
                                    }`} colSpan="10">DATOS PARA MODIFICACIÓN</th>
                                <th rowSpan="3" className={`text-center  table-acciones  ${areColumns2Visible ||areColumnsVisible ? '' : 'collapse'
                                    }`}> ACCIONES</th>
                            </tr>
                            <tr>

                                <th rowSpan="2"  className={`text-center text-white  table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`}>No. Folio</th>
                                <th rowSpan="2"  className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`} >Clave de Programa  Educativo</th>
                                <th rowSpan="2"  className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`} >No. de Nómina</th>
                                <th rowSpan="2"  className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`} >Grado Académico</th>
                                <th rowSpan="2"  className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`} >Nombre del Docente</th>
                                <th rowSpan="2"  className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`} >Nivel de  (PTC)</th>
                                <th rowSpan="2"  className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`} >Horas frente a Grupo</th>
                                <th colSpan="2"  className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`} >Academia</th>
                                <th rowSpan="2"  className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`} >Nivel de  (PTC)</th>
                                <th colSpan="5"  className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`} >Asesorías</th>
                                <th rowSpan="2"  className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`} >Actividades complementarias</th>
                                <th rowSpan="2"  className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`} >Subtotal 1</th>
                                <th rowSpan="2"  className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`} >Proyectos de Investigación</th>
                                <th rowSpan="2"  className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`} >Apoyo operativo</th>
                                <th rowSpan="2"  className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`} >subtotal 2</th>
                                <th rowSpan="2"  className={`text-center text-white table-blue  ${areColumns2Visible ? '' : 'collapse'
                                    }`}>FECHA SOLICITUD DE MODIFICACIÓN</th>
                                <th rowSpan="2"  className={`text-center text-white table-blue  ${areColumns2Visible ? '' : 'collapse'
                                    }`}>CARGA HORARIA ANTERIOR (Horas frente a Grupo)</th>
                                <th rowSpan="2"  className={`text-center text-white table-blue  ${areColumns2Visible ? '' : 'collapse'
                                    }`}>NIVEL DE PTC ANTERIOR</th>
                                <th rowSpan="2"  className={`text-center text-white table-blue  ${areColumns2Visible ? '' : 'collapse'
                                    }`}>CARGA HORARIA NUEVA (Horas frente a Grupo)</th>
                                <th rowSpan="2"  className={`text-center text-white table-blue  ${areColumns2Visible ? '' : 'collapse'
                                    }`}>NIVEL DE PTC NUEVO</th>
                                <th rowSpan="2"  className={`text-center text-white table-blue  ${areColumns2Visible ? '' : 'collapse'
                                    }`}>LA MODIFICACIÓN SE APLICA A PARTIR DE (FECHA):</th>
                                <th rowSpan="2"  className={`text-center text-white table-blue  ${areColumns2Visible ? '' : 'collapse'
                                    }`}>NO. OFICIO RESPUESTA</th>
                                <th rowSpan="2"  className={`text-center text-white table-blue  ${areColumns2Visible ? '' : 'collapse'
                                    }`}>NO. DE OFICIO ACADEMIA</th>
                                <th rowSpan="2"  className={`text-center text-white table-blue  ${areColumns2Visible ? '' : 'collapse'
                                    }`}>FECHA EN QUE RH APLICA  EN EL SISTEMA</th>
                                <th rowSpan="2"  className={`text-center text-white table-blue  ${areColumns2Visible ? '' : 'collapse'
                                    }`}>OBSERVACIONES</th>
                            </tr>
                            <tr>
                                <th className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`}>Presidente</th>
                                <th className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`}>Secretario</th>
                                <th className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`}>Residencia Profesional</th>
                                <th className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`}>Dual</th>
                                <th className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`}>Titulación</th>
                                <th className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`}>Asesorias Académicas</th>
                                <th className={`text-center text-white table-green ${areColumnsVisible ? '' : 'collapse'
                                    }`}>Tutorias</th>

                            </tr>
                        </thead>
                        <tbody className={ 2 === 0 ? 'even-row' : 'odd-row'}>
                        {
                            this.state.fulltimes.map((fulltime, index) =>
                            <tr key={fulltime.id}>
                                <td  className={`text-center table-id ${areColumns2Visible ||areColumnsVisible ? '' : 'collapse'
                                    }`}>{index + 1}</td>
                                <td scope="row"  align="center"  className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}>{fulltime.folio.folio}</td>
                                
                                {/* PROFESORES FULLTIME - Clave de Programa Educativo */}
                                <td  align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}> {fulltime.profesor_fulltime.clave_programa.carrera_nombre.clave_programa} </td>
                                
                                {/* PROFESORES FULLTIME- Código de Nómina */}
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}>{fulltime.profesor_fulltime.nombre_docente.codigo_nomina}</td>
                                
                                {/* PROFESORES DE FULLTIME - Grado Académico */}
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}>{fulltime.profesor_fulltime.grado_academico}</td>

                                {/* PROFESORES DE FULLTIME - Nombre del Docente */}
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}>{fulltime.profesor_fulltime.nombre_docente.nombre_completo}</td>
                                
                                {/*HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - PTC*/}
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}>{fulltime.horas_sustantivas_atencion_alumnos_fulltime.ptc}</td>

                                {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Horas frente al grupo */}
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}>{fulltime.horas_sustantivas_atencion_alumnos_fulltime.horas_frente_grupo}</td>
                                
                                {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Academias - Presidente */}
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}>{fulltime.horas_sustantivas_atencion_alumnos_fulltime.academias.presidente}</td>

                                {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Academias -Secretario */}
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}>{fulltime.horas_sustantivas_atencion_alumnos_fulltime.academias.secretario}</td>
                               
                               
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}>  Nivel de (PTC)	</td>

                                
                                {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Asesorias - Residencia Profesional */}
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}>{fulltime.horas_sustantivas_atencion_alumnos_fulltime.asesorias.residencias_profesionales}</td>
                                
                                {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Asesorias - Educación Dual */}
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}>{fulltime.horas_sustantivas_atencion_alumnos_fulltime.asesorias.educacion_dual}</td>
                                
                                {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Asesorias - Titulación */}
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}> {fulltime.horas_sustantivas_atencion_alumnos_fulltime.asesorias.tutorias}</td>
                                
                                {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Asesorias - Asesorias Académicas */}
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}> {fulltime.horas_sustantivas_atencion_alumnos_fulltime.asesorias.asesorias_academica}</td>
                                
                                {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Asesorias - Tutorias */}
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}> {fulltime.horas_sustantivas_atencion_alumnos_fulltime.asesorias.tutorias}</td>
                                
                                {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Actividades Complementarias */}
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}>{fulltime.horas_sustantivas_atencion_alumnos_fulltime.actividades_complementarias}</td>
                                
                                {/* HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS - Subtotal 1 */}
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}>{fulltime.horas_sustantivas_atencion_alumnos_fulltime.subtotal_1}</td>
                                
                                {/* HORAS NECESIDAD INSTITUCIONAL - Proyectos de Investigación */}
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}>{fulltime.horas_necesidad_institucional_fulltime.proyecto_investigacion}</td>
                                
                                {/* HORAS NECESIDAD INSTITUCIONAL - Apoyo Operativo */}
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}>{fulltime.horas_necesidad_institucional_fulltime.apoyo_operativo}</td>

                                {/* HORAS NECESIDAD INSTITUCIONAL - Subtotal 2 */}
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}>{fulltime.horas_necesidad_institucional_fulltime.subtotal_2}</td>

                                {/* TOTAL */}
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}>{fulltime.total}</td>

                                {/* OBSERVACIONES */}
                                <td colSpan="3" align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}>{fulltime.observaciones}</td>
                                
                                {/* ----------------- Table de cambios ------------------------ */}
                                {/* FECHA SOLICITUD DE MODIFICACIÓN */}
                                <td  align="center" className={`text-center table-content ${areColumns2Visible ? '' : 'collapse'
                                    }`}> {fulltime.fecha_actualizacion}	</td>
                                
                                {/* CARGAHORARIA  ANTERIOR */}
                                <td  align="center" className={`text-center table-content ${areColumns2Visible ? '' : 'collapse'
                                    }`}>  {fulltime.carga_horaria_anterior}</td>
                                
                                {/* NIVEL DE PTC ANTERIOR */}
                                <td  align="center" className={`text-center table-content ${areColumns2Visible ? '' : 'collapse'
                                    }`}>  {fulltime.nivel_ptc_anterior}	</td>
                               
                               {/* CARGA HORARIA NUEVA */}
                                <td  align="center" className={`text-center table-content ${areColumns2Visible ? '' : 'collapse'
                                    }`}>  {fulltime.carga_horaria_nueva} </td>
                               
                               {/* NIVEL DE PTC NUEVO */}
                                <td  align="center" className={`text-center table-content ${areColumns2Visible ? '' : 'collapse'
                                    }`}>  {fulltime.nivel_ptc_nuevo}		</td>
                               
                               {/* LA MODIFICACIÓN SE APLICA A PARTIR DE (FECHA): */}
                               <td  align="center" className={`text-center table-content ${areColumns2Visible ? '' : 'collapse'
                                    }`}> -	</td>
                                
                                {/* NO. OFICIO RESPUESTA */}
                                <td  align="center" className={`text-center table-content ${areColumns2Visible ? '' : 'collapse'
                                    }`}>  -	</td>
                                
                                {/* NO. DE OFICIO ACADEMIA */}
                                <td  align="center" className={`text-center table-content ${areColumns2Visible ? '' : 'collapse'
                                    }`}>  -	</td>

                                {/* FECHA EN QUE RH APLICA EN EL SISTEMA */}                            
                                <td  align="center" className={`text-center table-content ${areColumns2Visible ? '' : 'collapse'
                                    }`}>  -	</td>
                               
                               {/* OBSERVACIONES */}
                                <td  align="center" className={`text-center table-content ${areColumns2Visible ? '' : 'collapse'
                                    }`}>  {fulltime.observacion_modificacion}	</td>
                                     <td align="center" className={`text-center table-content ${areColumns2Visible ||areColumnsVisible ? '' : 'collapse'
                                    }`}>    <button onClick={() => this.updateProyeccionFulltime(fulltime.id)} className="btn btn-warning">Modificar</button>
                                    <button style={boton} onClick={() => this.toggleModal(fulltime.id)} className="btn btn-danger">Eliminar</button>
                                    <button onClick={() => this.viewProyeccionFulltime(fulltime.id)} className="btn btn-info">Ver</button>	</td>
                            </tr>
                           )
                        }    
                        </tbody>
                        
                    </table>
                </div>

                <Modal isOpen={this.state.isModalOpen} toggle={this.closeModal}>
                    <ModalHeader>Confirmar Eliminación</ModalHeader>
                    <ModalBody>
                        ¿Estás seguro de que deseas eliminar esta proyección?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={() => this.deleteProyeccionFulltime(this.state.asignaturaToDeleteId)}>Eliminar</Button>
                        <Button color="secondary" onClick={this.closeModal}>Cancelar</Button>
                    </ModalFooter>
                </Modal>

            </div>


        );
    }
}

export default ListProyeccionFullTimeComponent;