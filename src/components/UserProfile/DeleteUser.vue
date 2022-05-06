<template>
  <h1>Slett bruker</h1>
  <div class="d-flex flex-column mb-6 container">
    <v-card
        class="mx-auto"
        max-width="350"
        outlined
        id="deleteUserScreen"

    >
     <v-card-header-text id="header">Er du sikker på at du vil slette brukeren din?</v-card-header-text>
      <v-card-text>Denne handlingen kan ikke angres.</v-card-text>
      <v-text-field type="password" label="Tast inn passord for å slette bruker" v-model="password" ></v-text-field>
      <v-card-actions class="justify-center">
        <v-btn
            class="v-btn--elevated"
            v-bind:style="{'color' : 'white', 'background-color' : 'firebrick'}"
            @click="deleteUser()"

        >
          Slett bruker
        </v-btn>
        <v-btn
            text
            onclick="location.href='/account'"
        >
          Avbryt
        </v-btn>
      </v-card-actions>

      <v-alert
          class="deletedAlert"
          dismissible
          type="error"
          max-width="300px"
          v-if="error"
      > {{errorMsg}}
      </v-alert>

      <v-alert
          class="deletedAlert"
          dismissible
          type="success"
          max-width="300px"
          v-if="deleted"
      >Brukeren ble slettet!
      </v-alert>
    </v-card>
  </div>

</template>

<script>
import UserAccountService from "@/service/UserAccountService";

export default {
  name: "DeleteUser",
  data(){
    return{
      deleted: false,
      password: '',
      userInfo: '',
      errorMsg: '',
      error: false,
    }
  },
  methods: {
    async deleteUser(){
      await UserAccountService.delete(this.$store.getters.myUserId, this.password).then(response => {
        this.deleted = true;
        this.$store.commit('SET_STATUS', false)
        setTimeout(() => this.$router.push({path: '/login'}), 1500);
      }).catch((error) => {
        if(error.response.status === 401){
          this.errorMsg = "Feil passord. Prøv igjen."
          this.error = true;
        } else {
          this.errorMsg = "Noe gikk galt. Prøv igjen eller ta kontakt med kundestøtte."
          this.error = true;
        }
      })
    },
  },
  beforeMount() {
    if(!(this.$store.state.loggedIn)){
      this.$router.push({name: "NotFound"})
    }
  }
}
</script>

<style scoped>
.container {
  padding: 1em;
}
  #header{
    margin: 1em;
  }
  .deletedAlert{
    margin: 1.5em;
  }
  .v-text-field {
    margin: 10px;
  }

  #deleteUserScreen {
    box-shadow: none;
  }

  .v-btn {
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 0.2), 0px 2px 2px 0px rgb(0 0 0 / 0.14), 0px 1px 5px 0px rgb(0 0 0 / 0.12)
  }

  h1 {
    margin-top: 20px;
    margin-bottom: 20px;
  }

button {
  margin: 0.4em 0.4em 0.8em 0.4em;
}
</style>