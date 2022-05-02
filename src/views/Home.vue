<!-- Hovedside med annonser -->

<template>
  <ListingView />
  <Footer id="footer"/>
</template>

<script>
import ListingView from "@/components/Listing/ListingView";
import UserAccountService from "@/service/UserAccountService";
import Footer from "@/components/Misc/Footer";
export default {
    name: 'Home',
  components: {Footer, ListingView},
  async beforeMount() {
    const userInfo = (await UserAccountService.getUserId(this.$store.state.email)).data
    this.$store.commit("SET_MYUSERID", userInfo.id)
  }
}
</script>

<style>
#footer{
  position: -webkit-sticky;
  position: sticky;
  display: flex;
  z-index: 1;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>