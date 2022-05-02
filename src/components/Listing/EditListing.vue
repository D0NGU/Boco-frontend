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
              v-model="selectedCategory"
              :items="categories"
              label="Kategori"
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

        <v-container class="grey lighten-5">
          <v-row no-gutters>
            <v-col order="1">
              <v-card
                  class="pa-2"
                  outlined
                  tile
              >
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
              </v-card>
            </v-col>
            <v-col order="2">
              <v-card
                  class="pa-2"
                  outlined
                  tile
              >
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
              </v-card>
            </v-col>
          </v-row>
        </v-container>
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
            onclick="router.push({name: 'Account'})"
        >Avbryt
        </v-btn>
      </div>
    </v-card>
    <v-card>
      <div>
        <RentalRequestView
          :product-id="itemId" />
      </div>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import ListingsService from "@/service/ListingsService";
import RentalRequestView from "@/components/Listing/RentalRequestView";
import ProductService from "@/service/ProductService";

export default {
  name: "AdEditPage",
  components: {RentalRequestView},
  props: {
    itemId: Number
  },
  data () {
    return {
      //TODO: Få produktinformasjon fra backend
      adId:'',
      adName: '',
      adDescription: '',
      adPrice:'',
      pricePer:'',
      fromDate:'',
      toDate: '',
      adAddress:'',
      adPhone:'',
      switch1:'',
      categories: [],
      selectedCategory: '',
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
    async getInfo(){
      const categories = (await ListingsService.getCategories()).data
      categories.forEach(cat => {
        this.categories.push(cat.category)
      })
      const productInfo = (await ProductService.getProductById(this.itemId)).data
      this.adId = productInfo.productId;
      this.adName = productInfo.title;
      this.adDescription = productInfo.description;
      this.adPrice = productInfo.price;
      this.adAddress = productInfo.address;
      this.selectedCategory = productInfo.category
    },
    async updateAd(){
      let tempStat;
      this.dialog = true;
      this.createdStatus = true;
      console.log("Listing was updated.")
      await ListingsService.edit(this.adId, this.adName, this.adDescription, this.adAddress, this.adPrice, this.switch1, this.dateFrom, this.dateTo, this.$store.state.myUserId, this.categories).then(response => {
        tempStat = response.data
      }).catch((error) => {
        if(error.response){
          tempStat = error.response.data;
        }
      })
    },
  },
  beforeMount() {
    this.getInfo();
  }
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