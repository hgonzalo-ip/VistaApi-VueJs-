<template>
    <div><br>
        <b-container fluid>
            <b-row align-h="end">
                <frm-crear-cliente @CambioBd="DetectarCambioBD()"></frm-crear-cliente>
            </b-row>
                        <b-row align-h="center">
                <h3 class="text-white"><strong>Clientes</strong></h3>
            </b-row>
            <br>
                <listado-clientes :key="CambioBD" @CambioBd="DetectarCambioBD()"></listado-clientes>
            
        </b-container>
    </div>
</template>
<script>
    import FrmCrearCliente from '../components/Clientes/FrmCrearCliente.vue'
import ListadoClientes from '../components/Clientes/ListadoClientes.vue'

    export default {
        components: {
            FrmCrearCliente,       
            ListadoClientes
        },
        name: 'Clientes',
        data(){
            return{
                CambioBD : 0
            }
        },
        methods:{
            DetectarCambioBD(){
                this.CambioBD ++
            }
        }

    }
</script>