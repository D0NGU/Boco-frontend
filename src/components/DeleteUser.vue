<template>
  <div class="d-flex flex-column mb-6">
    <v-card
        class="mx-auto"
        max-width="350"
        outlined

    >
      <v-list-item two-line>
        <v-list-item-content class="justify-center">
          <v-list-item-title class="text-h8 mb-1">
            Er du sikker på at du vil slette brukeren din?
          </v-list-item-title>
          <v-list-item-subtitle>
            Denne handlingen kan ikke angres.
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-actions class="justify-center">
        <v-btn
            outlined
            rounded
            text
            color="red"
            onclick="deleteUser(this.user)"
            @click="clicked = true"
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
          :dismissible="true"
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
    }
    user: {}
  },
  methods: {
    deleteUser(user){
      clicked: true,
      this.axios.delete("http://localhost:8080/api/user/delete").then((response)=>{
        console.warn(response)
        UserSettingService.delete(this.user)
      })
    },
  }
}
</script>

<style scoped>
  #deletedAlert{
    margin-left: 1.5em;
  }

</style>