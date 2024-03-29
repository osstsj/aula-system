import axios from "axios";
require('dotenv').config();


class AreaEscolarService {
    createAreaEscolar(areaDto, id_unidad) {
        return axios.post(process.env.REACT_APP_LOCAL_API_BASE_URL + "area_escolar_by_unidad/" + id_unidad, areaDto)
        .catch(err => {
            if (err.response) {
                console.error("Error in response for createArea...");
            } else if(err.request) {
                console.error("Error in request for createArea...");
            } else {
                console.error("Something happend, unknown error for createArea");
            }
        });
    }

    getAllAreaEscolar() {
        return axios.get(process.env.REACT_APP_LOCAL_API_BASE_URL + "areas_escolares")
        .catch(err => {
            if (err.response) {
                console.error("Error in response for getAllAreas...");
            } else if(err.request) {
                console.error("Error in request for getAllAreas...");
            } else {
                console.error("Something happend, unknown error for getAllAreas");
            }
        });
    }

    getAreaEscolarById(areaId) {
        return axios.get(process.env.REACT_APP_LOCAL_API_BASE_URL + "area_escolar/" + areaId)
        .catch(err => {
            if (err.response) {
                console.error("Error in response for getAreaById...");
            } else if(err.request) {
                console.error("Error in request for getAreaById...");
            } else {
                console.error("Something happend, unknown error for getAreaById");
            }
        });
    }

    updateAreaEscolarById(areaDto, areaId, id_unidad) {
        return axios.put(process.env.REACT_APP_LOCAL_API_BASE_URL + "area_escolar/" + areaId + "/" + id_unidad, areaDto)
        .catch(err => {
            if (err.response) {
                console.error("Error in response for updateAreaById...");
            } else if(err.request) {
                console.error("Error in request for updateAreaById...");
            } else {
                console.error("Something happend, unknown error for updateAreaById");
            }
        });
    }

    deleteAreaEscolarById(areaId) {
        return axios.delete(process.env.REACT_APP_LOCAL_API_BASE_URL + "area_escolar/" + areaId)
        .catch(err => {
            if (err.response) {
                console.error("Error in response for deleteAreaById...");
            } else if(err.request) {
                console.error("Error in request for deleteAreaById...");
            } else {
                console.error("Something happend, unknown error for deleteAreaById");
            }
        });
    }
}

export default new AreaEscolarService()