<script charset="utf-8" lang="ts">
    import { defineComponent,ref,onMounted} from 'vue';
    import servicesUser from '@/services/ServiceUserproyect';

    export default defineComponent({
       name:'Formuseredit',
       props:{
        idproyect:String
       },
       emits:[''],
       setup(props){
        let id_user = ref('');
        let type = ref('');
        let error = ref(false);
        let error_data = ref('');
        let info = ref(false);
        let iduserproyect = ref('');
        let data = ref([]);
        function create_table(list:[]):object{
           let out = [];
           list.forEach((element)=>{
                out.push({'name':element['name'],'id_user':element['id'],'type_user':element['type_user'],'id_user_proyect':element['id_user_proyect']})
           })
           return out;
        } 
        async function list_all(){
            let services = new servicesUser();
            let values = await services.get_user(props.idproyect);
            data.value = create_table(values['data']);
            clear_form(); 
        }
        onMounted(list_all); 

        function selection(){
          let values = data.value;
          for (let i=0; i < values.length;i++){
            if (id_user.value === values[i]['id_user']){
                type.value = values[i]['type_user'];
                iduserproyect.value = values[i]['id_user_proyect'];
                return 
            }
          }  
         
        }
        async function store(){
           let model = new servicesUser();
           let response:object = await model.set_user_type(id_user.value,props.idproyect, type.value)
           set_form(response);
        }
        async function modify(){
           let model = new servicesUser();
           let response:object = await model.modify_user_type(iduserproyect.value, type.value,props.idproyect)
           set_form(response);

        }
        function clear_form(){
            type.value= "";
            id_user.value ="";
            iduserproyect.value ="";

        }
        function set_form(value:Object){
                error.value = value['error'];
                error_data.value = value['error_data'];
                info.value = value['info'];
                if (info.value){
                    data.value = create_table(value['data']);
                }
                if (info.value){
                    clear_form();
                }
            }
        return {id_user,type,error,error_data,info,iduserproyect,data,store,modify,clear_form,selection};
       }
    })
    
</script>
<template>
    <v-form class="mx-auto">
            <h2 class="mx-4">Editar permisos de usuario</h2>
            <v-container>
                
             <v-select
                v-model="id_user"
                :items="data"
                item-title="name"
                item-value="id_user"
                label="Select"
                single-line
                :item-props="selection"
              ></v-select>

                <v-text-field
                    v-model="type"
                    laber="Tipo permiso"
                    variant="outlined"
                    placeholder ="Permisos"
                    hide-details
                    required
                    class="mb-3"
                    type="text"
                    >
                </v-text-field>
               
                    <v-btn
                    class="mt-5"
                        color="success"
                        @click="store"
                        v-if="iduserproyect === null"
                        >Registrar</v-btn>
                    <v-btn
                        class="mt-5"
                        color="warning"
                        @click="modify"
                        v-if="iduserproyect != null && iduserproyect !=''"
                        >Modificar</v-btn>
                     <v-btn
                        class="mt-5 ml-5 btn btn-danger"
                        color="red"
                        @click="clear_form"
                        >Cancelar</v-btn>
                        <div class="mt-5">
                             <v-alert
                                v-bind:text="error_data" 
                                type="error"
                                class="text-h5"
                                v-if="error"
                            ></v-alert>
                            <v-alert
                                text="Registro exitoso" 
                                type="success"
                                class="text-h5"
                                v-if="info"
                            ></v-alert>


                        </div>
                </v-container>
        </v-form>


</template>
