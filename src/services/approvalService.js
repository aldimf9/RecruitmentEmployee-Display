import axios from "axios"
import { API_URL, jwt } from "../utils/env_url"

export let getDataInterviewHr = async () => {
    let response = await axios.get(`${API_URL}/api/approval?action=INTERVIEW_HR`, {
        headers: {
            Authorization:
                `Bearer ${jwt}`,
            token: "RECRUBATM"
        },
    });
    return response.data;
}

export let getDataInterviewUser = async () => {
    let response = await axios.get(`${API_URL}/api/approval`, {
        params: { action: "INTERVIEW_USER" },
        headers: {
            Authorization:
                `Bearer ${jwt}`,
            token: "RECRUBATM"
        },
    });
    return response.data;
}

export let getDataOffering = async () => {
    let response = await axios.get(`${API_URL}/api/approval?action=Offering`, {
        headers: {
            Authorization:
                `Bearer ${jwt}`,
        },
    });
    return response.data;
}

export let doApproval = async (id, approvalData) => {
    try {
        let response = await axios.post(`${API_URL}/api/approval?id=${id}`, approvalData, {
            headers: {
                Authorization:
                    `Bearer ${jwt}`,
                token: "RECRUBATM"
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }

}

