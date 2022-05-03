<!-- Hovedside med annonser -->

<template>
  <ListingView />
</template>

<script>
import ListingView from "@/components/Listing/ListingView";
import UserAccountService from "@/service/UserAccountService";
import Footer from "@/components/Misc/Footer";
import cookies from "vue-cookie";
export default {
    name: 'Home',
  components: {Footer, ListingView},
}
</script>

<style>

</style>