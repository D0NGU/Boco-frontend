<template>
  <h1 id="header">Glemt passord</h1>
  <v-form ref="reset" id="restForm" @submit.prevent="resetPassword" v-model="valid" lazy-validation>
    <div id="container">
      <div id="textFieldWrapper">
        <v-text-field :rules="emailRules" id="email" v-model="email"  label="E-postadresse"></v-text-field>
      </div>

      <v-row>
        <v-col
            cols="12"
        >
          <v-btn
              id="sendForm"
              @click="resetPassword"
              :disabled="!valid"
          >Tilbakestill passord</v-btn>
        </v-col>
        <v-col
            cols="12"
        >
          <v-btn
              id="dismiss"
              @click="$router.back()"
          >Avbryt</v-btn>
        </v-col>
      </v-row>
    </div>
  </v-form>

  <v-dialog id="popOut" v-model="dialog">
    <v-card>
      <v-card-title v-if="success" class="text-h5"> En e-post med videre instruksjoner har blitt sendt til din e-postadresse! </v-card-title>
      <v-card-title v-if="!success" class="text-h5"> Ugyldig e-postadresse! </v-card-title>
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
import router from "@/router";

export default {
  name: "RequestPasswordReset",
  data () {
    return {
      email: '',
      success: '',
      dialog: false,
      valid: true,
      rules: [
        value => !!value || 'Påkrevd.',
        value => (value && value.length >= 3) || 'Minimum 3 bokstaver.',
      ],
      emailRules: [
        v => !!v || 'Required',
        v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid',
      ],
    }
  },
  methods: {
    async resetPassword(){
      let tempStat = '';
      await UserAccountService.requestPasswordReset(this.email).then(response => {
        tempStat = response.status;
        this.success = response.data;
        this.dialog = true;
      }).catch((error) => {
        if(error.response){
          tempStat = error.response.status;
          this.success = false;
          this.dialog = true;
        }
      })
    },
    close() {
      this.dialog = false;
    }
  },
}
</script>

<style scoped>
h1 {
  margin-top: 30px;
  margin-bottom: 30px;
}

#container {
  width: 350px;
  background-color: white;
  padding: 1em;
  margin: auto auto 60px;
}

#textFieldWrapper{
  margin: 0 auto;
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