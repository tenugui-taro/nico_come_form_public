<template>
  <v-card outlined>
    <v-container>
      <v-row>
        <v-col>
          <div class="text-center">
            <v-rating
              color="red"
              background-color="grey"
              empty-icon="mdi-heart-outline"
              full-icon="mdi-heart"
              length="5"
              readonly
              :value="rating"
            />
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            outlined
            v-model="comment"
            label="コメントを入力する"
            required
            :error="valid"
          />
        </v-col>
      </v-row>
      <div class="text-center">
        <v-btn
          color="teal accent-4"
          outlined
          rounded
          text
          :disabled="rating == 0"
          @click="sendComment"
          v-text="`投稿`"
        />
      </div>
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
import { rating } from "@/store/rating";

export default defineComponent({
  setup(props, { emit }) {
    const state = reactive({
      valid: false,
      comment: "",
      color: "black",
      timeNow: Date.now()
    });

    onUpdated(() => {
      if (state.comment != "") return (state.valid = false);
    });

    const addRating = () => {
      rating.value++;
    };

    const sendComment = () => {
      if (state.comment == "") return (state.valid = true);
      const comment = new CommentModel(state.color, state.comment);
      emit("sendComment", comment);
      state.comment = "";
      setTimeout(addRating, 10000);
    };

    return {
      ...toRefs(state),
      sendComment,
      rating
    };
  }
});
</script>
