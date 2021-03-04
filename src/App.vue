<template>
  <v-app>
    <v-app-bar app :color="themeColorEnum[selectedContent]" dark dense>
      <v-spacer />
      <v-toolbar-title v-text="'nico_come'" />
      <v-spacer />

      <template v-if="signIn" v-slot:extension>
        <v-spacer />
        <v-btn icon class="mx-4" @click="selectedContent = 0">
          <v-icon>mdi-history</v-icon>
        </v-btn>
        <v-btn icon class="mx-4" @click="selectedContent = 1">
          <v-icon>mdi-comment-flash</v-icon>
        </v-btn>
        <v-btn icon class="mx-4" @click="selectedContent = 2">
          <v-icon>mdi-palette</v-icon>
        </v-btn>
        <v-btn icon class="mx-4" @click="signOut()">
          <v-icon>mdi-logout-variant</v-icon>
        </v-btn>
        <v-spacer />
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
import { defineComponent } from "@vue/composition-api";
import firebase from "@/configs/firebase";
import "firebase/auth";
import Home from "@/views/Home.vue";
import { themeColorEnum } from "@/enum/themeColorEnum";
import { signIn } from "@/store/signIn";
import { selectedContent } from "@/store/selectedContent";

export default defineComponent({
  components: {
    Home
  },
  setup() {
    /* firebase サインアウト処理 */
    const signOut = () => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          // 成功
          signIn.value = false;
          selectedContent.value = 0;
        })
        .catch(error => {
          // 失敗
          const errorCode = error.code;
          console.error("errorCode: ", errorCode);
          const errorMessage = error.message;
          console.error("errorMessage: ", errorMessage);
        });
    };

    return {
      themeColorEnum,
      signIn,
      selectedContent,
      signOut
    };
  }
});
</script>
