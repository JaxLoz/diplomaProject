import { defineStore } from "pinia";
import axios from "@/axios";
import { ref } from "vue";

const useDescripcionStore = defineStore('descripcion', () => {
    
    const descripciones = ref([]);

    const fetchDescripciones = async (params = '') => {
        const response = await axios.axiosInstance.get(`descripciones?${params}`);
        descripciones.value = response.data.data;
        return response;
    }
    
    const createDescripcion = async (payload) => {
        const response = await axios.axiosInstance.post('descripciones', payload);
        descripciones.value.push(response.data.data); 
        return response;
    }

    const updateDescripcion = async (payload, id) => {
        const response = await axios.axiosInstance.put(`descripciones/${id}`, payload);
        //descripciones.value.push(response.data.data); 
        return response;
    }

    return {
        descripciones,
        fetchDescripciones,
        createDescripcion,
        updateDescripcion
    }
});

export default useDescripcionStore;