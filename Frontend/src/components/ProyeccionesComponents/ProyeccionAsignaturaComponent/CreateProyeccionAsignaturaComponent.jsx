import React, { Component } from 'react';
import AsignaturaProyeccionService from '../../../services/Proyecciones/AsignaturaProyeccionService';
import FolioAsignaturaService from '../../../services/Proyecciones/FolioAsignaturaService';
import CarreraService from '../../../services/Control/CarreraService';
import UnidadService from '../../../services/Control/UnidadService';

import Select from 'react-select'
import '../../StyleGlobal/Style.css'
import DocenteService from '../../../services/Control/DocenteService';

class CreateFolioAsignatura extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
            id: this.props.match.params.id, // folio id

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

                // profe_asignatura
                clave_programa: "",
                codigo_nomina: "",
                grado_academico: "", // nivel: '',
                nombre_docente: "",

                // horas_sustantivas_atencion_alumnos
                    // horas_asignatura: 
                    total_hours: 0,
                    cumulative_hours: 0,
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
        if (this.state.errorInfo !== null) {
            alert('No se puede duplicar clave de empleado.');
        }

        e.preventDefault();

        let asignatura = {
            profe_asignatura: {
                codigo_nomina: this.state.codigo_nomina,
                grado_academico: this.state.grado_academico,
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

            // unidad_academica: this.state.unidad_academica.trim(),
            observaciones: this.state.observaciones.trim(),
        }

        if (this.state.disablePresidente === false) {
            asignatura.horas_sustantivas_atencion_alumnos.academias.presidente = 0;
        } else {
            asignatura.horas_sustantivas_atencion_alumnos.academias.secretario = 0;
        }

        if (this.state.disableA === true) {
            asignatura.horas_sustantivas_atencion_alumnos.horas_asignatura.a = 0;
        } else {
            asignatura.horas_sustantivas_atencion_alumnos.horas_asignatura.b = 0;
        }

        this.setState({ isLoading: true });

        console.log("Proyeccion por asignatura: " + JSON.stringify(asignatura));

        AsignaturaProyeccionService.createProyeccionAsignatura(asignatura, 
            this.state.id_folio, this.state.id_unidad,
            this.state.id_docente, this.state.id_carrera)
        .then(
         () => {
                this.props.history.push(`/list-proyeccion_asignatura/${this.state.id_folio}`);
            }
        ).catch(error => {
            console.log("Error en crear proyeccion por asignatura: " + error);
            alert('Error en crear proyeccion por asignatura...');
            this.props.history.push('/');
        });

    }

    cancel() {
        this.props.history.push(`/list-proyeccion_asignatura/${this.state.id_folio}`);
    }

    componentDidMount() {
        this.getNivel();
        this.getHorasAcademias_presidente();
        this.getHorasAcademias_secretario();
        this.getCarreraList();
        this.getFolioById();
        this.getTipoUnidad();
    }

    async getCarreraList() {
        let options = null;
        await CarreraService.getAllCarrerasByEstatus().then(res => {
            const data = res.data;
            options = data.map(d => ({
                "value": d.clave_programa,
                "label": d.clave_programa,
                "id": d.id,
            }))
        }).catch(() => {
            alert("Error al intentar traer las carreras...");
            this.props.history.push('/');
        });
        this.setState({ carreras: options });
    }

    async getFolioById() {
        await FolioAsignaturaService.getFolioById(this.state.id).then(res => {
            const data = res.data;
            
            this.setState({ folio: data.folio});
            this.setState({id_folio: data.id})
            this.setState({id_unidad: data.unidad_academica.id});
            this.setState({unidad_academica: data.unidad_academica.nombre_completo});
        }).catch(() => {
            alert("Error al intentar traer el folio por id...");
            this.props.history.push('/');
        });

        this.getDocenteList(this.state.id_unidad);
    }

    getTipoUnidad() {
        const tiposlList = [
            { value: 'Unidad Academica', label: 'Unidad Academica' },
            { value: 'Unidad Academica + Extension', label:'Unidad Academica + Extension'},
        ]

        this.setState({ tipos_unidades: tiposlList });
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

    onChangeClaveProgramaHandler = (event) => {
        this.setState({ clave_programa: event.label }, this.enableAddButton);
        this.setState({ id_carrera: event.id });
    }

    onChangeCodigoNominaHandler = (event) => {
        this.setState({codigo_nomina: event.target.value}, this.enableAddButton);
    }
    onChangeGradoAcademicoaHandler = (event) => {
        this.setState({grado_academico: event.label}, this.enableAddButton);
    }
    onChangeNombreDocenteHandler = (event) => {
        this.setState({ nombre_docente: event.label });
        this.setState({ id_docente: event.id}, this.enableAddButton);
    }

    onChangeAHandler = (event) => {
        const hour = parseInt(event.target.value);
        this.setState({
            a: hour,
            total_hours: hour
        });
    }
    onChangeBHandler = (event) => {
        const hour = parseInt(event.target.value);
        this.setState({
            b: hour,
            total_hours: hour
        });
    }

    cleaningHours = () => {
        this.setState({
            total_hours: 0,
            cumulative_hours: 0,
            a: 0,
            b: 0,
            horas_frente_grupo: 0,
            presidente: 0,
            secretario: 0,
            asesorias_academica: 0,
            educacion_dual: 0,
            residencias_profesionales: 0,
            titulacion: 0,
            tutorias: 0,
            actividades_complementarias: 0,
            invesigacion_educativa: 0,
            apoyo_operativo: 0,
        });
    }

    onChangeADisablerHandler = () => {
        this.setState(() => ({
            disableA: false,
            disableB: true
        }));
        this.cleaningHours();
    }
    onChangeBDisablerHandler = () => {
        this.setState(() => ({
            disableB: false,
            disableA: true
        }));
        this.cleaningHours();
    }
    onChangePresidenteDisablerHandler = () => {
        this.setState(() => ({
            disablePresidente: true,
            disableSecretario: false,
        }));
        this.setState({
            presidente: 0,
            secretario: 0
        },this.calcularTotal);
    }
    onChangeSecretarioDisablerHandler = () => {
        this.setState(() => ({
            disableSecretario: true,
            disablePresidente: false,
        }));
        this.setState({
            presidente: 0,
            secretario: 0
        },this.calcularTotal);
    }

    // Método para calcular el nuevo total
    calcularTotal = () => {
        const {
        horas_frente_grupo,
        presidente,
        secretario,
        asesorias_academica,
        educacion_dual,
        residencias_profesionales,
        titulacion,
        tutorias,
        actividades_complementarias,
        invesigacion_educativa,
        apoyo_operativo,
        } = this.state;

        // Realiza los cálculos necesarios para obtener el nuevo total
        const nuevoTotal =
        parseInt(horas_frente_grupo || 0) +
        parseInt(presidente || 0) +
        parseInt(secretario || 0) +
        parseInt(asesorias_academica || 0) +
        parseInt(educacion_dual || 0) +
        parseInt(residencias_profesionales || 0) +
        parseInt(titulacion || 0) +
        parseInt(tutorias || 0) +
        parseInt(actividades_complementarias || 0) +
        parseInt(invesigacion_educativa || 0) +
        parseInt(apoyo_operativo || 0);

        const nuevo_subtotal_1 = parseInt(horas_frente_grupo || 0) +
        parseInt(presidente || 0) +
        parseInt(secretario || 0) +
        parseInt(asesorias_academica || 0) +
        parseInt(educacion_dual || 0) +
        parseInt(residencias_profesionales || 0) +
        parseInt(titulacion || 0) +
        parseInt(tutorias || 0) +
        parseInt(actividades_complementarias || 0);

        const nuevo_subtotal_2 = parseInt(invesigacion_educativa || 0) +
        parseInt(apoyo_operativo || 0);

        // Actualiza el estado con el nuevo total y subtotales
        this.setState({
            total: nuevoTotal,
            subtotal_1: nuevo_subtotal_1,
            subtotal_2: nuevo_subtotal_2
        }, this.enableAddButton);
    };

    // Método para manejar el cambio en un campo de entrada
    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState(
        {
            [name]: value,
        },
        // Después de actualizar el estado, llama al método para calcular el nuevo total
        this.calcularTotal
        );
    };

    handleInputValidation = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, ''); // Permite solo números
    const { total_hours, total } = this.state;
    const fieldName = e.target.name;
    const fieldValue = parseInt(e.target.value, 10);
    e.target.value = Math.min(fieldValue, total_hours - (total - this.state[fieldName]));
  };

  onChangePresidenteHandler = (event) => {
        if(parseInt(event.label || 0) > (this.state.total_hours - (this.state.total - this.state.presidente))) {
            alert('No es posible elegir una hora mayor al limite disponible');
        } else {
            this.setState({presidente: event.label}, this.calcularTotal);
        }
    }
    onChangeSecretarioHandler = (event) => {
        if(parseInt(event.label || 0) > (this.state.total_hours - (this.state.total - this.state.secretario))) {
            alert('No es posible elegir una hora mayor al limite disponible');
        } else {
            this.setState({secretario: event.label}, this.calcularTotal);
        }
    }

    onChangeObservacionesHandler = (event) => {
        this.setState({observaciones: event.target.value});
    }

    enableAddButton = () => {
        const { folio, tipo_unidad, clave_programa, nombre_docente, codigo_nomina, grado_academico, total_hours, total } = this.state;
        const disableAgregar = !(folio !== '' && tipo_unidad !== '' && clave_programa !== '' && nombre_docente !== '' && codigo_nomina !== '' && grado_academico !== '' && total_hours !== 0 && total_hours === total);
        this.setState({disableAgregar})
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
                                                            <div className="col">
                                                            <div className="input-group">
                                                                <input
                                                                    type='number'
                                                                    className="form-control"
                                                                    value={this.state.a}
                                                                    onChange={this.onChangeAHandler}
                                                                    disabled={this.state.disableA}
                                                                    checked={this.state.disableB}
                                                                    onInput={(e) => {
                                                                        e.target.value = e.target.value.replace(/[^0-9]/g, ''); // Permite solo números
                                                                        e.target.value = Math.min(parseInt(e.target.value, 10), 40); // Limita el valor a 40
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

                                                        <div className="col">
                                                            <div className="input-group">
                                                                <input type='number'
                                                                    className="form-control"
                                                                    value={this.state.b}
                                                                    onChange={this.onChangeBHandler}
                                                                    disabled={this.state.disableB}
                                                                    onInput={(e) => {
                                                                        e.target.value = e.target.value.replace(/[^0-9]/g, ''); // Permite solo números
                                                                        e.target.value = Math.min(parseInt(e.target.value, 10), 40); // Limita el valor a 40
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
                                        <div className="col-6">
                                            <div className="form-group row">
                                                    <label className="col-md-5 col-form-label"><b>Horas Frente a Grupo:</b> </label>

                                                <div className="col">
                                                    <div className="input-group">
                                                        <input
                                                            name='horas_frente_grupo'
                                                            type='number'
                                                            className=" form-control"
                                                            value={this.state.horas_frente_grupo}
                                                            onChange={this.handleInputChange}
                                                            onInput={this.handleInputValidation}
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
                                                        name='asesorias_academica'
                                                        type='number'
                                                        className="form-control"
                                                        value={this.state.asesorias_academica}
                                                        onChange={this.handleInputChange}
                                                        onInput={this.handleInputValidation}
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
                                                        name='educacion_dual'
                                                        type='number'
                                                        className="form-control"
                                                        value={this.state.educacion_dual}
                                                        onChange={this.handleInputChange}
                                                        onInput={this.handleInputValidation}
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
                                                        name='residencias_profesionales'
                                                        type='number'
                                                        className="form-control"
                                                        value={this.state.residencias_profesionales}
                                                        onChange={this.handleInputChange}
                                                        onInput={this.handleInputValidation}
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
                                                        name='titulacion'
                                                        type='number'
                                                        className="form-control"
                                                        value={this.state.titulacion}
                                                        onChange={this.handleInputChange}
                                                        onInput={this.handleInputValidation}
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
                                                        name='tutorias'
                                                        type='number'
                                                        className="form-control"
                                                        value={this.state.tutorias}
                                                        onChange={this.handleInputChange}
                                                        onInput={this.handleInputValidation}
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
                                                            name='actividades_complementarias'
                                                            type='number'
                                                            className=" form-control"
                                                            value={this.state.actividades_complementarias}
                                                            onChange={this.handleInputChange}
                                                            onInput={this.handleInputValidation}
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
                                                            className=" form-control"
                                                            value={this.state.subtotal_1}
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
                                                                name='invesigacion_educativa'
                                                                type='number'
                                                                placeholder="Subtotal 1 reactivo"
                                                                className=" form-control"
                                                                value={this.state.invesigacion_educativa}
                                                                onChange={this.handleInputChange}
                                                                onInput={this.handleInputValidation}
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
                                                            name='apoyo_operativo'
                                                            type='number'
                                                            className="form-control"
                                                            value={this.state.apoyo_operativo}
                                                            onChange={this.handleInputChange}
                                                            onInput={this.handleInputValidation}
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
                            <button className="btn btn-primary mt-0" onClick={this.createProyeccionAsignatura} disabled={this.state.disableAgregar}>Agregar</button>
                            )}
                            <button className="btn btn-danger mt-0" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default CreateFolioAsignatura;