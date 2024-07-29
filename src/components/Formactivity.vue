<script charset="utf-8" lang="ts">
    import { defineComponent,ref,onMounted } from 'vue';
    import Serviceactivity from '@/services/ServiceActivity'
    export default defineComponent({
        name:"Formactivity",
        props:{
            idproyect:Number,
            idtask:String
        },
        setup(props) {
            let detail = ref("");
            let start = ref("");
            let finish = ref("");
            let error = ref(false);
            let error_data = ref("");
            let info = ref(false);
            let data = ref();
            let idactivity = ref("");
            function create_table(data:[]):Object{
                let values = [];
                let init:string = ""
                let end:string = ""
                data.forEach((element)=>{
                    if (element['start'] != null) {
                       init = element['start']; 
                    }
                    if (element['finish'] != null){
                        end = element['finish'];
                    }
                    values.push({
                        'Activity':element['detailActivity'],
                        'Start':init,
                        'finish':end,
                        'action':element['idactivity'] + "#" + element['detailActivity'] + "#" + init + "#" + end
                    })    
                    init ="";
                    end ="";
                })  
                return values;

            }
            function set_form(value:Object){
                error.value = value['error'];
                error_data.value = value['error_data'];
                info.value = value['info'];
                if (info.value){
                    data.value = create_table(value['data']);
                }
            }
            async function remove(data:string){
                let activity = new Serviceactivity(); 
                let data_array = data.split("#");
                let value:Object = await activity.Sremove(data_array[0],props.idtask,props.idproyect);
                set_form(value);
            }
            async function create(){
                let activity = new Serviceactivity(); 
                let value:Object = await activity.Screate(detail.value,start.value,finish.value,props.idproyect,props.idtask);
               set_form(value);
               clear_form();
            }
            async function search(){
                let activity = new Serviceactivity();
                let value:[] = await activity.Sget_list(props.idtask);
                data.value = create_table(value['data']);
            }
            onMounted(search);
            function edit(data:string){
                let data_array = data.split("#");
                idactivity.value = data_array[0];
                detail.value = data_array[1];
                start.value = data_array[2];
                finish.value = data_array[3];
            }
            async function modify(){
                let activity = new Serviceactivity(); 
                let value:Object = await activity.Smodify(detail.value,start.value,finish.value,idactivity.value,props.idtask,props.idproyect);
               set_form(value);
               clear_form();
            }
            function clear_form(){
                detail.value = "";
                start.value = "";
                finish.value = "";
                idactivity.value ="";
            }
            return {props,detail,start,finish,idactivity,info,error,error_data,data,remove,create,modify,clear_form,edit};
        }
    })
    
</script>
<template>
 <div></div>
    <v-form class="mx-auto">
            <h2 class="mx-4">Cargar actividades</h2>
            <v-container>
                <v-textarea
                    v-model="detail"
                    laber="Dtalle"
                    variant="outlined"
                    placeholder ="Detalle de la actividad"
                    hide-details
                    required
                    class="mb-3"
                    type="text"
                    >
                </v-textarea>
                <div class="container">
                    <div class="row">
                        <div class="col-2">
                            <div class="container">
                                <label class="row">
                                    <div class="col-1">
                                        <strong>Desde</strong>
                                    </div>
                                    <input type="datetime-local"
                                        v-model="start"
                                    >
                                </label>
                            </div>
                           
                            <div class="container">
                                <label class="ml-3 row" for="">
                                   <div class="col-1">
                                    <strong class="mr-2">Hasta</strong>
                                   </div>
                                    <input type="datetime-local"
                                        v-model="finish"
                                    >
                               </label>
                            </div>

                        </div>
                                            
                    
                    </div>

                </div>
                                
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

                        <v-btn
                            class="mt-5"
                            color="success"
                            v-if="idactivity === ''"
                            @click="create"
                            >Registrar</v-btn>
                        <v-btn
                            class="mt-5"
                            color="warning"
                            v-if="idactivity != ''"
                            @click="modify"
                            >Modificar</v-btn>
                         <v-btn
                            class="mt-5 ml-5 btn btn-danger"
                            color="red"
                            @click="clear_form"
                            >Cancelar</v-btn>
                <v-data-table 
                    :items="data" 
                >
                    <template v-slot:item.action = "{ value }">
                        <v-icon class="me-2 text-red" @click="remove(value)">mdi-delete</v-icon>
                        <v-icon class="me-2" @click="edit(value)">mdi-pencil</v-icon>
                    </template>
                </v-data-table>
            </v-container>
        </v-form>

</template>
