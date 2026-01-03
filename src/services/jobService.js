import axios from "axios"
import { API_URL, jwt } from "../utils/env_url"

export let getJobDataById = async (id) => {
    let response = await axios.get(`${API_URL}/api/job-vacancy/detail?id=${id}`, {
        headers: {
            Authorization: `Bearer ${jwt}`,
            token: "RECRUBATM"
        },
    });
    return response.data;
}

export let getAllJobData = async () => {
    let response = await axios.get(`${API_URL}/api/job-vacancy/job`, {
        headers: {
            Authorization:
                `Bearer ${jwt}`,
            token: "RECRUBATM"
        },
    });
    return response.data
}

export let getAllJobForUserById = async (id) => {
    let response = await axios.get(`${API_URL}/api/job-vacancy/job-detail?id=${id}`, {
        headers: {
            Authorization:
                `Bearer ${jwt}`,
            token: "RECRUBATM"
        },
    });
    return response.data
}

export let saveRequestData = async (request) => {
    console.log(request);    
    let response = await axios.post(`${API_URL}/api/job-vacancy`, request, {
        headers: {
            Authorization:
                `Bearer ${jwt}`,
            token: "RECRUBATM"
        },
    });
    return response.data
}