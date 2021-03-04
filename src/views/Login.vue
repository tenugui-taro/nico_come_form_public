<template>
  <v-card outlined class="mt-8" height="360px">
    <v-container>
      <v-row justify="center">
        <v-card-title v-text="'Welcome to nico_come app !!'" />

        <v-col :cols="CARD_CONTENTS_COLS">
          <v-text-field label="Username" placeholder="nico_come taro" />
          <v-text-field label="Password" type="password" />
        </v-col>

        <v-col :cols="CARD_CONTENTS_COLS">
          <v-btn
            color="teal accent-4"
            class="ma-2"
            outlined
            rounded
            text
            v-text="'ログイン'"
            :disabled="processing"
          />
          <v-btn
            color="teal accent-4"
            class="ma-2"
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
import "firebase/auth";

const CARD_CONTENTS_COLS = 10;

export default defineComponent({
  setup(prop, context) {
    /* firebase サインイン処理 */
    const processing = ref(false);
    const signIn = () => {
      // ダブルクリック防止
      if (processing.value) return;
      processing.value = true;

      firebase
        .auth()
        .signInAnonymously()
        .then(() => {
          // 成功
          context.root.$router.push(`/home`);
        })
        .catch(error => {
          // 失敗
          const errorCode = error.code;
          console.error("errorCode: ", errorCode);
          const errorMessage = error.message;
          console.error("errorMessage: ", errorMessage);
          processing.value = false;
        });
    };

    return {
      CARD_CONTENTS_COLS,
      processing,
      signIn
    };
  }
});
</script>
