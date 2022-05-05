<!-- component for forespørsel siden -->

<template>
  <v-card class="rounded-l rentalCard">
    <div class="itemContainer">
      <v-img v-if="profilePicSrc" :src="profilePicSrc"/>
      <v-img v-else src="../../../assets/images/missing_profile_img.png" alt="profile picture"></v-img>

      <v-divider vertical />
      <div id="rentalDetails">
        <p class="text-subtitle-1">{{ fname }} {{ lname }}</p>
        <p>{{ date }}</p>
        <v-btn color="success" class="acceptButton" @click="acceptRental">Godkjenn</v-btn>
        <v-btn color="error" class="rentalButton" @click="denyRental">Avslå</v-btn>
      </div>

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
    productId: [Number, String],
  },
  data () {
    return {
      fname: '',
      lname: '',
      errorAccept: '',
      dialog: false,
      profilePicSrc: '',
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
    if (userInfo.profile64 !== "" && userInfo.profile64 !== null) {
      this.profilePicSrc = "data:image/jpeg;base64," +userInfo.profile64;
    }
  }
}
</script>

<style scoped>
.rentalCard {
  margin: 20px;
  background-color: white;
}
.itemContainer {
  height: 130px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  margin-right: -3em;
}
#rentalDetails {
  height: 100%;
  margin: 10px 0 10px 20px;
  text-align: left;
  position: relative;
  z-index: 1;
  flex-grow: 1;
}
.rentalButton {
  margin: 5px;
}
.acceptButton {
  margin: 5px 5px 5px 0;
}
.v-img {
  margin: 0 1em 0 1em;
}

</style>
