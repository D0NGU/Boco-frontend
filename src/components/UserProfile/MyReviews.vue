<template>
  <h1>Anmeldelser om meg</h1>
  <v-container id="mobile">
    <div v-for="review in reviews">
      <ReviewCard
          :rating="review.rating"
          :comment="review.comment"
          :authorId="review.author"
      />
    </div>
  </v-container>

  <v-container id="wideScreen">
    <v-row>
      <v-col v-for="(review, index) in reviews" :key="index">
          <ReviewCard
              :rating="review.rating"
              :comment="review.comment"
              :authorId="review.author"
          />
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import ReviewCard from "@/components/UserProfile/ReviewCard";
import ReviewService from "@/service/ReviewService";

export default {
  name: "MyReviews",
  components: {ReviewCard},
  data() {
    return {
      reviews: [],
    }
  },
  props: {
    userId: Number,
  },
  async beforeMount(){
    const reviews = (await ReviewService.getMyReviews(this.userId)).data;
    reviews.forEach(review => {
      this.reviews.push({rating: review.stars, comment: review.text, author: review.author})
    })
  }
}
</script>

<style scoped>
h1 {
  margin-top: 20px;
  margin-bottom: 20px;
}

#mobile {
  display:none;
}
@media only screen and (max-width: 600px) {
  #wideScreen {
    display: none;
  }
  #mobile {
    display: block;
  }
}
</style>
