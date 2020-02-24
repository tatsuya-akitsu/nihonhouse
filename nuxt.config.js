const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'マイタウン富士見台中野鷺宮｜日本ハウスHD',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '日本ハウスHD様の広告用LPです' },
      { name: 'msapplication-config', content: '/favicons/browserconfig.xml' },
      { name: 'msapplication-TileColor', content: '#ffffff' },
      { name: 'msapplication-TileImage', content: '/favicons/mstile-144x144.png' },
      { name: 'theme-color', content: '#f5deb3' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicons/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-touch-icon-180x180.png' },
      { rel: 'mask-icon', color: '#555', href: '/favicons/safari-icon.svg' },
      { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicons/android-chrome-192x192.png' },
      { rel: 'manifest', href: '/favicons/manifest.json' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  css: [
    '@fortawesome/fontawesome-free-webfonts',
    '@fortawesome/fontawesome-free-webfonts/css/fa-brands.css',
    '@fortawesome/fontawesome-free-webfonts/css/fa-regular.css',
    '@fortawesome/fontawesome-free-webfonts/css/fa-solid.css',
    '~/assets/scss/style.scss',
  ],
  plugins: [
    {src:"~plugins/vue2-google-maps.js"},
    {src:"~plugins/vue-carousel.js", ssr: false}
  ],
  modules: [
    '@nuxtjs/axios',
  ],
  axios: {
    proxy: true
  },
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    transpile: [/^vue2-google-maps($|\/)/],
    vendor:["vue-carousel"],
    configureWebpack: () => {
      if (process.env.NODE_ENV !== 'production') return;
      return {
        plugins: [
          new PrerenderSPAPlugin(
            // Absolute path to compiled SPA
            path.resolve(__dirname, 'dist'),
            // List of routes to prerender
            [ '/'],
            {
              // options
            }
          ),
        ]
      }
    }
  },
}
