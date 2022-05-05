<template>
  <div v-if="isLoading">
    <div id="app">
      <div id="loadingPage">
        <img src="/img/loading_boxonly_final.gif" alt="Box swiping" id="loadingBar">
      </div>
    </div>
  </div>
<div>
  <sort-and-search @search="updateList" v-if="showSearch"/>
      <div v-if="!reset" v-for="(product, index) in activeProducts" :key="index" id="mobile">
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

  <v-container id="wideScreen">
    <v-row>
      <v-col v-for="(product, index) in activeProducts" :key="index">
        <ListingCard
            :itemName="product.title"
            :itemOwner="product.userId"
            :itemPrice="product.price"
            :itemId="product.productId"/>
      </v-col>
    </v-row>
  </v-container>
</div>
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
    showSearch: Boolean,
    ownerId: {
      default: 0,
      type: [Number, String],
    },
  },
  data () {
    return {

      activeProducts: [],
      renderKey: 0,
      reset: false,
      isLoading: false,
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
        const products = (await ProductService.getProducts('', '', "price", true)).data
        products.forEach(product => {
          if(new Date(product.availableTo) > new Date()){
            this.activeProducts.push(product)
          }
        })
      } else {
        this.activeProducts = (await ProductService.getProductsByUserId(this.ownerId)).data.products
      }
    },
    async updateList(searchBar, chosenCategories, chosenSortBy, ascending){
      this.reset = true;
      this.activeProducts = []
      setTimeout(async () => {
        const products = (await ProductService.getProducts(searchBar, chosenCategories, chosenSortBy, ascending)).data
        products.forEach(product => {
          if (new Date(product.availableTo) > new Date()) {
            this.activeProducts.push(product)
          }
        })
      })
      this.reset = false;
      console.log(this.renderKey)
      this.isLoading = true;
      setTimeout(() => this.isLoading = false, 1500);
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
#mobile {
  display:none;
}
@media only screen and (max-width: 600px) {
  #wideScreen {
    display: none;
  }
  #mobile {
    display: block;
  }
}
</style>

