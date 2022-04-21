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

    <div class="text-center">

      <v-row justify="center">
        <v-btn
            type="submit"
            color="#CFD8DC"
            dark
            @click.stop="dialog = true"
        >
          Register
        </v-btn>

        <v-dialog v-if="regisState ==='Success' "
                  v-model="dialog"
                  persistent
        >
          <v-card>
            <v-card-title class="text-h5"> Registered! </v-card-title>
            <v-card-text> You are registered </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="red"
                  text
                  @click=close()
              >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
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
      regisState: 'Success',
      dialog: false
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

    },

    close() {
      this.dialog = false
      location.href = 'login'
    }
  }
}
</script>

<style scoped>

#RegisterForm {
  display: grid;
  justify-content: center;
  padding: 20px;
  margin-top: 30px;
}

#test {
  width: 300px;
}

</style>