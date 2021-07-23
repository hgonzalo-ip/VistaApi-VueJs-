<template>
<div>
       <b-navbar  id="Nav" >
      <b-button v-b-toggle.Sidebar id="BtnToggleSidebar"><i class="fas fa-bars"></i></b-button>
    <b-collapse  id="nav-collapse" is-nav>
        
      <b-navbar-nav class="ml-auto">
          <img src="https://scontent-mia3-2.xx.fbcdn.net/v/t1.6435-9/156411356_1014864732374912_3345466089573545891_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=H8ovnT4eqKsAX_sI1KN&_nc_ht=scontent-mia3-2.xx&oh=589626ae2b71257523c05882928c8337&oe=60A1B693" id="ImgFotoPerfil" class="mr-2">
            <h5 class="mt-2">Berta Veliz</h5>
          <b-nav-item-dropdown  right>
          <b-dropdown-item @click="CerrarSesion()">Cerrar Sesión</b-dropdown-item>
          <b-dropdown-item to="/Usuarios">Registro Usuarios</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar> 
</div>


</template>
<script>
import {Global} from '../../Global'
    export default {
        name: 'Sidebar',
        mounted(){
          if(Global.Token == 'Bearer null' || Global.Token == ''){
            Global.Token = 'Bearer ' + localStorage.getItem('access_token') ;
          }
        },
        methods: {
            CerrarSesion() {
                this.$store.dispatch("destroyToken")
                    .then(() => {
                        this.$emit('Logueado', false);
                        Global.Token = '';
                        this.$router.push({
                            name: 'Login'
                        })
                    });
            }
        }
    }
</script>