import Axios from "axios";

const axiosInstance = Axios.create({
    baseURL: 'https://www.datos.gov.co/resource',
    Headers: {
         "Content-Type": "application/json",
        "Accept": "application/json"
    }
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
            error: null
        }

    }catch(error){
        return {
            data: null,
            error: error
        }
    }
}

export default {axiosInstance, requestAxios}