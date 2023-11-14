import axios from "axios";
require('dotenv').config();


class FolioFulltimeService { 
    createFolio(folioDto, id_unidad) {
        return axios.post(process.env.REACT_APP_LOCAL_API_BASE_URL + "folio_fulltime/" + id_unidad, folioDto);
    } 

    getAllFolios() {
        return axios.get(process.env.REACT_APP_LOCAL_API_BASE_URL + 'folios_fulltime');
    }

    getAllFoliosByUA(id_unidad) {
        return axios.get(process.env.REACT_APP_LOCAL_API_BASE_URL + 'folios_fulltime_by_unidad/'
         + id_unidad);
    }

}


export default new FolioFulltimeService()