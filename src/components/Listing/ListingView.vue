<template>
  <div v-if="isLoading">
    <div id="app">
      <div id="loadingPage">
        <img src="/img/loading_boxonly_final.gif" alt="Box swiping" id="loadingBar">
      </div>
    </div>
  </div>
<div>
  <sort-and-search @search="updateList"/>
    <!--<h5><span v-text="visibleListings"></span> of <span>{{ activeProducts.length }}</span> listings shown</h5>-->
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
      this.isLoading = true;
      setTimeout(async () => this.activeProducts = (await ProductService.getProducts(searchBar, chosenCategories, this.pageNumber, chosenSortBy, ascending)).data, 500);
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

