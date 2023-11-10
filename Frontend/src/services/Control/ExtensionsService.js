import axios from 'axios';
require('dotenv').config();

class ExtensionService {
    createExtensionByUnidadId(id_unidad, extensionDto) {
        return axios.post(process.env.REACT_APP_LOCAL_API_BASE_URL + "extension/" + id_unidad, extensionDto)
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

    getAllExtensionsByUnidadId(id_unidad) {
        return axios.get(process.env.REACT_APP_LOCAL_API_BASE_URL + "extensiones/" + id_unidad)
        .catch(err => {
            if (err.response) {
                console.error("Error in response for getAllExtensionsByUnidadId...");
            } else if (err.request) {
                console.error("Error in request for getAllExtensionsByUnidadId...");
            } else {
                console.error("Something happend!, unkown error...");
            }
        })
    }

    
}

export default new ExtensionService()