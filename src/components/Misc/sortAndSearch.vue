<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-title>
        Filtrering
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-card id="sort-and-search-container" elevation="2" v-bind:style="{ 'box-shadow' : 'none !important'}">
          <v-text-field
              v-model="searchBar"
              id="searchBar"
              density="comfortable"
              color="var(--bocoBlue)"
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
                <v-item v-for="(category, index) in categories" :key="index">
                  <div
                      class= 'sortOption categoryOption'
                      @click="selectCategory(category)"
                  v-bind:style="category.active ? {'background-color' : 'var(--bocoBlue)', 'color' : 'white'} : null">
<!--                    <v-icon color="blue">{{category.icon}}</v-icon>-->
                    {{ category }}
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
                <v-item v-for="(option, index) in sortByOptions" :key="index">
                  <div
                      class='sortOption sortByOption'
                      @click="selectSortByOption(option.option)"
                      v-bind:style="option.active ? {'background-color' : 'var(--bocoBlue)', 'color' : 'white'} : null">
                    {{ option.option }}
                  </div>
                  <v-divider />
                </v-item>
              </v-item-group>
            </v-card>
          </v-dialog>

          <v-container>
            <v-row>
              <v-col>
<!--
 v-for="(category, i) in chosenCategories"
                  :key="category.category"<v-chip
                    closable=""
                    @click:close="chosenCategories.splice(i, 1)"
                >
                  <v-icon> {{category.icon}} </v-icon>
                  {{ category.category }}
                </v-chip>-->
              </v-col>
            </v-row>
          </v-container>
          <v-btn id="searchBtn" v-bind:style="{'background-color' : 'var(--bocoBlue)', 'color' : 'white'}" @click="handleSearchButton">Søk</v-btn>
        </v-card>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>

import ListingsService from "@/service/ListingsService";

export default {
  name: "sortAndSearch",
  data() {
    return {
      sortByDialog: false,
      filterDialog: false,
      searchBar: "",
      overlay: false,
      // TODO: Legg til disse listene automatisk?
      sortByOptions: [{option: 'Mest relevant', active: true}, {option: 'Pris lav-høy', active: false}, {option: 'Pris høy-lav', active: false}],
      chosenSortBy: 'price',
      ascending: false,
      //categories: [{icon: 'mdi-basketball', category: 'Sport', active: false}, {icon: 'mdi-flower', category: 'Hage', active: false}, {icon: 'mdi-sofa-single', category: 'Møbler', active: false}, {icon: 'mdi-hammer-wrench', category: 'Verktøy', active: false}],
      categories: [],
      //TODO fiks dette når backend støtter flere kategorier
      chosenCategories: '',
    };
  },
  methods: {
    handleSearchButton(){
      this.$emit('search', this.searchBar, this.chosenCategories, this.chosenSortBy, this.ascending)
    },

    selectSortByOption(selectedOption) {
      this.sortByOptions.forEach((option) => {
        option.active = option.option === selectedOption;
      })
      if(selectedOption === "Pris lav-høy") {
        this.chosenSortBy = "price";
        this.ascending = true;
      } else if(selectedOption === "Pris høy-lav"){
        this.chosenSortBy = "price";
        this.ascending = false;
      } else {
        this.chosenSortBy = "product_id"
        this.ascending = true;
      }
      setTimeout(() => this.sortByDialog = false, 300);
    },

    selectCategory(selectedCategory) {
      this.chosenCategories = selectedCategory;
      setTimeout(() => this.sortByDialog = false, 300);
      /*if(!this.chosenCategories.includes(selectedCategory)){
      this.chosenCategories.push(selectedCategory)
      } else {
        const index = this.chosenCategories.indexOf(selectedCategory);
        if (index > -1) {
          this.chosenCategories.splice(index, 1); // 2nd parameter means remove one item only
        }
      }*/
    }
  },
  async beforeMount() {
    const categories = (await ListingsService.getCategories()).data
    categories.forEach(cat => {
      this.categories.push(cat.category)
    })
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
  :deep()#v-expansion-panel-text__wrapper {
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