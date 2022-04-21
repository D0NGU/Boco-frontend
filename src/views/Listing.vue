<!-- inneholder listing component -->

<template>
  <h1 id="createListingHeadline">Opprett en ny annonse</h1>
  <div class="flex-column mb-6">
    <v-card class="container">
      <div>
        <v-text-field
            label="Navn på annonse"
            :rules="rules"
            hide-details="auto"
          ></v-text-field>
      </div>

      <div>
        <v-text-field
            label="Beskrivelse"
            :rules="rules"
            hide-details="auto"
        ></v-text-field>
      </div>

      <div>
        <v-file-input
            label="Last opp bildene"
            hide-details="auto"
            accept="image/*"
            multiple
            chips
            prepend-icon="mdi-camera"
        />
      </div>

      <div>
        <v-select
          :items="items"
          label="Kategori"
          :rules="rulesSelect"
          hide-details="auto"
          outlined
          prepend-icon="mdi-widgets"
          ></v-select>
      </div>

      <div>
        <v-text-field
            v-model="adPrice"
            type="text"
            label="Pris"
            :rules="rulesNumber"
            hide-details="auto"
        />
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
        <v-text-field
            v-model="adAddress"
            type="text"
            label="Adresse"
            :rules="rules"
            hide-details="auto"
        />
      </div>
      <div>
        <v-text-field
            v-model="adPhone"
            type="text"
            label="Telefon"
            :rules="rulesPhone"
            hide-details="auto"
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
  data: () => ({
    items: ['Hage', 'Verktøy', 'Turutstyr', 'Klatring', 'Ski', 'Båt', 'Bil', 'Sykkel'],
    rules: [
        value => !!value || 'Påkrevd.',
        value => (value && value.length >= 3) || 'Minimum 3 bokstaver.',
    ],
    rulesNumber: [
        value => !isNaN(value) || 'Må være tall.',
        value => !!value || 'Påkrevd.',
    ],
    rulesPhone: [
        value => !isNaN(value) || 'Må være tall.',
        value => (value && !!(value.length == 8)) || 'Må være et gyldig telefonnummer.',
    ]
  }),
  components:{

  },
  methods: {

  },
}
</script>

<style scope>
  .container {
    padding: 1em;
  }
  div{
    margin: 0.1em;
  }
  .input-field {
    margin-top: 30px;
    position: relative;
  }
  #adName {
    background: var(--bocoBlue);
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
    font-weight: bold;
  }
</style>