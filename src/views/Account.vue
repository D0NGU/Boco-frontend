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
      <v-carousel id="carousel" height="250px" hide-delimiter-background="" :show-arrows="false">
        <v-carousel-item class="carouselItem">
          <v-avatar size="x-large">
            <v-img src="https://kvener.no/wp-content/uploads/2019/02/blank-profile-picture-973460_640.png"></v-img>
          </v-avatar>
          <!-- TODO: Legg til navn og beskrivelse fra backend -->
          <p class="text-button">Per Hansen</p>
          <div>
            <p class="text-body-1">En veldig snill kar som liker å låne bort gjenstander :)</p>
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
          Mine annonser komponent
        </v-window-item>
        <v-window-item value="history">
          Min historikk komponent
        </v-window-item>
        <v-window-item value="reviews">
          Mine anmeldelser komponent
        </v-window-item>
        <v-window-item value="settings">
          <Settings />
        </v-window-item>
      </v-window>
    </v-card-text>
</template>

<script>
import Settings from "@/components/Settings";
import ListingView from "@/components/Listing/ListingView";
export default {
    name: 'account',
  components: {ListingView, Settings},
  data() {
    return {
      //TODO Hent rating fra backend
      ratingSeller: 5,
      ratingRenter: 5,
      reviewsCount: '',
      tab: null,
    }
  },
  methods: {
      getRating(){
        // TODO kjørt GET user også legg inn details
      }
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
  top: 70px;
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
</style>