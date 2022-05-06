<template>
  <h1 id="header">Tilbakestill passord</h1>
  <v-form  ref="reset" id="restForm" @submit.prevent="resetPassword" v-model="valid" lazy-validation>
    <div id="container">

      <div id="inputWrapper">
        <v-text-field :rules="rulesApplyToAll" type="password" label="Nytt passord" v-model="newPassword"></v-text-field>
        <v-text-field :rules="rulesApplyToAll" type="password" label="Gjenta passord" v-model="newPasswordRepeat"></v-text-field>
      </div>

      <v-row>
        <v-col
            cols="12"
        >
          <v-btn
              id="sendForm"
              @click="resetPassword"
              :disabled="!valid"
          >Lagre</v-btn>
        </v-col>
        <v-col
            cols="12"
        >
          <v-btn
              id="dismiss"
              @click="this.$router.push('/login')"
          >Avbryt</v-btn>
        </v-col>
      </v-row>
    </div>
  </v-form>


  <v-dialog id="popOut" v-model="dialog">
    <v-card>
      <v-card-title v-if="success" class="text-h5"> Nytt passord lagret! </v-card-title>
      <v-card-title v-if="!success" class="text-h5"> Ugyldig passord! </v-card-title>
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

</template>

<script>
import UserAccountService from "@/service/UserAccountService";
import {useRoute} from "vue-router";

export default {
  name: "ResetPassword",
  setup() {
    const route = useRoute();
    console.log(route.query.token)
    const token = route.query.token;
    console.log(token)
    return {
      token,
    }
  },
  data () {
    return {
      newPassword: '',
      newPasswordRepeat: '',
      success: '',
      dialog: false,
      valid: true,
      rulesApplyToAll: [
        value => !!value || 'Required.',
      ],
    }
  },
  methods: {
    async resetPassword(){
      let tempStat = '';
      if(this.newPassword === this.newPasswordRepeat){
        await UserAccountService.resetPassword(this.token, this.newPassword).then(response => {
          tempStat = response.status;
          this.success = response.data;
          this.dialog = true;
        }).catch((error) => {
          if(error.response){
            tempStat = error.response.status;
          }
        })
        this.confirmationSnackBar = true;
      } else {
        this.success = false
        this.dialog = true
      }
    },
    close() {
      this.dialog = false;
      if(this.success) {
        this.$router.push("/login");
      }
    }
  },
}
</script>

<style scoped>
h1 {
  margin-top: 30px;
  margin-bottom: 30px;
}

#textFieldWrapper{
  margin: 0 auto;
}

#container {
  width: 350px;
  background-color: white;
  padding: 1em;
  margin: auto auto 60px;
}

#sendForm{
  background-color: var(--bocoBlue);
  color: white;
  font-weight: bold;
}

#dismiss{
  color: var(--bocoBlue);
  font-weight: bold;
  margin-top: -1em;
  margin-bottom: 15px;
}

</style>