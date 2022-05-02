<!-- Navigasjonsbar som alltid skal vises uavhengig av current view -->

<template>
    <v-row id="navBar">
      <v-btn @click="newAlert()">
        ny alert
      </v-btn>
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
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
export default {
  components: {NotificationView},
  data () {
    return {
      dialog: false,
      received_messages: [],
      send_message: null,
      connected: false,
    }
  },
  methods: {
    /*
    async loadData() {
      await getApiClient.get('/alerts/user/' + this.$store.state.myUserId + '/unseen').then(response => {
        if (response.data !== "") {
          //TODO bytt farge på varsel ikon
          console.log("new alert")
        } else {
          console.log("no new alerts")
        }
      })
    },*/
    connect() {

      this.socket = new SockJS("http://localhost:8080/websocket");
      this.stompClient = Stomp.over(this.socket);
      this.stompClient.connect(
          {},
          frame => {
            this.connected = true;
            console.log(frame);
            this.stompClient.subscribe("/alerts/greetings", tick => {
              console.log(tick);
              this.received_messages.push(JSON.parse(tick.body).content);
              console.log(this.received_messages)
            });
          },
          error => {
            console.log(error);
            this.connected = false;
          }
      );
    },
    async newAlert(){
      const alert = {description: "test",alertDate: "2022-06-12", hasSeen: false, optionalId: 1, userId: 2}
      await getApiClient.post("alerts/user/2/newAlert", alert)
    }
  },
  mounted(){
    /*
    setInterval(function () {
      this.loadData();
    }.bind(this), 10000);*/
    this.connect()
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