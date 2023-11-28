import axios from "axios";
require('dotenv').config();

class UnidadService {
    createUnidad(unidadDto) {
        return axios.post(process.env.REACT_APP_LOCAL_API_BASE_URL  + "unidad", unidadDto)
        .catch(err => {
            if (err.response) {
                console.error("Error in response for createUnidad...");
            } else if(err.request) {
                console.error("Error in request for createUnidad...");
            } else {
                console.error("Something happend, unknown error for createUnidad");
            }
        });
    }

    getAllUnidades() {
        return axios.get(process.env.REACT_APP_LOCAL_API_BASE_URL  + "unidades")
        .catch(err => {
            if (err.response) {
                console.error("Error in response for  getAllUnidades...");
            } else if(err.request) {
                console.error("Error in request for  getAllUnidades...");
            } else {
                console.error("Something happend, unknown error for  getAllUnidades");
            }
        });
    }

    getUnidadById(unidadId) {
        return axios.get(process.env.REACT_APP_LOCAL_API_BASE_URL  + "unidad/" + unidadId)
        .catch(err => {
            if (err.response) {
                console.error("Error in response for getUnidadById...");
            } else if(err.request) {
                console.error("Error in request for getUnidadById...");
            } else {
                console.error("Something happend, unknown error for getUnidadById");
            }
        });
    }

    updateUnidadById(unidadDto, unidadId) {
        return axios.put(process.env.REACT_APP_LOCAL_API_BASE_URL  + "unidad/" + unidadId, unidadDto)
        .catch(err => {
            if (err.response) {
                console.error("Error in response for updateUnidadById...");
            } else if(err.request) {
                console.error("Error in request for updateUnidadById...");
            } else {
                console.error("Something happend, unknown error for updateUnidadById");
            }
        });
    }

    deleteUnidadById(unidadId) {
        return axios.delete(process.env.REACT_APP_LOCAL_API_BASE_URL  + "unidad/" + unidadId)
        .catch(err => {
            if (err.response) {
                console.error("Error in response for deleteUnidadById...");
            } else if(err.request) {
                console.error("Error in request for deleteUnidadById...");
            } else {
                console.error("Something happend, unknown error for deleteUnidadById");
            }
        });
    }

    checkUnidadDependersByUnidadId(unidadId) {
        return axios.get(process.env.REACT_APP_LOCAL_API_BASE_URL  + "unidad_dependers/" + unidadId)
        .catch(err => {
            if (err.response) {
                console.error("Error in response for checkUnidadDependersByUnidadId...");
            } else if(err.request) {
                console.error("Error in request for checkUnidadDependersByUnidadId...");
            } else {
                console.error("Something happend, unknown error for checkUnidadDependersByUnidadId");
            }
        });
    }


}

// Exporting the class' objects
export default new UnidadService()