import axios from "axios"
import { API_URL, jwt } from "../utils/env_url"

export let getOrganizationTypeData = async() => {
    let response = await axios.get(`${API_URL}/api/organization-type`,{
        headers:{
            Authorization:
                `Bearer ${jwt}`,
            token: "RECRUBATM"
        },
    });
    return response.data;
}