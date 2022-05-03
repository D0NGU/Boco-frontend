<template>
  <h1 id="header">Kontakt oss</h1>
  <div id="textFieldWrapper">
    <v-text-field id="name" v-model="name" label="Fullt navn" hide-details="auto" :rules="rules"></v-text-field>
    <v-text-field id="email" v-model="email" label="E-postadresse" hide-details="auto" :rules="emailRules"></v-text-field>
    <v-text-field id="feedbackField" v-model="feedback" label="Kommentar" type="text" hide-details="auto" :rules="rules"></v-text-field>
  </div>

  <v-row>
    <v-col
      cols="12"
    >
      <v-btn
          id="sendForm"
          @click="sendContact"
      >Send kontaktskjema</v-btn>
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


</template>

<script>
import UserAccountService from "@/service/UserAccountService";
import router from "@/router";

export default {
  name: "Contact",
  data () {
    return {
      name: '',
      email: '',
      feedback: '',
      rules: [
          value => !!value || 'Påkrevd.',
          value => (value && value.length >= 3) || 'Minimum 3 bokstaver.',
      ],
      emailRules: [
        v => !!v || 'Påkrevd.',
        v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-post må være gyldig.',
      ],
    }
  },
  methods: {
    async sendContact(){
      //TODO: Legg til tilbakemelding i backend!
      let tempStat = '';
      await UserAccountService.sendContactForm(this.name, this.email, this.feedback).then(response => {
        tempStat = response.status;
      }).catch((error) => {
        if(error.response){
          tempStat = error.response.status;
        }
      })
      setTimeout(() => this.$router.push('/home'), 500);
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
#header{
  padding: 0.5em;
}
.v-text-field{
  padding: 0.5em;
}
#textFieldWrapper{
  padding: 0.5em;
  margin: 0 auto;
}
#sendForm{
  margin-top: 1.5em;
  background-color: var(--bocoBlue);
  color: white;
  font-weight: bold;
}
#dismiss{
  color: var(--bocoBlue);
  font-weight: bold;
}
</style>