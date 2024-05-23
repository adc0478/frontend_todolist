<script lang="ts">
    import {defineComponent, ref} from 'vue';
    import userService from '@/services/ServiceUser';
    export default defineComponent ({
        name:'login',
        props:{},
        emits:['Response_login'],
        setup(props,{emit}){
            let email = ref("");
            let password =ref("");
            let error = ref(false);
            let error_data = ref("esto es un error");
            let info = ref (false);
            async function login (){
                info.value = false;
                error.value = false;
                let user = new userService();
                let data:Object = await user.login(email.value,password.value);
                error_data.value = data['error_data'];
                error.value = data['error'];
                info.value = data['info']; 
                if (info.value){
                    emit('Response_login');
                }
            }
        return {email,password,error,error_data,info,login};
        }
    })
</script>
<template>
        <v-form class="mx-auto">
            <h2 class="mx-4">Ingreso al sistema</h2>
            <v-container>
                <v-text-field
                    v-model="email"
                    laber="Email"
                    variant="outlined"
                    placeholder ="Email"
                    hide-details
                    required
                    class="mb-3"
                    type="email"
                    >
                </v-text-field>
                    <v-text-field
                        v-model="password"
                        laber="password"
                        variant="outlined"
                        placeholder ="password"
                        hide-details
                        required
                        class="mb-3"
                        type="password"
                        >
                    </v-text-field>
                        <v-alert
                            v-bind:text="error_data" 
                            type="error"
                            class="text-h5"
                            v-if="error">
                        </v-alert>
                        <v-alert
                            text="Login exitoso" 
                            type="success"
                            class="text-h5"
                            v-if="info"
                            ></v-alert>
                        <v-btn
                            class="mt-5"
                            color="success"
                            @click="login"
                            >Ingresar</v-btn>
            </v-container>
        </v-form>
</template>
<style>
 
</style>
