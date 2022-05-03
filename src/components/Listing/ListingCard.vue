<!-- En "listing" instans. (En annonseboks) -->

<template>
  <v-card class="rounded-xl itemCard" @click="redirect">
    <div class="itemContainer">
      <img src="https://www.megaflis.no/globalassets/productimages/6952062643067_1.png?ref=1931F74161&w=1920&scale=both&mode=pad&h=1920&format=jpg" id="itemImage"/>
      <v-divider vertical="" />
      <div class="itemDetail">
        <p class="text-subtitle-1">{{ itemName }}</p>
        <v-dialog
            v-model="dialog"
            fullscreen=""
            v-if="ifRented && !ifReviewed"
        >
          <template v-slot:activator="{ props }">
            <v-btn icon="" id="writeReviewBtn" size="x-small" v-bind="props"><v-icon size="small">mdi-message-draw</v-icon></v-btn>
          </template>

          <v-card>
            <v-card-text>
              <Review :item-name="itemName" :owner-id="itemOwner"/>
            </v-card-text>
            <v-card-actions>
              <v-btn
                  id="closeButton"
                  block="" @click="dialog = false"
              >Lukk
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <p class="text-caption" v-else>{{itemPrice}} kr/dag</p>
        <div v-if="isOwner" id="editIcon">
          <v-icon style="padding: 10px">mdi-pencil</v-icon> Rediger
        </div>
        <div v-else>
        <p class="text-overline" id="itemOwner">
          <v-avatar size="x-small">
          <v-img src="https://kvener.no/wp-content/uploads/2019/02/blank-profile-picture-973460_640.png" alt="profile picture"></v-img>
        </v-avatar> {{itemOwnerName}} </p>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
import router from "@/router";
import UserAccountService from "@/service/UserAccountService";
import Review from "@/components/UserProfile/Review";

export default {
  components: {Review},
  props: {
    itemName: String,
    itemPrice: Number,
    itemOwner: Number,
    itemImage: Image,
    itemId: [Number, String],
    ifHistory: Boolean,
    ifReviewed: Boolean,
    ifRented: Boolean,
  },
  data () {
    return {
      itemOwnerName: '',
      dialog: false,
      isOwner: false,
    }
  },
  methods: {
    redirect() {
      if(this.itemOwner !== this.$store.state.myUserId){
        router.push({name: 'ListingDetails', params: { itemId: this.itemId }})
      } else {
        router.push({name: 'Listing', params: { itemId: this.itemId }})
      }
    }
  },
  async beforeMount() {
    const userInfo = (await UserAccountService.getUser(this.itemOwner)).data
    this.itemOwnerName = userInfo.fname + " " + userInfo.lname
    console.log((this.itemOwner === this.$store.state.myUserId))
    this.isOwner = (this.itemOwner === this.$store.state.myUserId)
  }
}
</script>

<style scoped>
.itemCard {
  margin: 20px;
  background-color: white;
}
.itemContainer {
  height: 120px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
}
#itemImage {
  width: 40%;
  object-fit: contain;
  max-height: 100%;
  z-index: 1;
}
.itemDetail {
  height: 100%;
  margin: 10px 0 10px 20px;
  text-align: left;
  position: relative;
  z-index: 1;
  flex-grow: 1;
}
#itemOwner {
  position: absolute;
  bottom: 0;
}
#editIcon {
  position: absolute;
  border: solid 1px black;
  border-radius: 20px;
  display: inline-block;
  padding: 6px;
  bottom: 3px;
  right: 3px;
}
</style>