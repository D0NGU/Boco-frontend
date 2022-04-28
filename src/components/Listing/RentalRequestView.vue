<template>
  <div v-for="(rental, i) in rentalList" :key="i">
    <RentalRequest
        :id="rental.rentalId"
        :renter="rental.userId"
        :date="rental.dateFrom + ' - ' + rental.dateTo"
    />
  </div>
</template>

<script>
import RentalRequest from "@/components/Listing/RentalRequest";
import RentalService from "@/service/RentalService";
import UserAccountService from "@/service/UserAccountService";

export default {
  name: "RentalRequestView",
  components: {RentalRequest},
  props: {productId: Number},
  data () {
    return {
      rentalList: [],
    }
  },
  async beforeMount() {
    this.rentalList = (await RentalService.getRentals(this.productId)).data
  }
}
</script>

<style scoped>

</style>