<template>
    <div><br>
        <b-container fluid>
            <b-row align-h="end">
                <frm-crear-servicio @CambioBdServicio="DetectarCambioServicio"></frm-crear-servicio>
            </b-row>
            <b-row align-h="center">
                <h3 class="text-white"><strong>SERVICIOS</strong></h3>
            </b-row><br>
            
                <listado-servicio :key="CambioBdServicio" @CambioBdServicio="DetectarCambioServicio"></listado-servicio>
           
        </b-container>
    </div>
</template>
<script>
    import FrmCrearServicio from '../components/Servicios/FrmCrearServicio.vue'
import ListadoServicio from '../components/Servicios/ListadoServicio.vue'
    export default {
        components: {
            FrmCrearServicio,
            ListadoServicio
        },
        data(){
            return{
                CambioBdServicio : 0,
            }
        },
        name: 'Servicios',
        methods:{
            DetectarCambioServicio(){
                this.CambioBdServicio++
            }
        }
    }
</script>