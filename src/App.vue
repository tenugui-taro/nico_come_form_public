<template>
  <v-app>
    <v-app-bar app :color="color" dark dense>
      <v-spacer></v-spacer>
      <v-toolbar-title v-text="`nico_come`" />
      <v-spacer></v-spacer>
      <template v-if="signIn" v-slot:extension>
        <v-spacer></v-spacer>
        <v-btn icon class="mx-4" @click="value = 0">
          <v-icon>mdi-history</v-icon>
        </v-btn>
        <v-btn icon class="mx-4" @click="value = 1">
          <v-icon>mdi-comment-flash</v-icon>
        </v-btn>
        <v-btn icon class="mx-4" @click="logout()">
          <v-icon>mdi-logout-variant</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
      </template>
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
import { defineComponent, computed } from "@vue/composition-api";
import firebase from "@/configs/firebase";
import Home from "./views/Home.vue";
import { signIn } from "@/store/signIn";
import { value } from "@/store/value";

export default defineComponent({
  name: "App",
  components: {
    Home
  },
  setup() {
    const color = computed(() => {
      switch (value.value) {
        case 0:
          return "teal";
        case 1:
          return "blue-grey";
        case 2:
          return "brown";
        default:
          return "blue-grey";
      }
    });

    const logout = () => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          // Sign-out successful.
          signIn.value = false;
          value.value = 0;
        })
        .catch(error => {
          // An error happened.
        });
    };

    return {
      signIn,
      color,
      value,
      logout
    };
  }
});
</script>
