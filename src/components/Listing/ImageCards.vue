<template>
  <v-img :src="image.img" outlined width="130" class="grey lighten-2">
  </v-img>
</template>

<script>
export default {
  name: "ImageCards",
  props: {
    file: {
      type: File,
      required: true
    },
    length: Number,
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
    },
  },
  async beforeMount() {
    this.image = await this.getBase64(this.file);
    //console.log(this.image)
  }
}
</script>

<style scoped>

</style>
