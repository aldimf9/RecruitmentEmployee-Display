import axios from "axios"
import { API_URL, jwt } from "../utils/env_url"

export let getInterviewerScheduleData = async(id) => {
    const response = await axios.get(`${API_URL}/api/interview/interviewer-schedule?id=${id}`,{
        headers:{
            Authorization:
                `Bearer ${jwt}`,
            token : "RECRUBATM"
        },
    });
    return response.data;
}

export let InsertInterviewScheduleData = async(request) => {
    const response = await axios.post(`${API_URL}/api/interview`,request,{
        headers:{
            Authorization:
                `Bearer ${jwt}`,
            token : "RECRUBATM"
        },
    });
    return response.data;
}