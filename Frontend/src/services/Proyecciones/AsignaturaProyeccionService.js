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

    findAllByUnidad_academica(id_folio, id_unidad) {
        return axios.get(process.env.REACT_APP_LOCAL_API_BASE_URL + "asignaturas_by_folio_and_unidad/" + id_folio + "/" + id_unidad)
        .catch(error => {
            if (error.response) {
                console.error("Error in res");
            } else if (error.request) {
                console.error("Error req");
            } else {
                console.error("algo mas");
            }
        })
    }
}

export default new AsignaturaProyeccionService()