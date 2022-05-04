<!-- typ "min profil" eller "settings" (endre passord, slett bruker osv) -->

<template>
  <div id="grid">
    <div id="topProfileContainer">
      <div>
        <v-img src="../assets/images/profile_bg.jpg" class="profileImage" cover=""> </v-img>
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
          <div>
            <v-avatar size="x-large">
              <v-img v-if="profilePicSrc" :src="profilePicSrc"/>
              <v-img v-else src="https://kvener.no/wp-content/uploads/2019/02/blank-profile-picture-973460_640.png"/>
            </v-avatar>

          </div>

          <div>
            <p class="text-button">{{name}}
              <v-icon v-if="isVerified">mdi-shield-check</v-icon>
            </p>
          </div>

          <div>
            <p id="userDescription" v-if="!edit" class="text-body-1">{{ userDescription }}</p>
            <v-btn v-if="!edit" class="my-2" id="editDescription"
                   rounded color="grey" fab small dark
                   @click="editDescription"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>

            <div>
              <v-btn v-if="edit"
                     rounded class="ma-2" color="green" dark
                     @click="saveDescription"
              >
                <v-icon dark right>
                  mdi-checkbox-marked-circle
                </v-icon>
              </v-btn>
              <v-btn v-if="edit" rounded class="ma-2" color="red" dark
                     @click="deleteDescription"
              >
                <v-icon dark right>
                  mdi-delete
                </v-icon>
              </v-btn>
              <v-textarea id="userDescriptionInput"
                          v-if="edit"
                          rows="2"
                          no-resize
                          outlined
                          label="Beskrivelse"
                          v-model="userDescription"
                          counter="190"
                          maxlength="190"
                          :rules="rules"
              ></v-textarea>

              <v-snackbar v-model="snackbar" :timeout="timeout">
                {{ statusForEditUserDescription }}
              </v-snackbar>

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
          <MyReviews :user-id="this.$store.state.myUserId"/>
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
import {getApiClient} from "@/service/ApiService";

export default {
    name: 'account',
  components: {MyReviews, ListingView, Settings, HistoryComponent},

  data() {
    return {
      //TODO Hent rating fra backend
      name: 'Bruker',
      ratingSeller: '',
      ratingRenter: '',
      reviewsCount: '',
      tab: null,
      userInfo: '',
      userDescription: '',
      edit: false,
      isVerified: false,
      rules: [v => v.length <= 189 || 'Max 190 characters allowed'],
      statusForEditUserDescription: '',
      snackbar: false,
      timeout: 2000,
      profilePicSrc: ''
    }
  },

  methods: {
    editDescription() {
        this.edit = true;
    },
    saveDescription() {
      if (!this.userDescription.length){
        this.userDescription = ' ';
      }
      this.updateUserDescription()
      this.snackbar = true
      this.edit = false
    },
    deleteDescription() {
      this.userDescription = ' ';
      this.updateUserDescription()
      this.snackbar = true
      this.edit = false
    },
    async getNumberOfReviews() {
      this.reviewsCount = (await UserAccountService.getNumberOfReviews(this.$store.getters.myUserId)).data;
    },
    async getAverageScoreAsOwner() {
      this.ratingSeller = (await UserAccountService.getAverageScoreAsOwner(this.$store.getters.myUserId)).data;
    },
    async getAverageScoreAsRenter() {
      this.ratingRenter = (await UserAccountService.getAverageScoreAsRenter(this.$store.getters.myUserId)).data;
    },
    async updateUserDescription() {
      let myUserId = this.$store.getters.myUserId;
      let temp = ''
      await UserAccountService.updateUserDescription(myUserId, this.userDescription)
          .then(res => temp = res.status)
          .catch((err) => {
            console.log(err)
          })
      if (temp === 200) {
        this.statusForEditUserDescription = "Oppdatert bruker beskrivelse"
      } else {
        this.statusForEditUserDescription = "Noe gikk galt. Prøv igjen"
      }
    },

    setProfilePic() {

    }
  },
  async beforeMount() {
    let myUserId = this.$store.getters.myUserId;
    const userInfo = await UserAccountService.getUser(myUserId)
    this.name = userInfo.data.fname + " " + userInfo.data.lname
    if (userInfo.data.profile64 !== "") {
      this.profilePicSrc = "data:image/jpeg;base64," +userInfo.data.profile64;
    }

    //check if user is verified
    this.isVerified = (await UserAccountService.getVerifiedUser(myUserId)).data
    //get user description
    this.userDescription =  (await UserAccountService.getUserDescription(myUserId)).data

    await this.getNumberOfReviews()
    await this.getAverageScoreAsOwner()
    await this.getAverageScoreAsRenter()
  }
}
</script>

<style scoped>
#grid {
  display: grid;
  height: 400px;
}
#components {
  min-height: 30%;
}
#topProfileContainer {
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  grid-area: 1/1;
  position: relative;
}
.profileImage {
  height: 400px;
  width: 100%;
  z-index: 0;
  background-color: #004aab;
}
.profileImageCover {
  background-color: black;
  opacity: 0.7;
  grid-area: 1/1;
  height: 100%;
  width: 100%;
  z-index: 2;
}
.profileDetails {
  position: absolute;
  height: 400px;
  width: 100%;
  top: 40px;
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

#userDescription {
  width: 350px;
  margin: 0 auto;
}

</style>
