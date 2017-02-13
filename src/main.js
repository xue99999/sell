import Vue from 'vue'
import App from './App'
import router from './router/index.js'
import VueResource from 'vue-resource'

Vue.use(VueResource);

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

