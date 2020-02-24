import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyATUmvomILc7K5ikbmYMJGKfLOIilWeNiM',
    libraries: 'places', 
  },
})