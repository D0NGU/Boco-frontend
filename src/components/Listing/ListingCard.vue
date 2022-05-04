<!-- En "listing" instans. (En annonseboks) -->

<template>
  <div id="mobile">
  <v-card class="rounded-xl itemCard" @click="redirect" :color="ownerVerified ? '#8d9fe5' : '#FFFFFF'">
    <div class="itemContainer">
      <img v-if="thumbnail" v-bind:src="thumbnail" class="itemImage"/>
      <img v-else src="https://www.megaflis.no/globalassets/productimages/6952062643067_1.png?ref=1931F74161&w=1920&scale=both&mode=pad&h=1920&format=jpg" class="itemImage"/>
      <v-divider vertical />
      <div class="itemDetail">
        <p class="text-subtitle-1">{{ itemName }}</p>
        <v-dialog
            v-model="dialog"
            fullscreen=""
            v-if="(ifRented && !ifReviewed) || ifEditing"
        >
          <template v-slot:activator="{ props }">
            <v-btn icon="" class="writeReviewBtn" size="x-small" v-bind="props"><v-icon size="small">mdi-message-draw</v-icon></v-btn>
          </template>

          <v-card>
            <v-card-text>
              <Review :item-name="itemName" :owner-id="itemOwner" :owner="writeReviewToLoaner" @close="dialog=false" />
            </v-card-text>
            <v-card-actions>
              <v-btn
                  class="closeButton"
                  block="" @click="dialog = false"
              >Lukk
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <p class="text-caption" v-else>{{itemPrice}} kr/dag</p>
        <div v-if="isOwner">
          <p  class="editIcon">
            <v-avatar size="x-small">
              <v-icon>mdi-pencil</v-icon>
            </v-avatar>
            Rediger
          </p>
        </div>
        <div v-else>
        <p class="text-overline itemOwner">
          <v-avatar size="x-small">
          <v-img src="https://kvener.no/wp-content/uploads/2019/02/blank-profile-picture-973460_640.png" alt="profile picture"></v-img>
        </v-avatar> {{itemOwnerName}}
          <v-icon v-if="ownerVerified">mdi-shield-check</v-icon></p>
        </div>
      </div>
    </div>
  </v-card>
  </div>
      <div id="wideScreen">


          <v-card class="mx-auto my-12 rounded-xl"
                  max-width="374"
                  @click="redirect" :color="ownerVerified ? '#8d9fe5' : '#FFFFFF'">
            <img v-if="thumbnail" v-bind:src="thumbnail" class="itemImage" />
            <img v-else src="https://www.megaflis.no/globalassets/productimages/6952062643067_1.png?ref=1931F74161&w=1920&scale=both&mode=pad&h=1920&format=jpg" class="itemImage" />
        <v-divider />
            <v-card-header>
              <v-card-header-text>
                <v-card-title> {{itemName}}</v-card-title>
                <v-card-subtitle>
                  <p class="text-overline itemOwner" style="flex-grow: 1; text-align: left">
                    <v-avatar size="x-small">
                      <v-img src="https://kvener.no/wp-content/uploads/2019/02/blank-profile-picture-973460_640.png" alt="profile picture"></v-img>
                    </v-avatar> {{itemOwnerName}}
                    <v-icon v-if="ownerVerified">mdi-shield-check</v-icon></p>
                  <p class= "d-flex justify-end">{{itemPrice}} kr/dag</p>
                </v-card-subtitle>
              </v-card-header-text>
            </v-card-header>
            <v-card-text>
              <v-divider />

              <div v-if="isOwner" style="margin: 10px">
                <p  class="text-subtitle-1">
                  <v-avatar size="x-small">
                    <v-icon>mdi-pencil</v-icon>
                  </v-avatar>
                  Rediger
                </p>
              </div>

            <v-dialog
                v-model="dialog"
                fullscreen=""
                v-if="(ifRented && !ifReviewed) || ifEditing"
            >
              <template v-slot:activator="{ props }">
                <v-btn icon="" class="writeReviewBtn" size="x-small" v-bind="props"><v-icon size="small">mdi-message-draw</v-icon></v-btn>
              </template>

              <v-card>
                <v-card-text>
                  <Review :item-name="itemName" :owner-id="itemOwner" :owner="writeReviewToLoaner" @close="dialog=false" />
                </v-card-text>
                <v-card-actions>
                  <v-btn
                      class="closeButton"
                      block="" @click="dialog = false"
                  >Lukk
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            </v-card-text>
          </v-card>

      </div>
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
    this.itemOwnerName = userInfo.fname + " " + userInfo.lname
    this.isOwner = (this.itemOwner == this.$store.state.myUserId) //itemId is int and userId is String
    this.ownerVerified = (await UserAccountService.getVerifiedUser(this.itemOwner)).data
  }
}
</script>

<style scoped>
@media screen and (min-width: 600px) {
  #mobile {
    display: none;
  }
  .itemCard {
    width: 30%;
    margin: 20px;
  }
}
.itemImage {
  height: 250px;
  object-fit: cover;
}
@media only screen and (max-width: 600px) {
  #wideScreen {
    display: none;
  }
  .itemImage {
    width: 40%;
    object-fit: contain;
    max-height: 100%;
    z-index: 1;
  }
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
  .itemDetail {
    height: 100%;
    margin: 10px 0 10px 20px;
    text-align: left;
    position: relative;
    z-index: 1;
    flex-grow: 1;
  }
  .itemOwner {
    position: absolute;
    bottom: 0;
  }
  .editIcon {
    position: absolute;
    bottom: 0;
  }
}
</style>
