<!-- En "listing" instans. (En annonseboks) -->

<template>
  <h1 id="createListingHeadline">Opprett en ny annonse</h1>
  <form class="adForm">
    <label>Navn på annonse</label>
    <input
        v-model="adName"
        type="text"
        placeholder="Navn på annonse"
    />
    <label>Beskrivelse</label>
    <input
        v-model="adDescription"
        type="text"
        placeholder="Beskrivelse"
    />
    <label>Bilder</label>
    <v-file-input
        :rules="rules"
        placeholder="Last opp bildene"
        accept="image/*"
        multiple
        prepend-icon="mdi-camera"
    />
  </form>

</template>

<script>
export default {
  name: "Listing",
  data: () => ({
    rules: [
      value => !value || value.size < 2000000 || 'Image size should be less than 2 MB!',
    ],
  }),
}
</script>

<style>

</style>