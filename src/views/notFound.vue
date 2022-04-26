<template>
  <h1>404</h1>
  <ErrorBox :message='message'/>
</template>

<script>

import ErrorBox from '../components/Misc/Errorbox.vue'

export default {
    name: 'NotFound',
    components: {ErrorBox},

    data() {
      return {
       message: 'No Such Page'
      }
    },
/*
    mounted() { // runs when view is mounted to the DOM
        this.$store.commit('setErrorMsg', 'No such page')
    }
*/

}
</script>

<style>

</style>