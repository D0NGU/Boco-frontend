<template>
  <v-card id="card" height="70" width="70" elevation="0" @click="this.$emit('deleteClick')">
    <v-img v-bind:src="image.img">
      <v-icon color="red">mdi-close-circle</v-icon>
    </v-img>
    <v-card-text>{{file.name}}</v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ImageCards",
  props: {
    file: {
      type: File,
      required: true
    },
  },
  data() {
    return {
      image: {}
    }
  },
  methods: {
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        let blob;
        reader.onload = () => resolve({
              imgName: file.name,
              img: reader.result,
              productId: 0,
            },
        );
        reader.onerror = error => reject(error);
      });
    }
  },
  async beforeMount() {
    this.image = await this.getBase64(this.file);
  }
}
</script>

<style scoped>

</style>
