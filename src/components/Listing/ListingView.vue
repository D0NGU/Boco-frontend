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
import ProductService from "@/service/ProductService";
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
        this.activeProducts = (await ProductService.getProducts('', '', this.pageNumber, "price", true)).data
      } else {
        this.activeProducts = (await ProductService.getProductsByUserId(this.ownerId, this.pageNumber)).data.products
      }
    },
    async updateList(searchBar, chosenCategories, chosenSortBy, ascending){
      console.log(searchBar, chosenCategories, chosenSortBy, ascending)
      this.activeProducts = (await ProductService.getProducts(searchBar, chosenCategories, this.pageNumber, chosenSortBy, ascending)).data
    }
  },
  beforeMount() {
    this.getProducts()
  }
}
</script>

<style scoped>

</style>