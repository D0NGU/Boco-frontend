<template>
  <v-card class="rounded-xl rentalCard">
    <v-avatar x-large id="profilePicture"></v-avatar>
    <div id="rentalDetails">
      <p>{{ fname }} {{ lname }}</p>
      <p>{{ date }}</p>
      <v-btn color="success" class="rentalButton" @click="acceptRental">Godkjenn</v-btn>
      <v-btn color="error" class="rentalButton" @click="denyRental">Avslå</v-btn>
    </div>
  </v-card>
</template>

<script>
import RentalService from "@/service/RentalService";
import UserAccountService from "@/service/UserAccountService";
import ImageService from "@/service/ImageService";

export default {
  name: "RentalRequest",
  props: {
    id: Number,
    renter: '',
    date: '',
  },
  data () {
    return {
      fname: '',
      lname: '',
      imgSrc: '',
    }
  },
  methods: {
    async acceptRental(){
      await RentalService.accept(this.id);
      this.$emit("update");
      // location.reload();
    },
    async denyRental(){
      await RentalService.deny(this.id)
      this.$emit("update");
      // location.reload();
    }
  },
  async beforeMount() {
    const userInfo = (await UserAccountService.getUser(this.renter)).data
    const img = (await ImageService.getImagesByProductId(this.renter)).data
    this.fname = userInfo.fname;
    this.lname = userInfo.lname;
  }
}
</script>

<style scoped>
.rentalCard {
  margin: 10px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
}



.rentalButton {
  margin: 5px;
  width: 100px;
}

</style>