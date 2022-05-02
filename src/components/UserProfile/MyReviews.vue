<template>
  <div v-for="review in reviews">
    <ReviewCard
        :rating="review.rating"
        :comment="review.comment"
        :authorId="review.author"

    />
  </div>

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
  async beforeMount(){
    const reviews = (await ReviewService.getMyReviews(this.$store.state.myUserId)).data;
    reviews.forEach(review => {
      this.reviews.push({rating: review.stars, comment: review.text, author: review.author})
    })
  }
}
</script>

<style scoped>

</style>