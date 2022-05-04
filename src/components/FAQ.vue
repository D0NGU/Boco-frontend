<template v-cloak>
  <div id="cover">
    <div id="imageCover"></div>
    <img src="https://modernremitnepal.com/wp-content/uploads/2019/11/faq-1-1.png" alt="picture" id="coverImage">
  </div>
  <div class="paragraph">
    <h2>Synlighet</h2>
    <img src="/img/business.png" alt="" class="paraImage">
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-title>Når bør jeg legge ut en annonse?</v-expansion-panel-title>
        <v-expansion-panel-text style="font-weight: bold">Å legge ut en annonse kan være lurt å gjøre i helgen!</v-expansion-panel-text>
        <v-expansion-panel-text>Da er annonsen klar til når de fleste søkene skjer, som gjerne er på mandager.</v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-title>Hvordan sikre en synlig annonse?</v-expansion-panel-title>
        <v-expansion-panel-text style="font-weight: bold">For å bli sett og for å selge mer, er du avhengig
          av at de riktige kundene finner varene dine når de trenger det.</v-expansion-panel-text>
        <v-expansion-panel-text>Ved å få mange gode anmeldelser vil du bli en verifisert bruker som gjør at annonsene dine blir fremhevet.</v-expansion-panel-text>
        <v-expansion-panel-text>Når du legger til kategori, en god tittel og en fin beskrivelse, øker du også sjansene for at den ønskede kunden finner annonsen din.</v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>


  <div class="paragraph">
    <h2>Generelt</h2>
    <img src="/img/enviro.png" alt="" class="paraImage">
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-title>Hva er BoCo, og hva brukes det til?</v-expansion-panel-title>
        <v-expansion-panel-text style="font-weight: bold">Du finner en god oversikt over hva BoCo er <router-link to="/">her</router-link>!</v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-title>Hvem kan bli medlem i BoCo?</v-expansion-panel-title>
        <v-expansion-panel-text style="font-weight: bold">BoCo er en plattform for alle som vil leie og leie ut produkter!</v-expansion-panel-text>
        <v-expansion-panel-text>Det betyr at så lenge du er over 18 år og ønsker å enten leie eller leie ut noe, er du velkommen som medlem hos oss.</v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-title>Hvordan henter jeg produktene?</v-expansion-panel-title>
        <v-expansion-panel-text style="font-weight: bold">Produktene du leier må du selv hente hos utleier.</v-expansion-panel-text>
        <v-expansion-panel-text>Er du usikker på hvor produktet er kan du sjekke kartfunksjonen vår inne på produktet, for å se hvor det ligger.</v-expansion-panel-text>
        <v-expansion-panel-text style="color: red">OBS! BoCo er en nasjonal plattform. Du er selv ansvarlig for å sjekke at produktet er innenfor din rekkevide når du låner hos oss.</v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
  <div class="paragraph">
    <h2> Finans </h2>
    <img src="/img/wallet.webp" alt="" class="paraImage">
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-title>Når får jeg faktura?</v-expansion-panel-title>
        <v-expansion-panel-text style="font-weight: bold">Faktura blir sendt ut i slutten av måneden.</v-expansion-panel-text>
        <v-expansion-panel-text>Her betaler du for de produktene du har leid av andre utleiere på plattformen.</v-expansion-panel-text>
        <v-expansion-panel-text>Lurer du på mer angående fakturaen? Send oss i BoCo en henvendelse <router-link to="/contact">her</router-link>!</v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-title>Når får jeg betalt for mine utlån?</v-expansion-panel-title>
        <v-expansion-panel-text style="font-weight: bold">Vi sender utbetalinger til våre utleiere innen den 10. hver måned.</v-expansion-panel-text>
        <v-expansion-panel-text>Da har vi fått innbetalinger av faktura, og har de likvide midlene til å sende utbetalinger til våre utleiere.</v-expansion-panel-text>
        <v-expansion-panel-text>Lurer du på mer angående utbetaling? Send oss i BoCo en henvendelse <router-link to="/contact">her</router-link>!</v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
export default {
  name: "FAQ"
}
</script>

<style scoped>
#cover {
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
}

#coverImage {
  height: 100%;
  width: 100%;
  flex: 1;
}
#imageCover {
  height: 100%;
  width: 100%;
  position: absolute;
  flex: 1;
}

#coverText {
  animation-fill-mode: forwards;
  animation-name: title-fade;
  animation-duration: 2s;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 15px;
  border: 5px solid white;
  width: 85%;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.button {
  color: var(--bocoBlue);
  margin-top: 20px;
  font-weight: bold;
}
.paragraph {
  text-align: center;
  padding: 30px;
}
.paragraph:nth-child(2n) {
  background-color: white;
}
.paraImage {
  height: 100px;
  margin: 20px;
}

@keyframes title-fade  {
  from {opacity: 0}
  to {opacity: 1}
  100% {letter-spacing: 2.5px}
}
</style>