<script lang="ts">
    import { defineComponent,ref } from 'vue';    
    import userService from "@/services/ServiceUser"; 
    export default defineComponent({
        name:"register",
        setup() {
            let name = ref();
            let email = ref();
            let password = ref();
            let error = ref(false);
            let error_data = ref('');
            let info = ref(false);
            function clear_data(){
                name.value = "";
                email.value = "";
                password.value = "";
                error.value = false;
            }
            async function register(){
                let user = new userService();
                let data:Object =   await user.register(email.value,name.value,password.value);
                error.value = !data['error'];
                error_data.value = data['error_data'];
                info.value = data['info'];
                if (data['info']){
                    clear_data();
                }
            }
            return {name,email,password,error,error_data,info,register};
        }
    })
</script>

<template>
    <v-form class="mx-auto">
            <h2 class="mx-4">Registrar usuario</h2>
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
                    v-model="name"
                    laber="name"
                    variant="outlined"
                    placeholder ="Name"
                    hide-details
                    required
                    class="mb-3"
                    type="text"
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
                            @click="register"
                            >Registrar</v-btn>
            </v-container>
        </v-form>

</template>

<style>

</style>
