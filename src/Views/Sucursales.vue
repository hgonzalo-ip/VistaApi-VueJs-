<template>
    <div><br>
        <b-container  fluid>
            <b-row align-h="end">
                <frm-crear-sucursal @CambioBdSucursal="CambioBd()"></frm-crear-sucursal>
            </b-row>
            <b-row align-h="center">
                <h3 class="text-light"><strong>Sucursales</strong></h3>
            </b-row><hr>
            <listado-sucursales :key="CambioBdSucursal" @CambioBdSucursal="CambioBd()"></listado-sucursales>
        </b-container>
    </div>
</template>
<script>
import FrmCrearSucursal from '../components/Sucursales/FrmCrearSucursal.vue'
import ListadoSucursales from '../components/Sucursales/ListadoSucursales.vue'
export default {
  components: { FrmCrearSucursal, ListadoSucursales },
    name: 'Sucursales',
    data(){
        return{
            CambioBdSucursal : 0
        }
    },
    methods:{
        CambioBd(){
            this.CambioBdSucursal++
        }
    }    
}
</script>