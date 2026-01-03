import axios from "axios"
import { API_URL, jwt } from "../utils/env_url"

export let getCertificationDataByUserId = async (id) => {
    let response = await axios.get(`${API_URL}/api/certificate?id=${id}`, {
        headers: {
            Authorization:
                `Bearer ${jwt}`,
            token: "RECRUBATM"
        },
    });
    return response.data;
}

export let getCertificationDataById = async (id) => {
    let response = await axios.get(`${API_URL}/api/certificate/detail?id=${id}`, {
        headers: {
            Authorization:
                `Bearer ${jwt}`,
            token: "RECRUBATM"
        },
    });
    return response.data;
}

export let removeCertificationData = async (id) => {    
    let response = await axios.delete(`${API_URL}/api/certificate?id=${id}`,{
        headers:{
            Authorization: 
                `Bearer ${jwt}`,
            token: "RECRUBATM"
        },
    });
    return response.data;
}

export let saveCertificationData = async (request) => { 
    let response = await axios.post(`${API_URL}/api/certificate`, request.request, {
        headers: {
            Authorization:
                `Bearer ${jwt}`,
            token: "RECRUBATM"
        },
    });
    return response.data;
} 
