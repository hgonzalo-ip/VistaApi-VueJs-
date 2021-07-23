<template>
    <div>
        <b-button v-b-modal.modal-prevent-closing class="mr-4"> <i class="fas fa-plus"></i></b-button>
        <b-modal id="modal-prevent-closing" :title="TituloMd" :ok-title="TituloBtn" @show="resetModal"
            @hidden="resetModal" @ok="CrearEmpleado" cancel-variant="danger" :cancel-title="TituloCancel" size="lg">
            <form @submit.stop.prevent class="was-validated">
                <h5>Datos del Usuario</h5>
                <b-row align-h="center">
                    <b-col cols="12" sm="9">

                        <label for="TipoUsuario">Tipo de Usuario</label>
                        <b-form-select v-model="SlTipoUser" required>
                            <b-form-select-option :value="null">Eliga un tipo de usuario</b-form-select-option>
                            <b-form-select-option v-for="(Listado ,index) in TipoUsuario" v-bind:key="index"
                                :value="Listado.IdTipo">
                                {{Listado.Descripcion}}
                            </b-form-select-option>
                        </b-form-select>
                        <div v-if="!$v.SlTipoUser.required" class="invalid-feedback">Este campo tiene que estar lleno
                        </div>
                    </b-col>
                </b-row>
                <b-row align-h="center">
                    <b-col cols="12" sm="6">
                        <label for="NombreProvee">Correo</label>
                        <b-form-input type="email" v-model="Correo" placeholder="Ingrese el nombre del Proveedor"
                            id="NombreProvee" required minlength="5">
                        </b-form-input>
                        <div v-if="!$v.Correo.required" class="invalid-feedback">Este campo tiene que estar lleno</div>
                        <div v-if="!$v.Correo.minLength" class="invalid-feedback">Este campo tiene que tener mas de 5
                            caracteres
                        </div>
                    </b-col>

                    <b-col cols="12" sm="6">
                        <label for="Password">Contraseña</label>
                        <b-form-input type="password" v-model="Pass" placeholder="Ingrese la direcion del Proveedor"
                            id="Password" required>
                        </b-form-input>
                        <div v-if="!$v.Pass.required" class="invalid-feedback">Este campo tiene que estar lleno</div>
                    </b-col>
                </b-row>
                <br>
                <h5>Datos del Empleado</h5>
                <b-row align-h="center">

                    <b-col cols="12" sm="5">

                        <label for="TipoUsuario">Sucursal</label>
                        <b-form-select v-model="SltSucursal" required>
                            <b-form-select-option :value="null">Eliga una Sucursal</b-form-select-option>
                            <b-form-select-option v-for="(Listado ,index) in Sucursales" v-bind:key="index"
                                :value="Listado.IdSucursal">
                                {{Listado.NombreSucursal}}
                            </b-form-select-option>
                        </b-form-select>
                        <div v-if="!$v.SltSucursal.required" class="invalid-feedback">Este campo tiene que estar lleno
                        </div>
                    </b-col>
                </b-row>
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
        name: 'FrmEmpleado',
        data() {
            return {
           
                TituloBtn: 'Crear Empleado',
                TituloMd: 'Crear Empleado',
                TituloCancel: 'Cancelar',
                // Variables para ussuario
                SlTipoUser: null,
                Correo: '',
                Pass: '',
                // Variables para Empleado
                SltSucursal: null,
                Nombres: '',
                Apellidos: '',
                Direccion: '',
                Telefono: '',

                // Array para llenar el select del formulario
                TipoUsuario: [],
                Sucursales: [],

            }
        },
        validations: {
            SlTipoUser: {
                required
            },

            Correo: {
                required,
                minLength: minLength(5)
            },
            Pass: {
                required
            },
            SltSucursal: {
                required
            },
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
        mounted(){
            this.ListSucurSelc(), 
            this.ListTipoUsuario()
        },
      
        methods: {
            resetModal() {
                this.Nombre = ''

            },
            ListSucurSelc() {
                // const tok = localStorage.getItem('access_token');
                axios.get(Global.URL +'ListarTodasSucursales', {
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
            },
            ListTipoUsuario() {
                    // const tok = localStorage.getItem('access_token');
                axios.get(Global.URL +'ListTipoUsuario', {
                    headers: {
                          Authorization: Global.Token
                    }
                }).then(response => {
                    if (response.status == 200) {

                        for (var i = 0; i < response.data.length; i++) {
                            this.TipoUsuario.push({
                                IdTipo: response.data[i].IdTipoUsuario,
                                Descripcion: response.data[i].Descripcion,
                            });


                        }

                    } else {
                        alert('No se puedo realizar la petición');
                    }
                })
            },
            CrearEmpleado(bvModalEvt) {
                bvModalEvt.preventDefault();
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return false

                } else {
                    const Json = {
                        'SlTipoUser': this.SlTipoUser,
                        'Correo': this.Correo,
                        'Pass': this.Pass,
                        // Variables para Empleado
                        'SltSucursal': this.SltSucursal,
                        'Nombres': this.Nombres,
                        'Apellidos':  this.Apellidos,
                        'Direccion': this.Direccion,
                        'Telefono':  this.Telefono,
                    };
                    axios.post(Global.URL + 'CrearEmpleado', Json,{
                        headers: {
                            Authorization: Global.Token
                        }
                    }).then(response => {
                        if(response.status == 200){
                           this.$emit('CambioBdEmpleado', 1);
                            this.$swal.fire(
                                'Creado Correctamente!',
                                 'Tu has Creado un Empleado Nuevo Correctamente!',
                                'success'
                            )
                        }else{
                            alert('No sierves para progra');
                        }
                    });
                }
            } //Fin de Funcion Crear Cliente
          
        }
    }
</script>