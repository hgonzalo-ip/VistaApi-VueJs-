<template>
    <div>
        <b-container fluid>
            <br>
           <b-row align-h="center">
               <h4 class="text-light"><strong>Generar Compra</strong></h4>
           </b-row>
         
               <frm-generar-compra></frm-generar-compra>
        
        </b-container>
    </div>
</template>
<script>
import FrmGenerarCompra from '../components/Compras/FrmGenerarCompra.vue'


export default {
  components: { FrmGenerarCompra },
  
    name: 'GenerarCompra'

}
</script>