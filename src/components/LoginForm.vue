<!-- Login form -->

<template>
  <div id="LoginForm">
    <h2 id="login">Login</h2>

    <div>
      <label>Email:</label>
      <v-text-field
          :rules="rulesApplyToAll"
          id="email"
          v-model="email">
      </v-text-field>
    </div>

    <div>
      <label>Password: </label>
      <v-text-field
          :rules="rulesApplyToAll"
          v-model="password"
          :type="show ?'text': 'password'"
          @click:append="show=!show">
      </v-text-field>
    </div>

    <div id="loginButton" class="text-center">

      <v-row justify="center">
        <v-btn
            dark
            @click.stop="dialog = true"
        >
          Log in
        </v-btn>

        <v-dialog v-if="loginStatus ==='Fail' "
            v-model="dialog"
        >
          <v-card>
            <v-card-title class="text-h5"> Login failed </v-card-title>
            <v-card-text> {{loginStatus}} </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="red"
                  text
                  @click="dialog = false"
              >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-if="loginStatus ==='Success'"
            v-model="dialog"
        >
          <v-card>
            <v-card-text>
              {{loginStatus}}
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="red"
                  text
                  @click="dialog = false"
              >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </div>

    <div>
      <v-btn onclick="location.href='register'">Register new user</v-btn>
    </div>
  </div>

</template>

<script>
//import axios from "axios";
export default {

  methods: {
    async handleClickSignIn (email, password) {
      console.log("Sign in button clicked!")
      const loginRequest = { email: email, password: password };

      /*await axios.post(`http://localhost:8080/api/auth/signin`, loginRequest).then(response => {
        this.loginStatus = response.data
      }).catch((error) => {
        if (error.response) {
          this.loginStatus = error.response.data;
        }
      })*/

    },

  },

  data() {
    return {
      email: '',
      password: '',
      loginStatus: 'Fail',
      rulesApplyToAll: [
        value => !!value || 'Required.',
      ],
      show: false,
      dialog: false,
    }
  },

}
</script>

<style scoped>


#LoginForm {
  display: grid;
  justify-content: center;
  padding: 20px;

}

label {
  padding-top: 20px;
}

v-btn {
  padding: 10px;
}

h2 {
  margin-bottom: 30px;
}

#loginButton {
  padding: 20px;
}

</style>