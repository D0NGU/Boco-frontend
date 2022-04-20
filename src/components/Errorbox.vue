<!-- En errorboks. Inneholder en dynamisk feilmelding -->

<template>

    <v-alert type="error">
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


</style>