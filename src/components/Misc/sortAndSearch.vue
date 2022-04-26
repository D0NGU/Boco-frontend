<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-title>
        Filtrering
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-card id="sort-and-search-container" elevation="2">
          <v-text-field
              v-model="searchBar"
              id="searchBar"
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
                      @click="selectCategory(category)"
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

          <v-container>
            <v-row>
              <v-col
                  v-for="(category, i) in chosenCategories"
                  :key="category.category"
              >
                <v-chip
                    closable=""
                    @click:close="chosenCategories.splice(i, 1)"
                >
                  <v-icon> {{category.icon}} </v-icon>
                  {{ category.category }}
                </v-chip>
              </v-col>
            </v-row>
          </v-container>
          <v-btn @click="handleSearchButton">Søk</v-btn>
        </v-card>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import {getAllProducts} from "@/service/ApiService";

export default {
  name: "sortAndSearch",
  props: {
    products: Array,
  },
  data() {
    return {
      sortByDialog: false,
      filterDialog: false,
      searchBar: "",
      overlay: false,
      // TODO: Legg til disse listene automatisk?
      sortByOptions: [{option: 'Mest relevant', active: true}, {option: 'Pris lav-høy', active: false}, {option: 'Pris høy-lav', active: false}],
      categories: [{icon: 'mdi-basketball', category: 'Sport', active: false}, {icon: 'mdi-flower', category: 'Hage', active: false}, {icon: 'mdi-sofa-single', category: 'Møbler', active: false}, {icon: 'mdi-hammer-wrench', category: 'Verktøy', active: false}],
      chosenCategories: [],
    };
  },
  methods: {
    handleSearchButton(){
      //TODO spør backend
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
    },

    selectCategory(selectedCategory) {
      if(!this.chosenCategories.includes(selectedCategory)){
      this.chosenCategories.push(selectedCategory)
      } else {
        const index = this.chosenCategories.indexOf(selectedCategory);
        if (index > -1) {
          this.chosenCategories.splice(index, 1); // 2nd parameter means remove one item only
        }
      }
    }
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
  #sort-and-search-container {
    margin: 10px;
    padding: 20px;
  }
  >>>.v-expansion-panel-text__wrapper {
    padding: 0;
  }
  .v-col {
    padding: 0;
    margin: 2px;
  }
  #sort-and-search-container[data-v-6fb11601] {
    padding: 20px 8px
  }
}
</style>