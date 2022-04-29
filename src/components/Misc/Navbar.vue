<!-- Navigasjonsbar som alltid skal vises uavhengig av current view -->

<template>
    <v-row id="navBar">
      <v-col class="navItem">
      <router-link :to="{name: 'Home'}">
        <div class="navLink">
          <v-icon>mdi-home</v-icon>
        </div>
      </router-link>
      </v-col>
      <v-col class="navItem">
      <router-link :to="{name: 'Account'}">
        <div>
          <v-icon> mdi-account</v-icon>
        </div>
      </router-link>
      </v-col>
      <v-col class="navItem">
        <router-link :to="{name: 'Listing'}">
          <div>
            <v-icon> mdi-plus-circle</v-icon>
          </div>
        </router-link>
      </v-col>
      <v-col class="navItem">
        <v-dialog
            v-model="dialog"
            fullscreen=""
        >
          <template v-slot:activator="{ props }">
              <v-icon color="white" v-bind="props"> mdi-bell </v-icon>
          </template>

          <v-card id="notificationDialog">
            <v-card-text>
              <NotificationView />
            </v-card-text>
            <v-card-actions>
              <v-btn
                  id="closeButton"
                  block="" @click="dialog = false"
              >Lukk
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
</template>


<script>
import NotificationView from "@/components/NotificationView";
import axios from "axios";
import {getApiClient} from "@/service/ApiService";
export default {
  components: {NotificationView},
  data () {
    return {
      dialog: false,
    }
  },
  methods: {
    async loadData() {
      await getApiClient.get('/alerts/user/' + this.$store.state.myUserId + '/unseen').then(response => {
        if (response.data !== "") {
          //TODO bytt farge på varsel ikon
          console.log("new alert")
        } else {
          console.log("no new alerts")
        }
      })
    },
  },
  mounted: function () {
    setInterval(function () {
      this.loadData();
    }.bind(this), 10000);
  }
}
</script>

<style>

* {
  --bocoBlue: #004aab;
  --backgroundBlue: #edf1f5
}
#navBar {
  display: flex;
  flex-direction: row;
  background-color: #454655;
  margin: 0;
}
#navBar a {
  color: white;
  text-decoration: none;
}

#navBar a.router-link-active {
  color: #2ce7ff;
}

.navItem {
  width: 30%;
  flex-grow: 1;
  padding: 12px;
}
#notificationDialog {
  background-color: #edf1f5;
}
#closeButton {
  color: var(--bocoBlue);
  font-weight: bold;
}
</style>