<template>
  <!--<v-card id="card" elevation="0" @click="this.$emit('deleteClick')" class="grey lighten-2">
    <v-img id="img" v-bind:src="image.img" class="grey lighten-2">
      <v-icon color="red">mdi-close-circle</v-icon>
      </v-img>
  </v-card>-->
  <!--<div @click="this.$emit('deleteClick')">
    <v-btn icon><v-icon color="red">mdi-close-circle</v-icon></v-btn>
    <v-img :src="image.img" aspect-ratio="1" class="grey lighten-2">
    </v-img>
  </div>-->

    <img :src="image.img" outlined width="130" class="grey lighten-2"/>

  <!--<v-img :src="image.img" aspect-ratio="1" class="grey lighten-2" @click="this.$emit('deleteClick')">
  </v-img>-->



  <!--<v-row>
    <v-col
        v-for="n in length"
        :key="n"
        class="d-flex child-flex"
        cols="4"
    >
      <v-img
          :src="image.img"
          aspect-ratio="1"
          class="grey lighten-2"
      >
        <template v-slot:placeholder>
          <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
          >
            <v-progress-circular
                indeterminate
                color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </v-col>
  </v-row>-->



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
      console.log(file)
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

    check() {
      console.log(this.file)
    }
  },
  async beforeMount() {
    this.image = await this.getBase64(this.file);
    console.log(this.image)
  }
}
</script>

<style scoped>

</style>
