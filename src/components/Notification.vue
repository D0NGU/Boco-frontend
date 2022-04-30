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
        <p class="notifText">{{ description }}</p>
        <p class="text-caption dateText">{{ alertDate }}</p>
      </v-col>
      <v-col>
        <v-btn v-show="this.hasSeen" @click="markAsSeen(this.alertId)">
          Har sett
        </v-btn>
        <v-btn @click="deleteAlert(this.alertId)">
          Slett
        </v-btn>
      </v-col>
    </v-row>
  </v-card>

</template>

<script>
import {getApiClient} from "@/service/ApiService";

export default {
  name: "Notification",
  props: {
    alertId: Number,
    description: String,
    alertDate: Date,
    hasSeen: Boolean,
    optionalId: Number,
    userId: Number
  },
  data () {
    return {
      dialog: false,
    }
  },
  methods: {
    async deleteAlert(alertId) {
      await getApiClient.delete("/alerts/" + alertId)
      await this.getAlerts()
    },
    async markAsSeen(alertId) {
      await getApiClient.put("/alerts/seen/" + alertId)
    }
  }
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