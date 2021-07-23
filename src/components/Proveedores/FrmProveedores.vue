<template>
    <div>
        <b-button v-b-modal.modal-prevent-closing> <i class="fas fa-plus"></i></b-button>
        <b-modal id="modal-prevent-closing" ref="modal" :title="TituloMd" :ok-title="TituloBtn" @show="resetModal"
            @hidden="resetModal" @ok="CrearProveedor" cancel-variant="danger" :cancel-title="TituloCancel" size="lg">
            <form @submit.stop.prevent class="was-validated">
                <label for="NombreProvee">Nombre Proveedor</label>
                <b-form-input type="text" v-model="Nombre" placeholder="Ingrese el nombre del Proveedor"
                    id="NombreProvee" required minlength="5">
                </b-form-input>
                <div v-if="!$v.Nombre.required" class="invalid-feedback">Este campo tiene que estar lleno</div>
                <div v-if="!$v.Nombre.minLength" class="invalid-feedback">Este campo tiene que tener mas de 5 caracteres
                </div>
                <br>
                <label for="Direccion">Direccion</label>
                <b-form-input type="text" v-model="Direccion" placeholder="Ingrese la direcion del Proveedor"
                    id="Direccion" required>
                </b-form-input>
                <div v-if="!$v.Direccion.required" class="invalid-feedback">Este campo tiene que estar lleno</div>
                <br>
                <label for="Telefono">Telefono</label>
                <b-form-input type="number" v-model="Telefono" placeholder="Ingrese el Telefono del Proveedor"
                    id="Telefono" required>
                </b-form-input>
                <div v-if="!$v.Telefono.required" class="invalid-feedback">Este campo tiene que estar lleno</div>
            </form>
        </b-modal>
    </div>
</template>
<script>
    import {
        required,
        minLength
    } from 'vuelidate/lib/validators'
    import axios from 'axios'
    import {Global} from '../../Global'
    export default {
        name: 'FrmProveedores',
        data() {
            return {
                TituloBtn: 'Crear Proveedor',
                TituloMd: 'Crear Proveedor',
                TituloCancel: 'Cancelar',
                Nombre: '',
                Direccion: '',
                Telefono: '',
            }
        },
        validations: {
            Nombre: {
                required,
                minLength: minLength(5)
            },
            Direccion: {
                required
            },
            Telefono: {
                required
            }
        },
        methods: {
            resetModal() {
                this.Nombre = ''

            },
            CrearProveedor(bvModalEvt) {
                bvModalEvt.preventDefault();
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return false
                } else {
                  
                 
                    const Json = {
                        'NombreProveedor': this.Nombre,
                        'Direccion' :  this.Direccion,
                        'Telefono' :  this.Telefono
                    }
                    axios.post(Global.URL+'CrearProveedor',Json,{
                        headers: {
                             Authorization: Global.Token

                        }
                    }).then(response => {
                   
                        if (response.status == 201) {
                            this.$emit('CambioBdProvee', 1);
                            this.$swal.fire(
                                'Creado Correctamente!',
                                'Tu has Creado un Proveedor Correctamente!',
                                'success'
                            )
                                  
                            //  this.resetModal();
                        } else {
                            alert('algo salio mal en la peticion');
                        }
                    })

                }
            }
        }

    }
</script>