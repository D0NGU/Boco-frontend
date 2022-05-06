<!-- Navigasjonsbar som alltid skal vises uavhengig av current view (ikke på 404 side) -->
<template>
    <v-row id="navBar">
      <v-col class="navItem">
      <router-link :to="{name: 'Home'}">
        <div class="navLink">
          <v-icon size="x-large">mdi-home</v-icon>
        </div>
      </router-link>
      </v-col>
      <v-col class="navItem">
      <router-link :to="{name: 'Account'}">
        <div>
          <v-icon size="x-large"> mdi-account</v-icon>
        </div>
      </router-link>
      </v-col>
      <v-col class="navItem">
        <router-link :to="{name: 'Listing'}">
          <div>
            <v-icon size="x-large"> mdi-plus-circle</v-icon>
          </div>
        </router-link>
      </v-col>
      <v-col class="navItem" id="notificationButton">
        <v-dialog
            v-model="dialog"
            fullscreen=""
        >
          <template v-slot:activator="{ props }">
            <div id="=notifIcon" v-bind="props">
              <v-icon v-show="!notification" color="white" size="x-large"> mdi-bell </v-icon>
              <v-icon v-show="notification"  color="white" size="x-large"> mdi-bell-alert </v-icon>
            </div>
          </template>

          <v-card id="notificationDialog">
            <v-card-text>
              <NotificationView
              @close="dialog = false"/>
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
import NotificationView from "@/components/Notification/NotificationView";
import {getApiClient} from "@/service/ApiService";

export default {
  components: {NotificationView},
  data () {
    return {
      dialog: false,
      received_messages: [],
      send_message: null,
      connected: false,
      notification: false
    }
  },

  methods: {
    // Sjekker om det er et tall (uavhengig av datatype)
    isInt(value) {
      if (isNaN(value)) {
        return false;
      }
      var x = parseFloat(value);
      return (x | 0) === x;
    },

    // Sjekker etter nye alerts
    async loadData() {
      let userId = this.$store.getters.myUserId;
      if (this.isInt(userId)) {
        await getApiClient.get('alerts/user/' + userId + '/unseen').then(response => {
          if (response.data !== "") {
            console.info("New alert received")
            this.notification = true;
          } else {
            this.notification = false;
          }
        })
      } else {console.error("Could not check for new alerts because userid is '" + userId + "'");}
    },
  },

  mounted() {
    // Sørger for å sjekke polle etter alerts innimellom
    this.loadData();
    setInterval(function () {
      this.loadData();
    }.bind(this), 30000); // loadData() every 30sec
  },
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
  background-color: var(--bocoBlue);
  margin: 0;
  top: 0;
  z-index: 1000;
  width: 100%;
}
#navBar a {
  color: white;
  text-decoration: none;
}
#navBar a.router-link-active {
  color: #FFB429;

}
.navItem {
  width: 30%;
  flex-grow: 1;
  padding: 12px;
}
#notificationDialog {
  background-color: #edf1f5;
}

#notifIcon {
  width: 100%;
}
#closeButton {
  color: var(--bocoBlue);
  font-weight: bold;
}

#notificationButton {
  cursor: pointer;
}

</style>