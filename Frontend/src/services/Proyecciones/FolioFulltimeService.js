import axios from "axios";
require('dotenv').config();


class FolioFulltimeService { 
    createFolio(folioDto, id_unidad) {
        return axios.post(process.env.REACT_APP_LOCAL_API_BASE_URL + "folio_fulltime/" + id_unidad, folioDto);
    } 

    getAllFolios() {
        return axios.get(process.env.REACT_APP_LOCAL_API_BASE_URL + 'folios_fulltime');
    }


    getSecuenciaNumero(id_unidad, periodo, AoB) {
        return axios.get(process.env.REACT_APP_LOCAL_API_BASE_URL + 'folios_fulltime_get_secuencia' +
        "/" + id_unidad + "/" + periodo + "/" + AoB)
        .catch(error => {
            if (error.response) {
                console.error("Error in res");
            } else if (error.request) {
                console.error("Error req");
            } else {
                console.error("algo mas");
            }
        });
    }

    getAllFoliosByUA(id_unidad) {
        return axios.get(process.env.REACT_APP_LOCAL_API_BASE_URL + 'folios_fulltime_by_unidad/'
         + id_unidad);
    }

}


export default new FolioFulltimeService()