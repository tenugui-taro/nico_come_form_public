<template>
  <v-card outlined>
    <v-container>
      <v-row>
        <v-col>
          <div class="text-center">
            <v-rating
              color="red"
              background-color="grey"
              full-icon="mdi-heart"
              empty-icon="mdi-heart-outline"
              :length="MAX_COMMENT_LIFE"
              :value="commentLife"
              readonly
            />
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            outlined
            v-model="commentText"
            label="コメントを入力する"
            required
          />
        </v-col>
      </v-row>
      <div class="text-center">
        <v-btn
          color="teal accent-4"
          outlined
          rounded
          text
          :disabled="commentText === '' || commentLife == 0"
          @click="sendComment"
          v-text="`投稿`"
        />
      </div>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import { commentLife } from "@/store/commentLife";

const MAX_COMMENT_LIFE = commentLife.value;

export default defineComponent({
  setup(props, { emit }) {
    // コメント内容初期化
    const commentText = ref("");

    // コメント内容を親コンポーネントに渡す
    const sendComment = () => {
      emit("sendComment", commentText.value);

      // 入力内容を削除
      commentText.value = "";
    };

    return {
      MAX_COMMENT_LIFE,
      commentLife,
      commentText,
      sendComment
    };
  }
});
</script>
