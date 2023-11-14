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

    getProyeccionesAsignaturaById(id) {
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
}

export default new FulltimeProyeccionService()