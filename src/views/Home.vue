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
  async beforeMount() {
      //TODO Flytt denne til innlogging
    const userInfo = (await UserAccountService.getUserId(this.$store.state.email)).data
    cookies.set("userId", userInfo.id);
  }
}
</script>

<style>

</style>