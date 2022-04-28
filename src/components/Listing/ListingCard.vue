<!-- En "listing" instans. (En annonseboks) -->

<template>
  <v-card class="rounded-xl itemCard" @click="redirect">
    <img src="https://www.megaflis.no/globalassets/productimages/6952062643067_1.png?ref=1931F74161&w=1920&scale=both&mode=pad&h=1920&format=jpg" id="itemImage"/>
    <v-divider vertical="" />
    <div class="itemDetail">
      <p class="text-subtitle-1">{{ itemName }}</p>
      <p class="text-caption">{{itemPrice}} kr/dag</p>
      <!-- HVIS DU ER EIER, FÅ EDIT KNAPPER I STEDET -->
      <p class="text-overline" id="itemOwner">
        <v-avatar size="x-small">
        <v-img src="https://kvener.no/wp-content/uploads/2019/02/blank-profile-picture-973460_640.png" alt="profile picture"></v-img>
      </v-avatar> {{itemOwnerName}} </p>

    </div>
  </v-card>
</template>

<script>
import router from "@/router";
import UserAccountService from "@/service/UserAccountService";

export default {
  props: {
    itemName: String,
    itemPrice: Number,
    itemOwner: Number,
    itemImage: Image,
    itemId: [Number, String],
  },
  data () {
    return {
      itemOwnerName: '',
    }
  },
  methods: {
    redirect() {
      if(this.itemOwner !== this.$store.state.myUserId){
        router.push({name: 'ListingDetails', params: { itemId: this.itemId }})
      } else {
        router.push({name: 'ListingEdit', params: { itemId: this.itemId }})
      }
    }
  },
  async beforeMount() {
    const userInfo = (await UserAccountService.getUser(this.itemOwner)).data
    this.itemOwnerName = userInfo.fname + " " + userInfo.lname
  }
}
</script>

<style scoped>
.itemCard {
  height: 120px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 20px;
  padding: 10px;
  background-color: white;
}
#itemImage {
  width: 40%;
  object-fit: contain;
  max-height: 100%;
  z-index: 1;
}
.itemDetail {
  height: 100%;
  margin: 10px 20px;
  text-align: left;
  position: relative;
  z-index: 1;
  flex-grow: 1;
}
#itemOwner {
  position: absolute;
  bottom: 0;
}
</style>