<script charset="utf-8" lang="ts">
    import { defineComponent,ref,onMounted } from 'vue';
    import taskservice from "@/services/ServiceTask";
    export default defineComponent({
        name:'Formtask',
        props:{
            proyect:Number
        },
        emits:['go_to_activity'],
        setup(props, {emit}) {
            let name = ref("");
            let data = ref();
            let idtask = ref("");
            let mje = ref("");
            let error = ref(false);
            let info = ref(false);
            let error_data = ref("");
            let idproyect = ref(props.proyect);
            function create_table(list:[]):Object{
                let out = [];
                list.forEach((element)=>{
                    out.push({'Tarea':element['nameTask'],'idtask':element['idtask'] + "#" + element['nameTask']});
                })
                return out;
            }
            async function store(){
                let task = new taskservice();
                let task_object:Object = await task.create(name.value, idproyect.value);     
                error.value = !task_object['error'];
                info.value = task_object['info'];
                error_data.value = task_object['error_data'];
                data.value = create_table(task_object['data']);
                if (info.value){
                    clear_form();
                }
            }
            async function list_task(){
                let task = new taskservice();
                let value = await task.list(idproyect.value);
                data.value = create_table(value['data']);
            }
            async function remove(data_value:string){
                let values:Object = data_value.split("#")
                let task = new taskservice();
                let response = await task.delete(values[0],idproyect.value);
                error.value = !response['error'];
                info.value = response['info'];
                error_data.value = response['error_data'];
                data.value = create_table(response['data']);
            }
            onMounted(list_task);
            async function modify(){
                let task = new taskservice();
                let response = await task.modify(name.value, idproyect.value, idtask.value);
                error.value = !response['error'];
                error_data.value = response['error_data'];
                info.value = response['info'];
                data.value = create_table(response['data']);
                clear_form();
            }
            function edit(data:string){
                let value:Object = data.split("#");
                name.value = value[1];
                idtask.value = value[0];
            }
            function activity (data:string){
                emit('go_to_activity',data);
            }
            function clear_form(){
                name.value = "";
                idtask.value = "";
            }
            return {store,remove,modify,clear_form,edit,name,data,idproyect,idtask,error,error_data,info,activity};
        }
    });
</script>
<template>
<div></div>
    <v-form class="mx-auto">
            <h2 class="mx-4">Registrar las tareas</h2>
            <v-container>
                <v-text-field
                    v-model="name"
                    laber="Name"
                    variant="outlined"
                    placeholder ="Indique tarea"
                    hide-details
                    required
                    class="mb-3"
                    type="text"
                    >
                </v-text-field>
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
                            @click="store"
                            v-if="idtask === ''"
                            >Registrar</v-btn>
                        <v-btn
                            class="mt-5"
                            color="warning"
                            @click="modify"
                            v-if="idtask != ''"
                            >Modificar</v-btn>
                         <v-btn
                            class="mt-5 ml-5 btn btn-danger"
                            color="red"
                            @click="clear_form"
                            >Cancelar</v-btn>
                <v-data-table 
                    :items="data" 
                    item-value="Name"
                >

                    <template v-slot:item.idtask = "{ value }">
                        <v-icon class="me-2" @click="remove(value)">mdi-delete</v-icon>
                        <v-icon class="me-2" @click="edit(value)">mdi-pencil</v-icon>
                        <v-icon class="me-2" @click="activity(value)">mdi-alarm-check</v-icon>
                    </template>

                </v-data-table>
            </v-container>
        </v-form>

</template>
