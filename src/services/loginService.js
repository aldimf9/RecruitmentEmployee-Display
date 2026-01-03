import axios from "axios"
import { API_URL } from "../utils/env_url"

export let signIn = async (signinData) => {
    try {
        let response = await axios.post(`${API_URL}/api/auth/signin`, signinData);
        return response.data
    } catch (error) {
        return error
    }
}