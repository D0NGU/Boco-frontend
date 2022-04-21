<!-- En errorboks. Inneholder en dynamisk feilmelding -->

<template>

   

    <v-alert
      class="d-inline-flex pa-5"
      border="bottom"
      colored-border
      type="warning"
      elevation="2"
      
    >
      <h1> {{ errorMsg }} </h1>
    </v-alert>

  
</template>

<script>
export default {

    computed: {
        errorMsg() {
            return this.$store.state.errorMsg
        }
    }

}
</script>

<style>

.error {

}

</style>