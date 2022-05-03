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
              <v-icon v-show="!notification" color="white" v-bind="props"> mdi-bell </v-icon>
              <v-icon v-show="notification"  color="white" v-bind="props"> mdi-bell-alert </v-icon>
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
import NotificationView from "@/components/NotificationView";
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
    async loadData() {
      await getApiClient.get('alerts/user/' + this.$store.getters.myUserId + '/unseen').then(response => {
        if (response.data !== "") {
          console.log("New alert")
          this.notification = true;
        } else {
          this.notification = false;
        }
      })
    },
  },
  mounted(){
      setInterval(function () {
      this.loadData();
    }.bind(this), 15000);
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
  color: orange;

}

.navItem {
  width: 30%;
  flex-grow: 1;
  padding: 12px;
}
#notificationDialog {
  background-color: #edf1f5;
}
#chatDialog {
  background-color: #edf1f5;
}
#closeButton {
  color: var(--bocoBlue);
  font-weight: bold;
}
</style>