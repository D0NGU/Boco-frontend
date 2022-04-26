<template>
  <div>
   <h3>My history</h3>

    <div v-for="product in historyProducts">
      <ListingCard
          :itemName="product.name"
          :itemOwner="product.userId"
          :itemPrice="product.price"
          :itemId="product.itemId"
      />
    </div>

  </div>
</template>


<script>
import ListingCard from "@/components/Listing/ListingCard";
import axios from "axios";

export default {
  name: "HistoryComponent",

  components: {
    ListingCard
  },

  data () {
    return {
      historyProducts: [],
      rentalsProductID: [],
    }
  },

  methods: {
    async getHistory() {
      let list = [];
      await axios.get('http://localhost:8080/api/rentals/user/1')
          .then(res => list = res.data)
          .catch((err) => console.log(err.response.status))

      /*await axios.get('http://localhost:8080/api/products/{id}')
          .then(res => )
          .catch((err) => console.log(err.response.status))*/


      list.forEach(rental => {
        console.log(rental.productId);
        this.rentalsProductID.push(rental.productId)

      })
    }
  },

  beforeMount() {
    this.getHistory();
  }

}
</script>



<style scoped>


</style>