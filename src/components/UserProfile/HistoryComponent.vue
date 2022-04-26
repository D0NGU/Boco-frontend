<template>
  <div>
   <h3>My history</h3>

    <div v-if="!noRentals" v-for="rental in historyRentedProducts">
      <ListingCard
          :itemName="rental.title"
          :itemOwner="rental.userId"
          :itemPrice="rental.price"
          :itemId="rental.productId"
      />
    </div>

    <div v-if="noRentals">
      <p v-if="!error"> You have not yet rented any products </p>
      <p v-else> {{ error }}</p>
    </div>

  </div>
</template>


<script>
import ListingCard from "@/components/Listing/ListingCard";
import UserAccountService from "@/service/UserAccountService";

export default {
  name: "HistoryComponent",

  components: {
    ListingCard
  },

  data () {
    return {
      historyRentedProducts: [],
      noRentals: true,
      error: '',
    }
  },

  methods: {
    async getHistory() {
      let myUserId = this.$store.state.myUserId;
      await UserAccountService.getUserRentalHistory(myUserId)
          .then(res => this.historyRentedProducts = res.data)
          .catch((err) => {
            this.error = "An error has occurred"
          })

      if (!this.historyRentedProducts.length){
        this.noRentals = true;
      } else {
        this.noRentals = false
      }
    },
  },
  beforeMount() {
    this.getHistory();
  }

}
</script>



<style scoped>


</style>