import axios from "axios"
import { API_URL, jwt } from "../utils/env_url"

export let getOrganizationDataByUserId = async(id) => {
    let response = await axios.get(`${API_URL}/api/organization?id=${id}`,{
        headers:{
            Authorization:
                `Bearer ${jwt}`,
            token: "RECRUBATM"
        },
    }); 
    return response.data;
}

export let removeOrganizationData = async(id) => {
    let response = await axios.delete(`${API_URL}/api/organization?id=${id}`,{
        headers:{
            Authorization:
                `Bearer ${jwt}`,
            token: "RECRUBATM"
        },
    });
    return response.data;
}

export let saveOrganizationData = async(request) => {
    let response = await axios.post(`${API_URL}/api/organization`,request,{
        headers:{
            Authorization:
                `Bearer ${jwt}`,
            token: "RECRUBATM"
        },
    });
    return response.data;
}