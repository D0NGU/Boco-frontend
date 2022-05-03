<template>
  <sort-and-search @search="updateList"/>
  <v-container class="py-3">
    <div class="display-2">Endless scrolling with v-lazy</div>
    <h5><span v-text="visibleListings"></span> of <span>{{ activeProducts.length }}</span> listings shown</h5>
    <v-row class="fill-height overflow-y-auto" v-if="activeProducts.length">
      <v-col sm="6" cols="12" v-for="(product, index) in activeProducts">
        <v-sheet min-height="250" class="fill-height" color="transparent">
          <v-lazy
            v-model="product.isActive" :options="{
              threshold: .5
            }"
            class="fill-height">
            <v-card class="fill-height" hover>
              <v-card-text>
                <v-row :key="index" @click="">
                  <v-col sm="10" cols="12" class="text-sm-left text-center">
                    #{{ (index+1) }}
                    <h2 v-html="product.title"></h2>
                    <div v-html="product.body"></div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-lazy>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
  <!--<div v-for="(product, index) in activeProducts" :key="index" class="item-list">
    <ListingCard
      :itemName="product.title"
      :itemOwner="product.userId"
      :itemPrice="product.price"
      :itemId="product.productId"/>
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
      type: Number,
    },
  },
  data () {
    return {
      pageNumber: 1,
      activeProducts: []
    }
  },
  computed: {
    visibleListings () {
      return this.activeProducts.filter(p=>p.isActive).length
    }
  },
  methods: {
    getProducts() {
      axios.get('https://jsonplaceholder.typicode.com/posts').then(response => {
        this.activeProducts = response.data
      })
    },
    /** OLD METHODS */
    /*async getProducts() {
      if(this.ownerId === 0){
        this.activeProducts = (await ProductService.getProducts('', '', this.pageNumber, "price", true)).data
      } else {
        this.activeProducts = (await ProductService.getProductsByUserId(this.ownerId, this.pageNumber)).data.products
      }
    },*/
    async updateList(searchBar, chosenCategories, chosenSortBy, ascending){
      console.log(searchBar, chosenCategories, chosenSortBy, ascending)
      this.activeProducts = (await ProductService.getProducts(searchBar, chosenCategories, this.pageNumber, chosenSortBy, ascending)).data
    }
  },
  created(){
    this.getProducts()
  },
  /*beforeMount() {
    this.getProducts()
  }*/
}
</script>