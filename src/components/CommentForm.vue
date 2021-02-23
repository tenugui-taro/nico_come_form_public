<template>
  <v-card outlined>
    <v-container>
      <v-text-field
        outlined
        v-model="comment"
        label="コメントを入力する"
        required
        :error="valid"
      />

      <v-card-actions>
        <v-btn
          color="teal accent-4"
          outlined
          rounded
          text
          @click="sendComment"
          v-text="`投稿`"
        />
      </v-card-actions>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import {
  defineComponent,
  onUpdated,
  reactive,
  toRefs
} from "@vue/composition-api";
import CommentModel from "@/model/CommentModel";

export default defineComponent({
  setup(props, { emit }) {
    const state = reactive({
      valid: false,
      comment: "",
      color: "white",
      timeNow: Date.now()
    });

    onUpdated(() => {
      if (state.comment != "") return (state.valid = false);
    });

    const sendComment = () => {
      if (state.comment == "") return (state.valid = true);
      const comment = new CommentModel(state.color, state.comment);
      emit("sendComment", comment);
      state.comment = "";
    };

    return {
      ...toRefs(state),
      sendComment
    };
  }
});
</script>
