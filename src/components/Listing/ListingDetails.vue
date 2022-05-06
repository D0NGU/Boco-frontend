<template>
  <div>
    <!-- Carousel for å scrolle gjennom bilder -->
    <v-carousel
      :continuous="true"
      :show-arrows="false"
      height="400px">
      <!-- Standardbilde hvis det ikke er lagt til noen bilder -->
      <v-carousel-item v-if="!imagesFound" :src="defaultimage" cover="">
      </v-carousel-item>
      <!-- Legger til alle andre bilder i listen -->
      <v-carousel-item
         v-for="(item,i) in this.images"
        :key="i"
        :src="images[i]"
      >
        <template v-slot:placeholder>
        <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
        >
          <v-progress-circular
              indeterminate
              color="grey lighten-5"
          ></v-progress-circular>
        </v-row>
      </template>
      </v-carousel-item>
    </v-carousel>

    <div id="details">
      <!-- Produktinfo -->
      <p class="text-h4">{{productInfo.title}}</p>
      <p class="text-h6">{{productInfo.price}} kr/dag</p>
      <br>
      <p style="white-space: pre-wrap;">{{ productInfo.description }}</p>
      <br><br>
      <!-- Tags -->
      <v-chip color="indigo" style="  margin-left: 10px;"><p>{{ productInfo.category }}</p></v-chip>
      <v-chip color="indigo"><p>{{ priceRange }}</p></v-chip>
      <!-- Brukers -->
      <v-divider style="margin: 10px;"/>
        <div>
          <p id="itemOwner" @click="redirect">
            <v-avatar>
              <v-img v-if="profilePicSrc" :src="profilePicSrc" alt="profile picture"></v-img>
              <v-img v-else src="../../assets/images/missing_profile_img.png" alt="profile picture"></v-img>
            </v-avatar> {{ownerInfo.fname}} {{ownerInfo.lname}}</p>
        </div>
       <v-divider style="margin: 10px"/>
    </div>

    <div id="requestForm">
      <v-alert type="error" v-if="invalidDate" id="errorBox">Du må legge til en dato</v-alert>
      <v-alert type="success" v-if="requestSent" id="requestSent">Forespørselen ble sendt!</v-alert>
      <!-- Legg til en leieforespørsel -->
      <p style="margin-left: 10px;margin-right: 10px; color:grey;">Interessert i å leie gjenstanden? Legg til ønsket dato og send en forespørsel!</p>
      <Datepicker id="datePicker" range v-model="date" :enableTimePicker="false" showNowButton :start-date="startDate" :allowedDates="availabilityWindow" :monthChangeOnScroll="false" ></Datepicker>
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
import RentalService from "@/service/RentalService";
import Map from "@/components/Listing/Map";
import UserAccountService from "@/service/UserAccountService";
import router from "@/router";
import ProductService from "@/service/ProductService";
import ImageService from "@/service/ImageService";

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
      defaultimage: require('@/assets/images/product.png'),
      profilePicSrc: '',
      productImages: [],
      imagesFound: false,
    }
  },

  methods: {

    redirect() {
      console.log(this.userId)
      router.push({name: 'Lessor', params: { userId: this.userId }})
    },

    async getListingInfo(){
      const product = (await ProductService.getProductById(this.itemId)).data
      const owner = (await UserAccountService.getUser(product.userId)).data
      const availabilityWindows = (await ProductService.getAvailabilityWindow(this.itemId)).data
      this.productInfo = product;
      this.ownerInfo = owner;
      this.userId = owner.id;
      if (this.ownerInfo.profile64 !== "" && this.ownerInfo.profile64 !== null) {
        this.profilePicSrc = "data:image/jpeg;base64,"+this.ownerInfo.profile64;
      }
      if(new Date(this.productInfo.availableFrom) > new Date()){
        this.startDate = this.productInfo.availableFrom
      }
      for(let i = 0; i<availabilityWindows.length; i++){
        const start = new Date(availabilityWindows[i].from);
        const end = new Date(availabilityWindows[i].to);
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
  },
  async mounted() {
    this.productImages = (await ImageService.getImagesByProductId(this.itemId)).data
    if (this.productImages.length != 0) {
      this.imagesFound = true;
      for (let image of this.productImages) {
        this.images.push(image.imgData + "," + image.img64);
      }
    }
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
  margin-left: 15px;
  cursor: pointer;
}

#datePicker {
  width: 80%;
  margin: 0 auto;
}
</style>
