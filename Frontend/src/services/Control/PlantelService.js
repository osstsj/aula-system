import axios from "axios";
require('dotenv').config();

class PlantelService {
    createPlantel(plantel) {
        return axios.post(process.env.REACT_APP_LOCAL_API_BASE_URL  + "plantel", plantel)
        .catch(err => {
            if (err.response) {
                console.error("Error in response for  createPlantel...");
            } else if(err.request) {
                console.error("Error in request for  createPlantel...");
            } else {
                console.error("Something happend, unknown error for  createPlantel");
            }
        });
    }

    getAllPlanteles() {
        return axios.get(process.env.REACT_APP_LOCAL_API_BASE_URL  + "planteles")
        .catch(err => {
            if (err.response) {
                console.error("Error in response for getAllPlanteles...");
                console.log("process.env.API_BASE_URL" + process.env.REACT_APP_LOCAL_API_BASE_URL);
            } else if(err.request) {
                console.error("Error in request for getAllPlanteles...");
            } else {
                console.error("Something happend, unknown error for getAllPlanteles");
            }
        });
    }

    getPlantelById(plantelId) {
        return axios.get(process.env.REACT_APP_LOCAL_API_BASE_URL  + "plantel/" + plantelId)
        .catch(err => {
            if (err.response) {
                console.error("Error in response for getPlantelById...");
            } else if(err.request) {
                console.error("Error in request for getPlantelById...");
            } else {
                console.error("Something happend, unknown error for getPlantelById");
            }
        });
    }

    updatePlantelById(plantel, plantelId) {
        return axios.put(process.env.REACT_APP_LOCAL_API_BASE_URL  + "plantel/" + plantelId, plantel)
        .catch(err => {
            if (err.response) {
                console.error("Error in response for updatePlantelById...");
            } else if(err.request) {
                console.error("Error in request for updatePlantelById...");
            } else {
                console.error("Something happend, unknown error for updatePlantelById");
            }
        });
    }

    deletePlantelById(plantelId) {
        return axios.delete(process.env.REACT_APP_LOCAL_API_BASE_URL  + "plantel/" + plantelId)
        .catch(err => {
            if (err.response) {
                console.error("Error in response for deletePlantelById...");
            } else if(err.request) {
                console.error("Error in request for deletePlantelById...");
            } else {
                console.error("Something happend, unknown error for deletePlantelById");
            }
        });
    }
}

// Exporting the class' objects
export default new PlantelService()