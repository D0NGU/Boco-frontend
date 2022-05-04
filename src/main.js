import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies';
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'


loadFonts()

createApp(App)
  .use(router)
  .use(store)
  .use(VueCookies)
  .use(vuetify)
  .mount('#app')
