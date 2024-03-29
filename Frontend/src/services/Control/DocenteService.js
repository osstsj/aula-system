import axios from "axios";
require('dotenv').config();


class DocenteService {
    createDocente(docenteDto, id_unidad) {
        return axios.post(process.env.REACT_APP_LOCAL_API_BASE_URL + "docente/" + id_unidad, docenteDto)
        .catch(err => {
            if (err.response) {
                console.error("Error in response for createDocente...");
            } else if(err.request) {
                console.error("Error in request for createDocente...");
            } else {
                console.error("Something happend, unknown error for createDocente");
            }
        });
    }

    getAllDocentes() {
        return axios.get(process.env.REACT_APP_LOCAL_API_BASE_URL + "docentes")
        .catch(err => {
            if (err.response) {
                console.error("Error in response for getAllDocentes...");
            } else if(err.request) {
                console.error("Error in request for getAllDocentes...");
            } else {
                console.error("Something happend, unknown error for getAllDocentes");
            }
        });
    }


    getAllDocentesByCategoriaPTCAsignatura(id_unidad) {
        return axios.get(process.env.REACT_APP_LOCAL_API_BASE_URL + "docentes_categoria_ptc_asignatura/" + id_unidad)
        .catch(err => {
            if (err.response) {
                console.error("Error in response for getAllDocentesByCategoriaPTCAsignatura...");
            } else if(err.request) {
                console.error("Error in request for getAllDocentesByCategoriaPTCAsignatura...");
            } else {
                console.error("Something happend, unknown error for getAllDocentesByCategoriaPTCAsignatura");
            }
        });
    }


    getAllDocentesByCategoriaPTCFulltime(id_unidad) {
        return axios.get(process.env.REACT_APP_LOCAL_API_BASE_URL + "docentes_categoria_ptc_fulltime/" + id_unidad)
        .catch(err => {
            if (err.response) {
                console.error("Error in response for getAllDocentesByCategoriaPTCFulltime...");
            } else if(err.request) {
                console.error("Error in request for getAllDocentesByCategoriaPTCFulltime...");
            } else {
                console.error("Something happend, unknown error for getAllDocentesByCategoriaPTCFulltime");
            }
        });
    }

    getAllDocentesByUA(id_unidad) {
        return axios.get(process.env.REACT_APP_LOCAL_API_BASE_URL + 'docentes_by_ua/' + id_unidad)
        .catch(err => {
            if (err.response) {
                console.error("Error in response for getAllDocentesByUA...");
            } else if(err.request) {
                console.error("Error in request for getAllDocentesByUA...");
            } else {
                console.error("Something happend, unknown error for getAllDocentesByUA");
            }
        })
    }

    getDocenteById(id) {
        return axios.get(process.env.REACT_APP_LOCAL_API_BASE_URL + "docente/" + id)
        .catch(err => {
            if (err.response) {
                console.error("Error in response for getDocenteById...");
            } else if(err.request) {
                console.error("Error in request for getDocenteById...");
            } else {
                console.error("Something happend, unknown error for getDocenteById");
            }
        });
    }

    updateDocenteById(id, id_unidad, docenteDto) {
        return axios.put(process.env.REACT_APP_LOCAL_API_BASE_URL + "docente/" + id  + "/" + id_unidad, docenteDto)
        .catch(err => {
            if (err.response) {
                console.error("Error in response for updateDocenteById...");
            } else if(err.request) {
                console.error("Error in request for updateDocenteById...");
            } else {
                console.error("Something happend, unknown error for updateDocenteById");
            }
        });
    }

    deleteDocenteById(id) {
        return axios.delete(process.env.REACT_APP_LOCAL_API_BASE_URL + "docente/" + id)
        .catch(err => {
            if (err.response) {
                console.error("Error in response for deleteDocenteById...");
            } else if(err.request) {
                console.error("Error in request for deleteDocenteById...");
            } else {
                console.error("Something happend, unknown error for deleteDocenteById");
            }
        });
    }

    checkDocenteDependersById(id) {
        return axios.get(process.env.REACT_APP_LOCAL_API_BASE_URL + "docente_dependers/" + id)
        .catch(err => {
            if (err.response) {
                console.error("Error in response for checkDocenteDependersById...");
            } else if(err.request) {
                console.error("Error in request for checkDocenteDependersById...");
            } else {
                console.error("Something happend, unknown error for checkDocenteDependersById");
            }
        });
    }
}


// Exporting the class' objects
export default new DocenteService()