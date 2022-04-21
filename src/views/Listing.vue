<!-- inneholder listing component -->

<template>
  <h1 id="createListingHeadline">Opprett en ny annonse</h1>
  <div class="flex-column mb-6">
    <v-card class="container">
      <div>
        <label>Navn på annonse</label>
      </div>
      <div>
        <input
            id="adName"
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
            id="adDescription"
            v-model="adDescription"
            type="text"
            placeholder="Beskrivelse"
            outlined
        />
      </div>
      <div>
        <label>Bilder</label>
        <v-file-input
            placeholder="Last opp bildene"
            accept="image/*"
            multiple
            chips
            prepend-icon="mdi-camera"
        />
      </div>

      <div>
        <label>Kategori</label>
      </div>
      <div>
        <v-select
          :items="items"
          label="Kategori"
          outlined
          prepend-icon="mdi-widgets"
          ></v-select>

      </div>

      <div>
        <label>Pris</label>
      </div>
      <div>
        <input
            id="adPrice"
            v-model="adPrice"
            type="number"
            placeholder="Pris"
        />
        <label> kr</label>
      </div>

      <div>
        <v-radio-group
            v-model="pricePer"
            column
        >
          <v-radio
              label="Pris per dag"
              color="indigo"
              value="perDay"
          ></v-radio>
          <v-radio
              label="Fastpris"
              color="indigo"
              value="set"
          ></v-radio>
        </v-radio-group>
      </div>

      <!--<div>
        <v-text-field
          v-model="dateRange"
          label="Datoer"
          readonly
          prepend-icon="mdi-calendar"
        ></v-text-field>
      </div>-->
      <div>
        <label>Fra dato:</label>
      </div>
      <div>
        <input
            id="fromDate"
            v-model="fromDate"
            type="date"
        >
      </div>
      <div>
        <label>Til dato:</label>
      </div>
      <div>
        <input
            id="toDate"
            v-model="toDate"
            type="date"
        >
      </div>
      <div>
        <label>Adresse</label>
      </div>
      <div>
        <input
            id="adAddress"
            v-model="adAddress"
            type="text"
            placeholder="Adresse"
        />
      </div>
      <div>
        <label>Telefon</label>
      </div>
      <div>
        <input
            id="adPhone"
            v-model="adPhone"
            type="text"
            placeholder="Telefon"
        />
      </div>
      <div>
        <v-switch
            v-model="switch1"
            inset
            color="indigo"
            :label="`Skjul annonse`"
        ></v-switch>
      </div>
      <div>
        <v-btn
            id="createAdButton"
        >Lag annonse
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>

export default {
  name: "AdPage",

}
</script>

<style scope>
  .container{
    padding: 1em;
  }
  #adName {
    border: 2px solid var(--bocoBlue);
    border-radius: 5px;
    padding: 0.5em;
  }
  #adDescription {
    border: 2px solid var(--bocoBlue);
    border-radius: 5px;
    padding: 0.5em;
  }
  #adPrice {
    border: 2px solid var(--bocoBlue);
    border-radius: 5px;
    padding: 0.5em;
  }
  #adAddress {
    border: 2px solid var(--bocoBlue);
    border-radius: 5px;
    padding: 0.5em;
  }
  #adPhone {
    border: 2px solid var(--bocoBlue);
    border-radius: 5px;
    padding: 0.5em;
  }
  #createAdButton{
    background-color: var(--bocoBlue);
    color: white;
  }
</style>