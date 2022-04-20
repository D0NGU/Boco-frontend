<template>
  <h1>404</h1>
  <ErrorBox />
</template>

<script>

import ErrorBox from '../components/Errorbox.vue'

export default {
    name: 'NotFound',
    components: {ErrorBox},

    data() {
      return {

      }
    },

    mounted() { // runs when view is mounted to the DOM
        this.$store.commit('setErrorMsg', 'No such page')
    }


}
</script>

<style>

</style>