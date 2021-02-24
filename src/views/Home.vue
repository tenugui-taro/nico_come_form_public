<template>
  <div>
    <CommentForm @sendComment="sendComment" />
    <CommentTable v-if="value == 0" :comments="comments" />
    <CommentFlash v-if="value == 1" @sendFlashComment="sendComment" />
    <Palette v-if="value == 2" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import firebase from "@/configs/firebase";
import CommentForm from "@/components/CommentForm.vue";
import CommentTable from "@/components/CommentTable.vue";
import CommentFlash from "@/components/CommentFlash.vue";
import Palette from "@/components/Palette.vue";
import { value } from "@/store/value";
import { color } from "@/store/color";
import { rating } from "@/store/rating";

interface CommentProps {
  id: string;
  color: string;
  text: string;
}

export default defineComponent({
  name: "Home",
  components: {
    CommentForm,
    CommentTable,
    CommentFlash,
    Palette
  },
  setup() {
    const comments = ref<string[]>([]);

    firebase
      .database()
      .ref("comment")
      .on("child_added", function(snapshot, prevChildKey) {
        const newPost = snapshot.val();
        comments.value.unshift(newPost.text);
      });

    const sendComment = (comment: CommentProps) => {
      const timeNow = ref(Date.now());
      console.log("comment: ", comment);
      if (rating.value > 0) rating.value--;

      firebase
        .database()
        .ref("comment")
        .push({
          id: comment.id,
          color: color.value,
          text: comment.text,
          timestamp: timeNow.value
        });
    };

    return {
      sendComment,
      comments,
      value,
      color
    };
  }
});
</script>
