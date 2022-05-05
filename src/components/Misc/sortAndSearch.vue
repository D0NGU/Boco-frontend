<template>
  <v-expansion-panels id="mobile">
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
              v-on:keyup.enter="handleSearchButton()"
              clearable
              :clear-icon-cb="clear='()'"
              ></v-text-field>
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
              <v-col v-for="(category) in chosenCategory"
              :key="category.category">
              <v-chip
                closable=""
                @click:close="emptyChosenCat">

                {{ category }}
              </v-chip>
              </v-col>
            </v-row>
          </v-container>
          <v-btn class="searchBtn" v-bind:style="{'background-color' : 'var(--bocoBlue)', 'color' : 'white'}" @click="handleSearchButton">Søk</v-btn>
        </v-card>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>

  <div id="wideScreen">
    <v-text-field
        v-model="searchBar"
        id="searchBar"
        density="comfortable"
        color="var(--bocoBlue)"
        label="Søk..."
        variant="outlined"
        v-on:keyup.enter="handleSearchButton()"
        clearable
        :clear-icon-cb="clear='()'"
    ></v-text-field>

    <div id="filteringButtons">
      <v-select class="filterButton"
                label="Filtrer"
                variant="contained"
                prepend-inner-icon="mdi-filter-outline"
                :items="webCategories"
                v-model="chosenCategory"
      ></v-select>
      <v-select class="filterButton"
                label="Sorter"
                variant="contained"
                prepend-inner-icon="mdi-sort"
                v-model="chosenSortBy"
                :items="webSortBy"
      ></v-select>
    </div>
    <v-btn class="searchBtn" v-bind:style="{'background-color' : 'var(--bocoBlue)', 'color' : 'white'}" @click="handleSearchButton">Søk</v-btn>
  </div>
</template>

<script>

import ListingsService from "@/service/ListingsService";

export default {
  name: "sortAndSearch",
  emits: ["search"],
  data() {
    return {
      sortByDialog: false,
      filterDialog: false,
      searchBar: "",
      overlay: false,
      sortByOptions: [{option: 'Mest relevant', active: true}, {option: 'Pris lav-høy', active: false}, {option: 'Pris høy-lav', active: false}, {option: 'Lagt til nyeste', active: false}, {option: 'Lagt til eldste', active: false}, {option: 'Brukere', active: false}],
      chosenSortBy: 'Mest relevant',
      ascending: true,
      webCategories: ["Ingen",],
      webSortBy: ['Mest relevant', 'Pris lav-høy', 'Pris høy-lav', 'Lagt til nyeste', 'Lagt til eldste', 'Brukere'],
      categories: [],
      chosenCategory: [],
    };
  },
  methods: {
    handleSearchButton(){
      let category = '';
      let sortBy = 'title';
      if(this.chosenCategory === "Ingen") {
        this.chosenCategory = "";
      }
      if(this.chosenCategory.isArray && this.chosenCategory.length > 0){
        category = this.chosenCategory[0].category
      } else if(this.chosenCategory.length > 0) {
        category = this.chosenCategory
      }
      if(this.chosenSortBy === "Pris lav-høy") {
        sortBy = "price";
        this.ascending = true;
      } else if(this.chosenSortBy  === "Pris høy-lav"){
        sortBy = "price";
        this.ascending = false;
      } else if (this.chosenSortBy  === "Lagt til nyeste"){
        sortBy = "product_id"
        this.ascending = false;
      } else if (this.chosenSortBy  === "Lagt til eldste"){
        sortBy = "product_id"
        this.ascending = true;
      } else if (this.chosenSortBy  === "Brukere"){
        sortBy = "user_id"
      }
      this.$emit('search', this.searchBar, category, sortBy, this.ascending)
    },

    selectSortByOption(selectedOption) {
      this.sortByOptions.forEach((option) => {
        option.active = option.option === selectedOption;
      })
      this.chosenSortBy = selectedOption
      setTimeout(() => this.sortByDialog = false, 300);
    },

    selectCategory(selectedCategory) {
      this.categories.forEach((category) => {
        category.active = (category.category === selectedCategory.category);
      })
      if(this.chosenCategory.length > 0){
        this.chosenCategory = [];
      }
      this.chosenCategory.push(selectedCategory.category);
      setTimeout(() => this.filterDialog = false, 300);
    },

    emptyChosenCat(){
      this.chosenCategory.splice(0, 1)
      this.categories.forEach((category) => {
        category.active = false;
      })
    }
  },
  async beforeMount() {
    const categories = (await ListingsService.getCategories()).data
    categories.forEach(cat => {
      this.webCategories.push(cat.category)
      this.categories.push({category: cat.category, active: false})
    })
  }
}
</script>

<style scoped>
#wideScreen {
  background-color: white;
  padding: 50px;
  width: 80%;
  margin: 20px auto;
}
#mobile {
  display: none;
}
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
  margin: 20px;
}
.sortOption{
  padding: 15px;
  width: 150px;
  margin: 0;
  text-align: center;
  user-select: none;
  cursor: pointer;
  overflow-x: hidden;
}
:deep().v-input__details{
  display: none;
}
@media only screen and (max-width: 600px) {
  #wideScreen {
    display: none;
  }
  #mobile {
    display: block;
  }
  .filterButton{
    width: 100px;
    margin: 10px 20px;
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