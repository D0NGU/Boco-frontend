<template>
  <h1>Innstillinger</h1>
  <div id="textFieldWrapper">
    <v-text-field id="name" v-model="name" readonly label="Navn"></v-text-field>
    <v-text-field id="email" v-model="email" readonly label="E-postadresse"></v-text-field>
    <v-text-field type="password" label="Gammelt passord" v-model="oldPassword"></v-text-field>
    <v-text-field type="password" label="Nytt passord" v-model="newPassword"></v-text-field>
    <v-text-field type="password" label="Gjenta passord" v-model="newPasswordRepeat"></v-text-field>
    <v-switch inset="" color="indigo" label="Offentlig kjøpshistorikk" v-model="hideHistory"></v-switch>
  </div>

  <v-btn @click="handleSaveClick" class="settingsButtons">Lagre</v-btn>
  <v-btn id="logOut" color="error" :to="{name: 'Login'}" class="settingsButtons" @click="logOut()"> Logg ut</v-btn>
  <v-spacer>
    <v-btn id="deleteUser" color="error" :to="{name: 'DeleteUser'}" class="settingsButtons"> Slett bruker</v-btn>
  </v-spacer>
  <v-snackbar
      color="success"
      :timeout="3000"
      v-model="confirmationSnackBar"
      top
  >Passordet har blitt endret! </v-snackbar>
</template>

<script>
import UserAccountService from "@/service/UserAccountService";
import cookies from 'vue-cookie';

export default {
  name: "Settings",
  data () {
    return {
      name: '',
      email: '',
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
        UserAccountService.editPassword(this.email, this.oldPassword, this.newPassword);
        this.confirmationSnackBar = true;
      }
    },
    logOut() {
      console.log("Oskar er en grise gutt")
      this.$store.commit('SET_STATUS', false);
      cookies.set('token', "", { path: '/' });
    },
  },
  async beforeMount() {
    this.name = userInfo.fname + " " + userInfo.lname
    this.email = userInfo.email
  }
}
</script>

<style scoped>
.settingsButtons {
  margin: 10px 10px 20px 10px;
}

h1 {
  margin-top: 20px;
  margin-bottom: 20px;
}

#textFieldWrapper {
  margin: 0 auto;
  width: 350px;
}
</style>