import axios from "axios";
require('dotenv').config();

class FulltimeProyeccionService {
    createProyeccionFulltime(fulltimeDto, id_folio, id_unidad, id_docente, id_carrera) {
        return axios.post(process.env.REACT_APP_LOCAL_API_BASE_URL + "fulltime/folio/" + id_folio 
        + "/unidad/" + id_unidad + "/docente/" + id_docente + "/carrera/" + id_carrera, fulltimeDto)
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

    updateProyeccionFulltimeById(fulltimeDto, id_fulltime, id_folio, id_unidad, id_docente, id_carrera) {
        return axios.put(process.env.REACT_APP_LOCAL_API_BASE_URL + "fulltime/" + id_fulltime + "/folio/" + id_folio 
        + "/unidad/" + id_unidad + "/docente/" + id_docente + "/carrera/" + id_carrera, fulltimeDto)
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

    getAllProyeccionesFulltimeByFolio(id_folio) {
        return axios.get(process.env.REACT_APP_LOCAL_API_BASE_URL + "fulltime_by_folio/" + id_folio)
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

    getProyeccioneFulltimeById(id) {
        return axios.get(process.env.REACT_APP_LOCAL_API_BASE_URL + "fulltime/" + id)
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

    showComparativeFulltomeByIdsFolios(id_folio_1, id_folio_2) {
        return axios.get(process.env.REACT_APP_LOCAL_API_BASE_URL + "fulltime_comparativo/" + id_folio_1 + "/" + id_folio_2)
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

export default new FulltimeProyeccionService()