import axios from "axios";
import { API_URL, jwt } from "../utils/env_url";

export let getProfileDataById = async(id) => {
    let response = await axios.get(`${API_URL}/api/candidate-employee/detail?id=${id}`,{
        headers: {
            Authorization:
                `Bearer ${jwt}`,
            token : "RECRUBATM"
        },
    });
    return response.data;
}

export let getAllUserData = async(id) => {
    let response = await axios.get(`${API_URL}/api/candidate-employee`,{
        headers: {
            Authorization:
                `Bearer ${jwt}`,
            token : "RECRUBATM"
        },
    });
    return response.data;
}

export let getApplication = async(request) => {
    let response = await axios.post(`${API_URL}/api/candidate-employee/application`, request, {
        headers: {
            Authorization:
                `Bearer ${jwt}`,
            token: "RECRUBATM"
        },
    });
    return response.data;
}

export let getName = async(request) => {
    let response = await axios.post(`${API_URL}/api/candidate-employee/name`, request, {
        headers: {
            Authorization:
                `Bearer ${jwt}`,
            token: "RECRUBATM"
        },
    });
    return response.data;
}

export let getProfile = async(request) => {
    let response = await axios.post(`${API_URL}/api/candidate-employee/profile`, request, {
        headers: {
            Authorization:
                `Bearer ${jwt}`,
            token: "RECRUBATM"
        },
    });
    return response.data;
}

export let saveDataProfile = async (request) => {
    let response = await axios.post(`${API_URL}/api/candidate-employee`,request,{
        headers:{
            Authorization:
                `Bearer ${jwt}`,
            token: "RECRUBATM"
        },
    });
    return response.data;
}