<template>
    <div>
        <b-button v-b-modal.Crear-Sucursal class="mr-4" variant="primary"> <i class="fas fa-plus"></i></b-button>
        <b-modal id="Crear-Sucursal" title="Crear Sucursal" size="lg" hide-footer>
            <form @submit.stop.prevent class="was-validated">
                <b-row align-h="center">
                    <b-col cols="12" sm="6">
                        <label for="Nombres">Nombres</label>
                        <b-form-input type="text" v-model="NombreSucursal" placeholder="Nombre" required>
                        </b-form-input>
                        <div v-if="!$v.NombreSucursal.required" class="invalid-feedback">Este campo tiene que estar
                            lleno</div>
                    </b-col>
                    <b-col cols="12" sm="6">
                        <label for="Direccion">Direccion</label>
                        <b-form-input type="text" v-model="Direccion" placeholder="Direccien de la sucursal" required>
                        </b-form-input>
                        <div v-if="!$v.Direccion.required" class="invalid-feedback">Este campo tiene que estar lleno
                        </div>
                    </b-col>

                    <b-col cols="12" sm="6">
                        <label for="Telefono">Telefono</label>
                        <b-form-input type="number" v-model="Telefono" placeholder="Telefono" required maxlength="8">
                        </b-form-input>
                        <div v-if="!$v.Telefono.required" class="invalid-feedback">Este campo tiene que estar lleno
                        </div>
                        <div v-if="!$v.Telefono.minLength" class="invalid-feedback">Este campo tiene que tener mas de 5
                            caracteres</div>
                    </b-col>
                </b-row>
                <hr>
                <b-row align-h="center">
                    <button class="btn btn-primary mr-2" @click="CrearSucursal">Crear Sucursal</button>
                    <button class="btn btn-danger" @click="resetModal">Cancelar</button>
                </b-row>
            </form>
        </b-modal>
    </div>
</template>
<script>
    import axios from 'axios'
    import {
        required,
        minLength
    } from 'vuelidate/lib/validators'
    import {
        Global
    } from '../../Global'

    export default {
        name: 'FrmCrearSucursal',
        data() {
            return {
                NombreSucursal: '',
                Direccion: '',
                Telefono: ''
            }
        },
        validations: {
            NombreSucursal: {
                required
            },
            Direccion: {
                required
            },
            Telefono: {
                required,
                minLength: minLength(2)
            }
        },
        methods: {
            resetModal() {
                this.$bvModal.hide('Crear-Sucursal');
                this.NombreSucursal = '';
                this.Direccion = '';
                this.Telefono = '';                
            },
            CrearSucursal(bvModalEvt) {
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
                        // Variables para Sucursal
                        'NombreSucursal': this.NombreSucursal,                       
                        'Direccion': this.Direccion,
                        'Telefono': this.Telefono,
                    };
                    axios.post(Global.URL + 'CrearSucursal', Json, {
                        headers: {
                            Authorization: Global.Token
                        }
                    }).then(response => {
                        if (response.status == 200) {
                            this.$emit('CambioBdSucursal', 1);
                            this.$swal.fire(
                                'Creado Correctamente!',
                                'Tu has Creado una nueva Sucursal!',
                                'success'
                            )
                            this.resetModal()
                        } else {
                            alert('No sierves para progra');
                        }
                    });
                }
            }
        }
    }
</script>