<template>

  <h1>Innstillinger</h1>
  <v-card id="container">
    <div id="textFieldWrapper">
      <v-text-field id="name" v-model="name" readonly label="Navn"></v-text-field>
      <v-text-field id="email" v-model="email" label="E-postadresse"></v-text-field>
      <v-file-input
          v-model="picture"
          label="Last opp bilde"
          hide-details="auto"
          accept="image/jpeg"
          prepend-icon="mdi-camera"
      />
      <v-text-field type="password" label="Gammelt passord" v-model="oldPassword"></v-text-field>
      <v-text-field type="password" label="Nytt passord" v-model="newPassword"></v-text-field>
      <v-text-field type="password" label="Gjenta passord" v-model="newPasswordRepeat"></v-text-field>
      <v-switch inset="" color="indigo" label="Offentlig kjøpshistorikk" v-model="hideHistory"></v-switch>
    </div>

    <v-btn id="saveBtn" @click="handleSaveClick" class="settingsButtons">Lagre</v-btn>
    <v-dialog
        v-model="dialog"
        persistent
        min-width="70px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn id="logOut"  class="settingsButtons" v-bind="attrs" v-on="on" @click="dialog=true"> Logg ut</v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h6">Er du sikker på at du vil logge ut?</v-card-title>
        <v-card-text>Du vil være nødt til å logge inn på nytt.</v-card-text>
        <v-card-actions justify="center">
          <v-btn
              color="indigo darken-4"
              @click="dialog = false"
          >
            Nei
          </v-btn>
          <v-btn
              color="red darken-4"
              @click="logOut"
          >
            Ja, logg ut
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-spacer>
      <v-btn id="deleteUser" color="error" :to="{name: 'DeleteUser'}" class="settingsButtons"> Slett bruker</v-btn>
    </v-spacer>
    <v-snackbar
        color="success"
        :timeout="3000"
        v-model="confirmationSnackBar"
        top
    >Endringene har blitt lagret! </v-snackbar>
  </v-card>

</template>

<script>
import UserAccountService from "@/service/UserAccountService";
import cookies from 'vue-cookie';
import ImageService from "@/service/ImageService";

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
      dialog: false,
      picture: []
    }
  },
  methods: {
    async handleSaveClick(){
      if(this.newPassword === this.newPasswordRepeat && this.newPassword !== ""){
        await UserAccountService.editPassword(this.$store.getters.myUserId, this.email, this.oldPassword, this.newPassword);
        this.confirmationSnackBar = true;
      }
      if (this.picture) {
        let img = await this.getBase64(this.picture[0]);
        console.log(img);
        await ImageService.setProfilePic(img, this.$store.getters.myUserId);
        this.confirmationSnackBar = true;
      }
      if(this.newPassword === ""){
        await UserAccountService.editPassword(this.$store.getters.myUserId, this.email, this.oldPassword, this.oldPassword);
      }
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        let blob;
        reader.onload = () => resolve({
              img: reader.result.split(",")[1],
            },
        );
        reader.onerror = error => reject(error);
      });
    },
    logOut() {
      this.$store.commit('SET_STATUS', false);
      cookies.set('token', "", { path: '/' });
      cookies.set('userId', "", {path: '/'})
      cookies.set('email', "", {path: '/'})
      this.dialog = false;
      setTimeout( () => this.$router.push({ path: '/login'}), 300);
    },
  },
  async beforeMount() {
    const userInfo = (await UserAccountService.getUserId(this.$store.state.email)).data
    this.name = userInfo.fname + " " + userInfo.lname
    this.email = userInfo.email
  }
}
</script>

<style scoped>

#container {
  background-color: white;
  width: 350px;
  padding: 1em;
  margin: 0 auto;
  box-shadow: none;
}

h1 {
  margin-top: 20px;
  margin-bottom: 20px;
}

#textFieldWrapper {
  margin: 0 auto;
}

#saveBtn {
  color: white;
  background-color: var(--bocoBlue);
}

button {
  margin: 0.4em 0.4em 0.8em 0.4em;
}

.v-file-input {
  margin-bottom: 2.5em;
}


</style>