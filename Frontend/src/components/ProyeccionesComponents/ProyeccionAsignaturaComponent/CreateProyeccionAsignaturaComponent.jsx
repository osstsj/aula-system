import React, { Component } from "react";

import AsignaturaProyeccionService from '../../../services/Proyecciones/AsignaturaProyeccionService';
import FolioAsignaturaService from '../../../services/Proyecciones/FolioAsignaturaService';

import Select from "react-select";
import "../../StyleGlobal/Style.css";
import DocenteService from "../../../services/Control/DocenteService";
import ExtensionsService from "../../../services/Control/ExtensionsService";
import CarreraPorUnidadService from '../../../services/Control/CarreraPorUnidadService';

class CreateProyeccionAsignaturaComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
    id: this.props.match.params.id, // folio id
      isLoading: false,

      unidades: [],
      niveles: [],
      carreras: [],
      horas_presidente: [],
      horas_secretario: [],
      docentes: [],
      folios: [],
      tipos_unidades: [],

      folio: "",
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

      unidad_academica: "",
      tipo_unidad: "",

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
      show_extensions: false,
      extensions: [],
       //validar
       seleccionadoTipoUA: false,
       seleccionadoClavePrograma: false,
       seleccionadoDocente: false,
       seleccionadoAcademico: false,
    };
  }

  createProyeccionAsignatura = (e) => {
    const codigoNomina = e.target.value;

    // if (!this.state.seleccionadoTipoUA) {
    //     this.setState({
    //       errorTipoUA: 'Por favor, seleccione una opción del tipo de UA.',
    //     });
    //     return;
    //   }
    
      // Verificar si no se ha seleccionado una opción en la "Clave de Programa Educativo"
      if (!this.state.seleccionadoClavePrograma) {
        this.setState({
          errorClavePrograma: 'Por favor, seleccione una clave de programa educativo.',
        });
        return;
      }
      if (!this.state.seleccionadoDocente) {
        this.setState({
          errorDocente: 'Por favor, seleccione un Docente.',
        });
        return;
      }
      
      if (!this.state.seleccionadoAcademico) {
        this.setState({
          errorAcademico: 'Por favor, seleccione un Docente.',
        });
        return;
      }
      
    if (this.state.errorInfo !== null) {
        alert('No se puede duplicar clave de empleado.');
    }

    e.preventDefault();

    console.log("horas_frente_grupo" + this.state.horas_frente_grupo);
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
            horas_frente_grupo: this.state.horas_frente_grupo === "" || null ? 0 : this.state.horas_frente_grupo,

                academias: {
                presidente: this.state.presidente,
                secretario: this.state.secretario,
                },

                asesorias: {
                  asesorias_academica: this.state.asesorias_academica === "" || null ? 0 : this.state.asesorias_academica,
                  educacion_dual: this.state.educacion_dual === "" || null ? 0 : this.state.educacion_dual,
                  residencias_profesionales: this.state.residencias_profesionales === "" || null ? 0 : this.state.residencias_profesionales,
                  titulacion: this.state.titulacion === "" || null ? 0 : this.state.titulacion,
                  tutorias: this.state.tutorias === "" || null ? 0 : this.state.tutorias,
                },

            actividades_complementarias: this.state.actividades_complementarias === "" || null ? 0 : this.state.actividades_complementarias,
            },

            horas_necesidad_institucional:  {
              invesigacion_educativa: this.state.invesigacion_educativa === "" || null ? 0 : this.state.invesigacion_educativa,
              apoyo_operativo: this.state.apoyo_operativo === "" || null ? 0 : this.state.apoyo_operativo,
            },

        // unidad_academica: this.state.unidad_academica.trim(),
        observaciones: this.state.observaciones.trim(),
        extensiones: this.state.extensions,

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
        this.state.id_folio, 
        this.state.id_unidad,
        this.state.id_docente,
        this.state.id_carrera)
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
        this.props.history.push(`/list-proyeccion_asignatura/${this.state.id}`);
    }

  componentDidUpdate(prevProps, prevState) {}

  componentDidMount() {
    this.getNivel();
    this.getHorasAcademias_presidente();
    this.getHorasAcademias_secretario();
    this.getFolioById();
    this.getTipoUnidad();

    this.setState(() => ({
        disableA: true,
        disableB: true
    }));
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

    this.getDocenteList(this.state.id_unidad, this.state.id_folio);
    this.getCarreraList(this.state.id_unidad);
  
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
}

async getDocenteList(id_unidad, id_folio) {
    let options = null;
    await DocenteService.getAllDocentesByCategoriaPTCAsignatura(id_unidad).then(res => {
        const data = res.data;
        options = data.map(d => ({
            "value": d.nombre_completo,
            "label": d.nombre_completo,
            "id": d.id,
            "codigo_nomina": d.codigo_nomina,
            "categoria":d.categoria,
            "grado_academico": d.grado_academico,
        }))
        this.setState({ docentes: options });
    }).catch(() => {
        alert("Error al intentar traer los docentes...");
        this.props.history.push('/');
    });

    this.getAllProyeccionesToFilterDocente(id_folio);
}

getTipoUnidad() {
    const tiposlList = [
        { value: 'Unidad Académica', label: 'Unidad Académica' },
        { value: 'Unidad Académica + Extensión', label:'Unidad Académica + Extensión'},
    ]

    this.setState({ tipos_unidades: tiposlList });
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

  async getAllProyeccionesToFilterDocente(id_folio) {
    let fulltimeList = [];
    await AsignaturaProyeccionService.getAllProyeccionesAsignaturaByFolio(id_folio)
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
             docente.id !== fulltime.profe_asignatura.nombre_docente.id
          );
    })

    // Additionally, keep in mind that setState may not immediately reflect the updated state due to
    //  its asynchronous nature. If you need to perform any actions after the state is updated, you can 
    //  use the second argument of setState, which is a callback function.
      this.setState({ docentes: updatedDocentes });
}

  getTipoUnidad() {
    const tiposlList = [
      { value: 1, label: "Unidad Academica" },
      { value: 2, label: "Unidad Academica + Extensión" },
    ];

    this.setState({ tipos_unidades: tiposlList });
  }

  getNivel() {
    const nivelList = [
      { value: "LICENCIATURA", label: "LICENCIATURA" },
      { value: "INGENIERIA", label: "INGENIERIA" },
      { value: "MAESTRIA", label: "MAESTRIA" },
      { value: "DOCTORADO", label: "DOCTORADO" },
    ];

    this.setState({ niveles: nivelList });
  }

  getHorasAcademias_presidente() {
    const academiasList = [
      { value: 1, label: 1 },
      { value: 2, label: 2 },
      { value: 3, label: 3 },
    ];

    this.setState({ horas_presidente: academiasList });
  }

  getHorasAcademias_secretario() {
    const academiasList = [
      { value: 1, label: 1 },
      { value: 2, label: 2 },
      { value: 3, label: 3 },
    ];
    this.setState({ horas_secretario: academiasList });
  }

  onChangeTipoUnidadHandler = (event) => {
    this.setState({ tipo_unidad: event.label });
    // if (event.value === 2) {
    //   this.getAllExtensionsByUnidadId();
    // } else {
    //   this.setState({
    //     show_extensions: false,
    //   });
    // }
    // this.setState({
    //   tipo_unidad: event.label,   seleccionadoTipoUA: true,  errorTipoUA: null,
    // });
  };

  onChangeFolioHandler = (event) => {
    this.setState({ folio: event.label }, this.enableAddButton);
    this.setState({ id_folio: event.id });

    this.setState({ nombre_docente: "" });

    this.setState({ id_unidad: event.id_unidad });
    this.setState({ unidad_academica: event.unidad_academica });
    this.getDocenteList(event.id_unidad);
  };

  onChangeUnidadHandler = (event) => {
    this.setState({ unidad_academica: event.label }, this.enableAddButton);
    this.setState({ disableDocente: false });
  };

  onChangeClaveProgramaHandler = (event) => {
    this.setState({ clave_programa: event.label, seleccionadoClavePrograma:true, errorClavePrograma:null }, this.enableAddButton);
    this.setState({ id_carrera: event.id });
  };
  onChangeCodigoNominaHandler = (event) => {
    this.setState({ codigo_nomina: event.target.value }, this.enableAddButton);
  };
  onChangeGradoAcademicoaHandler = (event) => {
    // this.setState({ grado_academico: event.label,seleccionadoAcademico:true,errorAcademico:null  }, this.enableAddButton);
  };

  onChangeNombreDocenteHandler = (event) => {
    this.setState({ codigo_nomina: event.codigo_nomina });
    this.setState({ nombre_docente: event.label, seleccionadoDocente:true,errorDocente:null  });
    this.setState({ grado_academico: event.grado_academico,seleccionadoAcademico:true,errorAcademico:null  } , this.enableAddButton);

    this.setState({ id_docente: event.id }, this.enableAddButton);

    if(event.categoria === "PROFESOR ASIGNATURA - A") {
        this.setState(() => ({
            disableA: false,
            disableB: true
        }));
    } else if(event.categoria === "PROFESOR ASIGNATURA - B") {
        this.setState(() => ({
            disableB: false,
            disableA: true
        }));
    }

    this.setState({ id_docente: event.id}, this.enableAddButton);
}

  onChangeAHandler = (event) => {
    const hour = parseInt(event.target.value);
    this.setState({
      a: hour,
      total_hours: hour,
    }); 
    this.setState({
    
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
      subtotal_1:0,
      subtotal_2:0,
      total:0,
    
    });
    
  };
  onChangeBHandler = (event) => {
    const hour = parseInt(event.target.value);
    this.setState({
      b: hour,
      total_hours: hour,
    });this.setState({
    
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
      subtotal_1:0,
      subtotal_2:0,
      total:0,
    
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
      total_hours: 0,
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
  onChangeADisablerHandler = () => {
    this.cleaningHours();
}
onChangeBDisablerHandler = () => {
    this.cleaningHours();
}

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
                <div className="col-6">
                  <div className="form-group row">
                   
                    <div className="col-6">
                      <label>Horas Frente a Grupo:</label>
                      <div className="input-group">
                        <input
                          parent={`extension_${index}`}
                          name="horas_frente_grupo"
                          type="number"
                          className=" form-control"
                          value={item.form.horas_frente_grupo}
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
                    <label className="">Tutorías:</label>
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
                  <b>Agregar Proyección por Asignatura</b>
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
                              ? "Seleccione unidad Académica..."
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
                        readOnly
                          isDisabled={true}
                          rules={{ required: true }}
                          options={this.state.unidades}
                          onChange={(e) => this.onChangeUnidadHandler(e)}
                          value={{
                            label:
                              this.state.unidad_academica === ""
                                ? "Seleccione unidad academica..."
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
                          <input
                          readOnly
                            placeholder="Ingrese código de nómina..."
                            className="form-control"
                            value={this.state.grado_academico === ""
                            ? "Seleccione nivel académico..."
                            : this.state.grado_academico}
                            onChange={(e) =>
                              this.onChangeGradoAcademicoaHandler(e)
                            }
                            required
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
                                                                        e.target.value = Math.min(parseInt(e.target.value, 10), 39); // Limita el valor a 40
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
                                                                        e.target.value = Math.min(parseInt(e.target.value, 10), 39); // Limita el valor a 40
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
                      <div className="form-group row">
                    
                        <div className="col-6">
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
                              name="invesigacion_educativa"
                              type="number"
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
                  onClick={this.createProyeccionAsignatura}
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

export default CreateProyeccionAsignaturaComponent;
