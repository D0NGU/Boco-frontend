<template>
  <EditListing :adName="Hammer"/>
</template>

<script>
import EditListing from "@/components/EditListing";

export default {
  name: "AdEdit",
  data: () => ({
    text: "Hammer",
  }),
  components: {
    EditListing
  },
}
</script>