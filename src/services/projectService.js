import axios from "axios"
import { API_URL, jwt } from "../utils/env_url"

export let getProjectDataByUserId = async(id) => {
    let response = await axios.get(`${API_URL}/api/project?id=${id}`,{
        headers:{
            Authorization:
                `Bearer ${jwt}`,
            token: "RECRUBATM"
        },
    }); 
    return response.data;
}

export let removeProjectData = async(id) => {
    let response = await axios.delete(`${API_URL}/api/project?id=${id}`,{
        headers:{
            Authorization:
                `Bearer ${jwt}`,
            token: "RECRUBATM"
        },
    });
    return response.data;
}

export let saveProjectData = async(request) => {
    let response = await axios.post(`${API_URL}/api/project`,request,{
        headers:{
            Authorization:
                `Bearer ${jwt}`,
            token: "RECRUBATM"
        },
    });
    return response.data;
}