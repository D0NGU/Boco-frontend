<template>
  <div class="d-flex flex-column mb-6">
    <v-card
        class="mx-auto"
        max-width="350"
        outlined

    >
     <v-card-header-text id="header">Er du sikker på at du vil slette brukeren din?</v-card-header-text>
      <v-card-text>Denne handlingen kan ikke angres.</v-card-text>
      <v-text-field type="password" label="Tast inn passord for å slette bruker" v-model="password" ></v-text-field>
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
import userAccountService from "@/service/UserAccountService";

export default {
  name: "DeleteUser",
  data(){
    return{
      clicked: false,
      password: '',
    }
  },
  methods: {
    async deleteUser(){
      // TODO Get user info and send with delete
      this.clicked = true;
      await userAccountService.delete(this.fname, this.lname, this.email, this.password).then(response => {
        console.warn(response)
      }).catch((error) => {
        console.warn(error.response);
      })
      this.$store.commit('SET_STATUS', false)
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
  .v-text-field {
    margin: 10px;
  }
</style>