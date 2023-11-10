import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../Style/Table.css';
import '../../StyleGlobal/Style.css'

class ListProyeccionFullTimeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            areColumnsVisible: true, // Estado inicial para controlar la visibilidad de las columnas
            areColumns2Visible: true,
        };
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
                    {/* <button style={{ width: '15%', marginRight: '10px'}} className="btn btn-primary mb-4" onClick={this.addPlantel}>Agregar plantel</button> */}
                    <button    onClick={this.toggleColumns}  style={{ marginRight:'10px' }} className="btn btn-success mb-4" >Comprimir Actual</button>
                    <button    onClick={this.toggleColumn2s}  style={{  }} className="btn btn-primary mb-4" >Comprimir Anterior</button>

                </div>
                <div className="row" style={{ overflowX: 'auto',boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)'  }}>
                    <table className="table table-striped table-bordered" border="3" cellspacing="0" cellpadding="0">
                        <thead>
                            <tr>
                                <th className='Title-Table' colSpan="36">UNIDAD ACADÉMICA ARANDAS</th>
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
                                    }`}>No.</th>
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
                                    }`}>CARGA HORARIA ANTERIOR</th>
                                <th rowSpan="2"  className={`text-center text-white table-blue  ${areColumns2Visible ? '' : 'collapse'
                                    }`}>NIVEL DE PTC ANTERIOR</th>
                                <th rowSpan="2"  className={`text-center text-white table-blue  ${areColumns2Visible ? '' : 'collapse'
                                    }`}>CARGA HORARIA NUEVA</th>
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
                            <tr >
                                <td  className={`text-center table-id ${areColumns2Visible ||areColumnsVisible ? '' : 'collapse'
                                    }`}>1</td>
                                <td scope="row"  align="center"  className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}>1</td>
                                <td  align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}> Cave de Programa Educativo </td>
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}> No. de Nómina	</td>
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}>Grado Académico	</td>
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}>Nombre del Docente  </td>
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}> Nivel de (PTC)	 </td>
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}> Horas frente a Grupo	 </td>
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}> Presidente	 </td>
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}> Secretario </td>
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}>  Nivel de (PTC)	</td>
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}> Residencia Profesional	</td>
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}> Dual	</td>
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}> Titulación		</td>
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}> Asesorias Académicas	</td>
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}>  Tutorias	</td>
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}>  Actividades complementarias		</td>
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}>  Subtotal 1</td>
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}>  Proyectos de Investigación		</td>
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}> Apoyo operativo 	</td>
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}> Subtotal2 	</td>
                                <td   align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}> total 	</td>
                                <td colSpan="3" align="center" className={`text-center table-content ${areColumnsVisible ? '' : 'collapse'
                                    }`}>  OBSERVACIONES	</td>
                                <td  align="center" className={`text-center table-content ${areColumns2Visible ? '' : 'collapse'
                                    }`}> FECHA SOLICITUD DE MODIFICACIÓN	 	</td>
                                <td  align="center" className={`text-center table-content ${areColumns2Visible ? '' : 'collapse'
                                    }`}>  CARGA HORARIA ANTERIOR		</td>
                                <td  align="center" className={`text-center table-content ${areColumns2Visible ? '' : 'collapse'
                                    }`}>  NIVEL DE PTC ANTERIOR		</td>
                                <td  align="center" className={`text-center table-content ${areColumns2Visible ? '' : 'collapse'
                                    }`}>  CARGA HORARIA NUEVA		</td>
                                <td  align="center" className={`text-center table-content ${areColumns2Visible ? '' : 'collapse'
                                    }`}>  NIVEL DE PTC NUEVO		</td>
                                <td  align="center" className={`text-center table-content ${areColumns2Visible ? '' : 'collapse'
                                    }`}>  LA MODIFICACIÓN SE APLICA A PARTIR DE (FECHA):		</td>
                                <td  align="center" className={`text-center table-content ${areColumns2Visible ? '' : 'collapse'
                                    }`}>  NO. OFICIO RESPUESTA		</td>
                                <td  align="center" className={`text-center table-content ${areColumns2Visible ? '' : 'collapse'
                                    }`}>  NO. DE OFICIO ACADEMIA		</td>
                                <td  align="center" className={`text-center table-content ${areColumns2Visible ? '' : 'collapse'
                                    }`}>  FECHA EN QUE RH APLICA EN EL SISTEMA		</td>
                                <td  align="center" className={`text-center table-content ${areColumns2Visible ? '' : 'collapse'
                                    }`}>  OBSERVACIONES	</td>
                                     <td align="center" className={`text-center table-content ${areColumns2Visible ||areColumnsVisible ? '' : 'collapse'
                                    }`}>    <button onClick={{}} className="btn btn-warning">Actualizar</button>
                                    <button style={boton} onClick={{}} className="btn btn-danger">Eliminar</button>
                                    <button onClick={{}} className="btn btn-info">Ver</button>	</td>
                            </tr>
                            
                        </tbody>
                        {/* Resto de las filas */}
                    </table>
                </div>
            </div>


        );
    }
}

export default ListProyeccionFullTimeComponent;