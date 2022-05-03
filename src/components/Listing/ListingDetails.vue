<template>
  <div>
    <v-img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Hammer.jpg" id="itemImage"></v-img>
    <div id="details">
      <p class="text-h4">{{productInfo.title}}</p>
      <p class="text-h6">{{productInfo.price}} kr/dag</p>
      <p>{{ productInfo.description }}</p>
      <v-chip color="indigo"><p>{{ productInfo.category }}</p></v-chip>
      <v-chip color="indigo"><p>{{ priceRange }}</p></v-chip>
      <v-divider style="margin: 10px"/>
      <p id="itemOwner">
        <v-avatar>
          <v-img src="https://kvener.no/wp-content/uploads/2019/02/blank-profile-picture-973460_640.png" alt="profile picture"></v-img>
        </v-avatar> {{ownerInfo.fname}} {{ownerInfo.lname}}</p>
      <v-divider style="margin: 10px"/>
    </div>
    <div id="requestForm">
      <v-alert type="error" v-if="invalidDate" id="errorBox">Du må legge til en dato</v-alert>
      <v-alert type="success" v-if="requestSent" id="requestSent">Forespørselen ble sendt!</v-alert>
      <p>Interessert i å leie gjenstanden? Legg til ønsket dato og send en forespørsel!</p>
      <Datepicker range v-model="date" :enableTimePicker="false" showNowButton :min-date="productInfo.availableFrom" :max-date="productInfo.availableTo" :start-date="startDate"></Datepicker>
      <v-btn id="requestBtn" @click="sendRequest"> Send Forespørsel </v-btn>
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

export default {
  name: "ListingDetails",
  components: {
    Map, 
    Datepicker
  },

  props: {
    itemId: Number,
    userId: Number,
  },

  data () {
    return {
      date: ref(),
      invalidDate: false,
      requestSent: false,
      productInfo: '',
      ownerInfo: '',
      showMap: false,
      startDate: new Date(),
      priceRange: '',
    }
  },

  methods: {

    async setPriceRange() {
      const product = (await ListingsService.getListing(this.itemId)).data
      this.productInfo = product.product;
      if(this.productInfo.price >= 0 && this.productInfo.price < 200){
        this.priceRange = '$'
      } else if (this.productInfo.price >= 200 && this.productInfo.price < 500){
        this.priceRange = '$$'
      } else {
        this.priceRange = '$$$'
      }
    },

    async getListingInfo(){
      const product = (await ListingsService.getListing(this.itemId)).data
      this.productInfo = product.product;
      this.ownerInfo = product.owner;
      if(new Date(this.productInfo.availableFrom) > new Date()){
        this.startDate = this.productInfo.availableFrom
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
    this.setPriceRange()
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
}
#mapBtn {
  margin: 0 5px 20px;
}
#requestForm > *{
  padding: 10px;
}
</style>