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
        getShowSuccessAlert(){
            return this.showSuccessAlert;
        },
        getInfoViewTarea(){
            return this.infViewTarea;
        },
        async createTarea(tareaData,EncargadoData){
            const tarearesponse = await axios.requestAxios('/tarea/save','POST',
                {
                    DESCRIPCION: tareaData.description,
                    FECHA_ENTREGA: tareaData.date,
                    SESION_IDSESION: tareaData.sesionID
                }
            );
            if(tarearesponse.error){
                this.setDataError(tarearesponse.data);
                this.ShowErrorAlertModal();

                return
            }
        },
        // obtener los los miembros que hayan sidos invitados a una sesión
                async getMembersSesion(idSesion, params = ''){
                    const response = await axios.requestAxios(`EncargadoListaTarea/${idSesion}?${params}` , 'GET');
        
                    if(!response.error){
                        this.memberEncargado = response.data.data
                    }
                },


                //Sirve para buscar el miembro por nombre o por correo según lo que se ingresé en searchinfo
                searchMember(searchInfo) {
                    if(searchInfo !== undefined && searchInfo !== '') {
                        const userMember = this.encargadotarea.filter(user => {
                            return user.NOMBRE.toLowerCase().includes(searchInfo.toLowerCase()) || user.email.includes(searchInfo)
                         })
                         return userMember
                    }
                },

                //Busca los miembros en la base de datos

                async getMiembrosParaTareas(){
                    const miembrosTareasResponse = await axios.requestAxios('miembro/allInf', 'GET')
                    console.log(miembrosTareasResponse.data)

                    return miembrosTareasResponse.data
                },


                //Arreglo con los posibles miembros encargados
                async getMaybeEncargado(){
                    const MaybeMiembro = await this.getMiembrosParaTareas();

                    this.memberEncargado = [...MaybeMiembro];
                },

                //Actualización de estado de entrega de tarea

                async updateEstadoTarea(idSesion,idMiembro,idTarea,status){
                    const response = await axios.requestAxios( //falta el endpoint y demás parametros
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