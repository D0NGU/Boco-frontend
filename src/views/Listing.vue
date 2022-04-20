<!-- inneholder listing component -->

<template>
  <h1 id="createListingHeadline">Opprett en ny annonse</h1>
  <div class="flex-column mb-6">
    <v-card>
      <div>
        <label>Navn på annonse</label>
      </div>
      <div>
        <input
            v-model="adName"
            type="text"
            placeholder="Navn på annonse"

        />
      </div>

      <div>
        <label>Beskrivelse</label>
      </div>
      <div>
        <input
            v-model="adDescription"
            type="text"
            placeholder="Beskrivelse"
        />
      </div>
      <div>
        <label>Bilder</label>
        <v-file-input
            placeholder="Last opp bildene"
            accept="image/*"
            multiple
            prepend-icon="mdi-camera"
        />
      </div>

    </v-card>

  </div>
</template>

<script>

export default {
  name: "AdPage",
}
</script>