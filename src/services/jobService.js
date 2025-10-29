import axios from "axios"
import { API_URL } from "../utils/env_url"

export let getAllJobForUser = async () => {
    let response = await axios.get(`${API_URL}/api/job-vacancy`, {
        headers: {
            Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiU2FsZXMiLCJzdWIiOiJhcmlxIiwiaWF0IjoxNzYxNzA3NDU3LCJleHAiOjE3NjE5MjM0NTd9.sWeuCl7K-FxtkT0pwjC0I461Glm4Qxr3P3DsH1j5XA4",
            token: "RECRUBATM"
        },
    });
    return response.data 
}

export let getAllJobForUserById = async (id) => {
    let response = await axios.get(`${API_URL}/api/job-vacancy/job-detail?id=${id}`, {
        headers: {
            Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiU2FsZXMiLCJzdWIiOiJhcmlxIiwiaWF0IjoxNzYxNzA3NDU3LCJleHAiOjE3NjE5MjM0NTd9.sWeuCl7K-FxtkT0pwjC0I461Glm4Qxr3P3DsH1j5XA4",
            token: "RECRUBATM"
        },
    });
    return response.data 
}