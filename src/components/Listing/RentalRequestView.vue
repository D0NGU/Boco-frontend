<template>
  <div v-for="(rental, i) in rentalList" :key="i">
    <RentalRequest
        :id="rental.rentalId"
        :name="ownerInfo[i].fname + ' ' + ownerInfo[i].fname"
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
      ownerInfo: []
    }
  },
  beforeMount() {
    this.rentalList = RentalService.getRentals(this.productId)
    this.rentalList.forEach(rental =>{
      this.ownerInfo.push(UserAccountService.getUser(rental.userId))
    })
  }
}
</script>

<style scoped>

</style>