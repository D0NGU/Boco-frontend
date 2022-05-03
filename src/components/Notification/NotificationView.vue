<template>
  <div v-for="alert in alerts">
    <Notification
        :alertId="alert.alertId"
        :description="alert.description"
        :alertDate="alert.alertDate"
        :hasSeen="alert.hasSeen"
        :optionalId="alert.optionalId"
        :userId="alert.userId"
        @update="getAlerts"
        @close="closeDialog"
    />
  </div>
</template>

<script>
import Notification from "@/components/Notification/Notification";
import {getApiClient} from "@/service/ApiService";
export default {
  name: "NotificationView",
  components: {Notification},
  data () {
    return {
      dialog: false,
      alerts: []
    }
  },
  methods: {
    async getAlerts() {
      this.alerts = (await getApiClient.get("/alerts/user/" + this.$store.getters.myUserId)).data;
    },
    closeDialog() {
      this.$emit("close")
    }
  },
  beforeMount() {
    this.getAlerts()
  }
}
</script>

<style scoped>

</style>