import axios from "axios";
require('dotenv').config();


class OfertaAcademica {
    createOfertaAcademica(ofertaDto, id_unidad, id_carrera) {
        return axios.post(process.env.REACT_APP_LOCAL_API_BASE_URL + "oferta_academica" + "/" + id_unidad + "/" + id_carrera, ofertaDto)
        .catch(err => {
            if (err.response) {
                console.error("Error in response for createOfertaAcademica...");
            } else if(err.request) {
                console.error("Error in request for createOfertaAcademica...");
            } else {
                console.error("Something happend, unknown error for createOfertaAcademica");
            }
        });
    }

    getAllOfertasAcademicas() {
        return axios.get(process.env.REACT_APP_LOCAL_API_BASE_URL + "ofertas_academicas")
        .catch(err => {
            if (err.response) {
                console.error("Error in response for getAllOfertasAcademicas...");
            } else if(err.request) {
                console.error("Error in request for getAllOfertasAcademicas...");
            } else {
                console.error("Something happend, unknown error for getAllOfertasAcademicas");
            }
        });
    }

    getOfertaAcademicaById(id) {
        return axios.get(process.env.REACT_APP_LOCAL_API_BASE_URL + "oferta_academica/" + id)
        .catch(err => {
            if (err.response) {
                console.error("Error in response for getOfertaAcademicaById...");
            } else if(err.request) {
                console.error("Error in request for getOfertaAcademicaById...");
            } else {
                console.error("Something happend, unknown error for getOfertaAcademicaById");
            }
        });
    }

    updateOfertaAcademicaById(id, ofertaDto, id_unidad, id_carrera) {
        return axios.put(process.env.REACT_APP_LOCAL_API_BASE_URL + "oferta_academica/" + id +"/" + id_unidad + "/" + id_carrera, ofertaDto)
        .catch(err => {
            if (err.response) {
                console.error("Error in response for updateOfertaAcademicaById...");
            } else if(err.request) {
                console.error("Error in request for updateOfertaAcademicaById...");
            } else {
                console.error("Something happend, unknown error for updateOfertaAcademicaById");
            }
        });
    }

    deleteOfertaAcademicalById(id) {
        return axios.delete(process.env.REACT_APP_LOCAL_API_BASE_URL + "oferta_academica/" + id)
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
}

// Exporting the class' objects
export default new OfertaAcademica()