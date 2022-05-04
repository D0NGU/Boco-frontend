const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    },
  },
  pwa: {
    themeColor: "#004aab",
    manifestOptions: {
      name: "BoCo",
      short_name: "BoCo",
      start_url: "/",
      display: 'standalone',
      background_color: "#004aab",
      icons: [
        {
          src: `/img/48.png`,
          sizes: "48x48",
          type: "image/png"
        },
        {
          src: `/img/72.png`,
          sizes: "72x72",
          type: "image/png"
        },
        {
          src: `/img/96.png`,
          sizes: "96x96",
          type: "image/png"
        },
        {
          src: `/img/144.png`,
          sizes: "144x144",
          type: "image/png"
        },
        {
          src: `/img/192.png`,
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: `img/512.png`,
          sizes: "512x512",
          type: "image/png"
        }
      ]
    }
  }
})
