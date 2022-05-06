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
            <v-alert type="error" closable="" v-model="error" style="font-size: 16px; font-weight: bold"> {{statusMessage}}  </v-alert>
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
                  data-test="adName"/>
              <v-text-field
                  v-else
                  data-testid="name-input"
                  data-test="adName"
                  type="text"
                  v-model="adName"
                  label="Navn på annonse"
                  :rules="rules"
                  hide-details="auto"/>
              <v-textarea
                  rows="5"
                  no-resize
                  v-model="adDescription"
                  label="Beskrivelse"
                  :rules="rules"
                  hide-details="auto"/>
              <div>
                <v-file-input
                    v-model="newFiles"
                    label="Last opp bilder"
                    hide-details="auto"
                    accept="image/x-png, image/jpeg"
                    multiple
                    chips
                    prepend-icon="mdi-camera"
                    @change="fillFiles"
                />

                <div id="pictures" v-if="files.length!==0">
                  <v-badge v-if="!reset" content="x" color="error" v-for="(file, i) in files" @click="deleteImage(i)">
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
                   :rules="rules"
                   outlined
                   prepend-icon="mdi-widgets" />
               <v-text-field
                   v-model="adPrice"
                   type="text"
                   label="Pris"
                   :rules="rulesNumber"
                   hide-details="auto"/>
               <v-radio-group
                   v-model="pricePer"
                   column>
                 <v-radio
                     label="Pris per dag"
                     color="indigo"
                     value="perDay" />
                 <v-radio
                     label="Fastpris"
                     color="indigo"
                     value="set" />
               </v-radio-group>
              <Datepicker id="datepicker" range v-model="date" :enableTimePicker="false" showNowButton  ></Datepicker>

              <v-text-field
                  v-model="adAddress"
                  type="text"
                  label="Adresse"
                  :rules="rules"
                  hide-details="auto"/>
              <v-text-field
                  v-model="adPhone"
                  type="text"
                  label="Telefon"
                  :rules="rulesPhone"
                  hide-details="auto"/>
            </v-form>
            <v-switch
                v-model="unListed"
                inset=""
                color="indigo"
                :label="`Skjul annonse`" />
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
                class="createAdButton"
                @click="createAd()"
                v-else>
              Opprett annonse
            </v-btn>
            <v-btn
                id="cancelButton"
                @click="$router.back()">
              Avbryt
            </v-btn>

            <v-dialog v-model="warning" persistent>
              <v-card>
                <v-card-title class="text-h5"> Er du sikker? </v-card-title>
                <v-card-text>Dette produktet har allerede en planlagt utleie eller har forespørsler for utleie utenfor valgte dato. Dersom du fortsetter med endringen vil alle forespørsler utenfor datoendringen
                bli avslått. Vi anbefaler at du tar kontakt med personen med planlagt utleie for å avklare dato</v-card-text>
                <v-card-actions>
                  <v-btn color="green"
                         text
                         @click="acceptChangeDate">
                    Endre
                  </v-btn>
                  <v-btn color="red"
                         text
                         @click="this.warning = false">
                    Avbryt
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog v-model="dialog" persistent>
              <v-card>
                <v-card-title> {{confirmationMsg}}</v-card-title>
                <v-spacer />
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red"
                         text
                         @click=close()>
                    Lukk
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog v-model="imgDialog" persistent>
              <v-card>
                <v-card-title> {{confirmationMsg}}</v-card-title>
                <v-spacer />
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red"
                         text
                         @click=imgClose()>
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
                      @click="deleteDialog=false">
                    Avbryt
                  </v-btn>
                  <v-btn
                      color="red"
                      text
                      @click=deleteAd>
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
      valid: true,
      error: false,
      warning: false,
      updating: false,
      adName: '',
      adDescription: '',
      adCategory: '',
      adPrice: '',
      pricePer: 'perDay',
      date: ref(),
      adAddress: '',
      adPhone: '',
      unListed: false,
      categories: [],
      dialog: false,
      imgDialog: false,
      reset: false,
      /**
       * New files from the file input
       */
      newFiles: [],
      /**
       * List of all the image files
       */
      files: [],
      /**
       * List of objects conating, image name, image data, image meta data and image url
       */
      images: [],
      /**
       * List of image objects found then editing a product
       */
      shownImages: [],
      confirmationMsg: '',
      statusMessage: '',
      rules: [
        value => !!value || 'Påkrevd.',
        value => (value && value.length >= 3) || 'Minimum 3 bokstaver.',
      ],
      rulesImage: [
        /* REGEL: Bilde kan ikke være større enn gitt størrelse */
        files => !files || !files.some(file => file.size > 2097152) || 'Bildet må være mindre enn 2MB',
        files => !files || this.files.some(file => file.size > 2097152) || 'Bildet må være mindre enn 2MB',
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
    }
  },

  methods: {
    fillFiles() {
      if (this.rulesImage) {
        for (let file of this.newFiles) {
          if (file.size > 1024*1024*2) {
            this.confirmationMsg = "Files over 2 MB not supported"
            this.imgDialog=true;
            break;
          }
          if (file.size + this.files.size > 1024*1024*10) {
            this.confirmationMsg = "Total file size must be less than 10 MB \n" +
                "Remove som files to make more space"
                this.imgDialog=true;
                break;
          }
          console.log(file)
          this.files.push(file);
        }
        this.newFiles = [];
      }
      console.log(this.files)
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
    /**
     * Method for creating a file from a base 64 encypted url
     * @param base64 the encyprted file
     * @param data meta data
     * @param filename name of the file
     * @returns {Promise<File>}
     */
    urlToFile(base64, data, filename){
      let url = data +","+base64;
      return (fetch(url)
          .then(function(res){return res.arrayBuffer();})
          .then(function(buf){return new File([buf], filename,{type: "image/jpeg"});})
      );
    },

    async createAd() {
      this.$refs.form.validate()
      if(this.valid){
        await this.addFiles();
        if(this.date !== undefined && this.date !== null && this.date[0] !== undefined && this.date[1] !== undefined && this.date[0] !== null && this.date[1] !== null) {
          await ListingsService.create(4, this.adName, this.adDescription, this.adAddress, this.adPrice, this.unListed, this.date[0], this.date[1], this.$store.state.myUserId, this.adCategory, this.images, this.adPhone).then(response => {
            this.confirmationMsg = "Annonsen ble opprettet!";
            this.dialog = true
          }).catch((error) => {
            if (error.response) {
              this.statusMessage = "Navnet er allerede tatt. Prøv med et annet navn";
              this.error = true
              window.scrollTo(0, 0)
            }
          })
        } else {
          this.statusMessage = "Du må velge til og fra dato"
          this.error = true
          window.scrollTo(0, 0)
        }
      } else {
        this.error = true
        this.statusMessage = "Du må fylle ut alle påkrevde felt"
        window.scrollTo(0, 0)
      }
    },

    async updateAd(){
      this.$refs.form.validate()
      if(this.valid){
        //sjekke for dato konflikter
        if(!(this.date === undefined || this.date === null || this.date[0] === undefined || this.date[1] === undefined || this.date[0] === null || this.date[1] === null)) {
          await this.checkDateConflict()
          if (!this.isARental && !this.isARequest){
            await this.editAd()
          } else {
            this.warning = true
          }
        } else {
          this.error = true
          this.statusMessage = "Du må velge til og fra dato"
          window.scrollTo(0, 0)
        }
      }
    },

    //oppdatere annonsen
    async editAd() {
      await this.addFiles();
      await ListingsService.editProduct(this.itemId, this.adDescription, this.adAddress, this.adPrice, this.date[0], this.date[1], this.unListed, this.adCategory, this.images, this.adPhone)
          .then(response => {
            this.confirmationMsg = "Endringen var vellykket!";
          }).catch((error) => {
            this.confirmationMsg = "En feil har oppstått. Vennligst prøv på nytt";
          })
      this.dialog = true;
    },

    async addFiles() {
      this.images = []
      for (let file of this.files) {
        this.images.push(await this.getBase64(file))
      }
    },
    /**
     * Create a base64 representation of a file
     * @param file image file to encrypt
     * @returns {Promise<unknown>} Object containing data, metadata, name, and url to display the image
     */
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
      this.confirmationMsg = "Annonsen ble slettet.";
      this.dialog = true;
    },

    close(){
      this.dialog = false;
      router.back();
    },

    imgClose(){
      this.newFiles = [];
      this.imgDialog = false;
    },

    acceptChangeDate() {
      this.warning = false
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

    async deleteImage(index) {
      this.reset = true;
      this.files.splice(index, 1)
      await this.addFiles()
      this.reset = false;
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
  padding: 10px;
  grid-template-columns: auto auto;
  grid-template-rows: auto;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  overflow-y: scroll;
  overflow-x: scroll;
  height: 200px;
}
</style>
