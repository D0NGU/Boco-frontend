<template>
<v-card id="sort-and-search-container" elevation="2">
  <v-text-field
      v-model="searchBar"
      id="searchBar"
      @keyup="updateList(filteredList)"
      density="comfortable"
      color="primary"
      label="Søk..."
      variant="outlined"
      ></v-text-field>

<!--
  PC Versjon?
<div id="filteringButtons">
    <v-select class="filterButton"
              label="Filtrer"
              variant="contained"
              prepend-inner-icon="mdi-filter-outline"
    ></v-select>
    <v-select class="filterButton"
              label="Sorter"
              variant="contained"
              prepend-inner-icon="mdi-sort"
    ></v-select>
  </div>
-->

  <v-dialog v-model="filterDialog" id="filterDialog">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" class="filterButton">
        <v-icon>mdi-filter-outline</v-icon> Filtrer
      </v-btn>
    </template>
    <v-card>
      <v-item-group selected-class="bg-primary">
        <v-item v-for="category in categories" >
          <div
              class= 'sortOption categoryOption'
              @click="selectCategory(category.category)"
          v-bind:style="category.active ? {'background-color' : 'lightblue'} : null">
            <v-icon color="blue">{{category.icon}}</v-icon>
            {{ category.category }}
          </div>
          <v-divider />
        </v-item>
      </v-item-group>
    </v-card>
  </v-dialog>

  <v-dialog v-model="sortByDialog">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" class="filterButton">
        <v-icon>mdi-sort</v-icon> Sorter
      </v-btn>
    </template>
    <v-card>
      <v-item-group selected-class="bg-primary">
        <v-item v-for="option in sortByOptions">
          <div
              class='sortOption sortByOption'
              @click="selectSortByOption(option.option)"
              v-bind:style="option.active ? {'background-color' : 'lightblue'} : null">
            {{ option.option }}
          </div>
          <v-divider />
        </v-item>
      </v-item-group>
    </v-card>
  </v-dialog>
</v-card>
</template>

<script>
import {getAllProducts, getProductsInCategory} from "@/service/ApiService";

export default {
  name: "sortAndSearch",
  props: {
    products: Array,
  },
  data() {
    return {
      activeProductList: [],
      sortByDialog: false,
      filterDialog: false,
      searchBar: "",
      overlay: false,
      // TODO: Legg til disse listene automatisk?
      sortByOptions: [{option: 'Pris lav-høy', active: false}, {option: 'Pris høy-lav', active: false}],
      categories: [{icon: 'mdi-basketball', category: 'Sport', active: false}, {icon: 'mdi-flower', category: 'Hage', active: false}, {icon: 'mdi-sofa-single', category: 'Møbler', active: false}, {icon: 'mdi-hammer-wrench', category: 'Verktøy', active: false}],
    };
  },
  methods: {
    updateList(list){
      this.$emit('update', list)
    },
    sorting(option){
      if(option === "Pris lav-høy"){
        this.activeProductList.sort((a, b) => a.price - b.price );
      } else if(option === "Pris høy-lav"){
        this.activeProductList.sort((a, b) => b.price - a.price );
      }
    },
    getAllElements() {
      const products = getAllProducts()
      products.forEach(product => this.products.push({name: product.name,
        description: product.description,
        address: product.address,
        price: product.price,
        unlisted: product.unlisted,
        availableFrom: product.availableFrom,
        availableTo: product.availableTo,
        userId: product.userId,
        category: product.category}))
    },
    selectSortByOption(selectedOption) {
      this.sortByOptions.forEach((option) => {
        option.active = option.option === selectedOption;
      })
      setTimeout(() => this.sortByDialog = false, 300);
        const search = this.searchBar;
        this.searchBar = ""
        this.sorting(selectedOption);
        this.searchBar = search;
        this.updateList(this.filteredList)
    },

    selectCategory(selectedCategory) {
      this.categories.forEach((category) => {
        category.active = category.category === selectedCategory;
      })
      setTimeout(() => this.filterDialog = false, 300);
      setTimeout(() => this.filterDialog = false, 300);
      this.activeProductList = [];

      const newList = getProductsInCategory(selectedCategory)
      newList.forEach(product => this.activeProductList.push({name: product.name,
        description: product.description,
        address: product.address,
        price: product.price,
        unlisted: product.unlisted,
        availableFrom: product.availableFrom,
        availableTo: product.availableTo,
        userId: product.userId,
        category: product.category}))
    }
  },
  computed: {
    filteredList() {
      return this.activeProductList.filter((product) => {
        return product.name.toLowerCase().includes(this.searchBar.toLowerCase());
      });
    },
  },
  beforeMount() {
    this.activeProductList = this.products;
  }

}
</script>

<style scoped>
#sort-and-search-container {
  margin: auto;
  padding: 20px;
}
#searchBar {
  margin: 0
}
#filteringButtons {
  display: flex;
  flex-direction: row;
}
.filterButton {
  width: 200px;
  margin: 10px;
}
.sortOption{
  padding: 15px;
  width: 150px;
  margin: 0;
  text-align: center;
}
@media only screen and (max-width: 600px) {
  .filterButton{
    width: 100px;
    margin: 0 20px;
  }
}
</style>