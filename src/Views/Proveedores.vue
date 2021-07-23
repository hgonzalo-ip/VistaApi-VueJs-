<template>
    <div>   
    
        <b-container fluid>
            <b-row align-h="center" class="mt-3">
                <h3 class="text-dark">Proveedores</h3>
            </b-row>
            <b-row align-h="end" class="mr-5">
            <frm-proveedores @CambioBdProvee="DectarCambio()"></frm-proveedores>
            </b-row>
            <b-row>
                <listado-proveedores :key="CambioBdProvee" @CambioBdProvee="DectarCambio()"></listado-proveedores>
            </b-row>
        </b-container>
            
 

       
  
    </div>
</template>
<script>
import FrmProveedores from '../components/Proveedores/FrmProveedores.vue'
import ListadoProveedores from '../components/Proveedores/ListadoProveedores.vue'
export default {
  components: { FrmProveedores, ListadoProveedores },
    name: 'Proveedores',
    data(){
        return{
            CambioBdProvee: 0
        }
    },
    methods:{
        DectarCambio(){
            this.CambioBdProvee++
        }
    }
}
</script>