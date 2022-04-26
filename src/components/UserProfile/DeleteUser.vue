<template>
  <div class="d-flex flex-column mb-6">
    <v-card
        class="mx-auto"
        max-width="350"
        outlined

    >
     <v-card-header-text id="header">Er du sikker på at du vil slette brukeren din?</v-card-header-text>
      <v-card-text>Denne handlingen kan ikke angres.</v-card-text>

      <v-card-actions class="justify-center">
        <v-btn
            outlined
            rounded
            text
            color="red"
            @click="deleteUser()"

        >
          Slett bruker
        </v-btn>
        <v-btn
            outlined
            rounded
            text
            onclick="location.href='/login'"
        >
          Avbryt
        </v-btn>
      </v-card-actions>

      <v-alert
          id="deletedAlert"
          dismissible
          type="success"
          max-width="300px"
          v-if="clicked ? 'true':''"
      >Brukeren ble slettet!
        <v-spacer></v-spacer>
        Registrer ny bruker <router-link :to="{name: 'RegisterForm'}">her</router-link></v-alert>
    </v-card>
  </div>

</template>

<script>
import UserSettingService from "@/service/UserSettingService";

export default {
  name: "DeleteUser",
  data(){
    return{
      clicked: false,
      userId: null,
      fname: '',
      lname: '',
      email: '',
      salt: '',
      password: '',
    }
  },
  methods: {
    async deleteUser(){
      this.clicked = true;
      await UserSettingService.delete(this.userId, this.fname, this.lname, this.email, this.salt, this.password).then(response => {
        console.warn(response.data)
      }).catch((error) => {
        console.warn(error.response.data);
      })
    },
  }
}
</script>

<style scoped>
  #header{
    margin: 1em;
  }
  #deletedAlert{
    margin: 1.5em;
  }
</style>