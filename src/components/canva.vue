<script lang="ts" charset="utf-8">
    import {defineComponent,ref} from 'vue';
    export default defineComponent({
        name:'canva',
        props:{idproyect:String},
        setup(props){
           let data = ref([]);
           function search_data(){
                
           } 
           return {data};
        }   
    });
</script>
<template>
    <v-container>
        <v-row>
            <v-col cols="4">
                <div v-for="item in data" v-if="item['start'] === ''">
                    <v-card>
                        <v-card-title>{{item['task_name']}}</v-card-title>
                        <v-card-text>{{item['activity_name']}}</v-card-text>
                    </v-card>
                </div>
            </v-col>
            <v-col cols="4">
                <div v-for="item2 in data" v-if="item2['start'] != '' && item2['finish'] === ''">
                    <v-card>
                        <v-card-title>{{item2['task_name']}}</v-card-title>
                        <v-card-text>{{item2['activity_name']}}</v-card-text>
                    </v-card>
                </div>
            </v-col>
            <v-col cols="4">
                <div v-for="item3 in data" v-if="item3['start'] != '' && item3['finish'] != ''">
                    <v-card>
                        <v-card-title>{{item3['task_name']}}</v-card-title>
                        <v-card-text>{{item3['activity_name']}}</v-card-text>
                    </v-card>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>
