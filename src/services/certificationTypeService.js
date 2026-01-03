import axios from "axios"
import { API_URL, jwt } from "../utils/env_url"

export let getCertificationTypeData = async () => {
    let response = await axios.get(`${API_URL}/api/certification-type`,{
        headers:{
            Authorization:
                `Bearer ${jwt}`,
            token: "RECRUBATM"
        },
    });
    return response.data;
}

export let getCertificationTypeDataById = async (id) => {
    let response = await axios.get(`${API_URL}/api/certification-type/detail?id=${id}`,{
        headers:{
            Authorization:
                `Bearer ${jwt}`,
            token: "RECRUBATM"
        },
    });
    return response.data;
}