<template>
  <div class="reviewForm">
  <h1 class="reviewHeadline">Legg igjen din anmeldelse her</h1>
    <v-divider />
  <h2 class="reviewHeadline">{{ itemName }}</h2>

    <p v-if="!owner">Hvor fornøyd var du med eieren?</p>
    <p v-if="owner">Hvor fornøyd var du med leietakeren?</p>
  <v-rating
      v-model="review"
  ></v-rating>
  <v-textarea
      rows="7"
      no-resize
      v-model="comment"
      label="Kommentar"
      hide-details="auto"
  >
  </v-textarea>
  <v-btn
    id="sendReview"
    @click="sendReview"
  >
    Send
  </v-btn>
  </div>

  <v-dialog id="popOut" v-model="dialog">
    <v-card>
      <v-card-title class="text-h5"> Anmeldelse sendt! </v-card-title>
      <v-card-actions>
        <v-btn
            color="red"
            text
            @click=close()
        >
          Lukk
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script>
import ReviewService from "@/service/ReviewService";

export default {
  name: "Review",
  props: {
    itemName: String,
    owner: Boolean,
    ownerId: Number,
  },
  data() {
    return {
      review: '',
      comment: '',
      dialog: false,
    }
  },
  methods: {
    async sendReview() {
      await ReviewService.create(this.comment, this.review, this.owner, this.$store.state.myUserId, this.ownerId);
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.$emit("close");
    }
  },
}
</script>

<style scoped>
.reviewHeadline{
  text-align: center;
  margin: 0.5em;
}
#sendReview{
  background-color: var(--bocoBlue);
  color: white;
  font-weight: bold;
  margin: 10px;
  align-self: center;
}
.reviewForm {
  display: flex;
  flex-direction: column;
  width: 350px;
  margin: 0 auto;
}

</style>
