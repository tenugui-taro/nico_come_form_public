<template>
  <v-app>
    <v-app-bar app color="primary" dark dense>
      <v-toolbar-title v-text="`nico_come`" />
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <v-row justify="center">
          <v-col md="6">
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import Home from "./views/Home.vue";

export default defineComponent({
  name: "App",
  components: {
    Home
  }
});
</script>
