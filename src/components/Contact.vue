<template>
  <h1 id="header">Kontakt oss</h1>
  <v-text-field
      v-model="fname"
      label="Fornavn"
      type="text"
      hide-details="auto"
  ></v-text-field>
  <v-text-field
      v-model="lname"
      label="Etternavn"
      type="text"
      hide-details="auto"
  ></v-text-field>
  <v-text-field
      v-model="email"
      label="E-post"
      type="text"
      hide-details="auto"
  ></v-text-field>
  <v-text-field
      id="feedbackField"
      v-model="feedback"
      label="Kommentar"
      type="text"
      hide-details="auto"
      height="200px"
  ></v-text-field>
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
export default {
  name: "Contact",
  data () {
    return {
      fname: '',
      lname: '',
      email: '',
      feedback: '',
    }
  },
  methods: {
    sendContact(){
      console.log("Form is sent.");
    }
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