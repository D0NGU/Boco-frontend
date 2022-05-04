<template>
  <div id="grid">
    <div id="topProfileContainer">
      <div>
        <v-img :src="background_img" class="profileImage" cover=""> </v-img>
      </div>
      <v-tabs id="tabContainer"
              v-model="tab" grow="">
        <v-tab class="tabHeader" value="items"><v-icon>mdi-newspaper</v-icon></v-tab>
        <v-tab class="tabHeader" value="reviews"><v-icon>mdi-message-draw </v-icon></v-tab>
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
          <p id="userDescription" v-if="!edit" class="text-body-1">{{ userDescription }}</p>
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
        <!-- TODO: Hent utleier fra backend -->
        <ListingView :ownerId="this.userId"/>
      </v-window-item>
      <v-window-item value="reviews">
        <MyReviews :user-id="this.userId"/>
      </v-window-item>
    </v-window>
  </v-card-text>
</template>

<script>
import ListingView from "@/components/Listing/ListingView";
import UserAccountService from "@/service/UserAccountService";
import MyReviews from "@/components/UserProfile/MyReviews";
import { useRoute } from 'vue-router'
//TODO: Lag en ny Review component?

export default {
  name: 'lessor',
  components: {MyReviews, ListingView},
  setup() {
    const route = useRoute();
    const userId = route.params.userId;
    return {
      userId,
    }
  },

  data() {
    return {
      //TODO Hent rating fra backend
      name: 'Bruker',
      ratingSeller: 5,
      ratingRenter: 5,
      reviewsCount: '',
      tab: null,
      userInfo: '',
      userDescription: '',
      edit: false,
      isVerified: false,
      rules: [v => v.length <= 189 || 'Max 190 characters allowed'],
      background_img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fd53l9d6fqlxs2.cloudfront.net%2Fphotos%2F75616-adobestock_63768956jpeg.jpeg&f=1&nofb=1',
    }
  },
  methods: {

    async getNumberOfReviews() {
      this.reviewsCount = (await UserAccountService.getNumberOfReviews(this.userId)).data;
    },
    async getAverageScoreAsOwner() {
      this.ratingSeller = (await UserAccountService.getAverageScoreAsOwner(this.userId)).data;
    },
    async getAverageScoreAsRenter() {
      this.ratingRenter = (await UserAccountService.getAverageScoreAsRenter(this.userId)).data;
    },
  },
  //TODO: Hent en utleier fremfor innlogget bruker
  async beforeMount() {
    const userInfo = await UserAccountService.getUser(this.userId)
    this.name = userInfo.data.fname + " " + userInfo.data.lname

    //check if user is verified
    await UserAccountService.getVerifiedUser(this.userId)
        .then(res => this.isVerified = res.data)
        .catch((err) => {
          console.log(err)
        });

    this.userDescription =  (await UserAccountService.getUserDescription(this.userId)).data

    await this.getAverageScoreAsRenter();
    await this.getAverageScoreAsOwner();
    await this.getNumberOfReviews();
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

</style>