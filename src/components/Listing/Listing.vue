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
        />
      </div>
      <div>
        <v-file-input
          v-model="files"
          label="Last opp bildene"
          hide-details="auto"
          multiple="true"
          accept="image/*"
          prepend-icon="mdi-camera"
        />
      </div>
      <div>
        <v-select
            v-model="adCategory"
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
      adCategory: '',
      adName: '',
      adDescription: '',
      adPrice: '',
      pricePer: '',
      fromDate: '',
      toDate: '',
      adAddress: '',
      adPhone: '',
      switch1: false,
      categories: [],
      createdStatus: false,
      dialog: false,
      files: [],
      image: [],
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
    async getCategoriesSelect() {
      const categories = (await ListingsService.getCategories()).data
      categories.forEach(cat => {
        this.categories.push(cat.category)
      })
    },

    //This works, but won't run because of backend
    async saveAd() {
      this.dialog = true;
      console.log("Listing was created.")
      for (let x = 0; x < this.files.length; x++) {
        this.image.push( await this.getBase64(this.files[0]));
      }
      console.log(this.image)

      let tempStat = '';
      await ListingsService.create(0,this.adName, this.adDescription, this.adAddress, this.adPrice,this.switch1, this.fromDate, this.toDate, 1, this.adCategory, this.image).then(response => {
        tempStat = response.status;
      }).catch((error) => {
        if(error.response) {
          tempStat = error.response.status;
        }
      })
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve({
          imgName: file.name,
          img64: reader.result.split(",")[1],
          productId: 0,
        },
        console.log(reader.result),
      );
        reader.onerror = error => reject(error);
      });
    }
  },
   beforeMount(){
    this.getCategoriesSelect();
  }
}
//TODO Få den valgte kategorien til å vises for bruker
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

#createAdButton{
background-color: var(--bocoBlue);
color: white;
font-weight: bold;
}
#cancelButton{
color: var(--bocoBlue);
font-weight: bold;
}

#createAdButton {
  margin-bottom: 10px;
}
</style>