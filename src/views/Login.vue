<template>
  <v-card outlined class="mt-8" height="360px">
    <v-container>
      <v-row justify="center">
        <v-card-title v-text="'Welcome to nico_come app !!'" />
        <v-col :cols="cols">
          <v-text-field label="Username" placeholder="nico_come taro" />
          <v-text-field label="Password" type="password" />
        </v-col>
        <v-col :cols="cols">
          <v-btn
            color="teal accent-4"
            outlined
            rounded
            text
            v-text="'ログイン'"
          />
        </v-col>

        <v-col :cols="cols">
          <v-btn
            color="teal accent-4"
            outlined
            rounded
            text
            @click="signIn()"
            :disabled="processing"
          >
            <v-icon left> mdi-account-off </v-icon>アカウントなしで使用
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import firebase from "@/configs/firebase";

export default defineComponent({
  name: "Login",
  setup(prop, context) {
    /* v-cols */
    const cols = ref(10);

    /* firebase signUp処理 */
    const processing = ref(false);
    const signIn = () => {
      console.log("processing: ", processing.value);
      if (processing.value) return;
      processing.value = true;
      firebase
        .auth()
        .signInAnonymously()
        .then(() => {
          console.log("Signed in");
          context.root.$router.push(`/home`);
        })
        .catch(error => {
          const errorCode = error.code;
          console.log("errorCode: ", errorCode);
          const errorMessage = error.message;
          console.log("errorMessage: ", errorMessage);
          processing.value = false;
        });
    };

    return {
      cols,
      processing,
      signIn
    };
  }
});
</script>
