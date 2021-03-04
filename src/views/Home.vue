<template>
  <div>
    <CommentForm @sendComment="sendComment" />
    <CommentTable v-if="selectedContent == 0" :comments="commentHistory" />
    <FlashComments
      v-if="selectedContent == 1"
      @sendFlashComment="sendComment"
    />
    <Palette v-if="selectedContent == 2" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import firebase from "@/configs/firebase";
import "firebase/database";
import CommentForm from "@/components/CommentForm.vue";
import CommentTable from "@/components/CommentTable.vue";
import FlashComments from "@/components/FlashComments.vue";
import Palette from "@/components/Palette.vue";
import { selectedContent } from "@/store/selectedContent";
import { commentLife } from "@/store/commentLife";
import CommentModel from "@/model/CommentModel";

export default defineComponent({
  components: {
    CommentForm,
    CommentTable,
    FlashComments,
    Palette
  },
  setup() {
    // ライフを１回復
    const increaseCommentLife = () => {
      commentLife.value++;
    };

    // コメント送信処理
    const sendComment = (commentText: string) => {
      if (commentLife.value < 0) return;
      commentLife.value--;

      const newComment = new CommentModel(commentText);

      /* firebase データ登録処理 */
      firebase
        .database()
        .ref("comment")
        .push({
          id: newComment.id,
          color: newComment.color,
          text: newComment.text,
          timestamp: newComment.timestamp
        });

      setTimeout(increaseCommentLife, 10000 /*ms*/);
    };

    // コメント履歴
    const commentHistory = ref<string[]>([]);

    /* firebase データ更新処理 */
    firebase
      .database()
      .ref("comment")
      .on("child_added", snapshot => {
        const newPost = snapshot.val();
        commentHistory.value.unshift(newPost.text);
      });

    return {
      sendComment,
      commentHistory,
      selectedContent
    };
  }
});
</script>
