<!-- En "listing" instans. (En annonseboks) -->

<template>
  <h1 id="createListingHeadline">Opprett en ny annonse</h1>
  <div class="container">
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
          placeholder="Last opp bildene"
          accept="image/*"
          multiple
          prepend-icon="mdi-camera"
      />
    </form>
  </div>


</template>

<script>
export default {
  name: "Listing",
}
</script>

<style>

</style>