<template>
    <div>
        <b-container fluid>
           <generar-venta></generar-venta>
        </b-container>
    </div>
</template>
<script>
import GenerarVenta from '../components/Ventas/GenerarVenta.vue'

export default {
  components: { GenerarVenta },
    name: 'Ventas'
}
</script>