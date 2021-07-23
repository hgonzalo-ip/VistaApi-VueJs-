<template>
    <div><br>
        <b-container fluid>
            <b-row align-h="end">
                <!-- Modal y Formulario para crear un usuario -->
                <frm-empleado @CambioBdEmpleado="DesctectarCambioBDEmpleado()"></frm-empleado>
            </b-row>
            <b-row align-h="center">
                <h3 class="text-white"><strong>EMPLEADOS</strong></h3>
            </b-row>
            <br>
            <listado-empleado :key="CambioBdEmpleado" @CambioBdEmpleado="DesctectarCambioBDEmpleado()"></listado-empleado>
        </b-container>
    </div>
</template>
<script>
    import FrmEmpleado from '../components/Empleados/FrmEmpleado.vue'
    import ListadoEmpleado from '../components/Empleados/ListadoEmpleado.vue'

    export default {
        components: {
            FrmEmpleado,
            ListadoEmpleado
        },
        name: 'Empleados',
        data() {
            return {
                CambioBdEmpleado: 0,
            }
        },
        methods: {
            DesctectarCambioBDEmpleado() {
                this.CambioBdEmpleado ++
            }
        }
    }
</script>