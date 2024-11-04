import Axios from "axios";

const axiosInstance = Axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    Headers: {
         "Content-Type": "application/json",
        "Accept": "application/json"
    }
})

axiosInstance.interceptors.request.use(function (config) {
    
    const tokent = sessionStorage.getItem('tk');

    if(tokent){
        config.headers.Authorization = 'Bearer ' + JSON.parse(tokent);
    }

    return config;
})

const requestAxios = async (endpoint, methodValue, dataValue) => {
    try{
        const response = await axiosInstance({
            url: endpoint,
            method: methodValue,
            data: dataValue,
            //headers: headersValue == null || undefined ? {"Content-Type": "application/json", "Accept": "application/json"} : { 'Content-Type': 'application/x-www-form-urlencoded'}
        })

        return {
            data: response.data,
            status: response.status,
            error: false
        }

    }catch(error){
        if(error.response){
            return {
                data: error.response.data,
                status: error.response.status,
                headers: error.response.headers,
                error: true
            }
        }
        
    }
}

export default {axiosInstance, requestAxios}