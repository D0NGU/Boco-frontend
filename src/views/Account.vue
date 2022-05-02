<!-- typ "min profil" eller "settings" (endre passord, slett bruker osv) -->

<template>
  <div id="grid">
    <div id="topProfileContainer">
      <div>
        <v-img src="https://kvener.no/wp-content/uploads/2019/02/blank-profile-picture-973460_640.png" class="profileImage"
               cover=""> </v-img>
      </div>
      <v-tabs id="tabContainer"
              v-model="tab" grow="">
        <v-tab class="tabHeader" value="items"><v-icon>mdi-newspaper</v-icon></v-tab>
        <v-tab class="tabHeader" value="history"><v-icon>mdi-history</v-icon></v-tab>
        <v-tab class="tabHeader" value="reviews"><v-icon>mdi-message-draw </v-icon></v-tab>
        <v-tab class="tabHeader" value="settings"><v-icon>mdi-account-cog</v-icon></v-tab>
      </v-tabs>
    </div>
    <div class="profileImageCover"></div>
  </div>
    <div class="profileDetails">
      <v-carousel id="carousel" height="300px" hide-delimiter-background="" :show-arrows="false">
        <v-carousel-item class="carouselItem">
          <v-avatar size="x-large">
            <v-img src="https://kvener.no/wp-content/uploads/2019/02/blank-profile-picture-973460_640.png"></v-img>
          </v-avatar>
          <div>
            <p class="text-button">{{name}}
              <v-icon v-if="isVerified">mdi-account-check-outline</v-icon>
            </p>
          </div>

          <div>
            <p v-if="!edit" class="text-body-1">{{ userDescription }}</p>
            <v-btn v-if="!edit" class="my-2" id="editDescription"
                   rounded
                   color="grey"
                   fab
                   small
                   dark
                   @click="editDescription"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>

            <div>
              <v-btn v-if="edit"
                     rounded
                     class="ma-2"
                     color="green"
                     dark
                     @click="saveDescription"
              >
                <v-icon dark right>
                  mdi-checkbox-marked-circle
                </v-icon>
              </v-btn>
              <v-btn v-if="edit"
                     rounded
                     class="ma-2"
                     color="red"
                     dark
                     @click="deleteDescription"
              >
                <v-icon dark right>
                  mdi-delete
                </v-icon>
              </v-btn>
              <v-textarea v-if="edit"
                          rows="2"
                          outlined
                          label="User description"
                          v-model="userDescription"
                          counter="190"
                          maxlength="190"
                          :rules="rules"
              ></v-textarea>
            </div>
          </div>

        </v-carousel-item>
        <v-carousel-item class="carouselItem">
          <!-- TODO: Hent rating fra backend -->
          <p>Rangering som selger</p>
          <v-rating readonly="" v-model="ratingSeller"></v-rating>
          <p>Rangering som låner</p>
          <v-rating readonly="" v-model="ratingRenter"></v-rating>
          <br>
          <v-icon> mdi-message-draw </v-icon> {{reviewsCount}}
        </v-carousel-item>
      </v-carousel>
    </div>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="items">
          <ListingView :ownerId="this.$store.state.myUserId"/>
        </v-window-item>
        <v-window-item value="history">
          <HistoryComponent/>
        </v-window-item>
        <v-window-item value="reviews">
          <MyReviews/>
        </v-window-item>
        <v-window-item value="settings">
          <Settings />
        </v-window-item>
      </v-window>
    </v-card-text>
</template>

<script>
import Settings from "@/components/UserProfile/Settings.vue";
import ListingView from "@/components/Listing/ListingView";
import HistoryComponent from "@/components/UserProfile/HistoryComponent";
import UserAccountService from "@/service/UserAccountService";
import MyReviews from "@/components/UserProfile/MyReviews";
import axios from 'axios'

export default {
    name: 'account',
  components: {MyReviews, ListingView, Settings, HistoryComponent},

  data() {
    return {
      //TODO Hent rating fra backend
      name: 'Test Name',
      ratingSeller: 5,
      ratingRenter: 5,
      reviewsCount: '',
      tab: null,
      userInfo: '',
      userDescription: 'En veldig snill kar som liker å låne bort gjenstander :)', //TODO Hent "user description" fra backend
      edit: false,
      isVerified: false,
      rules: [v => v.length <= 189 || 'Max 190 characters allowed'],
    }
  },

  methods: {
    editDescription() {
        this.edit = true;
    },
    saveDescription() {
      //TODO send "user description" til backend
      this.edit = false
    },
    deleteDescription() {
      //TODO send tom "user description" til backend
      this.userDescription = '';
      this.edit = false
    },
  },
  async beforeMount() {
    let myUserId = this.$store.getters.myUserId;
    const userInfo = await UserAccountService.getUser(myUserId)
    this.name = userInfo.data.fname + " " + userInfo.data.lname

    //TODO: get "user description"


    await UserAccountService.getVerifiedUser(myUserId)
        .then(res => this.isVerified = res.data)
        .catch((err) => {
          console.log(err.res.data)
        })

  }
}
</script>

<style scoped>
#grid {
  display: grid;
  height: 500px;
}

#topProfileContainer {
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  grid-area: 1/1;
  position: relative;
}
.profileImage {
  filter: blur(6px);
  height: 500px;
  width: 100%;
  z-index: -1;
}
.profileImageCover {
  background-color: black;
  opacity: 0.6;
  grid-area: 1/1;
  height: 100%;
  width: 100%;
  z-index: 2;
}
.profileDetails {
  position: absolute;
  height: 500px;
  width: 100%;
  top: 20px;
  left: 0;
  color: white;
  display: flex;
  align-items: center;
  z-index: 5;
}
#tabContainer {
  position: absolute;
  bottom: 0;
  color: white;
  width: 100%;
  z-index: 10;
  display: flex;
}
.v-card-text {
  padding: 0;
}

</style>
