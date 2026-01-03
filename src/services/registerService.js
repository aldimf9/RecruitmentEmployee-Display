import axios from "axios"
import { API_URL } from "../utils/env_url"

export let signUp = async(registerData) =>{
    let response = await axios.post(`${API_URL}/api/auth/signup`,registerData);
    return response.data;
};