<template>
  <v-card class="rounded-xl rentalCard">
    <v-avatar x-large id="profilePicture"><v-img src="https://www.megaflis.no/globalassets/productimages/6952062643067_1.png?ref=1931F74161&w=1920&scale=both&mode=pad&h=1920&format=jpg"></v-img></v-avatar>
    <div id="rentalDetails">
      <p>{{ name }}</p>
      <p>{{ date }}</p>
      <v-btn color="success" class="rentalButton" @click="acceptRental">Godkjenn</v-btn>
      <v-btn color="error" class="rentalButton" @click="denyRental">Avslå</v-btn>
    </div>
  </v-card>
</template>

<script>
import RentalService from "@/service/RentalService";

export default {
  name: "RentalRequest",
  props: {
    id: Number,
    name: '',
    date: '',
  },
  methods: {
    acceptRental(){
      RentalService.accept(this.id)
    },
    denyRental(){
      RentalService.deny(this.id)
    }
  },
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