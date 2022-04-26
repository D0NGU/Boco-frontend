<template>
  <h1 id="createListingHeadline">Oppdater annonse</h1>
  <div class="flex-column mb-6">
    <v-card class="container">
      <v-form v-model="isFormValid">
        <div>
          <v-text-field
              id="adName"
              v-model="adName"
              readonly
              label="Navn på annonse"
              data-test="adNameTest"
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
              v-model="categories"
              :items="categories"
              label="Kategori"
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
          />
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
      </v-form>
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
            :diabled="!isFormValid"
            @click="updateAd()"

        >Oppdater annonse
        </v-btn>

        <v-dialog v-model="dialog">
          <v-card>
            <v-card-title class="text-h5" v-if="createdStatus ? '':'true'"> Listing was not created... </v-card-title>
            <v-card-title class="text-h5" v-if="createdStatus ? 'true':''"> Listing was successful! </v-card-title>
            <v-card-text> {{ createdStatus }}</v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="red"
                  text
                  @click="dialog = false"
              >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <div>
        <v-btn
            id="cancelButton"
            onclick="location.href='/'"
        >Avbryt
        </v-btn>
      </div>
    </v-card>
    <div>
      <button @click="getCategory">Get categories</button>
      <ul>
        <li>Here</li>
        <li v-for="category in categories" :key="category.id">{{ category.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ListingsService from "@/service/ListingsService";

export default {
  name: "AdEditPage",
  data () {
    return {
      //TODO: Få produktinformasjon fra backend
      adName: "Hammer",
      adDescription:'',
      adPrice:'',
      pricePer:'',
      fromDate:'',
      adAddress:'',
      adPhone:'',
      switch1:'',
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
  async created(){
    const res = await axios.get('http://localhost:3000/categories');

    this.categories = res.data;
  },
  methods: {
    getCategories(){
      ListingsService.getCategories().then((response) => {
        this.categories = response.data;
      });
    },
    /*created() {
      this.getCategories();
    },*/
    async updateAd(){
      this.dialog = true;
      this.createdStatus = true;
      console.log("Listing was updated.")
      const listingUpdated = {adName: this.adName, adDescription: this.adDescription, adAddress: this.adAddress, adPrice: this.adPrice, switch1: this.switch1, adPhone: this.adPhone, defaultCategory: this.defaultCategory};

      await axios.post('http://localhost:8080/api/products/edit/1', listingUpdated).then(response => {
        this.createdStatus = response.data
      }).catch((error) => {
        if(error.response){
          this.createdStatus = error.response.data;
        }
      })
    },
  },
}
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