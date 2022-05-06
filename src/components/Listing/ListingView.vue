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
      <div v-if="!reset && mobileView" v-for="(product, index) in activeProducts" :key="index">
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

  <v-container v-if="!mobileView">
    <v-row>
      <v-col v-for="(product, index) in activeProducts" :key="index">
        <v-lazy
            v-model="product.isActive" :options="{
              threshold: .5
            }"
            class="fill-height">
        <ListingCard
            :itemName="product.title"
            :itemOwner="product.userId"
            :itemPrice="product.price"
            :itemId="product.productId"/>
        </v-lazy>
      </v-col>
    </v-row>
  </v-container>
</div>
</template>

<script>
import ProductService from "@/service/ProductService";
import ListingCard from "@/components/Listing/ListingCard";
import SortAndSearch from "@/components/Misc/sortAndSearch";
import { useRoute } from 'vue-router'

export default {
  name: "ListingView",
  components: {SortAndSearch, ListingCard},

  setup() {
    const route = useRoute();
    const category = route.params.category;
    return {
      category,
    }
  },

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
      categoryFromProduct: this.category,
    }
  },
  computed: {
    /*visibleListings () {
      return this.activeProducts.filter(p=>p.isActive).length
    }*/
    mobileView() {
      return screen.width <= 600;
    }
  },
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
      this.isLoading = true;
      setTimeout(() => this.isLoading = false, 1500);
    }
  },
  created(){
    if (this.categoryFromProduct) {
      this.updateList('', this.category, 'price', true)
    } else {
      this.getProducts()
    }
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

