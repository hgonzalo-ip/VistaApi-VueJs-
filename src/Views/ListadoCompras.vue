<template>
    <div>
       <b-container fluid>
           <b-row align-h="end" class="m-3 mt-5">
               <button class="btn btn-success" @click="IrACompras">
                   <i class="fa fa-plus"></i>
               </button>
           </b-row>
           <b-row align-h="center">
               <h4 class="text-light"><strong>Listado Compras</strong></h4>
           </b-row>
            <compras-listado></compras-listado>
       </b-container>
    </div>
</template>
<script>
import ComprasListado from '../components/Compras/ComprasListado.vue';
export default {
  components: { ComprasListado },
    name: 'ListadoCompras',
    methods:{
        IrACompras(){
            this.$router.push('/GenerarCompra');
        }
    }
    
}
</script>