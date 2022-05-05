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

  <v-dialog v-model="dialog">
    <v-card>
      <v-card-title v-if="errorAccept" class="text-h5"> Kan ikke godkjennes </v-card-title>
      <v-card-text v-if="errorAccept"> {{ errorAccept }} </v-card-text>
      <v-card-actions>
        <v-btn
            color="red"
            text
            @click=close()
        >
          Lukk
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
    productId: [Number, String],
  },
  data () {
    return {
      fname: '',
      lname: '',
      errorAccept: '',
      dialog: false,
    }
  },
  methods: {
    async acceptRental(){
      await RentalService.accept(this.id).then().catch((err) => this.errorAccept = "Den produkt er allerede lånt av en annen på gitt dato: " + this.date);
      if (this.errorAccept !== ''){
        this.dialog = true
      }
      this.$emit("update");
      // location.reload();
    },
    async denyRental(){
      await RentalService.deny(this.id)
      this.$emit("update");
      // location.reload();
    },
    close() {
      this.dialog = false;
      this.$emit("close");
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
