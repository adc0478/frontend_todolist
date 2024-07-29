<script lang="ts">
    import { defineComponent,ref, onMounted } from 'vue';
    import proyect from '@/services/ServiceFormproyecto';
    export default defineComponent({
        
        name:"proyect",
        props:{},
        emits:['go_to_task','go_to_useredit'],
        setup(props,{emit}){
            let proyect_name = ref("");
            let error = ref(false);
            let error_data = ref("");
            let data = ref ();
            let info = ref(false);
            function  create_table (data:[]):Object{
               let values =[];
               data.forEach((element)=>{
                values.push({'Name':element['nameProyect'],'type':element['type_user'],'delete':element['idproyect']+ '#' + element['nameProyect']})
               }); 
               return values;
            }
            async function list_all(){
                let component = new proyect();
                let component_data = await component.list_proyect();
                data.value = create_table(component_data['data']);
            }
            onMounted(list_all);
            function eliminar(key:string){
                alert(key);
            }
            async function register_proyect(){
                let componet = new proyect();
                let component_info:Object = await componet.create_proyect(proyect_name.value);
                
                error.value = component_info['error'];
                error_data.value = component_info['error_data'];
                info.value = component_info['info'];
                data.value = create_table(component_info['data']);
                if (component_info['info']) {
                    clear_form();
                }
            }
            function clear_form(){
                proyect_name.value = "";
            }
            
            async function delete_proyect(id:string){
               let componet = new proyect();
               let component_data = await componet.proyect_delete(id);
               error.value = component_data['error'];
               error_data.value = component_data['error_data'];
               info.value = component_data['info'];
               data.value = create_table(component_data['data']);
            }
            function go_task(info:string){
                emit('go_to_task',info);
            }
            function  go_edit_user(info:string){
               emit('go_to_useredit',info); 
            }
            return {register_proyect,delete_proyect,proyect_name,data,error,error_data,info,go_task,go_edit_user};
        }
    });

</script>

<template>
    <div></div>
    <v-form class="mx-auto">
            <h2 class="mx-4">Cargar proyecto</h2>
            <v-container>
                <v-text-field
                    v-model="proyect_name"
                    laber="Name"
                    variant="outlined"
                    placeholder ="Nombre del proyecto"
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
                            @click="register_proyect"
                            >Registrar
                        </v-btn>
                <v-data-table 
                    :items="data" 
                    item-value="Name"
                >

                    <template v-slot:item.delete  = "{ value }">
                        <v-icon class="me-2 text-red" @click="delete_proyect(value)">mdi-delete</v-icon>
                        <v-icon class="me-2 text-blue" @click="go_task(value)">mdi-pencil</v-icon>
                        <v-icon class="me-2 text-yellow" @click="go_edit_user(value)">mdi-account-edit</v-icon>
                    </template>

                </v-data-table>
            </v-container>
        </v-form>
</template>

