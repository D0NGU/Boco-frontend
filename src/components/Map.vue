<template>
  <div @click="closeMap" class="backdrop">
  <iframe class="mapFrame"
      width="600"
      height="450"
      style="border:0"
      loading="lazy"
      allowfullscreen
      referrerpolicy="no-referrer-when-downgrade"
          :src="url">

  </iframe>
  </div>
</template>

<script>
export default {
  name: "Map",
  props: {address1: String},

  data() {
    return {
      MapAPI: this.$store.state.mapAPI,
      url: "https://www.google.com/maps/embed/v1/place?key=AIzaSyB9Ydn-5ri2frO495Wgwn0eXuixMvpKTn0&q="
    }
  },

  methods: {
    closeMap() {
      this.$emit('closeMap', false)
    }
  },

    mounted() {
    this.url = this.url.concat(this.address1)
  }
}
</script>

<style scoped>

.mapFrame {
  width: 400px;
  padding: 20px;
  margin: 200px auto;
  background: white;
  border-radius: 10px;
}
.backdrop {
  top: 0;
  position: fixed;
  background: rgba(0,0,0,0.5);
  width: 100%;
  height: 100%;
}


</style>