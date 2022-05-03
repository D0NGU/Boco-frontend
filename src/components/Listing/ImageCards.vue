<template>
  <v-card @click="this.$emit('deleteClick')">
    <img v-bind:src="image.img">
    <p>{{file.name}}</p>
    <v-icon>mdi-trash-can-outline</v-icon>
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
img {
  height: 40px;
  width: 40px;
  object-fit: cover;
}
</style>