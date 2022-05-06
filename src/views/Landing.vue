<template>
  <div v-if="isLoading">
    <div id="loadingBackground">
      <div id="loadingPage">
        <img src="/img/loading_boxonly_final.gif" alt="Box swiping" id="loadingBar">
      </div>
    </div>
  </div>
<div :class="{hideOverflow: isLoading}">
  <div id="cover">
    <div id="imageCover"></div>
    <img src="/img/flowers.jpg" alt="picture" id="coverImage" @load="handleLoad">
    <div id="coverText" :class="{ titleFade: !isLoading }">
    <h1 id="title">Borrow <br> Community</h1>
    <h3>- for å skape et
      <br>mer bærekraftig samfunn</h3>
    <v-btn class="button" @click="startButton">Start nå</v-btn>
    </div>
  </div>
  <div class="paragraph">
    <h2>Hvem er vi?</h2>
    <img src="/img/business.png" alt="" class="paraImage">
    <p>Borrow Community (BoCo) er et norsk selskap som tilbyr en plattform for utlån av gjenstander for privatpersoner og bedrifter. </p>
  </div>
  <div class="paragraph">
    <h2>Bedre for miljøet</h2>
    <img src="/img/enviro.png" alt="" class="paraImage">
    <p>Vi i BoCo ønsker å legge til rette for mer bærekraftige samfunn. Verden må bli mer sirkulær!</p>
  </div>
  <div class="paragraph">
    <h2> - og lommeboka !</h2>
    <img src="/img/wallet.webp" alt="" class="paraImage">
    <p>Lån gjenstander av noen som allerede eier det, og som ønsker å leie ut.
    Den som legger ut annonsen kan velge å ta betalt for utleie, eller leie ut gratis!</p>
  </div>
</div>
</template>

<script>
import ListingView from "@/components/Listing/ListingView";
export default {
  name: "Landing",
  components: {ListingView},

  data () {
    return {
      isLoading: true,
      disabled: false,
    }
  },

  methods: {
    handleLoad () {
      setTimeout(() => this.isLoading = false, 1500);
    },
    startButton() {
      if (!this.$store.state.loggedIn) {
        this.$router.push({name: 'Login'});
      } else {
        this.$router.push({name: 'Home'});
      }
    }
  }
}
</script>

<style scoped>
h1, h3 {
  cursor: default;
}
#cover {
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
}

#coverImage {
  max-height: 500px;
  object-fit: cover;
  width: 100%;
  flex: 1;
}
#imageCover {
  height: 100%;
  width: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  flex: 1;
}

#coverText {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 15px;
  border: 5px solid white;
  width: 85%;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.button {
  color: var(--bocoBlue);
  margin-top: 20px;
  font-weight: bold;
}
.paragraph {
  text-align: center;
  padding: 30px;
}
.paragraph:nth-child(2n) {
  background-color: white;
}
.paraImage {
  height: 100px;
  margin: 20px;
}

.titleFade {
  animation-fill-mode: forwards;
  animation-name: titleFade;
  animation-duration: 2s;
}

@keyframes titleFade  {
  from {opacity: 0}
  to {opacity: 1}
  100% {letter-spacing: 2.5px}
}
.hideOverflow {
  height: 100%;
  overflow: hidden;
  position: fixed;
}
#loadingBackground {
  z-index: 10;
  margin: 0;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: white;
}
</style>