<!-- fremstiller en forespørsel om leie -->

<template>
  <h1>Forespørsler om utleie</h1>
  <div v-for="(rental, i) in rentalList" :key="i">
    <RentalRequest
        :id="rental.rentalId"
        :renter="rental.userId"
        :date="rental.dateFrom + ' - ' + rental.dateTo"
        @update="sendEvent()"
        :product-id="rental.productId"
    />
  </div>
  <p v-if="!rentalList">Du har ingen forespørsler om utleie.</p>
</template>

<script>
import RentalRequest from "@/components/Listing/Rental/RentalRequest";
import RentalService from "@/service/RentalService";
import UserAccountService from "@/service/UserAccountService";

export default {
  name: "RentalRequestView",
  components: {RentalRequest},
  props: {
    productId: [Number, String],
    rentalList: Array
  },
  methods: {
    sendEvent() {
      this.$emit("update");
    },
  }
}
</script>

<style scoped>
h1 {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
