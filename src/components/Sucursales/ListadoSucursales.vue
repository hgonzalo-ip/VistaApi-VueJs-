<template>
    <div>
        <b-row align-h="center">
            <b-col cols="12" xl="6" md="10">
                <label>Estado</label>
                <select class="form-control" v-model="EstadoSucur" @change="ListarPorEstado">
                    <option value="null" selected disabled>Elige un Estado</option>
                    <option value="1">Activo</option>
                    <option value="2">Inactivo</option>
                </select>
            </b-col>
        </b-row>
        <br>
        <b-row align-h="center" v-if="ValidarDatosReq == 0">
            <h4><strong>No hay Datos</strong></h4>
        </b-row>
        <b-row align-h="center" v-if="ValidarDatosReq == 1">
            <b-col cols="11" xl="3" md="4" v-for="(Listado, index) in Sucursales" v-bind:key="index">
                <div class="card">
                    <div class="card-body">
                        <h5>{{Listado.NombreSucursal}}</h5>
                        <h5><small>Tel: <strong>{{Listado.Telefono}}</strong></small></h5>
                        <h5><small>Direccion: <strong>{{Listado.Direccion}}</strong></small></h5>
                        <h6 v-if="Listado.Estado == 1">Estado: <strong>{{Listado.EstadoDescrip}}</strong>
                            <i class="fas fa-clipboard-check ml-1 text-success"></i></h6>
                        <h6 v-if="Listado.Estado == 2">Estado: <strong>{{Listado.EstadoDescrip}}</strong>
                            <i class="fas fa-exclamation-circle ml-1 text-danger"></i>
                        </h6>
                    </div>
                    <div class="card-footer">
                        <b-row align-h="center">
                            <button class="btn btn-success btn-sm mr-2" v-if="Listado.Estado == 1"
                                @click="OpenModalEdit(Listado.IdSucursal)">Editar</button>
                            <button class="btn btn-danger btn-sm" @click="Eliminar(Listado.IdSucursal)"
                                v-if="Listado.Estado == 1">Eliminar</button>
                            <button class="btn btn-warning btn-sm" @click="Habilitar(Listado.IdSucursal)"
                                v-else>Habilitar</button>
                        </b-row>
                    </div>
                </div><br>
            </b-col>
        </b-row>
        <!-- Inicio Modales -->
        <!-- Modal Editar Usuario -->
        <b-modal id="edit-Sucursal" size="lg" hide-footer>
            <template #modal-title>
                Editar Sucursal
            </template>
            <form @submit.stop.prevent class="was-validated">
                <b-row align-h="center">
                    <b-col cols="12" sm="6">
                        <label for="Nombres">Nombres</label>
                        <b-form-input type="text" v-model="NombreSucursalEdit" placeholder="Nombre" required>
                            <input type="number" v-model="IdSucursalEdit">
                        </b-form-input>
                        <div v-if="!$v.NombreSucursalEdit.required" class="invalid-feedback">Este campo tiene que estar
                            lleno</div>
                    </b-col>
                    <b-col cols="12" sm="6">
                        <label for="Direccion">Direccion</label>
                        <b-form-input type="text" v-model="DireccionEdit" placeholder="Direccien de la sucursal"
                            required>
                        </b-form-input>
                        <div v-if="!$v.DireccionEdit.required" class="invalid-feedback">Este campo tiene que estar lleno
                        </div>
                    </b-col>

                    <b-col cols="12" sm="6">
                        <label for="Telefono">Telefono</label>
                        <b-form-input type="number" v-model="TelefonoEdit" placeholder="Telefono" required
                            maxlength="8">
                        </b-form-input>
                        <div v-if="!$v.TelefonoEdit.required" class="invalid-feedback">Este campo tiene que estar lleno
                        </div>
                        <div v-if="!$v.TelefonoEdit.minLength" class="invalid-feedback">Este campo tiene que tener mas
                            de 5
                            caracteres</div>
                    </b-col>
                </b-row>
                <hr>
                <b-row align-h="center">
                    <button class="btn btn-primary mr-2" @click="EditarSucursal">Editar Sucursal</button>
                    <button class="btn btn-danger" @click="$bvModal.hide('edit-Sucursal')">Cancelar</button>
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
    import {
        Global
    } from '../../Global'

    export default {
        name: 'ListadoSucursales',
        data() {
            return {
                Sucursales: [],
                EstadoSucur: 'null',
                ValidarDatosReq: '',
                // Variables Para Editar
                IdSucursalEdit: '',
                NombreSucursalEdit: '',
                DireccionEdit: '',
                TelefonoEdit: ''

            }
        },
        mounted() {
            this.ListSucurSelc();
        },
        validations: {
            NombreSucursalEdit: {
                required
            },
            DireccionEdit: {
                required
            },
            TelefonoEdit: {
                required,
                minLength: minLength(2)
            }
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
                        this.Sucursales = [];
                        this.ValidarDatosReq = 1;
                        for (var i = 0; i < response.data.length; i++) {
                            this.Sucursales.push({
                                IdSucursal: response.data[i].IdSucursal,
                                NombreSucursal: response.data[i].NombreSucursal,
                                Telefono: response.data[i].Telefono,
                                Direccion: response.data[i].Direccion,
                                EstadoDescrip: response.data[i].EstadoDescrip,
                                Estado: response.data[i].EstadoNum,
                            });

                        }

                    } else {
                        alert('No se puedo realizar la petición');
                    }
                })
            }, //Fin de Listado
            Eliminar(Id) {
                this.$swal.fire({
                    title: 'Estas Seguro?',
                    text: "Desabilitar Sucursal!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, Desabilitarlo!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.post(Global.URL + 'DesabilitarSucursal', {
                            IdSucursal: Id
                        }, {
                            headers: {
                                Authorization: Global.Token
                            }
                        }).then(response => {
                            if (response.status == 200) {
                                this.$emit('CambioBdSucursal', 1);
                                this.$swal.fire(
                                    'Desabilitado Correctamete',
                                    'La Sucursal' + response.data.NombreSucursal +
                                    'fue desabilitada',
                                    'success'
                                )
                            }
                        })
                    }

                })

            },
            Habilitar(Id) {
                this.$swal.fire({
                    title: 'Estas Seguro?',
                    text: "Habilitar Sucursal!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, Habilitar!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.post(Global.URL + 'HabilitarSucursal', {
                            IdSucursal: Id
                        }, {
                            headers: {
                                Authorization: Global.Token
                            }
                        }).then(response => {
                            if (response.status == 200) {
                                this.$emit('CambioBdSucursal', 1);
                                this.$swal.fire(
                                    'Habilitada Correctamete',
                                    'La Sucursal' + response.data.NombreSucursal +
                                    'fue Habilitada',
                                    'success'
                                )
                            }
                        })
                    }

                })
            },
            ListarPorEstado() {
                // alert(this.EstadoSucur)
                axios.post(Global.URL + 'ListarTodasSucursalesEstado', {
                    Estado: this.EstadoSucur
                }, {
                    headers: {
                        Authorization: Global.Token
                    }
                }).then(response => {
                    if (response.status == 200) {
                        if (response.data.length == 0) {
                            this.ValidarDatosReq = 0
                        } else {
                            this.ValidarDatosReq = 1
                            this.Sucursales = []
                            for (var i = 0; i < response.data.length; i++) {
                                this.Sucursales.push({
                                    IdSucursal: response.data[i].IdSucursal,
                                    NombreSucursal: response.data[i].NombreSucursal,
                                    Telefono: response.data[i].Telefono,
                                    Direccion: response.data[i].Direccion,
                                    EstadoDescrip: response.data[i].EstadoDescrip,
                                    Estado: response.data[i].EstadoNum,
                                });

                            }
                        }
                    } else {
                        alert('No se puedo realizar la petición');
                    }
                })
            }, //Fin de Listar Por Estado 
            OpenModalEdit(IdSucursal) {
                this.$bvModal.show('edit-Sucursal');
                axios.post(Global.URL + 'InfoEditSucursal', {
                    IdSucursal: IdSucursal
                }, {
                    headers: {
                        Authorization: Global.Token
                    }
                }).then(response => {
                    if (response.status == 200) {
                        this.IdSucursalEdit = response.data.IdSucursal,
                            this.NombreSucursalEdit = response.data.NombreSucursal,
                            this.DireccionEdit = response.data.Direccion,
                            this.TelefonoEdit = response.data.Telefono
                    }
                })

            }, //Fin Abrir Modal Editar Sucursal
            EditarSucursal(bvModalEvt) {
                bvModalEvt.preventDefault();
                if (this.$v.$invalid) {
                    this.$swal.fire(
                        'Llenar Formulario por favor !!',
                        '',
                        'warning'
                    )
                    return false

                } else {
                    const Json = {
                        'IdSucursalEdit': this.IdSucursalEdit,
                        'NombreEdit': this.NombreSucursalEdit,
                        'DireccionEdit': this.DireccionEdit,
                        'TelefonoEdit': this.TelefonoEdit
                    }
                    axios.post(Global.URL + 'EditarSucursal', Json, {
                        headers: {
                            Authorization: Global.Token
                        }
                    }).then(response => {
                        if (response.status == 200) {
                            this.$emit('CambioBdSucursal', 1);
                            this.$swal.fire(
                                'Editado Correctamente',
                                'Tu Has Editado Información de una Sucursal',
                                'success'
                            )
                        }
                    });
                }
            }
        }
    }
</script>