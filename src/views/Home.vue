<!-- Hovedside med annonser -->

<template>
  <ListingView :showSearch="true"/>
</template>

<script>
import ListingView from "@/components/Listing/ListingView";
import Footer from "@/components/Misc/Footer";

export default {
    name: 'Home',
  components: {Footer, ListingView},
}
</script>

<style>

</style>