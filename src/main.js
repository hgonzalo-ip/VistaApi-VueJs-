import Vue from 'vue'
import App from './App.vue'
// import store from './store'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Validate from 'vuelidate'
import store from './store'
// SWALALERT2-----------
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
// Select Con buscador 
import 'vue-search-select/dist/VueSearchSelect.css'
import vSelect from 'vue-select'

Vue.component('v-select', vSelect)

Vue.use(VueSweetalert2)



// Usar los import---------------
Vue.config.productionTip = false
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(Validate)

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiredAuth)){
      if(!store.getters.loggedIn){
        next({
          name : 'Login'
        });
      }
      else{
        next()
      }
  }else{
    next()
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
