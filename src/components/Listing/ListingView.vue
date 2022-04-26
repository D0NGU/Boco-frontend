<template>
  <sort-and-search
      :products="activeProducts"
      @update="updateList"
  />
  <div v-for="product in activeProducts">
    <ListingCard
        :itemName="product.name"
        :itemOwner="product.userId"
        :itemPrice="product.price"
        :itemId="product.itemId"
    />
  </div>
</template>

<script>
import { getAllProducts } from '@/service/ApiService.js'
import ListingCard from "@/components/Listing/ListingCard";
import SortAndSearch from "@/components/sortAndSearch";

export default {
  name: "ListingView",
  components: {SortAndSearch, ListingCard},
  data () {
    return {
      activeProducts: []
    }
  },
  methods: {
    async getProducts() {
      const products = await getAllProducts()
      products.forEach(product => this.activeProducts.push({
        name: product.title,
        description: product.description,
        address: product.address,
        price: product.price,
        unlisted: product.unlisted,
        availableFrom: product.availableFrom,
        availableTo: product.availableTo,
        userId: product.userId,
        category: product.category,
        itemId: product.productId
      }))
    },
    updateList(list){
      //TODO spør backend
    }
  },
  beforeMount() {
    this.getProducts()
  }
}
</script>

<style scoped>

</style>