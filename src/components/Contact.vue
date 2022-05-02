<template>
  <h1>Kontakt oss</h1>
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
      v-model="feedback"
      label="Kommentar"
      type="text"
      hide-details="auto"
      height="100px"
  ></v-text-field>
  <v-btn
      id="sendForm"
  >Send kontaktskjema</v-btn>
  <v-btn
      id="dismiss"
  >Avbryt</v-btn>
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
  }
}
</script>

<style scoped>
#sendForm{
  background-color: var(--bocoBlue);
  color: white;
  font-weight: bold;
}
#dismiss{
  color: var(--bocoBlue);
  font-weight: bold;
}
</style>