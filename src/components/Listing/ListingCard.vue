<!-- En "listing" instans. (En annonseboks) -->

<template>
  <div>
  <div id="mobile">
    <!-- Selve annonseboksen -->
  <v-card class="rounded-l itemCard" @click="redirect" v-bind:style="ownerVerified ? {border: 'solid 1px var(--bocoBlue)'} : {border: 'solid 1px white'}">
    <div class="itemContainer">
      <!-- Annonse thumbnail -->
      <v-img v-if="imgExist" v-bind:src="thumbnail" class="itemImage" :cover="true">
        <template v-slot:placeholder>
          <v-row
              class="fill-height ma-0 itemImage"
              align="center"
              justify="center"
          >
            <v-progress-circular
                indeterminate
                color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
      <img v-else :src="defaultimage" class="itemImage">

      <v-divider vertical />
      <div class="itemDetail">
        <!-- Produktnavn -->
        <p class="text-subtitle-1 cardTitle">{{ itemName }}</p>
        <v-dialog
            v-model="dialog"
            fullscreen=""
            v-if="ifRented || ifEditing"
            :retain-focus="false"
        >
          <template v-slot:activator="{ props }">
            <v-btn icon="" class="writeReviewBtn" size="x-small" v-bind="props"><v-icon size="small">mdi-message-draw</v-icon></v-btn>
          </template>

          <v-card>
            <v-card-text>
              <Review :item-name="itemName" :owner-id="itemOwner" :owner="isOwner" @close="dialog=false" />
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

        <!-- Eier-Detaljer -->
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
            <v-img v-if="profilePicSrc" :src="profilePicSrc"/>
            <v-img v-else src="../../assets/images/missing_profile_img.png" alt="profile picture"></v-img>
          </v-avatar>
            {{itemOwnerName}}
          <v-icon v-if="ownerVerified">mdi-shield-check</v-icon></p>
        </div>
      </div>
    </div>
  </v-card>
  </div>


      <div id="wideScreen">
        <!-- Annonser for ws -->
          <v-card class="mx-auto my-12 rounded-l itemCard"
                  max-width="280"
                  @click="redirect"
                  v-bind:style="ownerVerified ? {border: 'solid 1px var(--bocoBlue)'} : {border: 'solid 1px white'}">
            <v-img v-if="imgExist" v-bind:src="thumbnail" class="itemImage" :cover="true">
              <template v-slot:placeholder>
                <v-row
                    class="fill-height ma-0 "
                    align="center"
                    justify="center"
                >
                  <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <v-img v-else :src="defaultimage" class="itemImage" :cover="true">
              <template v-slot:placeholder>
                <v-row
                    class="fill-height ma-0 "
                    align="center"
                    justify="center"
                >
                  <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
        <v-divider />
            <v-card-header>
              <v-card-header-text>
                <v-card-title> <p class="cardTitle">{{itemName}}</p></v-card-title>
                <v-card-subtitle v-if="isOwner">
                  <p class="text-overline itemOwner" style="flex-grow: 1; text-align: left">
                    <v-avatar size="x-small">
                     <v-icon>mdi-pencil</v-icon>
                    </v-avatar>
                    Rediger</p>
                  <p class= "d-flex justify-end">{{itemPrice}} kr/dag</p>
                </v-card-subtitle>
                <v-card-subtitle v-else>
                  <p class="text-overline itemOwner" style="flex-grow: 1; text-align: left">
                    <v-avatar size="x-small">
                      <v-img v-if="profilePicSrc" :src="profilePicSrc"/>
                      <v-img v-else src="../../assets/images/missing_profile_img.png" alt="profile picture"></v-img>
                    </v-avatar>
                    {{itemOwnerName}}
                    <v-icon v-if="ownerVerified">mdi-shield-check</v-icon></p>
                  <p class= "d-flex justify-end">{{itemPrice}} kr/dag</p>
                </v-card-subtitle>
              </v-card-header-text>
            </v-card-header>
            <v-card-text>


            <v-dialog
                v-model="dialog"
                fullscreen=""
                v-if="ifRented || ifEditing"
                :retain-focus="false"
            >
              <template v-slot:activator="{ props }">
                <v-btn append-icon="mdi-message-draw" class="writeReviewBtn" v-bind="props">Skriv en anmeldelse</v-btn>
              </template>

              <v-card>
                <v-card-text>
                  <Review :item-name="itemName" :owner-id="itemOwner" :owner="isOwner" @close="dialog=false" />
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
    ifRented: Boolean,
    ifEditing: Boolean,
  },
  data () {
    return {
      itemOwnerName: '',
      dialog: false,
      isOwner: false,
      thumbnail: '@/assets/images/product.png',
      ownerVerified: false,
      profilePicSrc: '',
      imgExist: true,
      defaultimage: require('@/assets/images/product.png')
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
    this.itemOwnerName = userInfo.fname
    this.isOwner = (this.itemOwner == this.$store.state.myUserId) //itemId is int and userId is String
    this.ownerVerified = (await UserAccountService.getVerifiedUser(this.itemOwner)).data
    if (userInfo.profile64 !== "" && userInfo.profile64 !== null) {
      this.profilePicSrc = "data:image/jpeg;base64," +userInfo.profile64;
    }

  },
  async mounted() {
    const raw = (await ImageService.getImagesByProductId(this.itemId)).data[0]
    if (raw) {
      this.thumbnail = raw.imgData + "," + raw.img64;
    }
    else {
      this.imgExist = false
    }
  }
}
</script>

<style scoped>
.itemImage {
  height: 250px;
  width: 250px;
  object-fit: cover;
  margin: 10px;
  border-radius: 5%;
}

.my-12 {
   margin-top: 0 !important;
   padding-top: 10px;
   padding-left: 2px;
   margin-bottom: 0 !important;
 }
.cardTitle {
  display: inline-block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 230px;
}
@media screen and (min-width: 600px) {
  #mobile {
    display: none;
  }
  .itemCard {
    margin: 20px;
  }
}
@media only screen and (max-width: 600px) {
  #wideScreen {
    display: none;
  }
  .itemImage {
    width: 100px;
    height: 100px;
    object-fit: cover;
    max-height: 100px;
    max-width: 100px;
    margin-right: 10px;
    border-radius: 5%;
    z-index: 1;
  }
  .itemCard {
    max-width: 450px;
    margin: 15px auto;
    background-color: white;
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
