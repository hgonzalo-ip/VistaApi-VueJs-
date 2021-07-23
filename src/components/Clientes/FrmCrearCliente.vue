<template>
  <div>
        <b-button v-b-modal.modal-prevent-closing class="mr-4"> <i class="fas fa-plus"></i></b-button>
        <b-modal id="modal-prevent-closing" :title="TituloMd" :ok-title="TituloBtn" @show="resetModal"
            @hidden="resetModal" @ok="CrearEmpleado" cancel-variant="danger" :cancel-title="TituloCancel" size="lg">
            <form @submit.stop.prevent class="was-validated">
       
                <h6>-- Datos del Cliente</h6>
           
                <b-row align-h="center">
                    <b-col cols="12" sm="6">
                        <label for="Nombres">Nombres</label>
                        <b-form-input type="text" v-model="Nombres" placeholder="Nombre Del Empleado" required>
                        </b-form-input>
                        <div v-if="!$v.Nombres.required" class="invalid-feedback">Este campo tiene que estar lleno</div>
                    </b-col>
                    <b-col cols="12" sm="6">
                        <label for="Apellidos">Apellidos</label>
                        <b-form-input type="text" v-model="Apellidos" placeholder="Nombre Del Empleado" required>
                        </b-form-input>
                        <div v-if="!$v.Apellidos.required" class="invalid-feedback">Este campo tiene que estar lleno
                        </div>
                    </b-col>
                    <b-col cols="12" sm="6">
                        <label for="Direccion">Direccion</label>
                        <b-form-input type="text" v-model="Direccion" placeholder="Nombre Del Empleado" required>
                        </b-form-input>
                        <div v-if="!$v.Direccion.required" class="invalid-feedback">Este campo tiene que estar lleno
                        </div>
                    </b-col>
                    <b-col cols="12" sm="6">
                        <label for="Telefono">Telefono</label>
                        <b-form-input type="number" v-model="Telefono" placeholder="Nombre Del Empleado" required
                            minlength="8">
                        </b-form-input>
                        <div v-if="!$v.Telefono.required" class="invalid-feedback">Este campo tiene que estar lleno
                        </div>
                        <div v-if="!$v.Telefono.minLength" class="invalid-feedback">Este campo tiene que tener mas de 5
                            caracteres</div>
                    </b-col>
                </b-row>
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
      import {Global} from '../../Global';

    export default {
        name: 'FrmCrearCliente',
        data() {
            return {
           
                TituloBtn: 'Crear Cliente',
                TituloMd: 'Crear Cliente',
                TituloCancel: 'Cancelar',
        
                // Variables para Empleado

                Nombres: '',
                Apellidos: '',
                Direccion: '',
                Telefono: '',

            }
        },
        validations: {
          
            Nombres: {
                required
            },
            Apellidos: {
                required
            },
            Direccion: {
                required
            },
            Telefono: {
                required,
                minLength: minLength(5)
            }

        }, 
        methods: {
            resetModal() {
                this.Nombres = ''
                this.Apellidos = ''
                this.Direccion = ''
                this.Telefono = ''
            },
            CrearEmpleado(bvModalEvt) {
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
                        // Variables para Cliente
                   
                        'Nombres': this.Nombres,
                        'Apellidos':  this.Apellidos,
                        'Direccion': this.Direccion,
                        'Telefono':  this.Telefono,
                    };
                    axios.post(Global.URL + 'CrearClient', Json,{
                        headers: {
                            Authorization: Global.Token
                        }
                    }).then(response => {
                        if(response.status == 200){
                            this.$emit('CambioBd', 1);                         
                            this.$swal.fire(
                                'Creado Correctamente!',
                                'Tu has Creado un Cliente Nuevo Correctamente!',
                                'success'
                            )                         
                        }else{
                            alert('No sierves para progra');
                        }
                    });
                }
            }
        }

    }
</script>
