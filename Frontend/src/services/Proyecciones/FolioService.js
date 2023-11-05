import axios from "axios";
require('dotenv').config();


class FolioService { 
    createFolio(folioDto) {
        return axios.post(process.env.REACT_APP_LOCAL_API_BASE_URL + "folio", folioDto);
    } 

    getAllFolios() {
        return axios.get(process.env.REACT_APP_LOCAL_API_BASE_URL + 'folios');
    }

}


export default new FolioService()