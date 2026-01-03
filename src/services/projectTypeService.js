import axios from "axios"
import { API_URL, jwt } from "../utils/env_url"

export let getProjectTypeData = async() => {
    let response = await axios.get(`${API_URL}/api/project-type`,{
        headers:{
            Authorization:
                `Bearer ${jwt}`,
            token: "RECRUBATM"
        },
    });
    return response.data;
}