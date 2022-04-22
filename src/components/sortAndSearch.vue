<template>
<v-card id="sort-and-search-container" elevation="2">
  <v-text-field
      v-model="searchBar"
      label="Søk..."
      clearable
      variant="outlined"
  ></v-text-field>
<!--  PC Versjon?
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
  </div>-->

  <v-dialog v-model="filterDialog" id="filterDialog">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props">
        <v-icon>mdi-filter-outline</v-icon> Filtrer
      </v-btn>
    </template>
    <v-card>
      <v-item-group>
        <v-row>
          <v-col>
            <v-item>Sport</v-item>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-item>Hage</v-item>
          </v-col>
        </v-row>
      </v-item-group>
    </v-card>
  </v-dialog>

  <v-dialog>
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props">
        <v-icon>mdi-sort</v-icon> Sorter
      </v-btn>
    </template>
    <v-card>
      <v-item-group selected-class="bg-primary">
        <v-row v-for="option in sortByOptions">
          <v-col>
            <v-item v-slot="{ isSelected, selectedClass, toggle }">
              <v-card
                  :class="[sortOption, selectedClass]"
                  dark
                  @click="toggle">
                {{option}}
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-item-group>
    </v-card>
  </v-dialog>
</v-card>
</template>

<script>
export default {
  name: "sortAndSearch",
  props: { elementsList: Array },
  data() {
    return {
      searchBar: "",
      overlay: false,
      filterDialog: false,
      filterCategory: '',
      sortByOptions: ['Pris lav-høy', 'Pris høy-lav', 'Nærmest'],
      chosenSortBy: '',
    };
  },

  computed: {
    filteredList() {
      return this.elementsList.filter((element) => {
        return element
            .toLowerCase()
            .includes(this.search.toLowerCase());
      });
    },
  }
}
</script>

<style scoped>
#sort-and-search-container {
  width: 500px;
  margin: auto;
  padding: 20px;
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

}
</style>