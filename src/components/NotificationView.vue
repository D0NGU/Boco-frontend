<template>
  <Notification />
</template>

<script>
import Notification from "@/components/Notification";
export default {
  name: "NotificationView",
  components: {Notification},
  data () {
    return {
      dialog: false,
    }
  },
}
</script>

<style scoped>

</style>