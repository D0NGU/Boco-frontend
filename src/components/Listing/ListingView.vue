<template>
  <sort-and-search
      :products="activeProducts"
      @update="updateList"
  />
  <div v-for="product in activeProducts">
    <ListingCard
        :item-name="product.name"
        :item-owner="product.userId"
        :item-price="product.price"
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
      originalList: [//TEST LIST
        {name: "Hammer", description: "Den hamrer bra", address: "Hakkebakkeskogen", price: 30, unlisted: false, availableFrom: "24-01-2023", availableTo: "22-03-2023", userId: "1", category: "Verktøy"},
        {name: "Sag", description: "Den sager bra", address: "Hakkebakkeskogen", price: 15, unlisted: false, availableFrom: "24-01-2023", availableTo: "22-03-2023", userId: "1", category: "Verktøy"},
        {name: "Målestokk", description: "Den måler bra", address: "Hakkebakkeskogen", price: 100, unlisted: false, availableFrom: "24-01-2023", availableTo: "22-03-2023", userId: "1", category: "Verktøy"},
        {name: "Hjelm", description: "Den hjelmer bra", address: "Hakkebakkeskogen", price: 67, unlisted: false, availableFrom: "24-01-2023", availableTo: "22-03-2023", userId: "1", category: "Verktøy"},
      ],
      activeProducts: [
          //TEST LIST
          {name: "Hammer", description: "Den hamrer bra", address: "Hakkebakkeskogen", price: 30, unlisted: false, availableFrom: "24-01-2023", availableTo: "22-03-2023", userId: "1", category: "Verktøy"},
          {name: "Sag", description: "Den sager bra", address: "Hakkebakkeskogen", price: 15, unlisted: false, availableFrom: "24-01-2023", availableTo: "22-03-2023", userId: "1", category: "Verktøy"},
          {name: "Målestokk", description: "Den måler bra", address: "Hakkebakkeskogen", price: 100, unlisted: false, availableFrom: "24-01-2023", availableTo: "22-03-2023", userId: "1", category: "Verktøy"},
          {name: "Hjelm", description: "Den hjelmer bra", address: "Hakkebakkeskogen", price: 67, unlisted: false, availableFrom: "24-01-2023", availableTo: "22-03-2023", userId: "1", category: "Verktøy"},
      ],
    }
  },
  methods: {
    getProducts() {
      const products = getAllProducts()
      /*products.forEach(product => this.activeProducts.push({name: product.name,
        description: product.description,
        address: product.address,
        price: product.price,
        unlisted: product.unlisted,
        availableFrom: product.availableFrom,
        availableTo: product.availableTo,
        userId: product.userId,
        category: product.category}))*/
    },
    updateList(list){
      if(list === "reset"){
        this.activeProducts = this.originalList;
      } else {
        this.activeProducts = list;
      }
    }
  },
  beforeMount() {
    this.getProducts()
  }
}
</script>

<style scoped>

</style>