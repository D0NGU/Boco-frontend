<template>
  <div>
    <v-img ></v-img>
    <h1>Boco</h1>
    <h3>for å skape et bærekraftigere samfunn</h3>
    <v-btn>Lei et produkt</v-btn>

  </div>
  <div>
    <ListingView />
  </div>
</template>

<script>
import ListingView from "@/components/Listing/ListingView";
export default {
  name: "Landing",
  components: {ListingView}

}
</script>

<style scoped>

</style>