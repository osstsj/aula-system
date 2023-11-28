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
                console.error("Error in response for getAllCarrera...");
            } else if(err.request) {
                console.error("Error in request for getAllCarrera...");
            } else {
                console.error("Something happend, unknown error for getAllCarrera");
            }
        });
    }

    getAllCarrerasByEstatus() {
        return axios.get(process.env.REACT_APP_LOCAL_API_BASE_URL + "carreras_by_estatus")
        .catch(err => {
            if (err.response) {
                console.error("Error in response for getAllCarrerasByEstatus...");
            } else if(err.request) {
                console.error("Error in request for getAllCarrerasByEstatus...");
            } else {
                console.error("Something happend, unknown error for getAllCarrerasByEstatus");
            }
        });
    }

    getCarreraById(carreraId) {
        return axios.get(process.env.REACT_APP_LOCAL_API_BASE_URL + "carrera/" + carreraId)
        .catch(err => {
            if (err.response) {
                console.error("Error in response for getCarreraById...");
            } else if(err.request) {
                console.error("Error in request for getCarreraById...");
            } else {
                console.error("Something happend, unknown error for getCarreraById");
            }
        });
    }

    updateCarreralById(carreraDto, carreraId) {
        return axios.put(process.env.REACT_APP_LOCAL_API_BASE_URL + "carrera/" + carreraId, carreraDto)
        .catch(err => {
            if (err.response) {
                console.error("Error in response for updateCarreralById...");
            } else if(err.request) {
                console.error("Error in request for updateCarreralById...");
            } else {
                console.error("Something happend, unknown error for updateCarreralById");
            }
        });
    }

    deleteCarreralById(carreraId) {
        return axios.delete(process.env.REACT_APP_LOCAL_API_BASE_URL + "carrera/" + carreraId)
        .catch(err => {
            if (err.response) {
                console.error("Error in response for deleteCarreralById...");
            } else if(err.request) {
                console.error("Error in request for deleteCarreralById...");
            } else {
                console.error("Something happend, unknown error for deleteCarreralById");
            }
        });
    }

    checkCarreraDependersById(carreraId) {
        return axios.get(process.env.REACT_APP_LOCAL_API_BASE_URL + "carrera_dependers/" + carreraId)
        .catch(err => {
            if (err.response) {
                console.error("Error in response for checkCarreraDependersById...");
            } else if(err.request) {
                console.error("Error in request for checkCarreraDependersById...");
            } else {
                console.error("Something happend, unknown error for checkCarreraDependersById");
            }
        });
    }

}

// Exporting the class' objects
export default new CarreraService()