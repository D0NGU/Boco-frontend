<!-- side som fremstiller chat component -->

<template>
  <Chat />
</template>

<script>
import Chat from "@/components/Chat/Chat";
export default {
  name: "ChatView",
  components: {Chat},
  data () {
    return {
      dialog: false,
    }
  },
}
</script>

<style scoped>

</style>