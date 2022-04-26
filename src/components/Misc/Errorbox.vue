<!-- En errorboks. Inneholder en dynamisk feilmelding -->

<template>

   

    <v-alert
      class="d-inline-flex pa-5"
      border="bottom"
      colored-border
      type="warning"
      elevation="2"
      
    >
      <h1> {{ message }} </h1>
    </v-alert>

  
</template>

<script>

import LoginService from '../../service/LoginService.js'

export default {

    props: ['message'],

    data() {
      return {
          error: null,
          email: 'oskareid@stud.ntnu.no',
          password: 'password',
          token: ''
      }
    },


    
methods: {
  getToken() {
           

        },
}
      
            
}
  

</script>

<style>


</style>