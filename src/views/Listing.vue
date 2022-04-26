<!-- inneholder listing component -->

<template>
  <div id="listingPage">
    <Listing></Listing>
  </div>
</template>

<script>
import Listing from "@/components/Listing/Listing";

export default {
  components: {
    Listing,
  },
}
</script>

<style>
#listingPage {
  justify-content: center;
}
</style>