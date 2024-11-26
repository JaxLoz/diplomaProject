import { defineStore } from 'pinia'
import axios from '@/axios.js'

export const useProposicionStore = defineStore('proposicion', {
  state: () => ({
    proposiciones: [],
    selectedProposicion: null,
    showModalProposiciones: false,
    showErrorAlert: false,
    showSuccessAlert: false,
    dataError: {},
    dataSuccesfull: {},
  }),
  actions: {
    getDataSuccesfull() {
      return this.dataSuccesfull
    },

    getDateError() {
      return this.dataError
    },

    setDataError(data) {
      this.dataError = { ...data }
    },

    setDataSuccesfull(data) {
      this.dataSuccesfull = { ...data }
    },

    showErrorAlertModal() {
      this.showErrorAlert = true
    },

    showSuccessAlertModal() {
      this.showSuccessAlert = true
    },

    hidenSusccessAlertModal() {
      this.showSuccessAlert = false
      this.dataSuccesfull = {}
    },

    hidenErrorAlertModal() {
      this.showErrorAlert = false
      this.dataError = {}
    },

    getShowErrorAlert() {
      return this.showErrorAlert
    },

    getShowSuccessAlert() {
      return this.showSuccessAlert
    },

    setShowModelProposicion(value) {
      this.showModalProposiciones = value
    },

    getShowModelProposicion() {
      return this.showModalProposiciones
    },
    async getProposicionById(id) {
      try {
        const response = await axios.requestAxios(`/proposicion/${id}`, 'GET')
        console.log('Response from axios.requestAxios:', response) // Log the entire response

        // Check if the response data exists and is in the correct format
        if (response.data) {
          this.selectedProposicion = response.data // Asigna los datos de la proposición
          console.log('Datos de la proposición:', this.selectedProposicion)
          return this.selectedProposicion // Devuelve los datos de la proposición
        } else {
          console.log('No se encontró la proposición con ID:', id)
          return null // Retorna null si no hay datos
        }
      } catch (error) {
        console.error('Error al obtener la proposición:', error)
        this.setDataError(error.message) // Manejo de error
        throw error
      }
    },
    async fetchProposicionesOfSesion(idSesion, params = '') {
      try {

        const response = await axios.requestAxios(`/proposicionOfSesion/${idSesion}?${params}`, 'GET') 
        if (response.data && response.data.data && response.data.data.length > 0) {
          const proposiciones = response.data
          return proposiciones 
        } else {
          console.log('No proposiciones found')
          return []
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        this.setDataError(error.message)
      }
    },

    async createProposicionInSesion(proposicionData, idSesion) {
      try {
        const response = await axios.requestAxios('/proposicion/save', 'POST', {
          DESCRIPCION: proposicionData.DESCRIPCION,
          DESICION: proposicionData.DESICION,
          MIEMBRO_IDMIEMBRO: proposicionData.MIEMBRO_IDMIEMBRO,
          SESION_IDSESION: idSesion // Ensure that the session ID is consistent across all propositions in the session
        })

        if (response.error) {
          this.setDataError(response.data)
          this.showErrorAlertModal()
        } else {
          this.setDataSuccesfull(response.data)
          this.showSuccessAlertModal()
        }

        return response
      } catch (error) {
        // Agregar un log de error sin cambiar el resto del código
        console.error('Error al enviar proposición:', error) // Log de error

        // El manejo de errores actual
        throw error
      }
    },

    async fetchProposiciones(params = '') {
      try {
        const response = await axios.requestAxios(`/proposicion/all?${params}`, 'GET')
        this.proposiciones = response.data.proposiciones || [] // Asegúrate de asignar un arreglo
      } catch (error) {
        console.error('Error fetching proposiciones:', error)
      }
    },

    // Método para actualizar la DECISION de una proposición
    async updateDecision(proposicionData) {
      const id = proposicionData.ID_PROPOSICIONES

      // Verifica qué datos estás enviando al backend
      console.log('Datos enviados al backend para actualizar la DECISION:', proposicionData)

      const response = await axios.requestAxios(
        `/proposicion/decision/${id}`,
        'PUT',
        proposicionData
      )

      if (response.error) {
        console.error('Error en la respuesta de la API:', response.data)
        this.showErrorAlertModal()
        this.setDataError(response.data) // Mostrar la alerta de error
      } else {
        this.showSuccessAlertModal()
        this.setDataSuccesfull(response.data)
      }

      return response
    },

async updateProposicion(proposicionData, idSesion) {
  const id = proposicionData.ID_PROPOSICIONES;

  if (!id) {
    console.error('ID de proposición no proporcionado. No se puede realizar la actualización.');
    return;
  }
  try {
    const response = await axios.requestAxios(
      `/proposicion/update/${id}`, // URL con el ID de la proposición
      'PUT',
      {
        ID_PROPOSICIONES: id, // Esencial para la actualización
        DESCRIPCION: proposicionData.DESCRIPCION,
        DESICION: proposicionData.DESICION,
        MIEMBRO_IDMIEMBRO: proposicionData.MIEMBRO_IDMIEMBRO,
        SESION_IDSESION: idSesion
      }
    );

    if (response.error) {
      console.error('Error en la respuesta de la API:', response.data); // Mostrar el error en la UI
    } else {
      console.log('Proposición actualizada exitosamente:', response.data);
  // Mostrar éxito en la UI
    }

    return response;
  } catch (error) {
    console.error('Error al realizar la solicitud de actualización:', error);

    throw error; // Re-lanza el error para manejo adicional
  }
},


    async deleteProposicion(idProposicion) {
      try {
        // Send a DELETE request to the backend to delete the proposition
        const response = await axios.requestAxios(`/proposicion/delete/${idProposicion}`, 'DELETE')
        console.log('Response from axios.requestAxios:', response) // Log the entire response

        // Check the response status to confirm successful deletion
        if (response.data && response.data.status === 200) {
          console.log('Proposición eliminada') // Successful deletion
          return true // Return true if deletion is successful
        } else {
          console.error('Error deleting proposicion:', response.data.message) // Log any error message from the backend
          return false // Return false if something went wrong
        }
      } catch (error) {
        console.error('Error deleting proposicion:', error) // Log the error if the request fails
        this.setDataError(error.message) // Handle the error (e.g., show a notification or alert)
        return false // Return false in case of an error
      }
    }, 



  }
})
