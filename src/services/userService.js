import axios from "axios"
import { API_URL, jwt } from "../utils/env_url"

export let getAccountById = async (id) => {
    let response = await axios.get(`${API_URL}/api/user/`, {
        params: { id },
        headers: {
            Authorization: `Bearer ${jwt}`,
            token: "RECRUBATM"
        },
    });
    return response.data
}

export let getAllUser = async () => {
    let response = await axios.get(`${API_URL}/api/user/all`, {
        headers: {
            Authorization: `Bearer ${jwt}`,
            token: "RECRUBATM"
        },
    });
    return response.data
}

export let SaveUser = async (request) => {
    let response = await axios.post(`${API_URL}/api/user`, request, {
        headers: {
            Authorization: `Bearer ${jwt}`,
            token: "RECRUBATM"
        },
    });
    return response.data
}
