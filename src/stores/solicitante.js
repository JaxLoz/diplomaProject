import { defineStore } from "pinia";
import axios from "@/axios";
import { ref } from "vue";

const useSolicitanteStore = defineStore('solicitante', () => {
    
    const solicitantes = ref([]);

    const fetchSolicitantes = async (params = '') => {
        const response = await axios.axiosInstance.get(`solicitantes?${params}`);
        solicitantes.value = response.data.data;
        return response;
    }

    const createSolicitante = async (payload) => {
        const response = await axios.axiosInstance.post('solicitantes', payload);
        solicitantes.value.push(response.data.data);
        return response;
    }

    const updateSolicitante = async (payload, id) => {
        const response = await axios.axiosInstance.put(`solicitantes/${id}`, payload);
        //solicitantes.value.push(response.data.data);
        return response;
    }

    const  deleteSolicitante = async (id) => {
        const response = await axios.axiosInstance.delete(`solicitantes/${id}`);
        solicitantes.value = solicitantes.value.filter((s) => s.id !== id);
        return response;
    }

    return {
        solicitantes,
        fetchSolicitantes,
        createSolicitante,
        updateSolicitante,
        deleteSolicitante
    }
});

export default useSolicitanteStore;