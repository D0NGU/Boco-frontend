<template>
  <sort-and-search @search="updateList"/>
    <!--<h5><span v-text="visibleListings"></span> of <span>{{ activeProducts.length }}</span> listings shown</h5>-->
      <div v-if="!reset" v-for="(product, index) in activeProducts" :key="index">
        <v-sheet min-height="115" class="fill-height" color="transparent">
          <v-lazy
              v-model="product.isActive" :options="{
              threshold: .5
            }"
              class="fill-height">
            <ListingCard
                :itemName="product.title"
                :itemOwner="product.userId"
                :itemPrice="product.price"
                :itemId="product.productId"
            />
          </v-lazy>
        </v-sheet>
      </div>
  <!--<div v-for="(product, index) in activeProducts" :key="index" class="item-list">
    <ListingCard
      :itemName="product.title"
      :itemOwner="product.userId"
      :itemPrice="product.price"
      :itemId="product.productId"
    />
  </div>-->
</template>



<script>
import ProductService from "@/service/ProductService";
import ListingCard from "@/components/Listing/ListingCard";
import SortAndSearch from "@/components/Misc/sortAndSearch";
import axios from "axios";

export default {
  name: "ListingView",
  components: {SortAndSearch, ListingCard},
  props: {
    ownerId: {
      default: 0,
      type: [Number, String],
    },
  },
  data () {
    return {
      pageNumber: 1,
      activeProducts: [],
      renderKey: 0,
      reset: false
    }
  },
  /**computed: {
    visibleListings () {
      return this.activeProducts.filter(p=>p.isActive).length
    }
  },*/
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
      this.reset = true;
      this.activeProducts = (await ProductService.getProducts(searchBar, chosenCategories, this.pageNumber, chosenSortBy, ascending)).data
      this.reset = false;
      console.log(this.renderKey)
    }
  },
  created(){
    this.getProducts()
  },
  /**beforeMount() {
    this.getProducts()
  }*/

}
</script>

<style scoped>

</style>
