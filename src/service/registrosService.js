import axiosInstance from "@/axios";

async function getRegistros() {
    const response =  await axiosInstance.requestAxios('/r86y-229a.json', 'GET')
    return response.data
}



export default{
    getRegistros
}

