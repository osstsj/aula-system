import axios from "axios";
require('dotenv').config();


class AsignaturaProyeccionService {
    createProyeccionAsignatura(asignaturaDto, id_folio, id_unidad, id_docente, id_carrera) {
        return axios.post(process.env.REACT_APP_LOCAL_API_BASE_URL + "asignatura/folio/" + id_folio 
        + "/unidad/" + id_unidad + "/docente/" + id_docente + "/carrera/" + id_carrera, asignaturaDto)
        .catch(err => {
            if (err.response) {
                console.error("error paso!");
            } else if (err.request) {
                console.error("error request!");
            } else {
                console.error("algo mas paso!");
            }
        });
    } 

    updateProyeccionAsignatura(asignaturaDto, id_asignatura, id_folio, id_unidad, id_docente, id_carrera) {
        return axios.put(process.env.REACT_APP_LOCAL_API_BASE_URL + "asignatura/" + id_asignatura + "/folio/" +
         id_folio + "/unidad/" + id_unidad + "/docente/" + id_docente + "/carrera/" + id_carrera, asignaturaDto)
        .catch(err => {
            if (err.response) {
                console.error("error paso!");
            } else if (err.request) {
                console.error("error request!");
            } else {
                console.error("algo mas paso!");
            }
        });
    } 

    getAllProyeccionesAsignaturaByFolio(id_folio) {
        return axios.get(process.env.REACT_APP_LOCAL_API_BASE_URL + "asignaturas_by_folio/" + id_folio)
        .catch(err => {
            if (err.response) {
                console.error("error paso!");
            } else if (err.request) {
                console.error("error request!");
            } else {
                console.error("algo mas paso!");
            }
        });
    }

    getProyeccionesAsignaturaById(id) {
        return axios.get(process.env.REACT_APP_LOCAL_API_BASE_URL + "asignatura/" + id)
        .catch(error => {
            if (error.response) {
                console.error("Error paso!");
            } else if (error.request) {
                console.error("error request!");
            } else {
                console.error("algo mas paso!");
            }
        })
    }

    deleteProyeccionById(id) {
        return axios.delete(process.env.REACT_APP_LOCAL_API_BASE_URL + "asignatura/" + id)
        .catch(error => {
            if (error.response) {
                console.error("Error paso!");
            } else if (error.request) {
                console.error("error request!");
            } else {
                console.error("algo mas paso!");
            }
        })
    }


    showComparativeAsignaturaByIdsFolios(id_folio_1, id_folio_2) {
        return axios.get(process.env.REACT_APP_LOCAL_API_BASE_URL + "asignatura_comparativo/" + id_folio_1 + "/" + id_folio_2)
        .catch(error => {
            if (error.response) {
                console.error("Error paso!");
            } else if (error.request) {
                console.error("error request!");
            } else {
                console.error("algo mas paso!");
            }
        })
    }

    showComparativeAsignaturaByIdsFoliosAndIdDocente(id_folio_1, id_folio_2, id_docente) {
        return axios.get(process.env.REACT_APP_LOCAL_API_BASE_URL + "asignatura_comparativo_for_docente/" + id_folio_1 + "/" + id_folio_2 + "/" + id_docente)
        .catch(error => {
            if (error.response) {
                console.error("Error paso!");
            } else if (error.request) {
                console.error("error request!");
            } else {
                console.error("algo mas paso!");
            }
        })
    }
    
}

export default new AsignaturaProyeccionService()