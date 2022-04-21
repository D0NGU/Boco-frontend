<!-- registrerings komponent -->

<template>
  <v-form ref="form" id="RegisterForm" @submit.prevent="submit">
    <h1>Register</h1>

    <div id="test">
      <label>First Name:</label>
      <v-text-field
          :rules="rulesApplyToAll"
          v-model="firstname">
      </v-text-field>

      <label>Last Name: </label>
      <v-text-field
          :rules="rulesApplyToAll"
          v-model="lastname">
      </v-text-field>

      <label>Email:</label>
      <v-text-field
          :rules="emailRules"
          v-model="email">
      </v-text-field>

      <label>Password: </label>
      <v-text-field
          :rules="rulesApplyToAll"
          v-model="password"
          :type="show ?'text': 'password'"
          @click:append="show=!show">
      </v-text-field>

    </div>

    <div>
      <v-btn type="submit">Register</v-btn>
    </div>



  </v-form>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid',
      ],
      rulesApplyToAll: [
        value => !!value || 'Required.',
      ],
      show: false,
    }
  },

  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        console.log("Form is validated")

        const registerNewUserRequest = { fname: this.firstname, lname: this.lastname, email: this.email,  password: this.password  };
        let registerResponse;

        await axios.post(`http://localhost:8080/api/auth/signup`, registerNewUserRequest).then(response => {
        registerResponse = response.data
        console.log(registerResponse)
      }).catch((error) => {
        if (error.response) {
          console.log(error.response.data)
        }
      })
      }

    }
  }
}
</script>

<style scoped>

#RegisterForm {
  display: grid;
  justify-content: center;
}

#test {
  width: 300px;
}

</style>