import axios from "axios"
import { API_URL, jwt } from "../utils/env_url"

export let getProfessionalDataByUserId = async(id) => {
    let response = await axios.get(`${API_URL}/api/professional?id=${id}`,{
        headers:{
            Authorization:
                `Bearer ${jwt}`,
            token: "RECRUBATM"
        },
    }); 
    return response.data;
}

export let removeProfessionalData = async(id) => {
    let response = await axios.delete(`${API_URL}/api/professional?id=${id}`,{
        headers:{
            Authorization:
                `Bearer ${jwt}`,
            token: "RECRUBATM"
        },
    });
    return response.data;
}

export let saveProfessionalData = async(request) => {
    let response = await axios.post(`${API_URL}/api/professional`,request,{
        headers:{
            Authorization:
                `Bearer ${jwt}`,
            token: "RECRUBATM"
        },
    });
    return response.data;
}