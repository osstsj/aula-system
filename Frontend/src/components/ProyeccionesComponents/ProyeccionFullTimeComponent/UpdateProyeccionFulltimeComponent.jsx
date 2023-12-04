import React, { Component } from 'react';
import FulltimeProyeccionService from '../../../services/Proyecciones/FulltimeProyeccionService';
import FolioFulltimeService from '../../../services/Proyecciones/FolioFulltimeService';
import CarreraPorUnidadService from '../../../services/Control/CarreraPorUnidadService';
import ExtensionsService from "../../../services/Control/ExtensionsService";
import DocenteService from '../../../services/Control/DocenteService';
import Select from 'react-select'
import '../../StyleGlobal/Style.css'

class UpdateProyeccionFulltimeComponent extends Component {
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

                // profe_fulltime
                clave_programa: "",
                codigo_nomina: "",
                grado_academico: "", // nivel: '',
                nombre_docente: "",

                // horas_sustantivas_atencion_alumnos
                    // horas_fulltime: 
                    total_hours: 40,
                    cumulative_hours: 0,

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
                invesigacion_educativa: 0,
                apoyo_operativo: 0,
                subtotal_2: 0,
            
            total: 0,
            observaciones: "",
            show_extensions: false,
            extensions: [],
                //validar
                seleccionadoTipoUA: false,
                seleccionadoClavePrograma: false,
                seleccionadoDocente: false,
                seleccionadoAcademico: false,
        }
    }
    updateProyeccionFulltime= (e) => {
        e.preventDefault();

        let fulltime = {
            profesor_fulltime: {
                grado_academico: this.state.grado_academico,
            },

            horas_sustantivas_atencion_alumnos_fulltime: {
             
                horas_frente_grupo: this.state.horas_frente_grupo === "" || null ? 0 : this.state.horas_frente_grupo,
                ptc: this.state.ptc,
                academias: {
                    presidente: this.state.presidente,
                    secretario: this.state.secretario,
                },

                asesorias: {
                    asesorias_academica: this.state.asesorias_academica === "" || null ? 0 : this.state.asesorias_academica,
                    educacion_dual: this.state.educacion_dual  === "" || null ? 0 : this.state.educacion_dual ,
                    residencias_profesionales: this.state.residencias_profesionales  === "" || null ? 0 : this.state.residencias_profesionales,
                    titulacion: this.state.titulacion === "" || null ? 0 : this.state.titulacion,
                    tutorias: this.state.tutorias === "" || null ? 0 : this.state.tutorias,
                },

                actividades_complementarias: this.state.actividades_complementarias === "" || null ? 0 : this.state.actividades_complementarias,
            },

            horas_necesidad_institucional_fulltime:  {
                proyecto_investigacion: this.state.proyecto_investigacion === "" || null ? 0 : this.state.proyecto_investigacion,
                apoyo_operativo: this.state.apoyo_operativo === "" || null ? 0 : this.state.apoyo_operativo,
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
            this.state.id_folio, 
            this.state.id_unidad,
            this.state.id_docente, 
            this.state.id_carrera)
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

                disableAll: true
                
        })

        this.getNivel();
        this.getHorasAcademias_presidente();
        this.getHorasAcademias_secretario();
        this.getFolioList();
        this.getCarreraList();
        this.setUpPoS();
        this.getTipoUnidad();
    }).catch(() => {
      alert("Error al intentar traer la proyeccion tiempo completo");
      this.props.history.push('/');
    })
        
        
    }


    setUpPoS() {
      if (this.state.disableAll === true) {
          this.setState({disablePresidente: false}); // radiobutton
          this.setState({disableSecretario: false});
      } else {
        if (this.state.presidente !== 0) { 
          this.setState({disablePresidente: true}); // radiobutton
          this.setState({disableSecretario: false});
        } else {
            this.setState({disableSecretario: true});
            this.setState({disablePresidente: false});
        }
      }
        
    }

    async getCarreraList() {
        let options = null;
        await CarreraPorUnidadService.getCarreraPorUnidadEntitiesByUnidad_academicaId(this.state.id_unidad).then((res) => {
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

        
        // se puso aqui ya que no se puede consultar el valor de categoria en el metodo compountDidMount
        // porque una vez que se realize el setState con getById... no se puede consultar el valor al mismo
        // tiempo (async), y se tiene que delegar a otra funcion para que siga la ejecucion en secuncia...
        // y se optenga el valor el en prop de categoria.

        // this.setUpPoS(); // debido a que this.state, es una funcion asyc, se debe agregar aqui para que realize su tarea...
    }
    async getAllProyeccionesToFilterDocente(id_folio) {
        let fulltimeList = [];
        await FulltimeProyeccionService.getAllProyeccionesFulltimeByFolio(id_folio)
            .then(
                res =>
                    fulltimeList = res.data,
            ).catch(() => {
                alert("Error al traer las proyecciones tiempo completo por folio...");
                this.props.history.push('/');
        });

        // When you use this.setState inside a loop, it doesn't immediately update the state synchronously. 
        // The setState function is asynchronous, and if you call it in a loop, it might not behave as expected.
        // To filter elements based on your condition, it's better to create a new array and then update the state once.
        
        let updatedDocentes = this.state.docentes;
        
        fulltimeList.map((fulltime) => {
            updatedDocentes = updatedDocentes.filter(docente =>
                 docente.id !== fulltime.profesor_fulltime.nombre_docente.id
              );
        })

        // Additionally, keep in mind that setState may not immediately reflect the updated state due to
        //  its asynchronous nature. If you need to perform any actions after the state is updated, you can 
        //  use the second argument of setState, which is a callback function.
          this.setState({ docentes: updatedDocentes });
    }
    async getDocenteList(id_unidad) {
        let options = null;
        await DocenteService.getAllDocentesByCategoriaPTCFulltime(id_unidad).then(res => {
            const data = res.data;
            options = data.map(d => ({
                "value": d.nombre_completo,
                "label": d.nombre_completo,
                "id": d.id,
                "codigo_nomina": d.codigo_nomina,
                "ptc":d.categoria,
            }))
            this.setState({ docentes: options });
        }).catch(() => {
            alert("Error al intentar traer los docentes...");
            this.props.history.push('/');
        });
    }

    async getAllExtensionsByUnidadId() {
        await ExtensionsService.getAllExtensionsByUnidadId(this.state.id_unidad)
          .then((res) => {
            const extensions = res.data.map((item, index) => {
              return {
                ...item,
                index,
                value: 0,
                input_name: `extension_${index}`,
                form: {
                  disablePresidente: true,
                  disableSecretario: false,
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
                  invesigacion_educativa: 0,
                  apoyo_operativo: 0,
                  subtotal_2: 0,
                },
              };
            });
            this.setState({
              extensions,
              show_extensions: true,
            });
          })
          .catch(() => {
            alert("Error al intentar traer las extensiones...");
            this.props.history.push("/");
          });
      }
    async getAllExtensionsByUnidadId() {
        await ExtensionsService.getAllExtensionsByUnidadId(this.state.id_unidad)
          .then((res) => {
            const extensions = res.data.map((item, index) => {
              return {
                ...item,
                index,
                value: 0,
                input_name: `extension_${index}`,
                form: {
                  disablePresidente: true,
                  disableSecretario: false,
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
                  invesigacion_educativa: 0,
                  apoyo_operativo: 0,
                  subtotal_2: 0,
                },
              };
            });
            this.setState({
              extensions,
              show_extensions: true,
            });
          })
          .catch(() => {
            alert("Error al intentar traer las extensiones...");
            this.props.history.push("/");
          });
      }


    getTipoUnidad() {
        const tiposlList = [
          { value: 1, label: "Unidad Academica" },
          { value: 2, label: "Unidad Academica + Extension" },
        ];
    
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
        // if (event.value === 2) {
        //     this.getAllExtensionsByUnidadId();
        //     } else {
        //     this.setState({
        //         show_extensions: false,
        //     });
        // }
        // this.setState({
        // tipo_unidad: event.label,   seleccionadoTipoUA: true,  errorTipoUA: null,
        // });
    };

    onChangeFolioHandler = (event) => {
        this.setState({ folio: event.label }, this.enableAddButton);
        this.setState({ id_folio: event.id });

        this.setState({ nombre_docente: ''})
        this.setState({ ptc: ''});

        this.setState({ id_unidad: event.id_unidad});
        this.setState({unidad_academica: event.unidad_academica})
    
        this.getDocenteList(event.id_unidad);
    }

    onChangeUnidadHandler = (event) => {
        this.setState({ unidad_academica: event.label }, this.enableAddButton);
        this.setState({ disableDocente: false });
    }

    onChangeClaveProgramaHandler = (event) => {
        this.setState({ clave_programa: event.label, seleccionadoClavePrograma:true, errorClavePrograma:null }, this.enableAddButton);
        this.setState({ id_carrera: event.id });

    }

    onChangeCodigoNominaHandler = (event) => {
        this.setState({ codigo_nomina: event.target.value }, this.enableAddButton);
    }
    onChangeGradoAcademicoaHandler = (event) => {
        this.setState({ grado_academico: event.label,seleccionadoAcademico:true,errorAcademico:null  }, this.enableAddButton);
    }
    onChangeNombreDocenteHandler = (event) => {
        this.setState({ nombre_docente: event.label, seleccionadoDocente:true,errorDocente:null  });
        this.setState({ id_docente: event.id }, this.enableAddButton);
        this.setState({ id_docente: event.id });
        this.setState({ ptc: ''});
        this.setState({ ptc: event.ptc });
        this.setState({ codigo_nomina: event.codigo_nomina });
    }


    onChangeAHandler = (event) => {
        const hour = parseInt(event.target.value);
        this.setState({
          a: hour,
          total_hours: hour,
        });
    };

    onChangeBHandler = (event) => {
        const hour = parseInt(event.target.value);
        this.setState({
          b: hour,
          total_hours: hour,
        });
    };

    cleaningHours = () => {
    const { extensions } = this.state
    const newExtensions = extensions.map((item) => {
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
            subtotal_1,
            invesigacion_educativa,
            apoyo_operativo,
            subtotal_2} = item.form
        const newFom = item.form;
        newFom[horas_frente_grupo] = 0;
        newFom[presidente] = 0;
        newFom[secretario] = 0;
        newFom[asesorias_academica] = 0;
        newFom[educacion_dual] = 0;
        newFom[residencias_profesionales] = 0;
        newFom[titulacion] = 0;
        newFom[tutorias] = 0;
        newFom[actividades_complementarias] = 0;
        newFom[subtotal_1] = 0;
        newFom[invesigacion_educativa] = 0;
        newFom[apoyo_operativo] = 0;
        newFom[subtotal_2] = 0;
        return {
            ...item,
            form: newFom
        }
    });
    this.setState({
        // total_hours: 0,
        cumulative_hours: 0,
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
        extensions: newExtensions
    });
    };


  onChangePresidenteDisablerHandler = (event) => {
    const parentValue = event.target.getAttribute('parent');
    const { extensions } = this.state;
    if(parentValue) {
        const newExtensions = extensions.map((item) => {
            if(item.input_name === parentValue) {
                const newForm = { ...item.form };
                newForm.disablePresidente = true;
                newForm.disableSecretario = false;
                newForm.presidente = 0;
                newForm.secretario = 0;
                return {
                    ...item,
                    form: newForm,
                };
            }
            return {
                ...item,
            };
        });
        this.setState(
            {
                extensions: newExtensions,
            },
            this.calcularTotal
        );
    }
    else {
        this.setState(() => ({
            disablePresidente: true,
            disableSecretario: false,
          }));
          this.setState(
            {
              presidente: 0,
              secretario: 0,
            },
            this.calcularTotal
          );
    }
  };

  onChangeSecretarioDisablerHandler = (event) => {
    const parentValue = event.target.getAttribute('parent');
    const { extensions } = this.state;
    if(parentValue) {
        const newExtensions = extensions.map((item) => {
            if(item.input_name === parentValue) {
                const newForm = { ...item.form };
                newForm.disablePresidente = false;
                newForm.disableSecretario = true;
                newForm.presidente = 0;
                newForm.secretario = 0;
                return {
                    ...item,
                    form: newForm,
                };
            }
            return {
                ...item,
            };
        });
        this.setState(
            {
                extensions: newExtensions,
            },
            this.calcularTotal
        );
    }
    else {
        this.setState(() => ({
            disableSecretario: true,
            disablePresidente: false,
        }));
        this.setState(
            {
                presidente: 0,
                secretario: 0,
            },
            this.calcularTotal
        );
    }
    };

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
      extensions,
    } = this.state;

    let sumExtensions = 0;
    const newExtensions = extensions.map((item) => {
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
            apoyo_operativo} = item.form
        const nuevo_subtotal_1 =
            parseInt(horas_frente_grupo || 0) +
            parseInt(presidente || 0) +
            parseInt(secretario || 0) +
            parseInt(asesorias_academica || 0) +
            parseInt(educacion_dual || 0) +
            parseInt(residencias_profesionales || 0) +
            parseInt(titulacion || 0) +
            parseInt(tutorias || 0) +
            parseInt(actividades_complementarias || 0);
        const nuevo_subtotal_2 =
            parseInt(invesigacion_educativa || 0) + parseInt(apoyo_operativo || 0);
        sumExtensions += nuevo_subtotal_1 + nuevo_subtotal_2;
        const newFom = item.form;
        newFom.subtotal_1 = nuevo_subtotal_1;
        newFom.subtotal_2 = nuevo_subtotal_2;
        return {
            ...item,
            form: newFom
        }
    });

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
      parseInt(apoyo_operativo || 0) +
      parseInt(sumExtensions || 0);

    const nuevo_subtotal_1 =
      parseInt(horas_frente_grupo || 0) +
      parseInt(presidente || 0) +
      parseInt(secretario || 0) +
      parseInt(asesorias_academica || 0) +
      parseInt(educacion_dual || 0) +
      parseInt(residencias_profesionales || 0) +
      parseInt(titulacion || 0) +
      parseInt(tutorias || 0) +
      parseInt(actividades_complementarias || 0);

    const nuevo_subtotal_2 =
      parseInt(invesigacion_educativa || 0) + parseInt(apoyo_operativo || 0);

    // Actualiza el estado con el nuevo total y subtotales
    this.setState(
      {
        total: nuevoTotal,
        subtotal_1: nuevo_subtotal_1,
        subtotal_2: nuevo_subtotal_2,
        extensions: newExtensions
      },
      this.enableAddButton
    );
  };


     // Método para manejar el cambio en un campo de entrada
  handleInputChange = (event) => {
    if (this.state.disableAll === true) {
      if (this.state.presidente !== 0) { 
        this.setState({disablePresidente: true}); // radiobutton
        this.setState({disableSecretario: false});
      } else {
        this.setState({disableSecretario: true});
        this.setState({disablePresidente: false});
      }
      this.cleaningHours();
      this.setState({disableAll: false}); 
    }

    const { name, value } = event.target;
    const { extensions } = this.state;
    const parentValue = event.target.getAttribute('parent');
    if(parentValue) {
        const newExtensions = extensions.map((item) => {
            if(item.input_name === parentValue) {
                const newForm = { ...item.form };
                newForm[name] = parseInt(value) || 0;
                return {
                    ...item,
                    form: newForm,
                };
            }
            return {
                ...item,
            };
        });
        this.setState(
            {
                extensions: newExtensions,
            },
            this.calcularTotal
        );
    } else {
        this.setState(
            {
                [name]: value,
            },
            // Después de actualizar el estado, llama al método para calcular el nuevo total
            this.calcularTotal
        );
    }
  };

  handleInputValidation = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Permite solo números
    const { total_hours, total } = this.state;
    const parentValue = e.target.getAttribute('parent');
    let value = 0;
    if(parentValue) {
        const foundElement = this.state.extensions.find(
            (item) => item.input_name === parentValue
        );
        const fieldName = e.target.name;
        const newForm = { ...foundElement.form };
        value = newForm[fieldName];
    } else {
        const fieldName = e.target.name;
        value = this.state[fieldName];
    }
    const fieldValue = parseInt(e.target.value) || 0;
    console.log("Permitido: ", Math.min(fieldValue, total_hours - (total - value)));
    e.target.value = Math.min(fieldValue, total_hours - (total - value));
  };

  onChangePresidenteHandler = (event) => {
    if(this.state.disableAll === true) {
      this.cleaningHours();
      this.setState({disableAll : false});
    }

    if (
      parseInt(event.label || 0) <=
      this.state.total_hours - (this.state.total - this.state.presidente)
    ) {
        this.setState({ presidente: event.label }, this.calcularTotal);
    } else {
        alert("No es posible elegir una hora mayor al limite disponible");
    }
  };

  onExtensiOnChangePresidenteHandler = (parentValue, e) => {
    const fieldName = 'presidente';
    const { extensions } = this.state;
    const foundElement = extensions.find(
        (item) => item.input_name === parentValue
    );
    const newForm = { ...foundElement.form };
    const value = newForm[fieldName];
    if (
      parseInt(e.label || 0) <=
      this.state.total_hours - (this.state.total - value)
    ) {
        const newExtensions = extensions.map((item) => {
            if(item.input_name === parentValue) {
                const newForm = { ...item.form };
                newForm[fieldName] = parseInt(e.label) || 0;
                return {
                    ...item,
                    form: newForm,
                };
            }
            return {
                ...item,
            };
        });
        this.setState(
            {
                extensions: newExtensions,
            },
            this.calcularTotal
        );
    } else {
        alert("No es posible elegir una hora mayor al limite disponible");
    }
  };

  onChangeSecretarioHandler = (event) => {
    if(this.state.disableAll === true) {
      this.cleaningHours();
      this.setState({disableAll : false});
    }

    if (
      parseInt(event.label || 0) >
      this.state.total_hours - (this.state.total - this.state.secretario)
    ) {
      alert("No es posible elegir una hora mayor al limite disponible");
    } else {
      this.setState({ secretario: event.label }, this.calcularTotal);
    }
  };

  onExtensiOnSecretarioHandler = (parentValue, e) => {
    const fieldName = 'secretario';
    const { extensions } = this.state;
    const foundElement = extensions.find(
        (item) => item.input_name === parentValue
    );
    const newForm = { ...foundElement.form };
    const value = newForm[fieldName];
    if (
      parseInt(e.label || 0) <=
      this.state.total_hours - (this.state.total - value)
    ) {
        const newExtensions = extensions.map((item) => {
            if(item.input_name === parentValue) {
                const newForm = { ...item.form };
                newForm[fieldName] = parseInt(e.label) || 0;
                return {
                    ...item,
                    form: newForm,
                };
            }
            return {
                ...item,
            };
        });
        this.setState(
            {
                extensions: newExtensions,
            },
            this.calcularTotal
        );
    } else {
        alert("No es posible elegir una hora mayor al limite disponible");
    }
  }; 

  onChangeObservacionesHandler = (event) => {
    this.setState({ observaciones: event.target.value });
  };

  enableAddButton = () => {
    const {
      folio,
      tipo_unidad,
      clave_programa,
      nombre_docente,
      codigo_nomina,
      grado_academico,
      total_hours,
      total,
    } = this.state;
    const disableAgregar = !(
      folio !== "" &&
      total_hours !== 0 &&
      total_hours === total
    );
    this.setState({ disableAgregar });
  };


  render() {
    const elementosJSX = this.state.extensions.map((item, index) => {
      const name = index;

      return (
        <div key={name}>
          <fieldset className="border border-info p-3">
            <legend className="w-auto text-left h6">
              {item.nombre_completo}
            </legend>
            <div className="col">
              <div className="row">
                <label className="h5">
                  <b>HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS</b>
                </label>
              </div>
            </div>
            <fieldset className="border border-info p-3">
              <legend className="w-auto text-left h6">
                Ingrese información de horas sustantivas para atención de
                alumnos
              </legend>

              <div className="row">
                <div className="col">
                  <div className="form-group row">
                    <div className="col">
                      <label>Nivel de (PTC):</label>
                      <div className="input-group">
                        <input
                          readOnly={true}
                          type="text"
                          placeholder="Nivel de PTC del docente..."
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
                              name="horas_frente_grupo"
                              type="number"
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
                  <label className="h6">
                    <b>Academias</b>
                  </label>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col">
                  <div className="form-group row">
                    <div className="col">
                      <input
                        parent={`extension_${index}`}
                        className="mr-2"
                        type="radio"
                        onChange={this.onChangePresidenteDisablerHandler}
                        checked={item.form.disablePresidente}
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          ); // Permite solo números
                        }}
                      />{" "}
                      Horas Presidente
                    </div>
                  </div>
                  <div className="form-outline">
                    <label>Presidente:</label>
                    <Select
                      parent={`extension_${index}`}
                      name="presidente"
                      isDisabled={!item.form.disablePresidente}
                      hideSelectedOptions={!item.form.disablePresidente}
                      rules={{ required: true }}
                      options={this.state.horas_presidente}
                      onChange={(e) => {
                        this.onExtensiOnChangePresidenteHandler(`extension_${index}`,e);
                      }}
                      value={{
                        label:
                          item.form.presidente === ""
                            ? "Seleccione hora(s) presidente..."
                            : item.form.presidente,
                      }}
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Permite solo números
                      }}
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group row">
                    <div className="col">
                      <input
                        parent={`extension_${index}`}
                        className="mr-2"
                        type="radio"
                        onChange={this.onChangeSecretarioDisablerHandler}
                        checked={item.form.disableSecretario}
                      />{" "}
                      Horas Secretario
                    </div>
                  </div>
                  <div className="form-outline">
                    <label className="">Secretario:</label>
                    <Select
                      parent={`extension_${index}`}
                      isDisabled={!item.form.disableSecretario}
                      rules={{ required: true }}
                      options={this.state.horas_presidente}
                      onChange={(e) => {
                        this.onExtensiOnSecretarioHandler(`extension_${index}`,e);
                      }}
                      value={{
                        label:
                          item.form.secretario === ""
                            ? "Seleccione hora(s) secretario..."
                            : item.form.secretario,
                      }}
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Permite solo números
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="row mb-2 mt-3">
                  <label className="h6">
                    <b>Asesorías</b>
                  </label>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col">
                  <div className="form-outline">
                    <label>Asesorías Académicas:</label>
                    <div className="input-group">
                      <input
                        parent={`extension_${index}`}
                        name="asesorias_academica"
                        type="number"
                        className="form-control"
                        value={item.form.asesorias_academica}
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
                    <label className="">Educación Dual:</label>
                    <div className="input-group">
                      <input
                        parent={`extension_${index}`}
                        name="educacion_dual"
                        type="number"
                        className="form-control"
                        value={item.form.educacion_dual}
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
                        parent={`extension_${index}`}
                        name="residencias_profesionales"
                        type="number"
                        className="form-control"
                        value={item.form.residencias_profesionales}
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
                        parent={`extension_${index}`}
                        name="titulacion"
                        type="number"
                        className="form-control"
                        value={item.form.titulacion}
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
                        parent={`extension_${index}`}
                        name="tutorias"
                        type="number"
                        className="form-control"
                        value={item.form.tutorias}
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
                    <label className="col-md-5 col-form-label">
                      <b>Actividades Complementarias:</b>{" "}
                    </label>
                    <div className="col">
                      <div className="input-group">
                        <input
                          parent={`extension_${index}`}
                          name="actividades_complementarias"
                          type="number"
                          className=" form-control"
                          value={item.form.actividades_complementarias}
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
                    <label className="col-md-5 col-form-label">
                      <b>Subtotal 1:</b>{" "}
                    </label>
                    <div className="col">
                      <div className="input-group">
                        <input
                          readOnly={true}
                          type="number"
                          className=" form-control"
                          value={item.form.subtotal_1}
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
              <label className="h5">
                <b>HORAS NECESIDAD INSTITUCIONAL</b>
              </label>
            </div>
          </div>
          <fieldset className="border border-info p-3">
            <legend className="w-auto text-left h6">
              Ingrese información de necesidad institucional
            </legend>
            <div className="row">
              <div className="col-12">
                <div className="form-group row">
                  <label className="col-md-6 col-form-label">
                    Investigación educativa, desarrrollo tecnológico:
                  </label>

                  <div className="col">
                    <div className="input-group">
                      <input
                        parent={`extension_${index}`}
                        name="invesigacion_educativa"
                        type="number"
                        placeholder="Subtotal 1 reactivo"
                        className=" form-control"
                        value={item.form.invesigacion_educativa}
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
                      parent={`extension_${index}`}
                      name="apoyo_operativo"
                      type="number"
                      className="form-control"
                      value={item.form.apoyo_operativo}
                      onChange={this.handleInputChange}
                      onInput={this.handleInputValidation}
                      required={true}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">Hora(s)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="form-outline">
                  <label className="">
                    <b>Subtotal 2:</b>
                  </label>
                  <div className="input-group">
                    <input
                      readOnly={true}
                      type="number"
                      placeholder="Subtotal 2 reactivo"
                      className="form-control"
                      value={item.form.subtotal_2}
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
          </fieldset>
          <br />
        </div>
      );
    });
    return (
      <div className="container">
        <div className="row justify-content-center mt-3 mb-3">
          <div
            className="card col-10"
            style={{ boxShadow: "0 2px 8px 1px rgba(64, 60, 67, 0.24)" }}
          >
            <div className="card-body">
              <div
                className="card-header text-center"
                style={{ boxShadow: "0 2px 8px 1px rgba(64, 60, 67, 0.24)" }}
              >
                <h2 className="h3">
                  <b>Modificar Proyección Profesor Tiempo Completo</b>
                </h2>
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
                        value={{
                          label:
                            this.state.folio === ""
                              ? "Seleccione folio de proyeccion..."
                              : this.state.folio,
                        }}
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
                        value={{
                          label:
                            this.state.tipo_unidad === ""
                              ? "Seleccione unidad academica..."
                              : this.state.tipo_unidad,
                        }}
                      />   {this.state.errorTipoUA && (
    <p style={{ color: 'red' }}>{this.state.errorTipoUA}</p>
  )}
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="row mb-3">
                    <label className="h5">
                      <b>PROFESORES DE ASIGNATURA</b>
                    </label>
                  </div>
                </div>

                <fieldset className="border border-info p-3">
                  <legend className="w-auto text-left h6">
                    Ingrese información de profesor por asignatura
                  </legend>
                  <div className="row mb-4">
                    <div className="col">
                      <div className="form-outline">
                        <label>Unidad Académica</label>
                        <Select
                          isDisabled={true}
                          rules={{ required: true }}
                          options={this.state.unidades}
                          onChange={(e) => this.onChangeUnidadHandler(e)}
                          value={{
                            label:
                              this.state.unidad_academica === ""
                                ? "Seleccione unidad Académica..."
                                : this.state.unidad_academica,
                          }}
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
                          value={{
                            label:
                              this.state.clave_programa === ""
                                ? "Seleccione clave de programa educativo..."
                                : this.state.clave_programa,
                          }}
                        />
                        {this.state.errorClavePrograma && (
                                                        <p style={{ color: 'red' }}>{this.state.errorClavePrograma}</p>
                                                    )}
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
                          value={{
                            label:
                              this.state.nombre_docente === ""
                                ? "Seleccione nombre del docente..."
                                : this.state.nombre_docente,
                          }}
                        />
                        
                        {this.state.errorDocente && (
                                                        <p style={{ color: 'red' }}>{this.state.errorDocente}</p>
                                                    )}
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
                      <div
                        className="form-outline"
                        style={{ display: "block" }}
                      >
                        <label>Nivel Académico</label>
                        <Select
                          options={this.state.niveles}
                          onChange={(e) =>
                            this.onChangeGradoAcademicoaHandler(e)
                          }
                          value={{
                            label:
                              this.state.grado_academico === ""
                                ? "Seleccione nivel Académico..."
                                : this.state.grado_academico,
                          }}
                        />
                        {this.state.errorAcademico && (
                           <p style={{ color: 'red' }}>{this.state.errorAcademico}</p>
                       )}
                      </div>
                    </div>
                  </div>
                </fieldset>
                <hr />
                <div className="col">
                  <div className="row">
                    <label className="h5">
                      <b>HORAS SUSTANTIVAS PARA ATENCIÓN DE ALUMNOS</b>
                    </label>
                  </div>
                </div>

                <fieldset className="border border-info p-3">
                  <legend className="w-auto text-left h6">
                    Ingrese información de horas sustantivas para atención de
                    alumnos
                  </legend>

                  <div className="row">
                    <div className="col">
                      <div className="form-group row">
                        <div className="col">
                          <label>Nivel de (PTC):</label>
                          <div className="input-group">
                            <input
                              readOnly={true}
                              type="text"
                              placeholder="Nivel de PTC del docente..."
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
                              name="horas_frente_grupo"
                              type="number"
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
                      <label className="h6">
                        <b>Academias</b>
                      </label>
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col">
                      <div className="form-group row">
                        <div className="col">
                          <input
                            className="mr-2"
                            type="radio"
                            onChange={this.onChangePresidenteDisablerHandler}
                            checked={this.state.disablePresidente}
                            onInput={(e) => {
                              e.target.value = e.target.value.replace(
                                /[^0-9]/g,
                                ""
                              ); // Permite solo números
                            }}
                          />{" "}
                          Horas Presidente
                        </div>
                      </div>
                      <div className="form-outline">
                        <label>Presidente:</label>
                        <Select
                          isDisabled={!this.state.disablePresidente}
                          hideSelectedOptions={!this.state.disablePresidente}
                          rules={{ required: true }}
                          options={this.state.horas_presidente}
                          onChange={(e) => this.onChangePresidenteHandler(e)}
                          value={{
                            label:
                              this.state.presidente === ""
                                ? "Seleccione hora(s) presidente..."
                                : this.state.presidente,
                          }}
                          onInput={(e) => {
                            e.target.value = e.target.value.replace(
                              /[^0-9]/g,
                              ""
                            ); // Permite solo números
                          }}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group row">
                        <div className="col">
                          <input
                            className="mr-2"
                            type="radio"
                            onChange={this.onChangeSecretarioDisablerHandler}
                            checked={this.state.disableSecretario}
                          />{" "}
                          Horas Secretario
                        </div>
                      </div>
                      <div className="form-outline">
                        <label className="">Secretario:</label>
                        <Select
                          isDisabled={!this.state.disableSecretario}
                          rules={{ required: true }}
                          options={this.state.horas_presidente}
                          onChange={(e) => this.onChangeSecretarioHandler(e)}
                          value={{
                            label:
                              this.state.secretario === ""
                                ? "Seleccione hora(s) secretario..."
                                : this.state.secretario,
                          }}
                          onInput={(e) => {
                            e.target.value = e.target.value.replace(
                              /[^0-9]/g,
                              ""
                            ); // Permite solo números
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="row mb-2 mt-3">
                      <label className="h6">
                        <b>Asesorías</b>
                      </label>
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col">
                      <div className="form-outline">
                        <label>Asesorías Académicas:</label>
                        <div className="input-group">
                          <input
                          readOnly={this.state.disableAll}
                            name="asesorias_academica"
                            type="number"
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
                        <label className="">Educación Dual:</label>
                        <div className="input-group">
                          <input
                          readOnly={this.state.disableAll}
                            name="educacion_dual"
                            type="number"
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
                          readOnly={this.state.disableAll}
                            name="residencias_profesionales"
                            type="number"
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
                          readOnly={this.state.disableAll}
                            name="titulacion"
                            type="number"
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
                          readOnly={this.state.disableAll}
                            name="tutorias"
                            type="number"
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
                        <label className="col-md-5 col-form-label">
                          <b>Actividades Complementarias:</b>{" "}
                        </label>
                        <div className="col">
                          <div className="input-group">
                            <input
                            readOnly={this.state.disableAll}
                              name="actividades_complementarias"
                              type="number"
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
                        <label className="col-md-5 col-form-label">
                          <b>Subtotal 1:</b>{" "}
                        </label>
                        <div className="col">
                          <div className="input-group">
                            <input
                              readOnly={true}
                              type="number"
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
                    <label className="h5">
                      <b>HORAS NECESIDAD INSTITUCIONAL</b>
                    </label>
                  </div>
                </div>

                <fieldset className="border border-info p-3">
                  <legend className="w-auto text-left h6">
                    Ingrese información de necesidad institucional
                  </legend>
                  <div className="row">
                    <div className="col-12">
                      <div className="form-group row">
                        <label className="col-md-6 col-form-label">
                          Investigación educativa, desarrrollo tecnológico:
                        </label>

                        <div className="col">
                          <div className="input-group">
                            <input
                            readOnly={this.state.disableAll}
                              name="invesigacion_educativa"
                              type="number"
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
                          readOnly={this.state.disableAll}
                            name="apoyo_operativo"
                            type="number"
                            className="form-control"
                            value={this.state.apoyo_operativo}
                            onChange={this.handleInputChange}
                            onInput={this.handleInputValidation}
                            required={true}
                          />
                          <div className="input-group-append">
                            <span className="input-group-text">Hora(s)</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col">
                      <div className="form-outline">
                        <label className="">
                          <b>Subtotal 2:</b>
                        </label>
                        <div className="input-group">
                          <input
                            readOnly={true}
                            type="number"
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
                <div className="col">
                  <div className="row">
                    <label className="h5">
                      <b></b>
                    </label>
                  </div>
                </div>

                {this.state.show_extensions && (
                  <fieldset className="border border-info p-3">
                    <legend className="w-auto text-left h6">Extensiones</legend>
                    {elementosJSX}
                  </fieldset>
                )}
                <div className="row mb-4">
                  <div className="col-6">
                    <div className="form-outline">
                      <label className="">
                        <b>Total:</b>
                      </label>
                      <div className="input-group">
                        <input
                          readOnly={true}
                          type="number"
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
                      <label className="">
                        <b>OBSERVACIONES:</b>
                      </label>
                      <textarea
                        placeholder="Ingrese observaciones de la proyección por asignatura..."
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
                <button
                  className="btn btn-primary mt-0"
                  onClick={this.updateProyeccionFulltime}
                  disabled={this.state.disableAgregar}
                >
                  Agregar
                </button>
              )}
              <button
                className="btn btn-danger mt-0"
                onClick={this.cancel.bind(this)}
                style={{ marginLeft: "10px" }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default UpdateProyeccionFulltimeComponent;