import  {defineStore} from "pinia";
import axios from "@/axios";

export const useTareaStore = defineStore("tarea", {
    state: () => ({
        tarea: [], //para los datos de la tabla tarea
        encargadotarea: [], //para los datos de la tabla encargado
        infoEncargadosTareasAmostrar: [], //Para los datos que se van amostrar
        memberEncargado:[], //para almacenar los posibles miembros encargados 
        infViewTarea:{},
        infViewEncargado:{},
        showModalTarea: false,
        ShowResumenModalTarea: false,
        onUpdateModal:false,
        showErrorAlert:false,
        showSuccessAlert: false,
        dataError: {},
        dataSuccesfull: {}
    }),
    
    actions: {
        getDataSuccesfull(){
            return this.dataSuccesfull;
        },
        getDataError(){
            return this.dataError;
        },
        setDataError(data){
            this.dataError = {...data};
        },
        setDataSuccesfull(data){
            this.dataSuccesfull = {...data}
        },
        setInfoViewTarea(data){
            this.infViewTarea = data;
        },
        ShowErrorAlertModal(){
            this.showSuccessAlert = true;
        },
        showSucessAlertModal(){
            this.showSuccessAlert = true;
        },
        hiddenSuccessAlertModal(){
            this.showSuccessAlert = false;
            this.dataSuccesfull = {};
        },
        getShowErrorAlert(){
            return this.showErrorAlert;
        },
        getShowSuccessAlert(){
            return this.showErrorAlert;
        },
        getShowSuccessAlert(){
            return this.showSuccessAlert;
        },
        getInfoViewTarea(){
            return this.infViewTarea;
        },
        getInfoViewEncargado(){
            return this.infViewEncargado;
        },


        // async showTarea(params = '') {
        //     try {
        //         // Solicitar tareas desde el endpoint correspondiente
        //         const responseTarea = await axios.requestAxios('tarea/all?' + params, 'GET');
        //         console.log("Respuesta de tareas:", responseTarea.data);
        
        //         if (!responseTarea || responseTarea.error) {
        //             console.error("Error al traer las tareas", responseTarea?.data || "Unknown error");
        //             return null;
        //         }
        
        //         // Asignar las tareas directamente
        //         this.tarea = responseTarea.data || [];
        //         console.log("Tareas:", this.tarea);
        
        //         // Solicitar encargados desde el endpoint correspondiente
        //         const responseEncargados = await axios.requestAxios('encargados_tarea/all', 'GET');
        //         console.log("Respuesta de encargados:", responseEncargados.data);
        
        //         if (!responseEncargados || responseEncargados.error) {
        //             console.error("Error al traer los encargados", responseEncargados?.data || "Unknown error");
        //             return null;
        //         }
        
        //         // Asignar encargados directamente
        //         this.infoEncargadosTareasAmostrar = responseEncargados.data || [];
        //         console.log("Encargados de tareas:", this.infoEncargadosTareasAmostrar);
        
                
        //     } catch (error) {
        //         console.error("Error al traer las tareas o encargados:", error);
        //         return null;
        //     }
        // }
        async showTarea(idSesion = '', params = '') {
            try {
                // Verificar el ID de sesión enviado
                console.log("ID de sesión enviado:", idSesion);
        
                // Construir la URL base
                let endpoint = '/tareas';
                
                // Agregar el ID de sesión al endpoint si está disponible
                if (idSesion) {
                    endpoint = `/tareas/sesion/${idSesion}?${params}`;
                }
        
                // Agregar los parámetros adicionales a la URL
                if (params) {
                    endpoint += `?${params}`;
                }
        
                // Realizar la solicitud al backend
                const response = await axios.requestAxios(endpoint, 'GET');
                console.log("Respuesta de tareas con relaciones:", response.data);
                
                // Verificar la respuesta y manejar errores
                if (!response || response.error) {
                    console.error("Error al traer las tareas con relaciones", response?.data || "Unknown error");
                    return null;
                }
        
                // Asignar los datos obtenidos al estado
                this.tarea = response.data || [];
                console.log("Tareas asignadas:", this.tarea);
                if (response.data.data && response.data.data.length > 0) {
                    const tarea = response.data.data[0]; // Obtener la primera tarea del arreglo
                    
                    // Acceder a propiedades específicas del objeto
                    console.log("Descripción de la tarea:", tarea.descripcion);
                    console.log("Email del miembro:", tarea.email_miembro);
                  
                    // Llamar al método con la tarea completa
                    // this.infViewTarea(tarea);
                  } else {
                    console.error("El arreglo de datos está vacío.");
                  }
                  
                // this.setInfoViewTarea(response.data.data.tarea)
            } catch (error) {
                console.error("Error al traer las tareas:", error);
                return null;
            }
        }
        

        
        
        ,
        
        async createTarea(tareaData, EncargadoData) {
            // Reformatear la fecha a formato Y-m-d
            const formattedDate = tareaData.dateEntrega.split('/').reverse().join('-');
            console.log("Datos recibidos en createTarea:", { tareaData, EncargadoData });
            try {
                // Crear la tarea
                const tareaResponse = await axios.requestAxios('/tarea/save', 'POST', {
                    DESCRIPCION: tareaData.descripcion,
                    FECHA_ENTREGA: formattedDate,
                    SESION_IDSESION: tareaData.sesionID,
                });
                
    
                console.log("tarea response",tareaResponse)
                if (tareaResponse.error) {
                    this.setDataError(tareaResponse.data);
                    this.ShowErrorAlertModal();
                    return null; // Indicar que hubo un error
                }
                
        
                const tareaID = tareaResponse.data?.ID || null;
                if (!tareaID) {
                    this.setDataError("No se pudo obtener el ID de la tarea creada.");
                    this.ShowErrorAlertModal();
                    return null;
                }
        
                // Crear el encargado
                const encargadoResponse = await axios.requestAxios('/encargados_tarea/save', 'POST', {
                    MIEMBROS_IDMIEMBROS: EncargadoData.memberID,
                    TAREAS_IDTAREAS: tareaID,
                    ESTADO: EncargadoData.state || 'sin comenzar',
                });

                console.log("Respuesta del encargado:", encargadoResponse);
        
                if (encargadoResponse.error) {
                    this.setDataError(encargadoResponse.data);
                    this.ShowErrorAlertModal();
                    return null;
                }
        
                // Retornar los datos creados
                return {
                    tarea: tareaResponse.data, // Datos de la tarea
                    encargado: encargadoResponse.data, // Datos del encargado
                };
                
            } catch (error) {
                console.error("Error al crear la tarea o el encargado:", error);
                this.setDataError("Ocurrió un error inesperado.");
                this.ShowErrorAlertModal();
                return null; // Indicar que hubo un error
            }
            
            
        },

        async updateTarea(tareaData, encargadoData) {
            const tareaID = tareaData.tarea_id;  // Asegúrate de que el ID esté aquí
            console.log("Cual es :", tareaData);
            console.log("Tarea ID", tareaID);
            console.log("Encargado:", encargadoData.memberID);
        
            const formattedDate = tareaData.dateEntrega.split('/').reverse().join('-'); // Reformatear la fecha
            
            // Aquí puedes hacer un console.log() para verificar los datos que estás enviando
            console.log("Datos para actualizar la tarea:", {
                DESCRIPCION: tareaData.descripcion,
                FECHA_ENTREGA: formattedDate,
                SESION_IDSESION: tareaData.sesionID,
            });
        
            try {
                // Actualizar la tarea
                const tareaResponse = await axios.requestAxios(`/tarea/update/${tareaID}`, 'PUT', {
                    DESCRIPCION: tareaData.descripcion,
                    FECHA_ENTREGA: formattedDate,
                    SESION_IDSESION: tareaData.sesionID,
                });
        
                if (tareaResponse.error) {
                    console.error("Error en la respuesta de la API:", tareaResponse.data);
                    // this.showErrorAlertModal();
                    this.setDataError(tareaResponse.data); // Mostrar la alerta de error
                    return null; // Indicar que hubo un error
                }
        
                // Actualizar el encargado
                console.log("Datos para actualizar el encargado:", {
                    MIEMBROS_IDMIEMBROS: encargadoData.memberID, // ID del nuevo miembro si es que está cambiando
                    TAREAS_IDTAREAS: tareaID,
                    ESTADO: encargadoData.state,
                });
                console.log("Nuevo ID de miembro:", encargadoData.memberID);  // Verificar el valor de newMemberID
                console.log("Encargado Data:", encargadoData);



        
                const encargadoResponse = await axios.requestAxios(`/encargados_tarea/update/${encargadoData.memberID}/${tareaID}`, 'PUT', {
                    MIEMBROS_IDMIEMBROS: encargadoData.memberID,
                    TAREAS_IDTAREAS: tareaID,
                    ESTADO: encargadoData.state,
                });
        
                if (encargadoResponse.error) {
                    console.error("Error en la respuesta de la API:", encargadoResponse.data);
                    // this.showErrorAlertModal();
                    this.setDataError(encargadoResponse.data); // Mostrar la alerta de error
                    return null; // Indicar que hubo un error
                }
        
                // Mostrar éxito
                this.showSuccessAlertModal();
                this.setDataSuccesfull({
                    tarea: tareaResponse.data,  // Datos de la tarea actualizada
                    encargado: encargadoResponse.data,  // Datos del encargado actualizado
                });
        
                return {
                    tarea: tareaResponse.data,  // Datos de la tarea actualizada
                    encargado: encargadoResponse.data,  // Datos del encargado actualizado
                };
            } catch (error) {
                console.error("Error al actualizar la tarea o el encargado:", error);
                this.setDataError("Ocurrió un error inesperado.");
                // this.ShowErrorAlertModal();
                return null; // Indicar que hubo un error
            }
        }
        
        
        ,
        async deleteTareaAndEncargado(tareaID, idSesion = '', params = '') {
            try {
                // Eliminar los encargados asociados a la tarea
                const encargadoResponse = await axios.requestAxios(`/encargados_tarea/deleteByTarea/${tareaID}`, 'DELETE');
                console.log("Respuesta al eliminar encargados:", encargadoResponse);
        
                if (encargadoResponse.error) {
                    this.setDataError(encargadoResponse.data);
                    // this.ShowErrorAlertModal();
                    return null; // Indicar que hubo un error
                }
        
                // Eliminar la tarea
                const tareaResponse = await axios.requestAxios(`/tarea/delete/${tareaID}`, 'DELETE');
                console.log("Respuesta al eliminar tarea:", tareaResponse);
        
                if (tareaResponse.error) {
                    this.setDataError(tareaResponse.data);
                    // this.ShowErrorAlertModal();
                    return null; // Indicar que hubo un error
                }
        
                // Mostrar mensaje de éxito
                this.setDataSuccesfull("Tarea y encargados eliminados correctamente.");
                this.showSuccessAlertModal();
        
                // Llamar a showTarea para obtener la lista actualizada con la paginación
                await this.showTarea(idSesion, params); // Pasar idSesion y params para mantener la paginación
        
                return {
                    encargado: encargadoResponse.data,
                    tarea: tareaResponse.data,
                };
            } catch (error) {
                console.error("Error al eliminar la tarea o los encargados:", error);
                this.setDataError("Ocurrió un error inesperado.");
                // this.ShowErrorAlertModal(); 
                return null; // Indicar que hubo un error
            }
        }
        
        ,
          
        // obtener los los miembros que hayan sidos invitados a una sesión y tengan el estado de asistido
                async getMembersSesion(idSesion,estado, params = ''){
                    const response = await axios.requestAxios(`/memberInvitedToSesionByStatus/${idSesion}/${estado}?${params}` , 'GET');
                    
        
                    if(!response.error){
                        this.memberEncargado = response.data
                    }

                    return response.data;
                },


                //Sirve para buscar el miembro por nombre o por correo según lo que se ingresé en searchinfo
                searchMember(searchInfo) {
                    
                    if(searchInfo !== undefined && searchInfo !== '') {
                        const userMember = this.memberEncargado.filter(usermiembro => {
                            return usermiembro.nombre.toLowerCase().includes(searchInfo.toLowerCase()) || usermiembro.email.includes(searchInfo)
                         })
                         return userMember
                    }
                },

                
                //Arreglo con los posibles miembros encargados
                // async getMaybeEncargado(idSesion) {
                //     try {
                //         // Llama a getMembersSesion para obtener miembros con estado "asistió"
                //         const MaybeMiembro = await this.getMembersSesion(idSesion, "Asistio");
                
                //         // Almacena los datos obtenidos en memberEncargado
                //         this.memberEncargado = [...MaybeMiembro];
                //     } catch (error) {
                //         console.error("Error al obtener los miembros encargados:", error);
                //     }
                // }
                

                //Actualización de estado de entrega de tarea

                async updateEstadoTarea(miembroId, tareaId, status) {

                    
                    console.log('Enviando actualización con', miembroId, tareaId, status); // Verifica los valores
                    const response = await axios.requestAxios(
                      `encargados_tarea/update/${miembroId}/${tareaId}`,
                      'PUT',
                      { estadoTarea: status }
                    );
                  
                    this.setDataSuccesfull(response.data);
                    this.showSucessAlertModal();
                  
                    if (response.error) {
                      this.setDataError(response.data);
                      this.ShowErrorAlertModal();
                    }
                  }
                  ,



        addNewTarea(tarea){
            this.tarea = [{...tarea},...this.tarea];
        },
        addNewEncargado(encargadotarea){
            this.encargadotarea = [{...encargadotarea},...this.encargadotarea];
        },
        removeEncargado(EncargadoDelete){
            const indexEncargadoDelete = this.encargadotarea.findIndex(encargadotarea => encargadotarea.id == EncargadoDelete.id)
            console.log(indexEncargadoDelete)
            this.encargadotarea.splice(indexEncargadoDelete,1)
        },
        setShowModalTarea(value){
            this.showModalTarea = value;
        },
        setShowResumenModalTarea(value){
            this.ShowResumenModalTarea = value;
        },
        setOnUpdateMode(value){
            this.onUpdateModal = value;
        },
        getShowModalTarea(){
            return this.showModalTarea;
        },
        getShowResumenModalTarea(){
            return this.ShowResumenModalTarea;
        },
        getOnUpdateMode(){
            return this.onUpdateModal;
        },
        showSuccessAlertModal() {
            // Lógica para mostrar el modal de éxito
            console.log("Modal de éxito mostrado");
        },

    }
})