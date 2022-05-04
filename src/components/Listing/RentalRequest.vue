<!-- component for forespørsel siden -->

<template>
  <v-card class="rounded-l rentalCard">
    <v-avatar x-large id="profilePicture"><v-img src="https://www.megaflis.no/globalassets/productimages/6952062643067_1.png?ref=1931F74161&w=1920&scale=both&mode=pad&h=1920&format=jpg"></v-img></v-avatar>
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

#profilePicture {
  flex-grow: 1;
}

#rentalDetails {
  flex-grow: 1;
}

.rentalButton {
  margin: 5px;
}

</style>