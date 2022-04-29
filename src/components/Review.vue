<template>
  <div class="reviewForm">
  <h1 class="reviewHeadline">Legg igjen din anmeldelse her</h1>
    <v-divider />
  <h2 class="reviewHeadline">{{ itemName }}</h2>

    <p>Hvor fornøyd var du med produktet?</p>
  <v-rating
      v-model="review"
  ></v-rating>
  <v-text-field
      v-model="comment"
      label="Kommentar"
      hide-details="auto"
  >
  </v-text-field>
  <v-btn
    id="sendReview"
    @click="sendReview"
  >
    Send
  </v-btn>
  </div>
</template>

<script>
import ReviewService from "@/service/ReviewService";

export default {
  name: "Review",
  props: {
    itemName: String,
    owner: Boolean,
    productId: Number,
  },
  data() {
    return {
      review: '',
      comment: '',
    }
  },
  methods: {
    async sendReview() {
      await ReviewService.create(this.comment, this.review, this.owner, this.$store.state.myUserId, this.productId);
    }
  }
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
}

</style>