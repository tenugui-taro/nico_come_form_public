<template>
  <CommentForm @sendComment="sendComment" />
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import firebase from "@/configs/firebase";
import CommentForm from "@/components/CommentForm.vue";

export default defineComponent({
  name: "Home",
  components: {
    CommentForm
  },
  setup() {
    const timeNow = ref(Date.now());
    const sendComment = comment => {
      console.log("comment: ", comment);
      firebase
        .database()
        .ref("comment")
        .push({
          id: comment.id,
          color: comment.color,
          text: comment.text,
          timestamp: timeNow.value
        });
    };

    return {
      sendComment
    };
  }
});
</script>
