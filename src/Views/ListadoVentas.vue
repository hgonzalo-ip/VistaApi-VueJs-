<template>
    <div>
        <b-container fluid>
            <b-row align-h="end" class="m-3 mt-5">
                <button class="btn btn-success" @click="IrAVentas">
                    <i class="fa fa-plus"></i>
                </button>
            </b-row>
             <b-row align-h="center">
               <h4 class="text-light"><strong>Listado Ventas</strong></h4>
           </b-row>
           <ventas-listado></ventas-listado>
        </b-container>
    </div>
</template>
<script>
import VentasListado from '../components/Ventas/VentasListado.vue';
    export default {
  components: { VentasListado },
        name: 'ListadoVentas',       
        methods:{
            IrAVentas(){
                  this.$router.push('/Ventas');
            }
        }
    }
</script>