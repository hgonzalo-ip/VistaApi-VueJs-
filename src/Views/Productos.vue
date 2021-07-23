<template>
    <div><br>
        <b-container fluid>
            <b-row align-h="end">
                <frm-crear-producto @CambioBdProducto="DetectarCambioBdProducto"></frm-crear-producto>
            </b-row>
            <b-row align-h="center">
                <h3 class="text-white"><strong>Productos</strong></h3>
            </b-row>
            <br>
      
                <listado :key="CambioBdProducto" @CambioBdProducto="DetectarCambioBdProducto"></listado>
         
       </b-container>
    </div>
</template>
<script>
import FrmCrearProducto from '../components/Productos/FrmCrearProducto.vue'
import Listado from '../components/Productos/Listado.vue'
export default {
  components: { FrmCrearProducto, Listado },
    name: 'Productos',
    data(){
        return{
            CambioBdProducto : 0
        }
    },
    methods:{
        DetectarCambioBdProducto(){
            this.CambioBdProducto++
        }
    }
}
</script>