<template>
    <div>
        <b-container fluid>
            <frm-crear-cita></frm-crear-cita>
        </b-container>
    </div>
</template>
<script>
import FrmCrearCita from '../components/Citas/FrmCrearCita.vue'
export default {
  components: { FrmCrearCita },
    name: 'GenerarCita'
}
</script>