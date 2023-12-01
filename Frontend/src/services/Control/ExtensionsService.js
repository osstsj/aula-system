import axios from 'axios';
require('dotenv').config();

class ExtensionService {
    createExtensionByUnidadId(id, extensionDto) {
        return axios.post(process.env.REACT_APP_LOCAL_API_BASE_URL + "extension/" + id, extensionDto)
        .catch(err => {
            if (err.response) {
                console.error("Error in response for createExtensionByUnidadIdd...");    
            } else if (err.request) {
                console.error("Error in request for createExtensionByUnidadId...");
            } else {
                console.error("Something happened unknown error...");
            }
        });
    }

    getAllExtensionsByUnidadId(id) {
        return axios.get(process.env.REACT_APP_LOCAL_API_BASE_URL + "extensiones/" + id)
        .catch(err => {
            if (err.response) {
                console.error("Error in response for updateExtensionById...");
            } else if (err.request) {
                console.error("Error in request for updateExtensionById...");
            } else {
                console.error("Something happend!, unkown error...");
            }
        })
    }

    getExtensionById(id) {
        return axios.get(process.env.REACT_APP_LOCAL_API_BASE_URL + "extension/" + id)
        .catch(err => {
            if (err.response) {
                console.error("Error in response for getExtensionById...");
            } else if (err.request) {
                console.error("Error in request for getExtensionById...");
            } else {
                console.error("Something happend!, unkown error...");
            }
        })
    }

    updateExtensionById(id, extensionDto) {
        return axios.put(process.env.REACT_APP_LOCAL_API_BASE_URL + "extension/" + id, extensionDto)
        .catch(err => {
            if (err.response) {
                console.error("Error in response for createExtensionByUnidadIdd...");    
            } else if (err.request) {
                console.error("Error in request for createExtensionByUnidadId...");
            } else {
                console.error("Something happened unknown error...");
            }
        });
    }



    
}

export default new ExtensionService()