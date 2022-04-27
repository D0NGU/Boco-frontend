<template>
  <h1>Innstillinger</h1>
  <v-text-field id="name" v-model="name" readonly label="Navn"></v-text-field>
  <v-text-field id="email" v-model="email" readonly label="E-post"></v-text-field>
  <v-text-field type="password" label="Gammelt passord" v-model="oldPassword"></v-text-field>
  <v-text-field type="password" label="Nytt passord" v-model="newPassword"></v-text-field>
  <v-text-field type="password" label="Gjenta passord" v-model="newPasswordRepeat"></v-text-field>
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
import UserAccountService from "@/service/UserAccountService";

export default {
  name: "Settings",
  data () {
    return {
      userInfo: '',
      oldPassword: "",
      newPassword: "",
      newPasswordRepeat: "",
      hideHistory: false,
      confirmationSnackBar: false,
    }
  },
  methods: {
    handleSaveClick(){
      if(this.newPassword === this.newPasswordRepeat){
        this.userInfo = UserAccountService.getUser(this.$store.state.myUserId)
        UserAccountService.editPassword(this.userInfo.email, this.oldPassword, this.newPassword);
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