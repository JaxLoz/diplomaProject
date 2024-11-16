import { defineStore } from "pinia";
import axios from "@/axios";
import { ref } from "vue";

const useDescripcionStore = defineStore('descripcion', () => {
    
    const descripciones = ref([]);

    const fetchDescripciones = async () => {
        const response = await axios.axiosInstance.get('descripciones');
        descripciones.value = response.data.data;
        return response;
    }
    
    const createDescripcion = async (payload) => {
        const response = await axios.axiosInstance.post('descripciones', payload);
        descripciones.value.push(response.data.data); 
        return response;
    }

    return {
        descripciones,
        fetchDescripciones,
        createDescripcion
    }
});

export default useDescripcionStore;