<template>
  <div>
   <h3>My history</h3>

    <div v-for="product in historyProducts">
      <ListingCard
          :item-name="product.name"
          :item-owner="product.userId"
          :item-price="product.price"
      />
    </div>

  </div>
</template>


<script>
import ListingCard from "@/components/Listing/ListingCard";

export default {
  name: "HistoryComponent",

  components: {
    ListingCard
  },

  data () {
    return {
      historyProducts: [
        //TEST LIST
        {name: "Hammer", description: "Den hamrer bra", address: "Hakkebakkeskogen", price: 30, unlisted: false, availableFrom: "24-01-2023", availableTo: "22-03-2023", userId: "1", category: "Verktøy"},
        {name: "Sag", description: "Den sager bra", address: "Hakkebakkeskogen", price: 15, unlisted: false, availableFrom: "24-01-2023", availableTo: "22-03-2023", userId: "1", category: "Verktøy"},
      ],
    }
  },

  methods: {

  }

}
</script>



<style scoped>


</style>