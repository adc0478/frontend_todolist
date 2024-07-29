<script lang="ts" charset="utf-8">
    import { defineComponent,ref } from 'vue';
    export default defineComponent({
        name:"dialog",
        props:{
            info:Array
        },
        setup(props){
            return {props};
        }

    })
</script>

<template>
<v-dialog max-width="600">
  <template v-slot:activator="{ props: activatorProps }">
    <v-btn
      v-bind="activatorProps"
      color="surface-variant"
      text="Lista usuarios"
      variant="flat"
      class="ml-5 mt-5"
    ></v-btn>
  </template>

  <template v-slot:default="{ isActive }">
    <v-card title="Lista de usuarios activos para este proyecto">
      <v-card-text>
          <ul>
              <li v-for="item in props.info"> {{item.name}}</li>
          </ul>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          text="Close Dialog"
          @click="isActive.value = false"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </template>
</v-dialog>
</template>
