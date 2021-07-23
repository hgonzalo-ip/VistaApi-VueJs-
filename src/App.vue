<template>
  <div id="app">
    
     <div id="Body" v-if="!Logueado">
     <login  @Logueado="CambioLogueo"></login>
    </div>
    <div v-if="Logueado" >
      <sidebar :key="Logueado"  @Logueado="CambioLogueo"></sidebar>
      <nadbar :key="Logueado" @Logueado="CambioLogueo"></nadbar>
       <router-view></router-view>
    </div>
  
  </div>
</template>

<script>
import Login from './Views/Login.vue'
import Nadbar from './Views/loyout/Nadbar.vue'
import Sidebar from './Views/loyout/Sidebar.vue'

export default {
  components: { Login, Sidebar, Nadbar },
  name: 'App',
  data(){
    return {
      Logueado : false
    }
  },
  methods:{
    CambioLogueo(DatoLogueo){
      this.Logueado = DatoLogueo
    }
  }
}

</script>

<style>
 @import 'assets/css/style.css';

</style>
