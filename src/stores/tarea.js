import  {defineStore} from "pinia";
import axios from "@/axios";

export const useTareaStore = defineStore("tarea", {
    state: () => ({
        tarea: [], //para los datos de la tabla tarea
        encargadotarea: [], //para los datos de la tabla encargado
        memberEncargado:[], //para almacenar los miembros encargados y su estado de la tarea
        infViewTarea:{},
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
        setInfoViewSession(data){
            this.dataSuccesfull = {...data}
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
        
        getInfoViewTarea(){
            return this.infViewTarea;
        },
        async createTarea(tareaData, EncargadoData) {
            try {
                // Crear la tarea
                const tareaResponse = await axios.requestAxios('/tarea/save', 'POST', {
                    DESCRIPCION: tareaData.description,
                    FECHA_ENTREGA: tareaData.date,
                    SESION_IDSESION: tareaData.sesionID,
                });
        
                if (tareaResponse.error) {
                    this.setDataError(tareaResponse.data);
                    this.ShowErrorAlertModal();
                    return null; // Indicar que hubo un error
                }
        
                const tareaID = tareaResponse.data?.id || null;
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
        }
        ,
        // obtener los los miembros que hayan sidos invitados a una sesión y tengan el estado de asistido
                async getMembersSesion(idSesion,estado, params = ''){
                    const response = await axios.requestAxios(`/memberInvitedToSesionByStatus/${idSesion}/${estado}}?${params}` , 'GET');
                    
        
                    if(!response.error){
                        this.memberEncargado = response.data.data
                    }

                    return response.data;
                },


                //Sirve para buscar el miembro por nombre o por correo según lo que se ingresé en searchinfo
                searchMember(searchInfo) {
                    if(searchInfo !== undefined && searchInfo !== '') {
                        const userMember = this.memberEncargado.filter(user => {
                            return user.NOMBRE.toLowerCase().includes(searchInfo.toLowerCase()) || user.email.includes(searchInfo)
                         })
                         return userMember
                    }
                },

                
                //Arreglo con los posibles miembros encargados
                async getMaybeEncargado(idSesion) {
                    try {
                        // Llama a getMembersSesion para obtener miembros con estado "asistió"
                        const MaybeMiembro = await this.getMembersSesion(idSesion, "Asistió");
                
                        // Almacena los datos obtenidos en memberEncargado
                        this.memberEncargado = [...MaybeMiembro];
                    } catch (error) {
                        console.error("Error al obtener los miembros encargados:", error);
                    }
                }
                ,

                //Actualización de estado de entrega de tarea

                async updateEstadoTarea(miembroId,tareaId,status){
                    const response = await axios.requestAxios(`encargados_tarea/update/${miembroId}/${tareaId}`, 'PUT',
                        {estadoTarea:status});

                        this.setDataSuccesfull(response.data)
                        this.showSucessAlertModal()

                        if(response.error){
                            this.setDataError(response.data)
                            this.ShowErrorAlertModal()
                        }
                    
                },



        addNewTarea(tarea){
            this.tarea = [{...tarea},...this.tarea];
        },
        addNewEncargado(encargadotarea){
            this.encargadotarea = [{...encargadotarea},...this.encargadotarea];
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
        }

    }
})