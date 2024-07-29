<script lang="ts" charset="utf-8">
    import { defineComponent,ref,onMounted } from 'vue';
    export default defineComponent({
        name:"dialog",
        emits:['addItem'],
        props:{},
        setup(props,{emit}){
           let localData:object = JSON.parse(localStorage.getItem('todolist'));
           let data = ref([]); 
            onMounted(async function(){
                let opt = {
                    method:"get",
                    headers:{
                        'content-type':"application/json",
                        Authorization : 'Bearer ' +  localData['token']
                    }
                }
                let url = localData['route'] + 'list_role';
                let info = await fetch(url,opt);
                if (info.ok) {
                    let response = await info.json();
                    data.value = response['data'];
                }
            })
            function add_item(value:string){
               emit('addItem',value);
            }
            return {data,add_item};
        }

    })
</script>

<template>
<v-dialog max-width="600">
  <template v-slot:activator="{ props: activatorProps }">
    <v-icon
      v-bind="activatorProps"
      color="surface-variant"
      text="Lista de roles"
      variant="flat"
      class=""
    >mdi-help</v-icon>
  </template>

  <template v-slot:default="{ isActive }">
    <v-card title="Lista de roles">
      <v-card-text>
          <ul>
                <div v-for="item in data">
                    <v-row>
                        <v-col cols:11>
                            <li>{{item['permision']}}</li>
                        </v-col>
                        <v-col cols:1>
                            <v-icon @click="add_item(item['permision'])">mdi-help</v-icon>
                        </v-col>
                    </v-row>
                </div>
          </ul>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          text="Close Dialog"
          @click="isActive.value = false"
        ></v-btn>
      </v-card-actions></v-card>
  </template>
</v-dialog>
</template>
