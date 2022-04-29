<!-- inneholder listing component -->

<template>
  <div id="listingPage">
    <Listing></Listing>
    <div v-if="this.$store.state.addressClick">
      <Map />
    </div>
  </div>
</template>

<script>
import Listing from "@/components/Listing/Listing";
import Map from '../components/Map'
export default {
  components: {
    Listing,
    Map
  },
}
</script>

<style>
#listingPage {
  justify-content: center;
}
</style>