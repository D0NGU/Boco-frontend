<template>
  <h1 id="header">Kontakt oss</h1>
  <div id="textFieldWrapper">
    <v-text-field id="name" v-model="name" readonly label="Navn"></v-text-field>
    <v-text-field id="email" v-model="email" readonly label="E-postadresse"></v-text-field>
    <v-text-field
        id="feedbackField"
        v-model="feedback"
        label="Kommentar"
        type="text"
        hide-details="auto"
    ></v-text-field>
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
          onclick="location.href='/home'"
      >Avbryt</v-btn>
    </v-col>
  </v-row>


</template>

<script>
import UserAccountService from "@/service/UserAccountService";

export default {
  name: "Contact",
  data () {
    return {
      name: '',
      email: '',
      feedback: '',
    }
  },
  methods: {
    sendContact(){
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