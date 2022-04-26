<template>
  <h1>Innstillinger</h1>
  <v-text-field id="name" v-model="name" readonly label="Navn"></v-text-field>
  <v-text-field id="email" v-model="email" readonly label="E-post"></v-text-field>
  <v-text-field type="password" label="Nytt passord"></v-text-field>
  <v-text-field type="password" label="Gjenta passord"></v-text-field>
  <v-switch inset="" color="success" label="Offentlig kjøpshistorikk" v-model="hideHistory"></v-switch>
  <v-btn @click="handleSaveClick" id="saveBtn">Lagre</v-btn>
  <v-btn id="deleteUser" color="error" :to="{name: 'DeleteUser'}"> Slett bruker</v-btn>
  <v-snackbar
      color="success"
      :timeout="3000"
      v-model="confirmationSnackBar"
      top
  >Passordet har blitt endret! </v-snackbar>
</template>

<script>
import { editPassword } from '@/service/UserAccountService.js'
export default {
  name: "Settings",
  data () {
    return {
      // TODO Få verdier fra backend/store
      name: "Per Hansen",
      email: "per.h@test.no",
      newPassword: "",
      newPasswordRepeat: "",
      hideHistory: false,
      confirmationSnackBar: false,
    }
  },
  methods: {
    handleSaveClick(){
      if(this.newPassword === this.newPasswordRepeat){
        editPassword(this.newPassword);
        this.confirmationSnackBar = true;
      }
    },
  }
}
</script>

<style scoped>
#saveBtn {
  margin: 10px;
}
</style>