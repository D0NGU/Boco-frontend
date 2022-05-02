<!-- inneholder listing component -->

<template>
  <h1 v-if="updating">Oppdater annonse</h1>
  <h1 v-else >Opprett en ny annonse</h1>
  <div class="flex-column mb-6">
    <v-card class="container">
      <v-form
          v-model="valid"
          lazy-validation
          @submit.prevent="createAd"
          ref="form">
        <v-text-field
            v-if="updating"
            type="text"
            id="adName"
            v-model="adName"
            readonly
            label="Navn på annonse"
            hide-details="auto"
        ></v-text-field>
        <v-text-field
            v-else
            data-testid="name-input"
            type="text"
            v-model="adName"
            label="Navn på annonse"
            :rules="rules"
            hide-details="auto"
        ></v-text-field>
        <v-text-field
            v-model="adDescription"
            label="Beskrivelse"
            :rules="rules"
            hide-details="auto"
        ></v-text-field>
      <div>
<!--        <v-file-input
            v-bind:value="adPicture"
            v-on:input="adPicture = $event.target.value"
            label="Last opp bildene"
            hide-details="auto"
            accept="image/*"
            multiple
            chips
            prepend-icon="mdi-camera"
        />-->
      </div>
        <v-select
            v-model="adCategory"
            :items="categories"
            label="Kategori"
            outlined
            prepend-icon="mdi-widgets"
        ></v-select>
        <v-text-field
            v-model="adPrice"
            type="text"
            label="Pris"
            :rules="rulesNumber"
            hide-details="auto"
        />
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

<!--
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
-->
        <Datepicker id="datepicker" :disabled="updating" range v-model="date" :enableTimePicker="false" showNowButton  ></Datepicker>

        <v-text-field
            v-model="adAddress"
            type="text"
            label="Adresse"
            :rules="rules"
            hide-details="auto"
        />
        <v-text-field
            v-model="adPhone"
            type="text"
            label="Telefon"
            :rules="rulesPhone"
            hide-details="auto"
        />
  </v-form>
        <v-switch
            v-model="unListed"
            inset=""
            color="indigo"
            :label="`Skjul annonse`"
        ></v-switch>
        <div v-if="updating">
        <v-btn
            class="createAdButton"
            @click="updateAd()"
        >Oppdater annonse
        </v-btn>
          <v-btn
              @click="deleteDialog=true"
              color="error">
            Slett
          </v-btn>
        </div>
      <v-btn
          :disabled="!valid"
          class="createAdButton"
          @click="createAd()"
          v-else
      >Opprett annonse
      </v-btn>
        <v-btn
            id="cancelButton"
            @click="$router.back()"
        >Avbryt
        </v-btn>
      <v-dialog id="popOut" v-model="dialog">
        <v-card>
          <v-card-title class="text-h5"> {{statusMessage}} </v-card-title>
          <v-card-actions>
            <v-btn
                color="red"
                text
                @click=close()
            >
              Lukk
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-spacer />
      <v-dialog v-model="deleteDialog">
        <v-card>
          <v-card-title class="text-h5"> Er du sikker på at du vil slette denne annonsen? </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="red"
                text
                @click="deleteDialog=false"
            >
              Avbryt
            </v-btn>
            <v-btn
                color="red"
                text
                @click=deleteAd
            >
              Slett
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>

<script>
import ListingsService from "@/service/ListingsService";
import router from "@/router";
import ProductService from "@/service/ProductService";
import { ref } from 'vue';
import Datepicker from "@vuepic/vue-datepicker";

export default {
  name: "AdPage",
  components: {Datepicker},
  props: {
    itemId: String
  },
  data() {
    return {
      valid: false,
      updating: false,
      adName: '',
      adDescription: '',
      adCategory: '',
      adPrice: '',
      pricePer: '',
      date: ref(),
      adAddress: '',
      adPhone: '',
      unListed: false,
      categories: [],
      dialog: false,
      statusMessage: '',
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
      deleteDialog: false,
    }
  },
  methods: {
    async getInfo(){
      const categories = (await ListingsService.getCategories()).data
      categories.forEach(cat => {
        this.categories.push(cat.category)
      })
      if(this.updating) {
        const productInfo = (await ProductService.getProductById(this.itemId)).data
        this.adName = productInfo.title;
        this.adDescription = productInfo.description;
        this.adPrice = productInfo.price;
        this.adAddress = productInfo.address;
        this.adCategory = productInfo.category
        this.unListed = productInfo.unlisted;
        this.date = [new Date(productInfo.availableFrom),new Date(productInfo.availableTo)]

      }
    },

    async createAd() {
      console.log("Listing was created.")
      let tempStat = '';
      if(this.date !== undefined && this.date !== null) {
        const dateFrom = new Date(this.date[0].getFullYear() + "/" + (this.date[0].getMonth() + 1) + "/" + this.date[0].getDate());
        const dateTo = new Date(this.date[1].getFullYear() + "/" + (this.date[1].getMonth() + 1) + "/" + this.date[1].getDate());
        await ListingsService.create(4, this.adName, this.adDescription, this.adAddress, this.adPrice, this.unListed, dateFrom, dateTo, this.$store.state.myUserId, 'elektronikk').then(response => {
          tempStat = response.status;
        }).catch((error) => {
          if (error.response) {
            tempStat = error.response.status;
            this.statusMessage = error.response.data;
          }
        })
        this.statusMessage = "Annonsen ble opprettet!";
        this.dialog = true;
      }
    },
    async updateAd(){
        let tempStat;
        this.dialog = true;
        this.createdStatus = true;
        console.log("Listing was updated.")
        await ListingsService.editProduct(this.itemId, this.adDescription, this.adAddress, this.adPrice, this.unListed, this.adCategory).then(response => {
          tempStat = response.data
        }).catch((error) => {
          if (error.response) {
            this.statusMessage = error.response.data;
          }
        })
        this.statusMessage = "Endringen var vellykket!";
        this.dialog = true;
    },
    async deleteAd(){
      await ListingsService.delete(this.$store.state.myUserId, this.itemId)
      this.deleteDialog = false;
      this.statusMessage = "Annonsen ble slettet.";
      this.dialog = true;
    },

    close(){
      this.dialog = false;
      router.back();
    }
  },
   beforeMount(){
     if(this.itemId !== undefined){
       this.updating = true;
     }
    this.getInfo();
    /*if(this.itemId > 0){
      this.updating = true;
    }*/
  }
}
</script>

<style scoped>
.container {
  box-shadow: none;
  margin: 0 auto;
  width: 350px;
  padding: 1em;
}

.v-text-field, .v-file-input {
  margin-bottom: 22px;
}

h1 {
  margin-top: 20px;
  margin-bottom: 20px;
}

#datepicker{
  margin-bottom: 22px;
}
.createAdButton{
background-color: var(--bocoBlue);
color: white;
font-weight: bold;
}
#cancelButton{
color: var(--bocoBlue);
font-weight: bold;
}

button {
  margin: 5px;
}
</style>