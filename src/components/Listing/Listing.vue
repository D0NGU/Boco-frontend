<!-- inneholder listing component -->

<template>
  <v-tabs v-if="updating" id="tabContainer" v-model="tab" grow="">
    <v-tab class="tabHeader" value="updateListing">Oppdater</v-tab>
    <v-tab class="tabHeader" value="rentalRequests">Forespørsler</v-tab>
    <v-tab class="tabHeader" value="sendReviewToLoaner">Leieavtaler</v-tab>
  </v-tabs>

  <v-card-text>
    <v-window v-model="tab">
      <v-window-item value="updateListing">
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
              <v-textarea
                  rows="5"
                  no-resize
                  v-model="adDescription"
                  label="Beskrivelse"
                  :rules="rules"
                  hide-details="auto"
              ></v-textarea>
              <div>
                <v-file-input
                    v-model="newFiles"
                    @change="fillFiles"
                    label="Last opp bilder"
                    hide-details="auto"
                    :rules="rulesImage"
                    accept="image/x-png, image/jpeg"
                    multiple
                    chips
                    prepend-icon="mdi-camera"
                />

                <div id="pictures" v-if="files.length!==0">
                  <v-badge content="x" color="error" v-for="(file, i) in files" @click="deleteImage(i)">
                    <div id="space">
                      <!--<v-img outlined width="130" v-bind:src="image" class="grey lighten-2 image">
                      </v-img>-->
                      <!--Bruk image cards. Den inneholder metoden for å rendre ett bilde fra en fil-->
                      <ImageCards :file="file"></ImageCards>
                    </div>
                  </v-badge>
                 </div>

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



      </v-window-item>

      <v-window-item value="rentalRequests">
        <RentalRequestView
            v-if="this.render"
            :productId="this.itemId"
            :rental-list="this.rentalList"
            @update="getRentals()"
        ></RentalRequestView>
      </v-window-item>

      <v-window-item value="sendReviewToLoaner">
        <ShowRentals
            :listing-name="this.adName"
            :product-id="this.itemId"
        ></ShowRentals>
      </v-window-item>
    </v-window>
  </v-card-text>



</template>

<script>
import ListingsService from "@/service/ListingsService";
import ImageService from "@/service/ImageService";
import router from "@/router";
import ProductService from "@/service/ProductService";
import { ref } from 'vue';
import Datepicker from "@vuepic/vue-datepicker";
import ImageCards from "@/components/Listing/ImageCards";
import ShowRentals from "@/components/UserProfile/ShowRentals";
import RentalRequestView from "@/components/Listing/RentalRequestView";
import RentalService from "@/service/RentalService";

export default {
  name: "AdPage",
  components: {ImageCards, Datepicker, RentalRequestView, ShowRentals},
  props: {
    itemId: [String, Number]
  },
  data() {
    return {
      rentalList: [],
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
      newFiles: [],
      files: [],
      images: [],
      shownImages: [],
      statusMessage: '',
      rules: [
        value => !!value || 'Påkrevd.',
        value => (value && value.length >= 3) || 'Minimum 3 bokstaver.',
      ],
      rulesImage: [
        /* REGEL: Bilde kan ikke være større enn gitt størrelse */
        files => !files || !files.some(file => file.size > 2097152) || 'Bildet må være mindre enn 2MB',
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
      tab: null,
      render: true,
    }
  },

  methods: {
    fillFiles() {
      for (let file of this.newFiles) {
        console.log(file)
        this.files.push(file);
      }
      this.newFiles = [];
    },
    async getInfo(){
      const categories = (await ListingsService.getCategories()).data
      categories.forEach(cat => {
        this.categories.push(cat.category)
      })
      if(this.updating) {
        const productInfo = (await ProductService.getProductById(this.itemId)).data
        if(!(productInfo.userId == this.$store.state.myUserId)){
          await this.$router.push({name: "NotFound"})
        }

        this.adName = productInfo.title;
        this.adDescription = productInfo.description;
        this.adPrice = productInfo.price;
        this.adAddress = productInfo.address;
        this.adCategory = productInfo.category
        this.unListed = productInfo.unlisted;
        this.date = [new Date(productInfo.availableFrom),new Date(productInfo.availableTo)];
        this.images = (await ImageService.getImagesByProductId(this.itemId)).data;
        for (let x of this.images) {
          this.files.push(await (this.urlToFile(x.img64, x.imgData, x.imgName)));
          this.shownImages.push(x.imgData + "," + x.img64);
        }
      }
    },

    urlToFile(base64, data, filename){
      let url = data +","+base64;
      return (fetch(url)
          .then(function(res){return res.arrayBuffer();})
          .then(function(buf){return new File([buf], filename,{type: "image/jpeg"});})
      );
    },

    async dataUrlToFile(base64, data, fileName) {
      const dataUrl = data +","+base64;
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      return new File([blob], fileName, { type: 'image/png' });
    },

    async createAd() {
      console.log("Listing was created.")
      let tempStat = '';
      await this.addFiles();
      if(this.date !== undefined && this.date !== null) {
        await ListingsService.create(4, this.adName, this.adDescription, this.adAddress, this.adPrice, this.unListed, this.date[0], this.date[1], this.$store.state.myUserId, this.adCategory, this.images).then(response => {
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
        await this.addFiles();
      console.log("Listing was updated.")
        await ListingsService.editProduct(this.itemId, this.adDescription, this.adAddress, this.adPrice, this.unListed, this.adCategory, this.images).then(response => {
          tempStat = response.data
        }).catch((error) => {
          if (error.response) {
            this.statusMessage = error.response.data;
          }
        })
        this.statusMessage = "Endringen var vellykket!";
        this.dialog = true;
    },
    async addFiles() {
      this.images = []
      console.log(this.files)
      for (let file of this.files) {
        this.images.push(await this.getBase64(file))
      }
    },


    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        let blob;
        reader.onload = () => resolve({
          imgName: file.name,
          img64: reader.result.split(",")[1],
          imgData: reader.result.split(",")[0],
          img: reader.result,
          productId: 0,
        },
      );
        reader.onerror = error => reject(error);
      });
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
    },
    deleteImage(index) {
      this.files.splice(index, 1)
      this.addFiles()
    },

    async getRentals() {
      this.rentalList = (await RentalService.getRentals(this.itemId)).data
    },

  },
  beforeMount(){
    this.getInfo();
    if(this.itemId > 0){
      this.updating = true;
      this.getRentals();
    }
   },
}
</script>

<style scoped>
.container {
  box-shadow: none;
  margin: 0 auto;
  width: 350px;
  padding: 1em;
}

.v-text-field, .v-file-input, .v-textarea, #datepicker {
  margin-bottom: 22px;
}

h1 {
  margin-top: 20px;
  margin-bottom: 20px;
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
  margin: 0.4em;
}

#tabContainer {
  background-color: white;
  color: var(--bocoBlue);
}

.tabHeader {
  margin-top: 0;
}

#pictures {
  padding-bottom: 10px;
  margin: auto;
  place-content: center;
}
.image {
  margin: 2px;
}
#space {
  margin-left: 4px;
}
#pictures {
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  margin-bottom: 3px;
  overflow-y: scroll;
  height: 200px;
  border: solid grey 2px;
}
</style>
