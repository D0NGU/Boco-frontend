<template>
  <div>
    <h1>Utleie av {{ this.listingName }}</h1>

    <div v-if="!noRentals" v-for="rental in productRentals">
      <ListingCard
          :itemName=this.listingName
          :itemOwner="rental.userId"
          :itemId="rental.productId"
          :write-review-to-loaner="true"
          :if-editing=true
      />
    </div>

    <div v-if="noRentals">
      <p v-if="!error">Ingen har leid produktet enda.</p>
      <p v-else> {{ error }} </p>
    </div>

  </div>
</template>


<script>
import ListingCard from "@/components/Listing/ListingCard";
import ProductService from "@/service/ProductService";

export default {
  name: "ShowRentals",

  components: {
    ListingCard
  },

  props: {
    listingName: String,
    productId: Number
  },

  data () {
    return {
      productRentals: [],
      noRentals: true,
      error: '',
    }
  },

  methods: {
    async getProductRentals() {
      await ProductService.getOwnerProductAcceptedRentals(this.productId)
          .then(res => this.productRentals = res.data)
          .catch((err) => {
            this.error = "En feil har skjedd"
          })

      if (!this.productRentals.length){
        this.noRentals = true;
      } else {
        this.noRentals = false
      }
    },
  },
  beforeMount() {
    this.getProductRentals();
  }
}
</script>



<style scoped>
h1 {
  margin-top: 20px;
  margin-bottom: 20px;
}

</style>
