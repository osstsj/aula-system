import axios from "axios";
require('dotenv').config();


class FolioAsignaturaService { 
    createFolio(folioDto, id_unidad) {
        return axios.post(process.env.REACT_APP_LOCAL_API_BASE_URL + "folio/" + id_unidad, folioDto);
    } 

    getAllFolios() {
        return axios.get(process.env.REACT_APP_LOCAL_API_BASE_URL + 'folios');
    }

    getAllFoliosByUA(id_unidad) {
        return axios.get(process.env.REACT_APP_LOCAL_API_BASE_URL + 'folios_by_ua/'
         + id_unidad);
    }

}


export default new FolioAsignaturaService()