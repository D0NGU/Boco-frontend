<!-- Hovedside med annonser -->

<template>
  <ListingView />
</template>

<script>
import ListingView from "@/components/Listing/ListingView";
import UserAccountService from "@/service/UserAccountService";
import cookies from "vue-cookie";
export default {
    name: 'Home',
  components: {ListingView},
  async beforeMount() {
    const userInfo = (await UserAccountService.getUserId(this.$store.state.email)).data
    cookies.set("userId", userInfo.id);
  }
}
</script>

<style>

</style>