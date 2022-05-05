<!-- En "listing" instans. (En annonseboks) -->

<template>
  <v-card class="rounded-l itemCard">
    <div class="itemContainer">
      <v-img v-if="profilePicSrc" :src="profilePicSrc"/>
      <v-img v-else src="../../assets/images/missing_profile_img.png" alt="profile picture"></v-img>

      <v-divider vertical />
      <div class="itemDetail">
        <p class="text-subtitle-1">{{ itemLoanerName }}</p>
        <p> {{ date }}</p>
        <v-dialog
            v-model="dialog"
            fullscreen=""
        >
          <template v-slot:activator="{ props }">
            <v-btn id="writeReviewBtn" size="x-small" v-bind="props">Skriv en anmeldelse <v-icon size="small">mdi-message-draw</v-icon></v-btn>
          </template>

          <v-card>
            <v-card-text>
              <Review :item-name="itemName" :owner-id="itemOwner" :owner="writeReviewToLoaner" @close="dialog=false" />
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
      </div>
    </div>
  </v-card>
</template>

<script>
import UserAccountService from "@/service/UserAccountService";
import Review from "@/components/UserProfile/Review";

export default {
  components: {Review},
  props: {
    itemName: String,
    itemOwner: Number,
    itemLoaner: Number,
    itemImage: Image,
    date: '',
    writeReviewToLoaner: Boolean,
  },
  data () {
    return {
      itemLoanerName: '',
      dialog: false,
      profilePicSrc: '',
    }
  },
  methods: {
  },
  async beforeMount() {
    const userInfo = (await UserAccountService.getUser(this.itemLoaner)).data
    this.itemLoanerName = userInfo.fname + " " + userInfo.lname
    if (userInfo.profile64 !== "" && userInfo.profile64 !== null) {
      this.profilePicSrc = "data:image/jpeg;base64," +userInfo.profile64;
    }
  }
}
</script>

<style scoped>
.itemCard {
  margin: 20px;
  background-color: white;
}
.itemContainer {
  height: 130px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
}
.itemDetail {
  height: 100%;
  margin: 10px 0 10px 20px;
  text-align: left;
  position: relative;
  z-index: 1;
  flex-grow: 1;
}
#writeReviewBtn {
  font-size: 11px;
}
.v-img {
  margin: 0 1em 0 1em;
}
</style>
