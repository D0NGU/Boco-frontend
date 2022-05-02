<template>
  <Chat />
</template>

<script>
import Chat from "@/components/Chat";
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