<script setup lang="ts">
    import login from './components/Formlogin.vue';
    import register from './components/Formregistro.vue';
    import proyect from './components/Formproyect.vue';
    import task from './components/Formtask.vue';
    import activity from './components/Formactivity.vue';
    import userproyect from './components/Formuseredit.vue';
    import userService from '@/services/ServiceUser';
    import { ref, onMounted } from 'vue';
    let state = ref('default');
    let idproyect = ref('');
    let proyectName = ref('');
    let idtask = ref('');
    let taskName = ref('');
    let btnclose = ref(false);
    let btnlogin = ref (false);
    let btnregister = ref(false);
    let btnproyect = ref(false);
    let btntask = ref(false);
    let btnactivity = ref(false);
    
    function responseLogin(){
        refresh_btn_user();
    }
    function refresh_btn_user(){
        if (JSON.parse(localStorage.getItem('todolist'))['token'] == ""){
            btnclose.value = false;
            btnlogin.value = true;
            btnregister.value = true;
            btnproyect.value = false;
            btnactivity.value = false;
            btntask.value = false;
            state.value = "";
        }else{
            btnclose.value = true;
            btnlogin.value = false;
            btnregister.value = false;
            btnproyect.value = true;
            set_form_default();
        }
    }
    onMounted(function(){
        refresh_btn_user();       
    })
    async function close_secion(){
                    //cerrar secion en el servidor
                   let user = new userService();
                   let data:Object = await user.close_sesion(); 
                    //quitar el token en localstorange
                        let obj = JSON.parse(localStorage.getItem('todolist'));
                        obj['token'] = "";
                        localStorage.setItem('todolist', JSON.stringify(obj));
                    //refrescar btn user
                        refresh_btn_user();
                        activate('default');
                        alert (data['error_data']);
    }
    function set_task(info:string){
        let data_proyect = info.split("#");
        idproyect.value = data_proyect[0];
        proyectName.value = data_proyect[1]; 
        idtask.value ="";
        taskName.value ="";
        state.value = "task";
        btntask.value = true;
        btnactivity.value = false;
    }
    function set_edit_user(info:string){
        let data_value = info.split("#");
        idproyect.value = data_value[0];
        idtask.value ="";
        taskName.value ="";
        proyectName.value = data_value[1];
        state.value ="permission";
    }
    function set_activity(data:string){
        let data_task = data.split("#"); 
        idtask.value = data_task[0];
        taskName.value = data_task[1]; 
        state.value ="activity";
        btnactivity.value = true;
    }
    function activate(Opt:string){
        idproyect.value ="";
        btntask.value = false;
        btnactivity.value = false;
        state.value = Opt;
       
    }
    function set_form_default(){
        state.value = "default"; 
    }
</script>

<template>
    <v-app>
        <v-main>

            <v-app-bar>
                <v-btn 
                    @click="activate('login')"    
                    value="recent"
                    v-if="btnlogin">
                    <v-icon>mdi-history</v-icon>
                    <span>Login</span>
                </v-btn>
                <v-btn 
                    @click="close_secion"    
                    value="recent"
                    v-if="btnclose">
                    <v-icon>mdi-history</v-icon>
                    <span>Cerrar secion</span>
                </v-btn>

                <v-btn 
                    @click="activate('register')"    
                    v-if="btnregister"
                    value="recent">
                    <v-icon>mdi-history</v-icon>
                    <span>Register user</span>
                </v-btn>
                <v-btn 
                    @click="activate('proyect')"    
                    v-if="btnproyect"
                    value="recent">
                    <span>|| Proyectos</span>
                </v-btn>
                <v-btn 
                    @click="set_task(idproyect + '#' + proyectName)"    
                    v-if="btntask"
                    value="recent">
                    <span>> Tareas</span>
                </v-btn>
                 <v-btn 
                    @click=""    
                    v-if="btnactivity"
                    value="recent">
                    <span>> Actividades</span>
                </v-btn>
            </v-app-bar>
             

            <div class="form_login">
           <v-card 
                v-bind:title="proyectName"
                text="..."
                v-if="idproyect !=''"
                class="mt-5 mb-5 bg-red">
               <template v-slot:title>

                   <v-icon class="me-2">mdi-apps</v-icon>
                   <strong>Nombre del proyecto: </strong>
                   <span class="text-black">{{proyectName}}</span>
               </template>

               <template v-slot:subtitle v-if="idtask !=''" >
                   <v-icon class="me-2">mdi-calendar-check</v-icon>
                   <strong >Tarea: </strong>
                   <span class="text-black">{{taskName}}</span>
               </template>
            </v-card>
                <login v-if="state==='login'" @Response_login="responseLogin"/>
                <register v-if="state === 'register'"/> 
                <proyect v-if="state === 'proyect'" @go_to_task="set_task" @go_to_useredit="set_edit_user"/> 
                <task v-if="state === 'task'" v-bind:proyect="idproyect" @go_to_activity="set_activity"/> 
                <activity v-if="state === 'activity'" v-bind:idproyect="idproyect" v-bind:idtask="idtask"/> 
                <userproyect v-if="state === 'permission'" v-bind:idproyect="idproyect"/>
            </div>
        </v-main>
    </v-app>
</template>

<style scope>
@media screen and (min-width: 750px){
    .form_login{
        width:50vw;
        margin:0 auto;
        margin-top: 50px;
    } 
}
</style>
