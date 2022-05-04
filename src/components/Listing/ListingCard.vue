<!-- En "listing" instans. (En annonseboks) -->
<template>
  <!-- Selve annonseboksen -->
  <v-card class="rounded-l itemCard" @click="redirect" :color="ownerVerified ? '#8d9fe5' : '#FFFFFF'">
    <div class="itemContainer">
      <!-- Annonse thumbnail -->
      <img v-if="thumbnail" v-bind:src="thumbnail" id="itemImage"/>
      <img v-else src="../../assets/images/missing_img.png" id="itemImage"/>

      <v-divider vertical />
      <div class="itemDetail">
        <!-- Produktnavn -->
        <p class="text-subtitle-1">{{ itemName }}</p>
        <v-dialog
            v-model="dialog"
            fullscreen=""
            v-if="(ifRented && !ifReviewed) || ifEditing">
          <template v-slot:activator="{ props }">
            <v-btn icon="" id="writeReviewBtn" size="x-small" v-bind="props"><v-icon size="small">mdi-message-draw</v-icon></v-btn>
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
        <p class="text-caption" v-else>{{itemPrice}} kr/dag</p>

        <div v-if="isOwner">
          <p  id="editIcon">
            <v-avatar size="x-small">
              <v-icon>mdi-pencil</v-icon>
            </v-avatar>
            Rediger
          </p>
        </div>
        <div v-else>
        <p class="text-overline" id="itemOwner">
          <v-avatar size="x-small">
            <v-img src="../../assets/images/missing_profile_img.png" alt="profile picture"></v-img>
          </v-avatar>
            {{itemOwnerName}}
          <v-icon v-if="ownerVerified">mdi-shield-check</v-icon></p>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
import router from "@/router";
import UserAccountService from "@/service/UserAccountService";
import Review from "@/components/UserProfile/Review";
import ImageService from "@/service/ImageService";

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
    writeReviewToLoaner: Boolean,
    ifRented: Boolean,
    ifEditing: Boolean,
  },
  data () {
    return {
      itemOwnerName: '',
      dialog: false,
      isOwner: false,
      thumbnail: '',
      ownerVerified: false,
    }
  },
  methods: {
    redirect() {
      if(this.itemOwner !== parseInt(this.$store.state.myUserId)){
        router.push({name: 'ListingDetails', params: { itemId: this.itemId }})
      } else {
        router.push({name: 'Listing', params: { itemId: this.itemId }})
      }
    }
  },
  async beforeMount() {
    const userInfo = (await UserAccountService.getUser(this.itemOwner)).data
    const raw = (await ImageService.getImagesByProductId(this.itemId)).data[0]
    if (raw) {
      this.thumbnail = raw.imgData + "," + raw.img64;
    }
    this.itemOwnerName = userInfo.fname
    this.isOwner = (this.itemOwner == this.$store.state.myUserId) //itemId is int and userId is String
    this.ownerVerified = (await UserAccountService.getVerifiedUser(this.itemOwner)).data
  }
}
</script>

<style scoped>
.itemCard {
  background-color: white;
  max-width: 450px;
  margin: auto;
  margin-top: 15px;
  margin-bottom: 15px
}
.itemContainer {
  align-content: center;
  height: 115px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
}
#itemImage {
  width: 100px;
  object-fit: cover;
  max-height: 100px;
  margin-right: 10px;
  border-radius: 15%;
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
  white-space: nowrap;
  text-overflow: ellipsis;
}
#editIcon {
  position: absolute;
  bottom: 0;
}
</style>
