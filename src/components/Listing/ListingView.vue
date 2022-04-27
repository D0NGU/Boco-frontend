<template>
  <sort-and-search
      @search="updateList"
  />
  <div v-for="product in activeProducts">
    <ListingCard
        :itemName="product.title"
        :itemOwner="product.userId"
        :itemPrice="product.price"
        :itemId="product.productId"
    />
  </div>
</template>

<script>
import {getProducts, getProductsByUserId} from '@/service/ApiService.js'
import ListingCard from "@/components/Listing/ListingCard";
import SortAndSearch from "@/components/Misc/sortAndSearch";

export default {
  name: "ListingView",
  components: {SortAndSearch, ListingCard},
  props: {
    ownerId: {
      default: 0,
      type: Number,
    },
  },
  data () {
    return {
      pageNumber: 1,
      activeProducts: []
    }
  },
  methods: {
    async getProducts() {
      if(this.ownerId === 0){
        this.activeProducts = (await getProducts(null, null, this.pageNumber, "product_id", true))
      } else {
        this.activeProducts = (await getProductsByUserId(this.ownerId, this.pageNumber)).products
      }
    },
    async updateList(searchBar, chosenCategories, chosenSortBy, ascending){
      this.activeProducts = await getProducts(searchBar, chosenCategories, this.pageNumber, chosenSortBy, ascending)
    }
  },
  beforeMount() {
    this.getProducts()
  }
}
</script>

<style scoped>

</style>