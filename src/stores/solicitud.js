import { defineStore } from "pinia";
import axios from "@/axios";
import { ref } from "vue";

const useSolicitudStore = defineStore('solicitud', () => {
    
    const solicitudes = ref([]);

    const fetchSolicitudes = async (params = '') => {
        const response = await axios.axiosInstance.get(`solicitudes?${params}`);
        solicitudes.value = response.data;
        return response;
    }

    const fetchSolicitud = async (id) => {
        const response = await axios.axiosInstance.get(`solicitudes/${id}`);
        return response;
    }

    const createSolicitud = async (payload) => {
        const response = await axios.axiosInstance.post('solicitudes', payload);
        return response;
    }

    const updateSolicitud = async (payload, id) => {
        const response = await axios.axiosInstance.put(`solicitudes/${id}`, payload);
        //solicitudes.value.push(response.data.data);
        return response;
    }

    const deleteSolicitud = async (id) => {
        const response = await axios.axiosInstance.delete(`solicitudes/${id}`);
        solicitudes.value.data = solicitudes.value.data.filter((s) => s.id !== id);
        return response;
    }

    return {
        solicitudes,
        fetchSolicitud,
        fetchSolicitudes,
        createSolicitud,
        updateSolicitud,
        deleteSolicitud
    }

});

export default useSolicitudStore;