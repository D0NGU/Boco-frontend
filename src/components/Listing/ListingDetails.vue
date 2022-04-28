<template>
  <div>
    <v-img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Hammer.jpg" id="itemImage"></v-img>
    <div id="details">
      <p class="text-h4">{{productInfo.title}}</p>
      <p class="text-h6">{{productInfo.price}} kr/dag</p>
      <p>{{ productInfo.description }}</p>
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
      <Datepicker range v-model="date" :enableTimePicker="false" showNowButton :min-date="productInfo.availableFrom" :max-date="productInfo.availableTo"></Datepicker>
      <v-btn id="requestBtn" @click="sendRequest"> Send Forespørsel </v-btn>
    </div>
  </div>
</template>

<script>
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { ref } from 'vue';
import ListingsService from "@/service/ListingsService";
import RentalService from "@/service/RentalService";

export default {
  name: "ListingDetails",
  components: {Datepicker},
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
    }
  },
  methods: {
    async getListingInfo(){
      const product = await ListingsService.getListing(this.itemId)
      this.productInfo = product.product;
      this.ownerInfo = product.owner;
    },
    async sendRequest() {
      if(this.date !== undefined && this.date !== null){
        const dateFrom = new Date(this.date[0].getFullYear()+"/"+(this.date[0].getMonth()+1)+"/"+this.date[0].getDate());
        const dateTo = new Date(this.date[1].getFullYear()+"/"+(this.date[1].getMonth()+1)+"/"+this.date[1].getDate());
        await RentalService.newRental(dateFrom, dateTo, this.itemId, this.$store.state.myUserId)
      } else {
        this.invalidDate = true;
        setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 1);
      }
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
  margin: 0 auto 20px auto;
}
#requestForm > *{
  padding: 10px;
}
</style>