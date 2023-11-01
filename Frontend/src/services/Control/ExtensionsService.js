import axios from 'axios';
require('dotenv').config();

class ExtensionService {
    createExtensionByPlanteId(id_plantel, extensionBody) {
        return axios.post(process.env.REACT_APP_LOCAL_API_BASE_URL + "extension/" + id_plantel, extensionBody)
        .catch(err => {
            if (err.response) {
                console.error("Error in response for createExtensionByPlanteId...");    
            } else if (err.request) {
                console.error("Error in request for createExtensionByPlanteId...");
            } else {
                console.error("Something happened unknown error...");
            }
        });
    }

    getAllExtensionsByPlantelId(id_plantel) {
        return axios.get(process.env.REACT_APP_LOCAL_API_BASE_URL + "extensiones/" + id_plantel)
        .catch(err => {
            if (err.response) {
                console.error("Error in response for getAllExtensionsByPlantelId...");
            } else if (err.request) {
                console.error("Error in request for getAllExtensionsByPlantelId...");
            } else {
                console.error("Something happend!, unkown error...");
            }
        })
    }

    
}

export default new ExtensionService()