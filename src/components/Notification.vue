<template>
  <v-card class="notifCard">
    <v-row no-gutters=""
           align="center"
           justify="center"
    >
      <v-col
          cols="2"
      md="2">
        <v-icon class="notifIcon"> mdi-message-draw </v-icon>
      </v-col>
      <v-col cols="8"
      sm="4"
      md="8">
        <p class="notifText">Du har fått en anmeldelse</p>
        <p class="text-caption dateText">Fre 29. April 12:00</p>
      </v-col>
    </v-row>
  </v-card>

  <v-card class="notifCard">
    <v-row no-gutters=""
           align="center"
           justify="center">
      <v-col
          cols="2"
          md="2">
        <v-icon class="notifIcon"> mdi-newspaper-plus </v-icon>
      </v-col>
      <v-col cols="8"
             sm="4"
             md="8">
        <p class="notifText">Du har fått en forespørsel</p>
      </v-col>
    </v-row>
  </v-card>

  <v-card class="notifCard">
    <v-row no-gutters=""
           align="center"
           justify="center">
      <v-col
          cols="2"
          md="2">
        <v-icon class="notifIcon"> mdi-newspaper-minus </v-icon>
      </v-col>
      <v-col cols="8"
             sm="4"
             md="8">
        <p class="notifText"> Leien av et produkt har blitt avlyst </p>
      </v-col>
    </v-row>
  </v-card>

  <v-card class="notifCard">
    <v-row no-gutters=""
           align="center"
           justify="center">
      <v-col
          cols="2"
          md="2">
        <v-icon class="notifIcon"> mdi-newspaper-plus </v-icon>
      </v-col>
      <v-col cols="8"
             sm="4"
             md="8">
        <p class="notifText"> Utleier har godkjent forespørselen din </p>
      </v-col>
    </v-row>
  </v-card>

  <v-card class="notifCard">
    <v-row no-gutters=""
           align="center"
           justify="center">
      <v-col
          cols="2"
          md="2">
        <v-icon class="notifIcon"> mdi-newspaper-minus </v-icon>
      </v-col>
      <v-col cols="8"
             sm="4"
             md="8">
        <p class="notifText">Utleier har avslått forespørselen din</p>
      </v-col>
    </v-row>
  </v-card>

</template>

<script>
export default {
  name: "Notification",
  data () {
    return {
      dialog: false,
    }
  },
}
</script>

<style scoped>
.notifCard {
  margin: 10px 0;
  background-color: white;
}

.notifText {
  padding: 12px 0;
  color: black;
}
.dateText {
  padding: 0 0 6px 0;
}
</style>