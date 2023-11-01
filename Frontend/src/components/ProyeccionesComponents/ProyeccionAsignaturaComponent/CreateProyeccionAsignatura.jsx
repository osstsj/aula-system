import React, { Component } from 'react';
import AsignaturaProyeccionService from '../../../services/Proyecciones/AsignaturaProyeccionService';
import Select from 'react-select'
import axios from 'axios';
import '../../StyleGlobal/Style.css'

class CreateProyeccionAsignatura extends Component {
    constructor(props) {
        super(props)

        this.state = {
            unidades: [],
            niveles: [],
            horas_presidente: [],
            horas_secretario: [],
            docentes: [],

            disableA: false,
            disableB: true,
            disablePresidente: true,
            disableSecretario: false,
            disableAgregar: true,
            disableTest: false,
            disableDocente: true,

            unidad_academica: '',

                // profe_asignatura
                clave_programa: "",
                codigo_nomina: "",
                grado_academico: "", // nivel: '',
                nombre_docente: "",

                // horas_sustantivas_atencion_alumnos
                    // horas_asignatura: 
                    a: 0,
                    b: 0,

                horas_frente_grupo: 0,
                    
                    // academias
                    presidente: 0,
                    secretario: 0,
                    
                    // asesorias
                    asesorias_academica: 0,
                    educacion_dual: 0,
                    residencias_profesionales: 0,
                    titulacion: 0,
                    tutorias: 0,

                actividades_complementarias: 0,
                subtotal_1: 0,

                // horas_necesidad_institucional
                invesigacion_educativa: 0,
                apoyo_operativo: 0,
                subtotal_2: 0,
            
            total: 0,
            observaciones: "",
        }
    }

    createProyeccionAsignatura = (e) => {
        e.preventDefault();

        let asignatura = {
            profe_asignatura: {
                clave_programa: this.state.clave_programa.trim(),
                codigo_nomina: this.state.codigo_nomina.trim(),
                grado_academico: this.state.grado_academico.trim(),
                nombre_docente: this.state.nombre_docente.trim(),
            },
                horas_sustantivas_atencion_alumnos: {
                    horas_asignatura: {
                    a: this.state.a,
                    b: this.state.b,
                },
                horas_frente_grupo: this.state.horas_frente_grupo,

                    academias: {
                    presidente: this.state.presidente,
                    secretario: this.state.secretario,
                    },

                    asesorias: {
                    asesorias_academica: this.state.asesorias_academica,
                    educacion_dual: this.state.educacion_dual,
                    residencias_profesionales: this.state.residencias_profesionales,
                    titulacion: this.state.titulacion,
                    tutorias: this.state.titulacion,
                    },

                actividades_complementarias: this.state.actividades_complementarias,
                },

                horas_necesidad_institucional:  {
                invesigacion_educativa: this.state.invesigacion_educativa,
                apoyo_operativo: this.state.apoyo_operativo,
                },

            unidad_academica: this.state.unidad_academica.trim(),
            observaciones: this.state.observaciones.trim(),
        }

        if (this.state.disablePresidente == false) {
            asignatura.horas_sustantivas_atencion_alumnos.academias.presidente = 0;
        } else {
            asignatura.horas_sustantivas_atencion_alumnos.academias.secretario = 0;
        }

        if (this.state.disableA == true) {
            asignatura.horas_sustantivas_atencion_alumnos.horas_asignatura.a = 0;
        } else {
            asignatura.horas_sustantivas_atencion_alumnos.horas_asignatura.b = 0;
        }


        console.log("Proyeccion por asignatura: " + JSON.stringify(asignatura));

        AsignaturaProyeccionService.createProyeccionAsignatura(asignatura).then(
            res => {
                this.props.history.push('/list-proyeccion_asignatura');
            }
        );
    }

    cancel() {
        this.props.history.push('/list-proyeccion_asignatura');
    }

    componentDidMount() {        
        this.getUnidadList();
        this.getNivel();
        this.getHorasAcademias_presidente();
        this.getHorasAcademias_secretario();
        this.getDocenteList();
    }

    async getDocenteList() {
        const res = await axios.get(process.env.REACT_APP_LOCAL_API_BASE_URL + 'docentes');
        const data = res.data;

        let options = data.map(d => ({
            "value": d.nombre + " " + d.apellido_paterno + " "  + d.apellido_materno,
            "label": d.nombre + " " + d.apellido_paterno + " "  + d.apellido_materno
        }))
        this.setState({ docentes: options });
    }
    
    async getUnidadList() {
        const res = await axios.get(process.env.REACT_APP_LOCAL_API_BASE_URL  + "planteles");
        const data = res.data;

        let options = data.map(d => ({
            "value": d.tipo_unidad,
            "label": d.nombre_completo
        }))
        this.setState({ unidades: options });
    }

    getNivel() {
        const nivelList = [
            { value: 'LICENCIATURA', label: 'LICENCIATURA' },
            { value: 'INGENIERIA', label: 'INGENIERIA' },
            { value: 'MAESTRIA', label: 'MAESTRIA' },
            { value: 'DOCTORADO', label: 'DOCTORADO' },
        ]

        this.setState({ niveles: nivelList });
    }

    getHorasAcademias_presidente() {
        const academiasList = [
            { value: 1, label: 1 },
            { value: 2, label: 2 },
            { value: 3, label: 3 },
        ]

        this.setState({ horas_presidente: academiasList });
    }

    getHorasAcademias_secretario() {
        const academiasList = [
            { value: 1, label: 1 },
            { value: 2, label: 2 },
            { value: 3, label: 3 },
        ]

        this.setState({ horas_secretario: academiasList });
    }


    onChangeUnidadHandler = (event) => {
        this.setState({ unidad_academica: event.label });
        this.setState({ disableDocente: false});
        if (event.value == 'Extension') {
            this.state.disableTest= true;
        } else {
            this.state.disableTest =false;
        }
        this.state.disableAgregar = (this.state.clave_programa.length != 0) && (this.state.codigo_nomina.length != 0) &&
        (this.state.grado_academico.length != 0) && (this.state.nombre_docente.length != 0) ?
            false : true;
    }

    onChangeClaveProgramaHandler = (event) => {
        this.setState({clave_programa: event.target.value});

        this.state.disableAgregar = (this.state.clave_programa.length != 0) && (this.state.codigo_nomina.length != 0) &&
        (this.state.grado_academico.length != 0) && (this.state.nombre_docente.length != 0) ?
            false : true;
    }
    onChangeCodigoNominaHandler = (event) => {
        this.setState({codigo_nomina: event.target.value});

        this.state.disableAgregar = (this.state.clave_programa.length != 0) && (this.state.codigo_nomina.length != 0) &&
        (this.state.grado_academico.length != 0) && (this.state.nombre_docente.length != 0) ?
            false : true;
    }
    onChangeGradoAcademicoaHandler = (event) => {
        this.setState({grado_academico: event.label});

        this.state.disableAgregar = (this.state.clave_programa.length != 0) && (this.state.codigo_nomina.length != 0) &&
        (this.state.grado_academico.length != 0) && (this.state.nombre_docente.length != 0) ?
            false : true;
    }
    onChangeNombreDocenteHandler = (event) => {
        // this.setState({nombre_docente: event.target.value});
        this.setState({ nombre_docente: event.label });
        
        this.state.disableAgregar = (this.state.clave_programa.length != 0) && (this.state.codigo_nomina.length != 0) &&
        (this.state.grado_academico.length != 0) && (this.state.nombre_docente.length != 0) ?
            false : true;
    }


    onChangeAHandler = (event) => {
        this.setState({a: event.target.value});
        let aux = event.target.value;
        this.setState({subtotal_1: this.state.subtotal_1 + aux});

        this.state.disableAgregar = (this.state.clave_programa.length != 0) && (this.state.codigo_nomina.length != 0) &&
        (this.state.grado_academico.length != 0) && (this.state.nombre_docente.length != 0) ?
            false : true;
    }
    onChangeBHandler = (event) => {
        this.setState({b: event.target.value});
        this.setState({subtotal_1: this.state.subtotal_1 + event.target.value});

        this.state.disableAgregar = (this.state.clave_programa.length != 0) && (this.state.codigo_nomina.length != 0) &&
        (this.state.grado_academico.length != 0) && (this.state.nombre_docente.length != 0) ?
            false : true;
    }

    onChangeADisablerHandler = () => {
        this.setState(() => ({
            disableA: false,
            disableB: true
        }));

        this.state.disableAgregar = (this.state.clave_programa.length != 0) && (this.state.codigo_nomina.length != 0) &&
        (this.state.grado_academico.length != 0) && (this.state.nombre_docente.length != 0) ?
            false : true;
    }
    onChangeBDisablerHandler = () => {
        this.setState(() => ({
            disableB: false,
            disableA: true
        }));

        this.state.disableAgregar = (this.state.clave_programa.length != 0) && (this.state.codigo_nomina.length != 0) &&
        (this.state.grado_academico.length != 0) && (this.state.nombre_docente.length != 0) ?
            false : true;
    }
    onChangePresidenteDisablerHandler = () => {
        this.setState(() => ({
            disablePresidente: true,
            disableSecretario: false,
        }));

        this.state.disableAgregar = (this.state.clave_programa.length != 0) && (this.state.codigo_nomina.length != 0) &&
        (this.state.grado_academico.length != 0) && (this.state.nombre_docente.length != 0) ?
            false : true;
    }
    onChangeSecretarioDisablerHandler = () => {
        this.setState(() => ({
            disableSecretario: true,
            disablePresidente: false,
        }));

        this.state.disableAgregar = (this.state.clave_programa.length != 0) && (this.state.codigo_nomina.length != 0) &&
        (this.state.grado_academico.length != 0) && (this.state.nombre_docente.length != 0) ?
            false : true;
    }


    onChangeHorasFrenteGrupoHandler = (event) => {
        this.setState({horas_frente_grupo: event.target.value});
        this.state.subtotal_1 =+ event.target.value;

        this.state.disableAgregar = (this.state.clave_programa.length != 0) && (this.state.codigo_nomina.length != 0) &&
        (this.state.grado_academico.length != 0) && (this.state.nombre_docente.length != 0) ?
            false : true;
    }
    onChangePresidenteHandler = (event) => {
        this.setState({presidente: event.label});
        // this.state.subtotal_1 =+ event.value;

        this.state.disableAgregar = (this.state.clave_programa.length != 0) && (this.state.codigo_nomina.length != 0) &&
        (this.state.grado_academico.length != 0) && (this.state.nombre_docente.length != 0) ?
            false : true;
    }
    onChangeSecretarioHandler = (event) => {
        this.setState({secretario: event.label});
        this.state.subtotal_1 =+ event.value;

        this.state.disableAgregar = (this.state.clave_programa.length != 0) && (this.state.codigo_nomina.length != 0) &&
        (this.state.grado_academico.length != 0) && (this.state.nombre_docente.length != 0) ?
            false : true;
    }
    onChangeAsesoriaAcademicaHandler = (event) => {
        this.setState({asesorias_academica: event.target.value});
        this.state.subtotal_1 =+ event.target.value;

        this.state.disableAgregar = (this.state.clave_programa.length != 0) && (this.state.codigo_nomina.length != 0) &&
        (this.state.grado_academico.length != 0) && (this.state.nombre_docente.length != 0) ?
            false : true;
    }
    onChangeEducacionDualHandler = (event) => {
        this.setState({educacion_dual: event.target.value});
        this.state.subtotal_1 =+ event.target.value;

        this.state.disableAgregar = (this.state.clave_programa.length != 0) && (this.state.codigo_nomina.length != 0) &&
        (this.state.grado_academico.length != 0) && (this.state.nombre_docente.length != 0) ?
            false : true;
    }
    onChangeResidenciasProfesionalesHandler = (event) => {
        this.setState({residencias_profesionales: event.target.value});
        this.state.subtotal_1 =+ event.target.value;

        this.state.disableAgregar = (this.state.clave_programa.length != 0) && (this.state.codigo_nomina.length != 0) &&
        (this.state.grado_academico.length != 0) && (this.state.nombre_docente.length != 0) ?
            false : true;
    }
    onChangeTutoriasHandler = (event) => {
        this.setState({tutorias: event.target.value});
        this.state.subtotal_1 =+ event.target.value;

        this.state.disableAgregar = (this.state.clave_programa.length != 0) && (this.state.codigo_nomina.length != 0) &&
        (this.state.grado_academico.length != 0) && (this.state.nombre_docente.length != 0) ?
            false : true;
    }
    onChangeTitulacionHandler = (event) => {
        this.setState({titulacion: event.target.value});
        this.state.subtotal_1 =+ event.target.value;

        this.state.disableAgregar = (this.state.clave_programa.length != 0) && (this.state.codigo_nomina.length != 0) &&
        (this.state.grado_academico.length != 0) && (this.state.nombre_docente.length != 0) ?
            false : true;
    }
    onChangeActividadesComplementariasHandler = (event) => {
        this.setState({actividades_complementarias: event.target.value});
        this.state.subtotal_1 =+ event.target.value;

        this.state.disableAgregar = (this.state.clave_programa.length != 0) && (this.state.codigo_nomina.length != 0) &&
        (this.state.grado_academico.length != 0) && (this.state.nombre_docente.length != 0) ?
            false : true;
    }


    onChangeInvesigacionEducativaHandler = (event) => {
        this.setState({invesigacion_educativa: event.target.value});
        this.state.subtotal_2 =+ event.target.value;

        this.state.disableAgregar = (this.state.clave_programa.length != 0) && (this.state.codigo_nomina.length != 0) &&
        (this.state.grado_academico.length != 0) && (this.state.nombre_docente.length != 0) ?
            false : true;
    }
    onChangeApoyoOperativoHandler = (event) => {
        this.setState({apoyo_operativo: event.target.value});
        this.state.subtotal_2 =+ event.target.value;

        this.state.disableAgregar = (this.state.clave_programa.length != 0) && (this.state.codigo_nomina.length != 0) &&
        (this.state.grado_academico.length != 0) && (this.state.nombre_docente.length != 0) ?
            false : true;
    }
    onChangeSubtotal2Handler = (event) => {
        this.setState({subtotal_2: event.target.value});
        this.state.subtotal_2 =+ event.target.value;

        this.state.disableAgregar = (this.state.clave_programa.length != 0) && (this.state.codigo_nomina.length != 0) &&
        (this.state.grado_academico.length != 0) && (this.state.nombre_docente.length != 0) ?
            false : true;
    }
    onChangeTotalHandler = (event) => {
        this.setState({total: event.target.value});

        this.state.disableAgregar = (this.state.clave_programa.length != 0) && (this.state.codigo_nomina.length != 0) &&
        (this.state.grado_academico.length != 0) && (this.state.nombre_docente.length != 0) ?
            false : true;
    }
    onChangeObservacionesHandler = (event) => {
        this.setState({observaciones: event.target.value});

        this.state.disableAgregar = (this.state.clave_programa.length != 0) && (this.state.codigo_nomina.length != 0) &&
        (this.state.grado_academico.length != 0) && (this.state.nombre_docente.length != 0) ?
            false : true;
    }



    render() {
        return (
            <div className="container">
                <div className="row justify-content-center mt-3 mb-3">
                    <div className="card col-10" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                        <div className="card-body">
                            <div className="card-header text-center" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                                <h2 className='h3'><b>Agregar Proyeccion por Asignatura</b></h2>
                            </div>
                            <br />
                            <form>    
                                <div className="col">
                                    <div className="row mb-3">
                                        <label className="h5"><b>PROFESORES DE ASIGNATURA</b></label>
                                    </div>
                                </div>
                                
                                <div className="row mb-4">
                                    <div className="col">
                                        <div className="form-outline">
                                            <label>Unidad Academica</label>
                                            <Select
                                                rules={{ required: true }}
                                                options={this.state.unidades}
                                                onChange={(e) => this.onChangeUnidadHandler(e)}
                                                value={{ label: this.state.unidad_academica == '' ? "Seleccione unidad academica..." : this.state.unidad_academica}}
                                            />
                                        </div>
                                    </div>
                                
                                    <div className="col">
                                        <div className="form-outline">
                                            <label className="">Clave de Programa Educativo:</label>
                                            <input 
                                                placeholder="Ingrese clave de programa educativo..."
                                                className="form-control"
                                                value={this.state.clave_programa}
                                                onChange={this.onChangeClaveProgramaHandler}
                                                required
                                            />
                                        </div>
                                    </div>                        
                                </div>

                                <div className="row mb-4">                              
                                    <div className="col">
                                        <div className="form-outline">
                                            <label className="">Nombre del Docente: </label>
                                            <Select
                                            // depende que se realize el cambio en unidad academcia para que se pueda habilidar
                                            // y se reseteara si se cambia la unidad academica, al igual se resetea el valor de nivel academico.
                                                isDisabled={this.state.disableDocente}
                                                rules={{ required: true }}
                                                options={this.state.docentes}
                                                onChange={(e) => this.onChangeNombreDocenteHandler(e)}
                                                value={{ label: this.state.nombre_docente == '' ? "Seleccione nombre del docente..." : this.state.nombre_docente}}
                                            />
                                            {/* <input 
                                                placeholder="Ingrese nombre del docente..."
                                                 className="form-control"
                                                value={this.state.nombre_docente}
                                                onChange={this.onChangeNombreDocenteHandler}
                                                required
                                            /> */}
                                        </div>
                                    </div>                        
                                </div>

                                <div className="row mb-4">
                                    <div className="col">
                                        <div className="form-outline">
                                            <label>Código de Nómina:</label>
                                            <input 
                                                placeholder="Ingrese código de nómina..."
                                                className="form-control"
                                                value={this.state.codigo_nomina}
                                                onChange={this.onChangeCodigoNominaHandler}
                                                required
                                            />
                                        </div>
                                    </div>
                                
                                    <div className="col">
                                    {/* <div className="form-outline" style={{display: 'none'}}> */}
                                        <div className="form-outline" style={{display: 'block'}}>
                                            <label>Nivel Academico</label>
                                            <Select
                                                options={this.state.niveles}
                                                onChange={(e) => this.onChangeGradoAcademicoaHandler(e)}
                                                value={{ label: this.state.grado_academico  == '' ? "Seleccione nivel academico..." : this.state.grado_academico}}
                                            />
                                        </div>
                                    </div>                    
                                </div>

                                <hr />
                                <div className="col">
                                    <div className="row">
                                        <label className="h5"><b>HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS</b></label>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="row mb-2 ">
                                        <label className="h6"><b>Horas de Asignatura</b></label>
                                    </div>
                                </div>

                                <div className="row mt-4">
                                    <div className="col">
                                            <div className="form-group row">
                                                <div className="col">
                                                <input
                                                    className='mr-2'
                                                    type="radio"
                                                    onChange={this.onChangeADisablerHandler}
                                                    checked={this.state.disableB}
                                                    /> Horas A
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                    <div className="col-sm-1 col-form-label">
                                                        <label className="">A:</label>
                                                    </div>
                                                    <div class="col">
                                                    <div class="input-group">
                                                        <input type='number'
                                                            className="form-control"
                                                            value={this.state.a}
                                                            onChange={this.onChangeAHandler}
                                                            disabled={this.state.disableA}
                                                            checked={this.state.disableB}
                                                            required
                                                        />
                                                        <div class="input-group-append">
                                                            <span class="input-group-text">Hora(s)</span>
                                                        </div>
                                                    </div>
                                                 </div>

                                            </div>  
                                        </div>
                                        <div className="col">
                                            <div className="form-group row">
                                                    <div className="col">
                                                    <input
                                                        className='mr-2'
                                                        type="radio"
                                                        onChange={this.onChangeBDisablerHandler}
                                                        checked={this.state.disableA}
                                                        /> Horas B
                                                    </div>
                                                </div>
                                            <div className="form-group row">
                                                <div className="col-sm-1 col-form-label">
                                                    <label className="">B:</label>
                                                </div>
                                        
                                                <div class="col">
                                                    <div class="input-group">
                                                        <input type='number'
                                                            className="form-control"
                                                            value={this.state.b}
                                                            onChange={this.onChangeBHandler}
                                                            disabled={this.state.disableB}
                                                            required
                                                        />
                                                        <div class="input-group-append">
                                                            <span class="input-group-text">Hora(s)</span>
                                                        </div>
                                                    </div>
                                                </div>            
                                            </div>  
                                        </div>                                    
                                </div>  


                                <div className="row"> 
                                    <div className="col-6">
                                        <div class="form-group row">
                                                <label className="col-md-5 col-form-label"><b>Horas Frente a Grupo:</b> </label>

                                            <div className="col">
                                                <div class="input-group">
                                                    <input
                                                        type='number'
                                                        className=" form-control"
                                                        value={this.state.horas_frente_grupo}
                                                        onChange={this.onChangeHorasFrenteGrupoHandler}
                                                        required
                                                    />
                                                    <div class="input-group-append">
                                                        <span class="input-group-text">Hora(s)</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                         

                                <div className="col">
                                    <div className="row mb-2 mt-3">
                                        <label className="h6"><b>Academias</b></label>
                                    </div>
                                </div>                                   

                                <div className="row mb-4">
                                    <div className="col">
                                        <div className="form-group row">
                                            <div className="col">
                                                <input
                                                    className='mr-2'
                                                    type="radio"
                                                    onChange={this.onChangePresidenteDisablerHandler}
                                                    checked={this.state.disablePresidente}
                                                    /> Horas Presidente
                                            </div>
                                        </div>
                                        <div className="form-outline">
                                            <label>Presidente:</label>
                                            <Select
                                                isDisabled= {!this.state.disablePresidente}
                                                hideSelectedOptions={!this.state.disablePresidente}
                                                rules={{ required: true }}
                                                options={this.state.horas_presidente}
                                                onChange={(e) => this.onChangePresidenteHandler(e)}
                                                value={{ label: this.state.presidente == '' ? "Seleccione hora(s) presidente..." : this.state.presidente }}
                                            />
                                        </div>
                                    </div>
                                
                                    <div className="col">
                                        <div className="form-group row">
                                            <div className="col">
                                                <input
                                                    className='mr-2'
                                                    type="radio"
                                                    onChange={this.onChangeSecretarioDisablerHandler}
                                                    checked={this.state.disableSecretario}
                                                    /> Horas Secretario
                                            </div>
                                        </div>
                                        <div className="form-outline">
                                            <label className="">Secretario:</label>
                                            <Select
                                                isDisabled={!this.state.disableSecretario}
                                                rules={{ required: true }}
                                                options={this.state.horas_presidente}
                                                onChange={(e) => this.onChangeSecretarioHandler(e)}
                                                value={{ label: this.state.secretario == '' ? "Seleccione hora(s) secretario..." : this.state.secretario }}
                                            />
                                        </div>
                                    </div>                        
                                </div>

                                <div className="col">
                                    <div className="row mb-2 mt-3">
                                        <label className="h6"><b>Asesorías</b></label>
                                    </div>
                                </div> 
                                <div className="row mb-4">
                                    <div className="col">
                                        <div className="form-outline">
                                            <label>Asesorias Académicas:</label>
                                            <div class="input-group">
                                                <input
                                                    type='number'
                                                    className="form-control"
                                                    value={this.state.asesorias_academica}
                                                    onChange={this.onChangeAsesoriaAcademicaHandler}
                                                    required
                                                />
                                            <div class="input-group-append">
                                                <span class="input-group-text">Hora(s)</span>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                
                                    <div className="col">
                                        <div className="form-outline">
                                            <label className="">Educacion Dual:</label>
                                            <div class="input-group">
                                                <input
                                                    type='number'
                                                    className="form-control"
                                                    value={this.state.educacion_dual}
                                                    onChange={this.onChangeEducacionDualHandler}
                                                    required
                                                />
                                                <div class="input-group-append">
                                                    <span class="input-group-text">Hora(s)</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>                        
                                </div>

                                <div className="row mb-4">
                                    <div className="col">
                                        <div className="form-outline">
                                            <label>Residencias Profesionales:</label>
                                            <div class="input-group">
                                                <input
                                                    type='number'
                                                    className="form-control"
                                                    value={this.state.residencias_profesionales}
                                                    onChange={this.onChangeResidenciasProfesionalesHandler}
                                                    required
                                                />
                                                <div class="input-group-append">
                                                    <span class="input-group-text">Hora(s)</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                
                                    <div className="col">
                                        <div className="form-outline">
                                            <label className="">Titulación:</label>
                                            <div class="input-group">
                                                <input
                                                    type='number'
                                                    className="form-control"
                                                    value={this.state.titulacion}
                                                    onChange={this.onChangeTitulacionHandler}
                                                    required
                                                />
                                            <div class="input-group-append">
                                                    <span class="input-group-text">Hora(s)</span>
                                                </div>
                                            </div>
                                        </div>                            
                                    </div>      

                                    <div className="col">
                                        <div className="form-outline">
                                            <label className="">Tutorias:</label>
                                            <div class="input-group">
                                                <input
                                                    type='number'
                                                    className="form-control"
                                                    value={this.state.tutorias}
                                                    onChange={this.onChangeTutoriasHandler}
                                                    required
                                                />
                                                <div class="input-group-append">
                                                    <span class="input-group-text">Hora(s)</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-7">
                                        <div class="form-group row">
                                            <label className="col-md-5 col-form-label"><b>Actividades Complementarias:</b> </label>
                                            <div className="col">
                                                <div class="input-group">
                                                    <input
                                                        type='number'
                                                        className=" form-control"
                                                        value={this.state.actividades_complementarias}
                                                        onChange={this.onChangeActividadesComplementariasHandler}
                                                        required
                                                    />
                                                    <div class="input-group-append">
                                                        <span class="input-group-text">Hora(s)</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-7">
                                        <div class="form-group row">
                                            <label className="col-md-5 col-form-label"><b>Subtotal 1:</b> </label>
                                            <div className="col">
                                                <div class="input-group">
                                                    <input readOnly={true}
                                                        type='number'
                                                        // placeholder="Subtotal 1 reactivo"
                                                        className=" form-control"
                                                        value={this.state.subtotal_1}
                                                        // onChange={this.onChangesubtotal1Handler}
                                                    />
                                                    <div class="input-group-append">
                                                        <span class="input-group-text">Hora(s)</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr />

                                <div className="col">
                                    <div className="row">
                                        <label className="h5"><b>HORAS NECESIDAD INSTITUCIONAL</b></label>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <div class="form-group row">
                                                <label className="col-md-6 col-form-label">Investigacion educativa, desarrrollo tecnológico:</label>

                                            <div className="col">
                                                <div class="input-group">
                                                    <input
                                                        type='number'
                                                        placeholder="Subtotal 1 reactivo"
                                                        className=" form-control"
                                                        value={this.state.invesigacion_educativa}
                                                        onChange={this.onChangeInvesigacionEducativaHandler}
                                                        required
                                                    />
                                                    <div class="input-group-append">
                                                        <span class="input-group-text">Hora(s)</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-4">
                                    <div className="col">
                                        <div className="form-outline">
                                            <label className="">Apoyo Operativo:</label>
                                            <div class="input-group">
                                                <input
                                                    type='number'
                                                    className="form-control"
                                                    value={this.state.apoyo_operativo}
                                                    onChange={this.onChangeApoyoOperativoHandler}
                                                    required ={true}
                                                />
                                                <div class="input-group-append">
                                                    <span class="input-group-text">Hora(s)</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="form-outline">
                                            <label className=""><b>Subtotal 2:</b></label>
                                                <div class="input-group">
                                                    <input readOnly={true}
                                                        type='number'
                                                        placeholder="Subtotal 2 reactivo"
                                                         className="form-control"
                                                        value={this.state.subtotal_2}
                                                        onChange={this.onChangeSubtotal2Handler}
                                                    />
                                                <div class="input-group-append">
                                                    <span class="input-group-text">Hora(s)</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr />

                                <div className="row mb-4">
                                    <div className="col-6">
                                        <div className="form-outline">
                                            <label className=""><b>Total:</b></label>
                                            <div class="input-group">
                                                <input readOnly={true}
                                                    type='number'
                                                    placeholder="Total reactivo"
                                                     className="form-control"
                                                    value={this.state.total}
                                                    onChange={this.onChangeTotalHandler}
                                                />
                                                <div class="input-group-append">
                                                    <span class="input-group-text">Hora(s)</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-4">
                                    <div className="col">
                                        <div className="form-outline">
                                            <label className=""><b>OBSERVACIONES:</b></label>
                                            <textarea
                                                placeholder="Ingrese observaciones de la proyeccion por asignatura..."
                                                 className="form-control"
                                                value={this.state.observaciones}
                                                onChange={this.onChangeObservacionesHandler}
                                                required
                                            />
                                        </div>                            
                                    </div>
                                </div>

                             </form>
                        </div>

                        <br />
                        <div className="card-footer text-muted mb-3 mt-3">
                            <button className="btn btn-primary" onClick={this.createProyeccionAsignatura} disabled={this.state.disableAgregar}>Agregar</button>
                            <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default CreateProyeccionAsignatura;