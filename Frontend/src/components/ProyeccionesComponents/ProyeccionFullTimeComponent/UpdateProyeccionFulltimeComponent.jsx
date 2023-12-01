import React, { Component } from 'react';
import FulltimeProyeccionService from '../../../services/Proyecciones/FulltimeProyeccionService';
import FolioFulltimeService from '../../../services/Proyecciones/FolioFulltimeService';
import CarreraPorUnidadService from '../../../services/Control/CarreraPorUnidadService';
import UnidadService from '../../../services/Control/UnidadService';
import DocenteService from '../../../services/Control/DocenteService';
import Select from 'react-select'
import axios from 'axios';
import '../../StyleGlobal/Style.css'

class UpdateProyeccionFulltimeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
            id: this.props.match.params.id, // id proyeccion

            unidades: [],
            niveles: [],
            carreras: [],
            horas_presidente: [],
            horas_secretario: [],
            docentes: [],
            folios: [],
            tipos_unidades: [],

            folio: '',
            id_folio: null,
            id_unidad: null,
            id_docente: null,
            id_carrera: null,

            disableA: false,
            disableB: true,
            disablePresidente: true,
            disableSecretario: false,
            disableAgregar: true,
            disableDocente: true,

            error: null,
            errorInfo: null,

            unidad_academica: '',
            tipo_unidad: '',

                // profe_fulltime
                clave_programa: "",
                codigo_nomina: "",
                grado_academico: "", // nivel: '',
                nombre_docente: "",

                // horas_sustantivas_atencion_alumnos
                    // horas_fulltime: 
                    a: 0,
                    b: 0,

                horas_frente_grupo: 0,
                ptc: '',
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
                proyecto_investigacion: 0,
                apoyo_operativo: 0,
                subtotal_2: 0,
            
            total: 0,
            observaciones: "",
        }
    }

    updateProyeccionFulltime= (e) => {
        e.preventDefault();

        let fulltime = {
            profesor_fulltime: {
                grado_academico: this.state.grado_academico,
            },

            horas_sustantivas_atencion_alumnos_fulltime: {
             
                horas_frente_grupo: this.state.horas_frente_grupo,
                ptc: this.state.ptc,
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

            horas_necesidad_institucional_fulltime:  {
                proyecto_investigacion: this.state.proyecto_investigacion,
                apoyo_operativo: this.state.apoyo_operativo,
            },

            observaciones: this.state.observaciones.trim(),
        }

        if (this.state.disablePresidente === false) {
            fulltime.horas_sustantivas_atencion_alumnos_fulltime.academias.presidente = 0;
        } else {
            fulltime.horas_sustantivas_atencion_alumnos_fulltime.academias.secretario = 0;
        }
        
        this.setState({ isLoading: true });

        console.log("Proyeccion por asignatura: " + JSON.stringify(fulltime));

        FulltimeProyeccionService.updateProyeccionFulltimeById(fulltime, this.state.id,
            this.state.id_folio, this.state.id_unidad,
            this.state.id_docente, this.state.id_carrera)
        .then(
         () => {
                this.props.history.push(`/list-proyeccion_fulltime/${this.state.id_folio}`);
            }
        ).catch(error => {
            console.log("Error en crear proyeccion por tiempo completo: " + error);
            alert('Error en crear proyeccion por tiempo completo...');
            this.props.history.push('/');
        });

    }

    cancel() {
        this.props.history.push(`/list-proyeccion_fulltime/${this.state.id_folio}`);
    }

    componentDidMount() {        
        FulltimeProyeccionService.getProyeccioneFulltimeById(this.state.id)
        .then(res => {
            let fulltime = res.data;
            
            this.setState({
                // fulltime
                folio: fulltime.folio.folio,
                id_folio: fulltime.folio.id,
                    // profesor_fulltime 
                    clave_programa: fulltime.profesor_fulltime.clave_programa.carrera_nombre.clave_programa,
                    codigo_nomina: fulltime.profesor_fulltime.nombre_docente.codigo_nomina,
                    grado_academico: fulltime.profesor_fulltime.grado_academico,
                    nombre_docente: fulltime.profesor_fulltime.nombre_docente.nombre_completo,
                   

                    // horas_sustantivas_atencion_alumnos
                    ptc: fulltime.profesor_fulltime.nombre_docente.categoria,
                    horas_frente_grupo:fulltime.horas_sustantivas_atencion_alumnos_fulltime.horas_frente_grupo,

                        // academias
                        presidente: fulltime.horas_sustantivas_atencion_alumnos_fulltime.academias.presidente,
                        secretario: fulltime.horas_sustantivas_atencion_alumnos_fulltime.academias.secretario,

                        // asesorias
                        residencias_profesionales: fulltime.horas_sustantivas_atencion_alumnos_fulltime.asesorias.residencias_profesionales,
                        educacion_dual: fulltime.horas_sustantivas_atencion_alumnos_fulltime.asesorias.educacion_dual,
                        titulacion: fulltime.horas_sustantivas_atencion_alumnos_fulltime.asesorias.titulacion,
                        asesorias_academica: fulltime.horas_sustantivas_atencion_alumnos_fulltime.asesorias.asesorias_academica,
                        tutorias: fulltime.horas_sustantivas_atencion_alumnos_fulltime.asesorias.tutorias,

                    actividades_complementarias: fulltime.horas_sustantivas_atencion_alumnos_fulltime.actividades_complementarias,
                    subtotal_1: fulltime.horas_sustantivas_atencion_alumnos_fulltime.subtotal_1,

                    // horas_necesidad_institucional
                    proyecto_investigacion: fulltime.horas_necesidad_institucional_fulltime.proyecto_investigacion,
                    apoyo_operativo: fulltime.horas_necesidad_institucional_fulltime.apoyo_operativo,
                    subtotal_2: fulltime.horas_necesidad_institucional_fulltime.subtotal_2,

                total: fulltime.total,
                unidad_academica: fulltime.unidad_academica.nombre_completo,

                id_unidad: fulltime.unidad_academica.id,
                id_docente: fulltime.profesor_fulltime.nombre_docente.id,
                id_carrera: fulltime.profesor_fulltime.clave_programa.id,
                id_folio: fulltime.folio.id,
                
        })
    })
        this.getNivel();
        this.getHorasAcademias_presidente();
        this.getHorasAcademias_secretario();
        this.getFolioList();
        this.getTipoUnidad();
        this.setUpPoS();
    }


    setUpPoS() {
        if (this.state.presidente !== 0) { 
            this.setState({disablePresidente: true}); // radiobutton
            this.setState({disableSecretario: false});
        } else {
            this.setState({disableSecretario: true});
            this.setState({disablePresidente: false});
        }
    }
    
    async getCarreraList(id_unidad) {
        let options = null;
        await CarreraPorUnidadService.getCarreraPorUnidadEntitiesByUnidad_academicaId(id_unidad).then((res) => {
            const data = res.data;
            options = data.map(d => ({
                "value": d.carrera_nombre.clave_programa,
                "label": d.carrera_nombre.clave_programa,
                "id": d.id,
            }))
        }).catch(() => {
            alert("Error al intentar traer las carreras...");
            this.props.history.push('/');
        });
        this.setState({ carreras: options });

        this.getFolioById();
    }

    async getFolioById() {
        await FolioFulltimeService.getFolioById(this.state.id_folio).then(res => {
            const data = res.data;
            
            this.setState({ folio: data.folio });
            this.setState({ id_folio: data.id })
            this.setState({ id_unidad: data.unidad_academica.id });
            this.setState({ unidad_academica: data.unidad_academica.nombre_completo });
        }).catch(() => {
            alert("Error al intentar traer el folio por id...");
            this.props.history.push('/');
        });


        if ((this.state.ptc === 'PROFESOR ASIGNATURA - A') || (this.state.ptc === 'PROFESOR ASIGNATURA - B')) {
            alert("La proyeccion no puede modificarse ya que el PTC del docente pertence a la categoria: " + this.state.ptc);
            this.props.history.push(`/list-proyeccion_fulltime/${this.state.id_folio}`);
        }
    }

    async getFolioList() {
        let options = null;

        await FolioFulltimeService.getAllFolios().then(res => {
            const data = res.data;
            options = data.map(d => ({
                "value": d.folio,
                "label": d.folio,
                "id": d.id,
                "id_unidad": d.unidad_academica.id,
                "unidad_academica": d.unidad_academica.nombre_completo
            }))
            this.setState({ folios: options });
        }).catch(() => {
            alert("Error al intentar traer los folios...");
            this.props.history.push(`/list-proyeccion_fulltime/${this.state.id_folio}`);
        })

        this.getCarreraList(this.state.id_unidad);
        // se puso aqui ya que no se puede consultar el valor de categoria en el metodo compountDidMount
        // porque una vez que se realize el setState con getById... no se puede consultar el valor al mismo
        // tiempo (async), y se tiene que delegar a otra funcion para que siga la ejecucion en secuncia...
        // y se optenga el valor el en prop de categoria.
    }

    getTipoUnidad() {
        const tiposlList = [
            { value: 'Unidad Academica', label: 'Unidad Academica' },
            { value: 'Unidad Academica + Extension', label:'Unidad Academica + Extension'},
        ]

        this.setState({ tipos_unidades: tiposlList });
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


    onChangeTipoUnidadHandler = (event) => {
        this.setState({ tipo_unidad: event.label });
    }


    onChangeFolioHandler = (event) => {
        // this.setState({nombre_docente: event.target.value});
        this.setState({ folio: event.label });
        this.setState({ id_folio: event.id });

        this.setState({ nombre_docente: ''})
        this.setState({ ptc: ''});

        this.setState({ id_unidad: event.id_unidad});
        this.setState({unidad_academica: event.unidad_academica})
    
        this.getDocenteList(event.id_unidad);
    }

    onChangeUnidadHandler = (event) => {
        this.setState({ unidad_academica: event.label });
        this.setState({ disableDocente: false })

    }

    onChangeClaveProgramaHandler = (event) => {
        this.setState({ clave_programa: event.label });
        this.setState({ id_carrera: event.id });

    }

    onChangeCodigoNominaHandler = (event) => {

    }
    onChangeGradoAcademicoaHandler = (event) => {
        this.setState({grado_academico: event.label});
    }
    onChangeNombreDocenteHandler = (event) => {
        this.setState({ nombre_docente: event.label });
        this.setState({ id_docente: event.id });
        this.setState({ ptc: ''});
        this.setState({ ptc: event.ptc });
        this.setState({ codigo_nomina: event.codigo_nomina });

    }


    onChangeAHandler = (event) => {
        this.setState({a: event.target.value});
        let aux = event.target.value;
        this.setState({subtotal_1: this.state.subtotal_1 + aux});

        this.setState({ disableAgregar: (this.state.clave_programa.length !== 0) && (this.state.codigo_nomina.length !== 0) &&
        (this.state.grado_academico.length !== 0) && (this.state.nombre_docente.length !== 0) ?
            false : true });
    }
    onChangeBHandler = (event) => {
        this.setState({b: event.target.value});
        this.setState({subtotal_1: this.state.subtotal_1 + event.target.value});

        this.setState({ disableAgregar: (this.state.clave_programa.length !== 0) && (this.state.codigo_nomina.length !== 0) &&
        (this.state.grado_academico.length !== 0) && (this.state.nombre_docente.length !== 0) ?
            false : true });
    }

    onChangePresidenteDisablerHandler = () => {
        this.setState(() => ({
            disablePresidente: true,
            disableSecretario: false,
        }));

        this.setState({ disableAgregar: (this.state.clave_programa.length !== 0) && (this.state.codigo_nomina.length !== 0) &&
        (this.state.grado_academico.length !== 0) && (this.state.nombre_docente.length !== 0) ?
            false : true });
    }
    onChangeSecretarioDisablerHandler = () => {
        this.setState(() => ({
            disableSecretario: true,
            disablePresidente: false,
        }));

        this.setState({ disableAgregar: (this.state.clave_programa.length !== 0) && (this.state.codigo_nomina.length !== 0) &&
        (this.state.grado_academico.length !== 0) && (this.state.nombre_docente.length !== 0) ?
            false : true });
    }


    onChangeHorasFrenteGrupoHandler = (event) => {
        this.setState({horas_frente_grupo: event.target.value});
        this.state.subtotal_1 =+ event.target.value;

        this.setState({ disableAgregar: (this.state.clave_programa.length !== 0) && (this.state.codigo_nomina.length !== 0) &&
        (this.state.grado_academico.length !== 0) && (this.state.nombre_docente.length !== 0) ?
            false : true });
    }
    onChangePresidenteHandler = (event) => {
        this.setState({presidente: event.label});
        // this.state.subtotal_1 =+ event.value;

        this.setState({ disableAgregar: (this.state.clave_programa.length !== 0) && (this.state.codigo_nomina.length !== 0) &&
        (this.state.grado_academico.length !== 0) && (this.state.nombre_docente.length !== 0) ?
            false : true });
    }
    onChangeSecretarioHandler = (event) => {
        this.setState({secretario: event.label});
        this.state.subtotal_1 =+ event.value;

        this.setState({ disableAgregar: (this.state.clave_programa.length !== 0) && (this.state.codigo_nomina.length !== 0) &&
        (this.state.grado_academico.length !== 0) && (this.state.nombre_docente.length !== 0) ?
            false : true });
    }
    onChangeAsesoriaAcademicaHandler = (event) => {
        this.setState({asesorias_academica: event.target.value});
        this.state.subtotal_1 =+ event.target.value;

        this.setState({ disableAgregar: (this.state.clave_programa.length !== 0) && (this.state.codigo_nomina.length !== 0) &&
        (this.state.grado_academico.length !== 0) && (this.state.nombre_docente.length !== 0) ?
            false : true });
    }
    onChangeEducacionDualHandler = (event) => {
        this.setState({educacion_dual: event.target.value});
        this.state.subtotal_1 =+ event.target.value;

        this.setState({ disableAgregar: (this.state.clave_programa.length !== 0) && (this.state.codigo_nomina.length !== 0) &&
        (this.state.grado_academico.length !== 0) && (this.state.nombre_docente.length !== 0) ?
            false : true });
    }
    onChangeResidenciasProfesionalesHandler = (event) => {
        this.setState({residencias_profesionales: event.target.value});
        this.state.subtotal_1 =+ event.target.value;

        this.setState({ disableAgregar: (this.state.clave_programa.length !== 0) && (this.state.codigo_nomina.length !== 0) &&
        (this.state.grado_academico.length !== 0) && (this.state.nombre_docente.length !== 0) ?
            false : true });
    }
    onChangeTutoriasHandler = (event) => {
        this.setState({tutorias: event.target.value});
        this.state.subtotal_1 =+ event.target.value;

        this.setState({ disableAgregar: (this.state.clave_programa.length !== 0) && (this.state.codigo_nomina.length !== 0) &&
        (this.state.grado_academico.length !== 0) && (this.state.nombre_docente.length !== 0) ?
            false : true });
    }
    onChangeTitulacionHandler = (event) => {
        this.setState({titulacion: event.target.value});
        this.state.subtotal_1 =+ event.target.value;

        this.setState({ disableAgregar: (this.state.clave_programa.length !== 0) && (this.state.codigo_nomina.length !== 0) &&
        (this.state.grado_academico.length !== 0) && (this.state.nombre_docente.length !== 0) ?
            false : true });
    }
    onChangeActividadesComplementariasHandler = (event) => {
        this.setState({actividades_complementarias: event.target.value});
        this.state.subtotal_1 =+ event.target.value;

        this.setState({ disableAgregar: (this.state.clave_programa.length !== 0) && (this.state.codigo_nomina.length !== 0) &&
        (this.state.grado_academico.length !== 0) && (this.state.nombre_docente.length !== 0) ?
            false : true });
    }


    onChangeProyecto_InvestigacionHandler = (event) => {
        this.setState({proyecto_investigacion: event.target.value});
        this.state.subtotal_2 =+ event.target.value;

        this.setState({ disableAgregar: (this.state.clave_programa.length !== 0) && (this.state.codigo_nomina.length !== 0) &&
        (this.state.grado_academico.length !== 0) && (this.state.nombre_docente.length !== 0) ?
            false : true });
    }
    onChangeApoyoOperativoHandler = (event) => {
        this.setState({apoyo_operativo: event.target.value});
        this.state.subtotal_2 =+ event.target.value;

        this.setState({ disableAgregar: (this.state.clave_programa.length !== 0) && (this.state.codigo_nomina.length !== 0) &&
        (this.state.grado_academico.length !== 0) && (this.state.nombre_docente.length !== 0) ?
            false : true });
    }
    onChangeSubtotal2Handler = (event) => {
        this.setState({subtotal_2: event.target.value});
        this.state.subtotal_2 =+ event.target.value;

        this.setState({ disableAgregar: (this.state.clave_programa.length !== 0) && (this.state.codigo_nomina.length !== 0) &&
        (this.state.grado_academico.length !== 0) && (this.state.nombre_docente.length !== 0) ?
            false : true });
    }
    onChangeTotalHandler = (event) => {
        this.setState({total: event.target.value});

        this.setState({ disableAgregar: (this.state.clave_programa.length !== 0) && (this.state.codigo_nomina.length !== 0) &&
        (this.state.grado_academico.length !== 0) && (this.state.nombre_docente.length !== 0) ?
            false : true });
    }
    onChangeObservacionesHandler = (event) => {
        this.setState({observaciones: event.target.value});

        this.setState({ disableAgregar: (this.state.clave_programa.length !== 0) && (this.state.codigo_nomina.length !== 0) &&
        (this.state.grado_academico.length !== 0) && (this.state.nombre_docente.length !== 0) ?
            false : true });
    }



    render() {
        return (
            <div className="container">
                <div className="row justify-content-center mt-3 mb-3">
                    <div className="card col-10" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                        <div className="card-body">
                            <div className="card-header text-center" style={{ boxShadow: '0 2px 8px 1px rgba(64, 60, 67, 0.24)' }}>
                                <h2 className='h3'><b>Modificar Proyeccion Profesor Tiempo Completo</b></h2>
                            </div>
                            <br />
                            <form>    
                                <div className="row mb-4 justify-content-center ">                              
                                        <div className="col-6">
                                            <div className="form-outline">
                                                <label className="">Folio: </label>
                                                <Select
                                                 isDisabled={true}
                                                    rules={{ required: true }}
                                                    options={this.state.folios}
                                                    onChange={(e) => this.onChangeFolioHandler(e)}
                                                    value={{ label: this.state.folio === '' ? "Seleccione folio de proyeccion..." : this.state.folio}}
                                                />
                                            </div>
                                        </div>       
                                        <div className="col-6">
                                            <div className="form-outline">
                                                <label className="">Tipo de UA: </label>
                                                <Select
                                                    rules={{ required: true }}
                                                    options={this.state.tipos_unidades}
                                                    onChange={(e) => this.onChangeTipoUnidadHandler(e)}
                                                    value={{ label: this.state.tipo_unidad === '' ? "Seleccione unidad academica..." : this.state.tipo_unidad}}
                                                />
                                            </div>
                                        </div>                         
                                    </div>
                                <div className="col">
                                    <div className="row mb-3">
                                        <label className="h5"><b>PROFESORES DE ASIGNATURA</b></label>
                                    </div>
                                </div>
                                
                                <fieldset className="border border-info p-3">
                                    <legend className="w-auto text-left h6">Ingrese información de profesor por asignatura</legend>
                                        <div className="row mb-4">
                                            <div className="col">
                                                <div className="form-outline">
                                                    <label>Unidad Academica</label>
                                                    <Select
                                                        isDisabled={true}
                                                        rules={{ required: true }}
                                                        options={this.state.unidades}
                                                        onChange={(e) => this.onChangeUnidadHandler(e)}
                                                        value={{ label: this.state.unidad_academica === '' ? "Seleccione unidad academica..." : this.state.unidad_academica}}
                                                    />
                                                </div>
                                            </div>
                                        
                                            <div className="col">
                                                <div className="form-outline">
                                                    <label className="">Clave de Programa Educativo:</label>
                                                    <Select
                                                        rules={{ required: true }}
                                                        options={this.state.carreras}
                                                        onChange={(e) => this.onChangeClaveProgramaHandler(e)}
                                                        value={{ label: this.state.clave_programa === '' ? "Seleccione clave de programa educativo..." : this.state.clave_programa}}
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
                                                        // isDisabled={this.state.disableDocente}
                                                        isDisabled={true}
                                                        rules={{ required: true }}
                                                        options={this.state.docentes}
                                                        onChange={(e) => this.onChangeNombreDocenteHandler(e)}
                                                        value={{ label: this.state.nombre_docente === '' ? "Seleccione nombre del docente..." : this.state.nombre_docente}}
                                                    />
                                                </div>
                                            </div>                        
                                        </div>

                                        <div className="row mb-4">
                                            <div className="col">
                                                <div className="form-outline">
                                                    <label>Código de Nómina:</label>
                                                    <input 
                                                    readOnly
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
                                                        value={{ label: this.state.grado_academico  === '' ? "Seleccione nivel academico..." : this.state.grado_academico}}
                                                    />
                                                </div>
                                            </div>                    
                                        </div>
                                </fieldset>
                                <hr />
                                <div className="col">
                                    <div className="row">
                                        <label className="h5"><b>HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS</b></label>
                                    </div>
                                </div>

                                <fieldset className="border border-info p-3">
                                    <legend className="w-auto text-left h6">Ingrese información de horas sustantivas para atención de alumnos</legend>
                                        <div className="col">
                                            <div className="row mb-2 ">
                                                <label className="h6"><b>Horas de Asignatura</b></label>
                                            </div>
                                        </div>


                                    <div className="row"> 
                                        <div className="col">
                                            <div className="form-group row">                                                
                                                <div className="col">
                                                    <label>Nivel de (PTC):</label>
                                                    <div className="input-group">                                                        
                                                        <input
                                                            readOnly={true}
                                                            type='text'
                                                            placeholder='Nivel de PTC del docente...'
                                                            className=" form-control"
                                                            value={this.state.ptc}
                                                            onChange={this.onChangeHorasFrenteGrupoHandler}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <label>Horas Frente a Grupo:</label>
                                                    <div className="input-group">                                                        
                                                        <input
                                                            type='number'
                                                            className=" form-control"
                                                            value={this.state.horas_frente_grupo}
                                                            onChange={this.onChangeHorasFrenteGrupoHandler}
                                                            onInput={(e) => {
                                                                e.target.value = e.target.value.replace(/[^0-9]/g, ''); // Permite solo números
                                                            }}
                                                            required
                                                        />
                                                        <div className="input-group-append">
                                                            <span className="input-group-text">Hora(s)</span>
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
                                                        onInput={(e) => {
                                                            e.target.value = e.target.value.replace(/[^0-9]/g, ''); // Permite solo números
                                                        }}
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
                                                    value={{ label: this.state.presidente === '' ? "Seleccione hora(s) presidente..." : this.state.presidente }}
                                                    onInput={(e) => {
                                                        e.target.value = e.target.value.replace(/[^0-9]/g, ''); // Permite solo números
                                                    }}
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
                                                    value={{ label: this.state.secretario === '' ? "Seleccione hora(s) secretario..." : this.state.secretario }}
                                                    onInput={(e) => {
                                                        e.target.value = e.target.value.replace(/[^0-9]/g, ''); // Permite solo números
                                                    }}
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
                                                <div className="input-group">
                                                    <input
                                                        type='number'
                                                        className="form-control"
                                                        value={this.state.asesorias_academica}
                                                        onChange={this.onChangeAsesoriaAcademicaHandler}
                                                        onInput={(e) => {
                                                            e.target.value = e.target.value.replace(/[^0-9]/g, ''); // Permite solo números
                                                        }}
                                                        required
                                                    />
                                                <div className="input-group-append">
                                                    <span className="input-group-text">Hora(s)</span>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    
                                        <div className="col">
                                            <div className="form-outline">
                                                <label className="">Educacion Dual:</label>
                                                <div className="input-group">
                                                    <input
                                                        type='number'
                                                        className="form-control"
                                                        value={this.state.educacion_dual}
                                                        onChange={this.onChangeEducacionDualHandler}
                                                        onInput={(e) => {
                                                            e.target.value = e.target.value.replace(/[^0-9]/g, ''); // Permite solo números
                                                        }}
                                                        required
                                                    />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text">Hora(s)</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>                        
                                    </div>

                                    <div className="row mb-4">
                                        <div className="col">
                                            <div className="form-outline">
                                                <label>Residencias Profesionales:</label>
                                                <div className="input-group">
                                                    <input
                                                        type='number'
                                                        className="form-control"
                                                        value={this.state.residencias_profesionales}
                                                        onChange={this.onChangeResidenciasProfesionalesHandler}
                                                        onInput={(e) => {
                                                            e.target.value = e.target.value.replace(/[^0-9]/g, ''); // Permite solo números
                                                        }}
                                                        required
                                                    />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text">Hora(s)</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    
                                        <div className="col">
                                            <div className="form-outline">
                                                <label className="">Titulación:</label>
                                                <div className="input-group">
                                                    <input
                                                        type='number'
                                                        className="form-control"
                                                        value={this.state.titulacion}
                                                        onChange={this.onChangeTitulacionHandler}
                                                        onInput={(e) => {
                                                            e.target.value = e.target.value.replace(/[^0-9]/g, ''); // Permite solo números
                                                        }}
                                                        required
                                                    />
                                                <div className="input-group-append">
                                                        <span className="input-group-text">Hora(s)</span>
                                                    </div>
                                                </div>
                                            </div>                            
                                        </div>      

                                        <div className="col">
                                            <div className="form-outline">
                                                <label className="">Tutorias:</label>
                                                <div className="input-group">
                                                    <input
                                                        type='number'
                                                        className="form-control"
                                                        value={this.state.tutorias}
                                                        onChange={this.onChangeTutoriasHandler}
                                                        onInput={(e) => {
                                                            e.target.value = e.target.value.replace(/[^0-9]/g, ''); // Permite solo números
                                                        }}
                                                        required
                                                    />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text">Hora(s)</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-7">
                                            <div className="form-group row">
                                                <label className="col-md-5 col-form-label"><b>Actividades Complementarias:</b> </label>
                                                <div className="col">
                                                    <div className="input-group">
                                                        <input
                                                            type='number'
                                                            className=" form-control"
                                                            value={this.state.actividades_complementarias}
                                                            onChange={this.onChangeActividadesComplementariasHandler}
                                                            onInput={(e) => {
                                                                e.target.value = e.target.value.replace(/[^0-9]/g, ''); // Permite solo números
                                                            }}
                                                            required
                                                        />
                                                        <div className="input-group-append">
                                                            <span className="input-group-text">Hora(s)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-7">
                                            <div className="form-group row">
                                                <label className="col-md-5 col-form-label"><b>Subtotal 1:</b> </label>
                                                <div className="col">
                                                    <div className="input-group">
                                                        <input readOnly={true}
                                                            type='number'
                                                            // placeholder="Subtotal 1 reactivo"
                                                            className=" form-control"
                                                            value={this.state.subtotal_1}
                                                            // onChange={this.onChangesubtotal1Handler}
                                                        />
                                                        <div className="input-group-append">
                                                            <span className="input-group-text">Hora(s)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </fieldset>
                                <hr />

                                <div className="col">
                                    <div className="row">
                                        <label className="h5"><b>HORAS NECESIDAD INSTITUCIONAL</b></label>
                                    </div>
                                </div>

                                <fieldset className="border border-info p-3">
                                    <legend className="w-auto text-left h6">Ingrese información de necesidad institucional</legend>
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="form-group row">
                                                        <label className="col-md-6 col-form-label">Investigacion educativa, desarrrollo tecnológico:</label>

                                                    <div className="col">
                                                        <div className="input-group">
                                                            <input
                                                                type='number'
                                                                placeholder="Subtotal 1 reactivo"
                                                                className=" form-control"
                                                                value={this.state.proyecto_investigacion}
                                                                onChange={this.onChangeProyecto_InvestigacionHandler}
                                                                onInput={(e) => {
                                                                    e.target.value = e.target.value.replace(/[^0-9]/g, ''); // Permite solo números
                                                                }}
                                                                required
                                                            />
                                                            <div className="input-group-append">
                                                                <span className="input-group-text">Hora(s)</span>
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
                                                    <div className="input-group">
                                                        <input
                                                            type='number'
                                                            className="form-control"
                                                            value={this.state.apoyo_operativo}
                                                            onChange={this.onChangeApoyoOperativoHandler}
                                                            onInput={(e) => {
                                                                e.target.value = e.target.value.replace(/[^0-9]/g, ''); // Permite solo números
                                                            }}
                                                            required ={true}
                                                        />
                                                        <div className="input-group-append">
                                                            <span className="input-group-text">Hora(s)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col">
                                                <div className="form-outline">
                                                    <label className=""><b>Subtotal 2:</b></label>
                                                        <div className="input-group">
                                                            <input readOnly={true}
                                                                type='number'
                                                                placeholder="Subtotal 2 reactivo"
                                                                className="form-control"
                                                                value={this.state.subtotal_2}
                                                                onChange={this.onChangeSubtotal2Handler}
                                                            />
                                                        <div className="input-group-append">
                                                            <span className="input-group-text">Hora(s)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                <hr />

                                <div className="row mb-4">
                                    <div className="col-6">
                                        <div className="form-outline">
                                            <label className=""><b>Total:</b></label>
                                            <div className="input-group">
                                                <input readOnly={true}
                                                    type='number'
                                                    placeholder="Total reactivo"
                                                     className="form-control"
                                                    value={this.state.total}
                                                    onChange={this.onChangeTotalHandler}
                                                />
                                                <div className="input-group-append">
                                                    <span className="input-group-text">Hora(s)</span>
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
                        {this.state.isLoading ? (
                                // Mostrar el spinner si isLoading es true
                                <div className="text-center">
                                    <div className="spinner-border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            ) : (
                            <button className="btn btn-primary mt-0" onClick={this.updateProyeccionFulltime} disabled={this.state.disableAgregar}>Agregar</button>
                            )}
                            <button className="btn btn-danger mt-0" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default UpdateProyeccionFulltimeComponent;