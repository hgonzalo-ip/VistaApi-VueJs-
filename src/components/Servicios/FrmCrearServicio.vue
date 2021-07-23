<template>
    <div>
        <b-button v-b-modal.modal-Servicio class="mr-5 mt-2">
            <i class="fas fa-plus"></i>
        </b-button>
        <!-- Modales -->
        <!-- Inicio Modal Crear Servicio ---------------------------------------------------->
        <!-- ------------------------------------------------------------------------------ -->
        <b-modal id="modal-Servicio" size="lg" title="Crear Servicio" hide-footer>
            <!-- Fomulario -->
            <form @submit.stop.prevent class="was-validated">
                <b-row align-h="center">
                    <b-col sm="10" md="6" xl="12">
                        <label>Sucursal</label>
                        <b-form-select v-model="SltSucursalSv" required>
                            <b-form-select-option :value="null">Eliga una Sucursal</b-form-select-option>
                            <b-form-select-option v-for="(ListadoSucursales ,index) in Sucursales" v-bind:key="index"
                                :value="ListadoSucursales.IdSucursal">
                                {{ListadoSucursales.NombreSucursal}}
                            </b-form-select-option>
                        </b-form-select>
                        <div v-if="!$v.SltSucursalSv.required" class="invalid-feedback">Este campo tiene que estar
                            seleccionado
                        </div>
                    </b-col>

                </b-row>
                <br>
                <b-row align-h="center">
                    <b-col xl="6" md="4" sm="10">
                        <label>Nombre Servicio</label>
                        <input type="text" class="form-control" v-model="NombreSv" required>
                        <div v-if="!$v.NombreSv.required" class="invalid-feedback">Este campo tiene que estar
                            lleno
                        </div>
                    </b-col>
                    <b-col xl="6" md="4" sm="10">
                        <label>Precio Venta</label>
                        <input type="number" step="0.01" class="form-control" v-model="PrecioVentaSv" required>
                        <div v-if="!$v.PrecioVentaSv.required" class="invalid-feedback">Este campo tiene que estar lleno
                        </div>
                    </b-col>
                </b-row>
                <br>
                <b-row align-h="center">
                    <b-col xl="12" md="12" sm="12">
                        <label>Descripcion Servicio</label>
                        <textarea class="form-control" v-model="DescripcionSv" required>

                        </textarea>
                        <div v-if="!$v.DescripcionSv.required" class="invalid-feedback">Este campo tiene que estar lleno
                        </div>
                    </b-col>
                </b-row>
            </form>
            <!-- Botones -->
            <br>
            <b-row align-h="end" class="mr-2">
                <b-button variant="danger" class="mr-2" @click="$bvModal.hide('modal-Servicio')">Cancelar</b-button>
                <b-button variant="primary" @click="CrearServicio">Crear Servicio</b-button>
            </b-row>
        </b-modal>

    </div>
</template>
<script>
    import {
        required
    } from 'vuelidate/lib/validators'
    import axios from 'axios'
    import {
        Global
    } from '../../Global';
    export default {
        name: 'FrmCrearServicio',
        data() {
            return {
                // Select Sucursal 
                Sucursales: [],
                // Crear Servicio    
                SltSucursalSv: '',
                NombreSv: '',
                DescripcionSv: '',
                PrecioVentaSv: ''

            }
        },
        validations: {
            SltSucursalSv: {
                required
            },
            NombreSv: {
                required
            },
            DescripcionSv: {
                required
            },
            PrecioVentaSv: {
                required
            }
        },
        mounted() {
            this.ListSucurSelc();
        },
        methods: {
            ListSucurSelc() {
                // const tok = localStorage.getItem('access_token');
                axios.get(Global.URL + 'ListarTodasSucursales', {
                    headers: {
                        Authorization: Global.Token
                    }
                }).then(response => {
                    if (response.status == 200) {

                        for (var i = 0; i < response.data.length; i++) {
                            this.Sucursales.push({
                                IdSucursal: response.data[i].IdSucursal,
                                NombreSucursal: response.data[i].NombreSucursal,
                            });

                        }

                    } else {
                        alert('No se puedo realizar la petición');
                    }
                })
            }, //Fin de Sucursales
            CrearServicio(bvModalEvt) {
                bvModalEvt.preventDefault();
                this.$v.$touch();
                if (this.$v.$invalid) {
                    this.$swal.fire(
                        'Llenar Formulario por favor !!',
                        '',
                        'warning'
                    )
                    return false

                } else {
                    const Json = {
                        'IdSucursal': this.SltSucursalSv,
                        'NombreServicio': this.NombreSv,
                        'PrecioVentaSv': this.PrecioVentaSv,
                        'DescripcionSv': this.DescripcionSv
                    }
                    axios.post(Global.URL + 'CrearServicio', Json, {
                        headers:{
                            Authorization: Global.Token
                        }
                    }).then(response => {
                        if (response.status == 200) {
                            this.$emit('CambioBdServicio', 1);
                            this.$swal.fire(
                                'Creado Correctamente!!',
                                'Se ha creado un nuevo servicio',
                                'success'
                            )
                        } else {
                            alert('No se pudo realizar la peticion');
                        }
                    })
                }
            }
        }
    }
</script>