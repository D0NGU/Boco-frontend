<!-- registrerings komponent -->

<template>
  <v-form id="RegisterForm" @submit.prevent="submit">
    <h1>Register</h1>

    <div id="test">
      <label>First Name:</label>
      <v-text-field v-model="firstname"></v-text-field>

      <label>Last Name: </label>
      <v-text-field v-model="lastname"></v-text-field>

      <label>Email:</label>
      <v-text-field v-model="email"></v-text-field>

      <label>Address:</label>
      <v-text-field v-model="address"></v-text-field>

      <label>Tlf:</label>
      <v-text-field v-model="tlf"></v-text-field>

      <label>Password: </label>
      <v-text-field v-model="password"></v-text-field>

      <label>Rewrite password: </label>
      <v-text-field hide-details v-model="rewritePassword"></v-text-field>
    </div>

    <div>
      <v-btn v-on:click="submit">Register</v-btn>
    </div>



  </v-form>
</template>

<script>
export default {
  data() {
    return {
      firstname: '',
      lastname: '',
      email: '',
      address: '',
      tlf: '',
      password: '',
      rewritePassword: '',
    }
  },

  methods: {
    submit() {
      console.log("Register button clicked")
    }
  }
}
</script>

<style scoped>

#RegisterForm {
  display: grid;
  justify-content: center;
  border: solid 2px;

}

#test {
  border: solid 2px;
  width: 300px;
}

</style>