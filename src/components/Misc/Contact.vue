<template>
  <h1 id="header">Kontakt oss</h1>
  <div id="container">
    <div id="textFieldWrapper">
      <v-text-field id="name" v-model="fullname" readonly label="Fullt navn"></v-text-field>
      <v-text-field id="email" v-model="email" readonly label="E-postadresse"></v-text-field>
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
  </div>



</template>

<script>
import UserAccountService from "@/service/UserAccountService";

export default {
  name: "Contact",
  data () {
    return {
      fullname: '',
      fname: '',
      lname: '',
      email: '',
      feedback: '',
      rules: [
          value => !!value || 'Påkrevd.',
          value => (value && value.length >= 3) || 'Minimum 3 bokstaver.',
      ],
    }
  },
  methods: {
    async sendContact(){
      let tempStat = '';
      await UserAccountService.sendContactForm(1, this.fname, this.lname, this.email, this.feedback, this.$store.getters.myUserId).then(response => {
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
    this.fullname = userInfo.fname + " " + userInfo.lname;
    this.fname = userInfo.fname
    this.lname = userInfo.lname
    this.email = userInfo.email
  }
}
</script>

<style scoped>
h1 {
  margin-top: 20px;
  margin-bottom: 20px;
}

#container {
  width: 350px;
  margin: 0 auto;
  background-color: white;
  padding: 1em;
}

#textFieldWrapper{
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
  margin-top: -0.5em;
}

</style>