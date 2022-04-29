<template>
  <h1>Legg igjen din anmeldelse her</h1>
  <h2>{{ itemName }}</h2>
  <v-rating
      v-model="review"
  ></v-rating>
  <v-text-field
      label="Kommentar"
      hide-details="auto"
  >
  </v-text-field>
  <v-btn
    id="sendReview"
    @click="sendReview()"
  >
    Send
  </v-btn>
  <v-btn
      id="dismiss"
      @click="location.href='/home'"
  >
    Avbryt
  </v-btn>

</template>

<script>
export default {
  name: "Review",
  props: {
    itemName: String,
  },
  data() {
    return {
      review: '',
    }
  },
  methods: {
    sendReview() {

    }
  }
}
</script>

<style scoped>
#sendReview{
  background-color: var(--bocoBlue);
  color: white;
  font-weight: bold;
}
#dismiss{
  color: var(--bocoBlue);
  font-weight: bold;
}

</style>