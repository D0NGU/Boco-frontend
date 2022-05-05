<!-- component for notification siden -->

<template>
  <v-card class="notifCard">
    <v-row no-gutters=""
           align="center"
           justify="center"
    >
      <v-col
          cols="2"
          md="2">
        <v-icon class="notifIcon">{{icon}}</v-icon>
      </v-col>

      <v-col cols="8"
      sm="4"
      md="8"
      @click="routeToProduct(optionalId), markAsSeen(alertId)">
        <p class="notifText">{{ description }}</p>
        <p class="text-caption dateText">{{ alertDate }}</p>
      </v-col>
      <v-col cols="1">
        <v-icon title="Marker som sett" v-show="!this.hasSeen" @click="markAsSeen(this.alertId)"> mdi-eye</v-icon>
        <v-icon title="Har sett" v-show="this.hasSeen"> mdi-check-bold</v-icon>
      </v-col>
      <v-col cols="1">
        <v-icon title="Slett" @click="deleteAlert(this.alertId)">mdi-trash-can-outline</v-icon>
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
    userId: Number,
  },
  data () {
    return {
      dialog: false,
      icon: '',
    }
  },
  methods: {
    async deleteAlert(alertId) {
      await getApiClient.delete("/alerts/" + alertId)
      this.$emit("update");
    },
    async markAsSeen(alertId) {
      await getApiClient.put("/alerts/seen/" + alertId)
      this.$emit("update");
    },
    routeToProduct(optionalId) {
      this.$emit("close");
      if (this.description === "Ny forespørsel om utleie.") {
        this.$router.push('/listing/edit/' + optionalId);
      } else if (this.description === "Din forespørsel om utleie ble godtatt!" || this.description === "Din forespørsel om utleie ble avslått!") {
        this.$router.push('/listing/' + optionalId);
      } else  {
        this.$router.push('/account');
      }
    },
  },
  created() {
    if (this.description === "Ny forespørsel om utleie.") {
      this.icon = "mdi-newspaper-plus"
    } else if (this.description === "Din forespørsel om utleie ble godtatt!") {
      this.icon = "mdi-newspaper-plus"
    } else if(this.description === "Din forespørsel om utleie ble avslått!") {
      this.icon = "mdi-newspaper-minus"
    } else{
      this.icon = "mdi-message-draw"
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
.v-icon {
  cursor: pointer;
}
.notifIcon {
  margin: 10px;
}
</style>