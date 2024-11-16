import { defineStore } from "pinia";
import axios from "@/axios";
import { ref } from "vue";

const useSolicitudStore = defineStore('solicitud', () => {
    
    const solicitudes = ref([]);

    const fetchSolicitudes = async () => {
        const response = await axios.axiosInstance.get('solicitudes');
        solicitudes.value = response.data.data;
        return response;
    }

    const createSolicitud = async (payload) => {
        const response = await axios.axiosInstance.post('solicitudes', payload);
        solicitudes.value.push(response.data.data);
        return response;
    }


    return {
        fetchSolicitudes,
        createSolicitud
    }

});

export default useSolicitudStore;