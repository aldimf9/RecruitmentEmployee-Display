import axios from "axios"
import { API_URL } from "../utils/env_url"

export let getDataScreening = async () => {
    let response = await axios.get(`${API_URL}/api/approval?action=Screening CV`, {
        headers: {
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiU2FsZXMiLCJzdWIiOiJhcmlxIiwiaWF0IjoxNzYxNzA3NDU3LCJleHAiOjE3NjE5MjM0NTd9.sWeuCl7K-FxtkT0pwjC0I461Glm4Qxr3P3DsH1j5XA4",
            token: "RECRUBATM"
        },
    });
    return response.data;
}

export let getDataInterviewHr = async () => {
    let response = await axios.get(`${API_URL}/api/approval?action=Interview HR`, {
        headers: {
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiU2FsZXMiLCJzdWIiOiJhcmlxIiwiaWF0IjoxNzYxNzA3NDU3LCJleHAiOjE3NjE5MjM0NTd9.sWeuCl7K-FxtkT0pwjC0I461Glm4Qxr3P3DsH1j5XA4",
            token: "RECRUBATM"
        },
    });
    return response.data;
}

export let getDataInterviewUser = async () => {
    let response = await axios.get(`${API_URL}/api/approval?action=Interview User`, {
        headers: {
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiU2FsZXMiLCJzdWIiOiJhcmlxIiwiaWF0IjoxNzYxNzA3NDU3LCJleHAiOjE3NjE5MjM0NTd9.sWeuCl7K-FxtkT0pwjC0I461Glm4Qxr3P3DsH1j5XA4",
            token: "RECRUBATM"
        },
    });
    return response.data;
}

export let getDataOffering = async () => {
    let response = await axios.get(`${API_URL}/api/approval?action=Offering`, {
        headers: {
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiU2FsZXMiLCJzdWIiOiJhcmlxIiwiaWF0IjoxNzYxNzA3NDU3LCJleHAiOjE3NjE5MjM0NTd9.sWeuCl7K-FxtkT0pwjC0I461Glm4Qxr3P3DsH1j5XA4",
            token: "RECRUBATM"
        },
    });
    return response.data;
}

export let doApproved = async (id, approvedData) => {
    try {
        let response = await axios.post(`${API_URL}/api/approval?id=${id}`, approvedData, {
            headers: {
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiU2FsZXMiLCJzdWIiOiJhcmlxIiwiaWF0IjoxNzYxNzA3NDU3LCJleHAiOjE3NjE5MjM0NTd9.sWeuCl7K-FxtkT0pwjC0I461Glm4Qxr3P3DsH1j5XA4",
                token: "RECRUBATM"
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }

}

export let doRejected = async (id, rejectedData) => {
    try {
        let response = await axios.post(`${API_URL}/api/approval?id=${id}`, rejectedData, {
            headers: {
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiU2FsZXMiLCJzdWIiOiJhcmlxIiwiaWF0IjoxNzYxNzA3NDU3LCJleHAiOjE3NjE5MjM0NTd9.sWeuCl7K-FxtkT0pwjC0I461Glm4Qxr3P3DsH1j5XA4",
                token: "RECRUBATM"
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }

}

