<template>
    <div>
        <b-container fluid>
            <b-row align-h="end" class="m-3 mt-5">
                <button class="btn btn-success" @click="IrAGenerarCita">
                    <i class="fa fa-plus"></i>
                </button>
            </b-row>
            <b-row align-h="center">
               <h4 class="text-light"><strong>Listado Citas</strong></h4>
           </b-row>
           <citas-listado></citas-listado>
        </b-container>
    </div>
</template>
<script>
import CitasListado from '../components/Citas/CitasListado.vue'
    export default {
  components: { CitasListado },
        name: 'ListadoCitas',
        methods:{
            IrAGenerarCita(){
                this.$router.push('/Citas')
            }
        }        

    }
</script>