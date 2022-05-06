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
                  data-test="adName"
              ></v-text-field>
              <v-text-field
                  v-else
                  data-testid="name-input"
                  data-test="adName"
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
              <Datepicker id="datepicker" range v-model="date" :enableTimePicker="false" showNowButton  ></Datepicker>

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
                  :disabled="!valid"
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
            <v-dialog id="popOut" v-model="dialog" persistent>
              <v-card>
                <v-card-title v-if="!isARequest && !isARental && stayInUpdatePage" class="text-h5"> {{statusMessage}} </v-card-title>
                <v-card-title v-if="!isARequest && !isARental && !stayInUpdatePage" class="text-h5"> {{statusMessage}} </v-card-title>
                <v-card-title v-if="isARequest || isARental" class="text-h5"> Er du sikker? </v-card-title>
                <v-card-text v-if="isARental"> Den produkt har blitt lånt utenfor datoen som du har valgt. Vil du fortsette å endre? Hvis ja, vennligst ta kontakt med personen som har lånt produktet for å avklare dato</v-card-text>
                <v-card-text v-if="isARequest"> Den produkt har forespørsler utenfor datoen som du har valgt. Vil du fortsette å endre? Hvis ja, så avslår vi forespørslene til den produkt</v-card-text>
                <v-card-actions>
                  <v-btn v-if="stayInUpdatePage"
                         color="red"
                         text
                         @click="this.dialog = false"
                  >
                    Lukk
                  </v-btn>
                  <v-btn v-if="!isARequest && !isARental && !stayInUpdatePage"
                      color="red"
                      text
                      @click=close()
                  >
                    Lukk
                  </v-btn>
                  <v-btn v-if="isARequest || isARental"
                      color="green"
                      text
                      @click="acceptChangeDate"
                  >
                    JA
                  </v-btn>
                  <v-btn v-if="isARequest || isARental"
                      color="red"
                      text
                      @click="declineChangeDate"
                  >
                    NEI
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
import RentalRequestView from "@/components/Listing/Rental/RentalRequestView";
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
        value => !!value || 'Påkrevd.',
        value => !isNaN(value) || 'Må være tall.',
        value => (value && (value.length === 8)) || 'Må være et gyldig telefonnummer.',
      ],
      deleteDialog: false,
      tab: null,
      render: true,
      isARental: false,
      isARequest: false,
      conflictRequests: [],
      stayInUpdatePage: false,
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
        this.adPhone = productInfo.tlf;
        this.date = [new Date(productInfo.availableFrom),new Date(productInfo.availableTo)];
        this.image = (await ImageService.getImagesByProductId(this.itemId)).data;
        for (let x of this.image) {
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
      await this.addFiles();
      if(this.date !== undefined && this.date !== null && this.date[0] !== undefined && this.date[1] !== undefined && this.date[0] !== null && this.date[1] !== null) {
        await ListingsService.create(4, this.adName, this.adDescription, this.adAddress, this.adPrice, this.unListed, this.date[0], this.date[1], this.$store.state.myUserId, this.adCategory, this.images, this.adPhone).then(response => {
          this.statusMessage = "Annonsen ble opprettet!";
          this.stayInUpdatePage = false
        }).catch((error) => {
          if (error.response) {
            this.statusMessage = "Navnet til annonsen er tatt. Prøv med an annen navn";
            this.stayInUpdatePage = true
          }
        })
      } else if (this.date === undefined || this.date === null || this.date[0] === undefined || this.date[1] === undefined || this.date[0] === null || this.date[1] === null) {
        this.statusMessage = "Velg dato (fra-til)"
        this.stayInUpdatePage = true
      } else {
        this.statusMessage = "En feil har skjedd. Prøv igjen"
        this.stayInUpdatePage = true
      }
      this.dialog = true
    },

    async updateAd(){
      //sjekke for dato konflikter
      if(this.date !== undefined && this.date !== null && this.date[0] !== undefined && this.date[1] !== undefined && this.date[0] !== null && this.date[1] !== null) {
        await this.checkDateConflict()
        if (!this.isARental && !this.isARequest){
          await this.editAd()
        } else if (this.isARental || this.isARequest) {
          this.dialog = true
        }
      } else if (this.date === undefined || this.date === null || this.date[0] === undefined || this.date[1] === undefined || this.date[0] === null || this.date[1] === null){
        this.statusMessage = "Velg dato (fra-til)"
        this.stayInUpdatePage = true
      } else {
        this.statusMessage = "En feil har skjedd. Prøv igjen"
        this.stayInUpdatePage = true
      }
      this.dialog = true
    },

    //oppdatere annonsen
    async editAd() {
      this.dialog = true;
      await this.addFiles();

      await ListingsService.editProduct(this.itemId, this.adDescription, this.adAddress, this.adPrice, this.date[0], this.date[1], this.unListed, this.adCategory, this.image, this.adPhone)
          .then(response => {
            this.statusMessage = "Endringen var vellykket!";
            this.stayInUpdatePage = false
          }).catch((error) => {
            this.statusMessage = "En feil har oppstått!";
            this.stayInUpdatePage = true
          })
      this.dialog = true;
    },

    async addFiles() {
      this.images = []
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

    acceptChangeDate() {
      this.dialog = false
      if (this.isARequest) {
        this.isARequest = false
        if (this.conflictRequests.length) {
          //avslå forespørsler hvis dato endringen utenfor datoene på forespørsler er godtatt
          this.conflictRequests.forEach((rental) => {
            console.log(rental.rentalId)
            this.denyRentals(rental.rentalId)
          })
        }
      } else if (this.isARental) {
        this.isARental = false
      }
      this.editAd()
    },

    async denyRentals(id) {
      await RentalService.deny(id)
      this.$emit("update");
    },

    declineChangeDate() {
      this.dialog = false
    },

    //sjekker om det skjer en dato konflikt med forespørsler og godtatt forespørsler ved endringen av dato i annonsen
    async checkDateConflict() {
      let allRentals = (await RentalService.getAllRentals(this.itemId)).data
      if (!allRentals.length) {
        return;
      }
      let requestRentals = []
      allRentals.forEach((rental) => {
        if (new Date(rental.dateFrom) < this.date[0] || new Date(rental.dateTo) > this.date[1]){
          if (rental.accepted === true){
            this.isARental = true

          } else if(rental.accepted === false) {
            requestRentals.push(rental)
            this.isARequest = true
          }
        }
      })
      this.conflictRequests = requestRentals
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
.v-tabs.v-slide-group--is-overflowing:not(.v-slide-group--has-affixes) .v-tab:first-child {
  margin-left: 4px;
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
#space {
  margin-left: 4px;
}
#pictures {
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  overflow-y: scroll;
  overflow-x: scroll;
  height: 200px;
  place-content: center;
}
</style>
