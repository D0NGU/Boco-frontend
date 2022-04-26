<!-- inneholder listing component -->

<template>
  <h1 id="createListingHeadline">Opprett en ny annonse</h1>
  <div class="flex-column mb-6">
    <v-card class="container">
      <div>
        <v-text-field
            data-testid="name-input"
            type="text"
            v-model="adName"
            label="Navn på annonse"
            :rules="rules"
            hide-details="auto"
        ></v-text-field>
      </div>
      <div>
        <v-text-field
            v-model="adDescription"
            label="Beskrivelse"
            :rules="rules"
            hide-details="auto"
        ></v-text-field>
      </div>
      <div>
        <v-file-input
            v-bind:value="adPicture"
            v-on:input="adPicture = $event.target.value"
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
            v-model="adCategory"
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
            @click="saveAd()"
        >Opprett annonse
        </v-btn>
      </div>
      <div>
        <v-btn
            id="cancelButton"
            onclick="location.href='/'"
        >Avbryt
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import ListingsService from "@/service/ListingsService";

export default {
  name: "AdPage",
  data() {
    return {
      adName: '',
      adDescription: '',
      adPrice: '',
      pricePer: '',
      fromDate: '',
      adAddress: '',
      adPhone: '',
      switch1: '',
      categories: [],
      createdStatus: false,
      dialog: false,
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
        value => (value && (value.length === 8)) || 'Må være et gyldig telefonnummer.',
      ],
    }

  },
  methods: {
    getCategories() {
      ListingsService.getCategories().then((response) => {
        this.categories = response.data;
      });
    },
    created() {
      this.getCategories();
    },
    async saveAd() {
      this.dialog = true;
      this.createdStatus = true;
      console.log("Listing was created.")
      const listingCreated = {
        adName: this.adName,
        adDescription: this.adDescription,
        adAddress: this.adAddress,
        adPrice: this.adPrice,
        switch1: this.switch1,
        adPhone: this.adPhone,
        defaultCategory: this.defaultCategory
      };

      await axios.post('http://localhost:8080/api/products/new', listingCreated).then(response => {
        this.createdStatus = response.data
      }).catch((error) => {
        if (error.response) {
          this.createdStatus = error.response.data;
        }
      })
    },
  },
}
//TODO Få den valgte kategorien til å vises for bruker
</script>

<style scoped>
.container {
padding: 1em;
}

div{
margin: 0.4em;
}

#createAdButton{
background-color: var(--bocoBlue);
color: white;
font-weight: bold;
}
#cancelButton{
color: var(--bocoBlue);
font-weight: bold;
}
</style>