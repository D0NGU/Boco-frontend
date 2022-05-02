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

      <v-col class="navItem">
        <v-dialog
            v-model="chat"
            fullscreen=""
        >
          <template v-slot:activator="{ props }">
            <v-icon color="white" v-bind="props"> mdi-message-alert </v-icon>
          </template>

          <v-card id="chatDialog">
            <v-card-text>
              <ChatView />
            </v-card-text>
            <v-card-actions>
              <v-btn
                  id="closeButton"
                  block="" @click="chat = false"
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
import ChatView from "@/components/ChatView";
export default {
  components: {
    NotificationView,
    ChatView},
  data () {
    return {
      dialog: false,
      chat: false,
    }
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