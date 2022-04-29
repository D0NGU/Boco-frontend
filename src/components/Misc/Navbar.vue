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
              <v-btn block @click="dialog = false">Lukk</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
</template>


<script>
import NotificationView from "@/components/NotificationView";
export default {
  components: {NotificationView},
  data () {
    return {
      dialog: false,
    }
  },
}
</script>

<style>

* {
  --bocoBlue: #004aab
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
</style>