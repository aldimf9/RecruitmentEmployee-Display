import axios from "axios"
import { API_URL,jwt } from "../utils/env_url"

export let getApply = async () => {
    let response = await axios.get(`${API_URL}/api/apply/data`, {
        headers: {
            Authorization:
                `Bearer ${jwt}`,
            token: "RECRUBATM"
        },
    });
    return response.data;
}

export let doApply = async (applyData) => {
    try {
        let response = await axios.post(`${API_URL}/api/apply`, applyData.apply, {
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