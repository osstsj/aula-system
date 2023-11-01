import axios from "axios";
require('dotenv').config();


class ColegiaturaService {
    createColegiatura(colegiatura) {
        return axios.post(process.env.REACT_APP_LOCAL_API_BASE_URL + "colegiatura", colegiatura)
        .catch(err => {
            if (err.response) {
                console.error("Error in response for createColegiatura...");
            } else if(err.request) {
                console.error("Error in request for createColegiatura...");
            } else {
                console.error("Something happend, unknown error for createColegiatura");
            }
        });
    }

    getAllColegiaturas() {
        return axios.get(process.env.REACT_APP_LOCAL_API_BASE_URL + "colegiaturas")
        .catch(err => {
            if (err.response) {
                console.error("Error in response for getAllColegiaturas...");
            } else if(err.request) {
                console.error("Error in request for getAllColegiaturas...");
            } else {
                console.error("Something happend, unknown error for getAllColegiaturas");
            }
        });
    }

    getColegiaturaById(id) {
        return axios.get(process.env.REACT_APP_LOCAL_API_BASE_URL + "colegiatura/" + id)
        .catch(err => {
            if (err.response) {
                console.error("Error in response for getColegiaturaById...");
            } else if(err.request) {
                console.error("Error in request for getColegiaturaById...");
            } else {
                console.error("Something happend, unknown error for getColegiaturaById");
            }
        });
    }

    updateColegiaturaById(colegiatura, id) {
        return axios.put(process.env.REACT_APP_LOCAL_API_BASE_URL + "colegiatura/" + id, colegiatura)
        .catch(err => {
            if (err.response) {
                console.error("Error in response for updateColegiaturaById...");
            } else if(err.request) {
                console.error("Error in request for updateColegiaturaById...");
            } else {
                console.error("Something happend, unknown error for updateColegiaturaById");
            }
        });
    }

    deleteColegiaturaById(id) {
        return axios.delete(process.env.REACT_APP_LOCAL_API_BASE_URL + "colegiatura/" + id)
        .catch(err => {
            if (err.response) {
                console.error("Error in response for deleteColegiaturaById...");
            } else if(err.request) {
                console.error("Error in request for deleteColegiaturaById...");
            } else {
                console.error("Something happend, unknown error for deleteColegiaturaById");
            }
        });
    }
}

export default new ColegiaturaService();