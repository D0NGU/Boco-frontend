<template>
  <div>
    <!-- Carousel for å scrolle gjennom bilder -->
    <v-carousel
      :continuous="true"
      :show-arrows="false"
      height="400px">
      <!-- Standardbilde hvis det ikke er lagt til noen bilder -->
      <v-carousel-item v-if="images.length == 0" src="../../assets/images/missing_img.png" cover=""></v-carousel-item>
      <!-- Legger til det første bildet - Nødvendig for å få frem bilde i starten -->
      <v-carousel-item
        v-if="images.length != 0"
        :src="images[0]"
      ></v-carousel-item>
      <!-- Legger til alle andre bilder i listen -->
      <v-carousel-item
         v-for="(item,i) in images.slice(1)"
        :key="i"
        :src="images[i]"
      ></v-carousel-item>
    </v-carousel>

    <div id="details">
      <!-- Produktinfo -->
      <p class="text-h4">{{productInfo.title}}</p>
      <p class="text-h6">{{productInfo.price}} kr/dag</p>
      <p>{{ productInfo.description }}</p>
      <br>
      <!-- Tags -->
      <v-chip color="indigo"><p>{{ productInfo.category }}</p></v-chip>
      <v-chip color="indigo"><p>{{ priceRange }}</p></v-chip>
      <!-- Brukers -->
      <v-divider style="margin: 10px"/>
        <div>
          <p id="itemOwner" @click="redirect">
            <v-avatar>
              <v-img src="../../assets/images/missing_profile_img.png" alt="profile picture"></v-img>
            </v-avatar> {{ownerInfo.fname}} {{ownerInfo.lname}}</p>
        </div>
      <v-divider style="margin: 10px"/>
    </div>

    <div id="requestForm">
      <v-alert type="error" v-if="invalidDate" id="errorBox">Du må legge til en dato</v-alert>
      <v-alert type="success" v-if="requestSent" id="requestSent">Forespørselen ble sendt!</v-alert>
      <!-- Legg til en leieforespørsel -->
      <p>Interessert i å leie gjenstanden? Legg til ønsket dato og send en forespørsel!</p>
      <Datepicker id="datePicker" range v-model="date" :enableTimePicker="false" showNowButton :start-date="startDate" :allowedDates="availabilityWindow" ></Datepicker>
      <v-btn id="requestBtn" @click="sendRequest"> Send Forespørsel </v-btn>
      <!-- GMaps -->
      <v-btn id="mapBtn" @click="mapClick">Kart</v-btn>
      <div v-if="this.showMap">
        <Map :address1="productInfo.address" @closeMap="mapClick" />
      </div>
    </div>
  </div>
</template>




<script>
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { ref } from 'vue';
import ListingsService from "@/service/ListingsService";
import RentalService from "@/service/RentalService";
import Map from "@/components/Map";
import UserAccountService from "@/service/UserAccountService";
import router from "@/router";

export default {
  name: "ListingDetails",
  components: {
    Map,
    Datepicker
  },

  props: {
    itemId: [Number, String],
  },

  data () {
    return {
      date: ref(),
      invalidDate: false,
      requestSent: false,
      productInfo: '',
      ownerInfo: '',
      userId: '',
      ownerVerified: false,
      showMap: false,
      startDate: new Date(),
      priceRange: '',
      images: [],
      availabilityWindow: [],
    }
  },

  methods: {

    redirect() {
      console.log(this.userId)
      router.push({name: 'Lessor', params: { userId: this.userId }})
    },

    async getListingInfo(){
      const product = (await ListingsService.getListing(this.itemId)).data
      this.productInfo = product.product;
      this.ownerInfo = product.owner;
      this.userId = product.owner.id;
      for (let image of product.images) {
        this.images.push(image.imgData + "," + image.img64);
      }
      if(new Date(this.productInfo.availableFrom) > new Date()){
        this.startDate = this.productInfo.availableFrom
      }
      for(let i = 0; i<product.availabilityWindows.length; i++){
        const start = new Date(product.availabilityWindows[i].from);
        const end = new Date(product.availabilityWindows[i].to);
        let loop = new Date(start);
        while (loop <= end) {
          this.availabilityWindow.push(new Date(loop))
          let newDate = loop.setDate(loop.getDate() + 1);
          loop = new Date(newDate);
        }
      }
      this.ownerVerified = (await UserAccountService.getVerifiedUser(this.ownerInfo.id)).data
      if(this.productInfo.price >= 0 && this.productInfo.price < 200){
        this.priceRange = '$'
      } else if (this.productInfo.price >= 200 && this.productInfo.price < 500){
        this.priceRange = '$$'
      } else {
        this.priceRange = '$$$'
      }
    },

    async sendRequest() {
      if(this.date !== undefined && this.date !== null){
        await RentalService.newRental(this.date[0],this.date[1], this.itemId, this.$store.state.myUserId)
        this.requestSent = true;
      } else {
        this.invalidDate = true;
        setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 1);
      }
    },

    mapClick() {
      document.documentElement.scrollTop = 0;
      this.showMap = !this.showMap
    },
  },

  beforeMount() {
    this.getListingInfo()
  }
}
</script>




<style scoped>
#details {
  text-align: left;
  margin: 20px;
}
#requestBtn {
  margin: 0 5px 20px;
  color: white;
  background-color: var(--bocoBlue);
}
#mapBtn {
  margin: 0 5px 20px;
}
#requestForm > *{
  padding: 10px;
}

#itemOwner {
  cursor: pointer;
}

#datePicker {
  width: 80%;
  margin: 0 auto;
}
</style>
