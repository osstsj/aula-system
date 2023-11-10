import axios from "axios";
require('dotenv').config();


class CarreraService {
    createCarrera(carreraDto) {
        return axios.post(process.env.REACT_APP_LOCAL_API_BASE_URL + "carrera", carreraDto)
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

    getAllCarreras() {
        return axios.get(process.env.REACT_APP_LOCAL_API_BASE_URL + "carreras")
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

    getCarreraById(carreraId) {
        return axios.get(process.env.REACT_APP_LOCAL_API_BASE_URL + "carrera/" + carreraId)
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

    updateCarreralById(carreraDto, carreraId) {
        return axios.put(process.env.REACT_APP_LOCAL_API_BASE_URL + "carrera/" + carreraId, carreraDto)
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

    deleteCarreralById(carreraId) {
        return axios.delete(process.env.REACT_APP_LOCAL_API_BASE_URL + "carrera/" + carreraId)
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
export default new CarreraService()