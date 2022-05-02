<template>
    <v-row id="footer" justify="center" no-gutters="">
      <v-col cols="12">
        <h3>BoCo</h3>
        <v-divider color="white"/>
        <h4 onclick="location.href='/Home'">Kontakt oss</h4>
      </v-col>
      <!--<v-col id="date" cols="12">
        <h5>Laget av</h5>
        Scrum-team 08 -
        {{ new Date().getFullYear() }}
      </v-col>-->
    </v-row>
</template>

<script>
export default {
  name: "Footer",
  data () {
    return {

    }
  },
}
</script>

<style scoped>
#footer{
  padding: 1em;
  background-color: var(--bocoBlue);
  color: white;
}
#date{
  padding-top: 1em;
}

</style>