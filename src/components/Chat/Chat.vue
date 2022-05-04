<template>
  <v-card class="chatCard">
    <v-row no-gutters=""
           align="center"
           justify="center"
    >
      <v-col
          cols="2"
          md="2">
        <v-icon class="chatIcon"> mdi-message </v-icon>
      </v-col>
      <v-col cols="8"
             sm="4"
             md="8">
        <p class="chatText">Du har fått en ny melding</p>
      </v-col>
    </v-row>
  </v-card>

  <v-card class="chatCard">
    <v-row no-gutters=""
           align="center"
           justify="center">
      <v-col
          cols="2"
          md="2">
        <v-icon class="chatIcon"> mdi-message-outline </v-icon>
      </v-col>
      <v-col cols="8"
             sm="4"
             md="8">
        <p class="chatText">Melding fra Guro</p>
      </v-col>
    </v-row>
  </v-card>

  <v-card class="chatCard">
    <v-row no-gutters=""
           align="center"
           justify="center">
      <v-col
          cols="2"
          md="2">
        <v-icon class="chatIcon"> mdi-message-outline </v-icon>
      </v-col>
      <v-col cols="8"
             sm="4"
             md="8">
        <p class="chatText"> Melding fra Ole </p>
      </v-col>
    </v-row>
  </v-card>

</template>

<script>
export default {
  name: "Chat",
  data () {
    return {
      dialog: false,
    }
  },
}
</script>

<style scoped>
.chatCard {
  margin: 10px 0;
  background-color: white;
}

.chatText {
  padding: 12px 0;
  color: black;
}

.chatIcon {
  cursor: pointer;
}

</style>