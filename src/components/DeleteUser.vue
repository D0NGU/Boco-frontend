<template>
  <v-card
      class="mx-auto"
      max-width="200"
      outlined
  >
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5 mb-1">
          Er du sikker på at du vil slette brukeren din?
        </v-list-item-title>
        <v-list-item-subtitle>
          Denne handlingen kan ikke angres.
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions>
      <v-btn
        outlined
        rounded
        text
        color="red"
        v-on:click="deleteUser(this.user.id)"
      >
        Slett bruker
      </v-btn>
      <v-btn
        outlined
        rounded
        text
      >
        Avbryt
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import UserSettingService from "@/service/UserSettingService";

export default {
  name: "DeleteUser",
  data(){
    user:{}
  },
  methods: {
    deleteUser(user){
      this.axios.delete("http://localhost:8080/api/user/delete").then((response)=>{
        console.warn(response)
        UserSettingService.delete(this.user)
      })
    }
  }
}
</script>

<style scoped>

</style>