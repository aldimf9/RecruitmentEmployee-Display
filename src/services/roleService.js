import axios from "axios"
import { API_URL, jwt } from "../utils/env_url"

export let getAllRole = async () => {
    let response = await axios.get(`${API_URL}/api/role`, {
        headers: {
            Authorization:
                `Bearer ${jwt}`,
            token: "RECRUBATM"
        },
    });
    return response.data
}

export let getRoleById = async (id) => {
    let response = await axios.get(`${API_URL}/api/role/detail/`, {
        params: { id },
        headers: {
            Authorization:
                `Bearer ${jwt}`,
            token: "RECRUBATM"
        },
    });
    return response.data
}