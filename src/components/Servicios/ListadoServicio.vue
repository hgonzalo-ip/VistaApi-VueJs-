<template>
    <div>
        <b-row align-h="center">
            <b-col cols="12" xl="6" md="8">
                <label><strong>Buscador</strong></label>
                <input type="search" class="form-control" v-model="BuscardorGeneral"
                    @keyup="BuscardorGeneralSv(BuscardorGeneral)" placeholder="Buscador General">
            </b-col>
            <b-col cols="12" xl="3" md="3" class="mt-2">
                <label></label>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1"><i class="fas fa-filter"></i></span>
                    </div>
                    <b-form-select v-model="FiltroIdSucursal" @change="FiltroPorSucursal" required>
                        <b-form-select-option :value="null" :disabled="true">Eliga una Sucursal</b-form-select-option>
                        <b-form-select-option v-for="(ListadoSucursales ,index) in Sucursales" v-bind:key="index"
                            :value="ListadoSucursales.IdSucursal">
                            {{ListadoSucursales.NombreSucursal}}
                        </b-form-select-option>
                    </b-form-select>
                </div>
            </b-col>
        </b-row>
        <b-row align-h="center">
            <b-col cols="12" xl="6" md="8" class="mt-2" v-if="this.FiltroEstado == 1">
                <label></label>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1"><i class="fas fa-filter"></i></span>
                    </div>
                    <select v-model="ValueFiltro" @change="BuscadorFiltro" class="form-control">
                        <option value="0">Todos</option>
                        <option :value="1">Habilitados</option>
                        <option value="2">Desabilitados</option>
                    </select>
                </div>
            </b-col>
        </b-row><br>
        <b-row align-h="center" v-if="ValidarDatosReq == 0">
            <h6><strong>No hay datos</strong></h6>
        </b-row>
        <b-row id="RowScroll" align-h="center" v-if="ValidarDatosReq == 1">
            <b-col cols="12" xl="4" md="4" v-for="(Listado ,index) in LstServicios" v-bind:key="index">

                <div class="card Card-Servicios">
                    <div class="card-body mb-4">
                        <h4>{{Listado.NombreServicio}}</h4>
                        <time><small>{{Listado.NombreSucursal}}</small></time>
                        <h6>Precio: <strong>Q.{{Listado.PrecioVentaSV}}</strong></h6>
                        <h6 v-if="Listado.Estado ==1">Estado: <strong>{{Listado.DecEstado}}</strong><i
                                class="fas fa-clipboard-check ml-1 text-success"></i></h6>
                        <h6 v-if="Listado.Estado ==2">Estado: <strong>{{Listado.DecEstado}}</strong><i
                                class="fas fa-exclamation-circle ml-1 text-danger"></i></h6>
                        <b-row align-h="center" class="Cd-Servicio-Footer">
                            <b-col cols="12" xl="12" md="12">
                                <p class="text-justify">Descripción: <strong>{{Listado.DescripcionSv}}</strong></p>
                            </b-col>
                        </b-row>
                    </div>
                    <div class="card-footer mt-2">

                        <b-row align-h="center" v-if="Listado.Estado == 1">
                            <b-col cols="4" xl="4" md="5">
                                <button class="btn btn-danger"
                                    @click="DesabilitarServicio(Listado.IdServicio)">Eliminar</button>

                            </b-col>
                            <b-col cols="4" xl="4" md="5">
                                <button class="btn btn-primary"
                                    @click="OpenModalEdit(Listado.IdServicio)">Editar</button>
                            </b-col>
                        </b-row>
                        <b-row align-h="center" v-if="Listado.Estado == 2">
                            <b-col cols="4" xl="4" md="5">
                                <button class="btn btn-success"
                                    @click="HabilitarServicio(Listado.IdServicio)">Habilitar</button>

                            </b-col>
                        </b-row>
                    </div>


                </div>
            </b-col>
        </b-row>
        <!-- Inicio De Modales -->
        <!-- Modal Editar Servicio -->
        <b-modal id="bv-modal-Edit-Sucursal" size="lg" title="Editar Servicio" hide-footer>
            <!-- Fomulario -->
            <form @submit.stop.prevent class="was-validated">
                <b-row align-h="center">
                    <b-col cols="12" xl="12" md="12">
                        <b-form-select v-model="SltSucursalSvEdit" required>
                            <b-form-select-option :value="null">Eliga una Sucursal</b-form-select-option>
                            <b-form-select-option v-for="(ListadoSucursales ,index) in Sucursales" v-bind:key="index"
                                :value="ListadoSucursales.IdSucursal">
                                {{ListadoSucursales.NombreSucursal}}
                            </b-form-select-option>
                        </b-form-select>
                        <div v-if="!$v.SltSucursalSvEdit.required" class="invalid-feedback">Este campo tiene que estar
                            seleccionado
                        </div>
                    </b-col>
                </b-row><br>
                <b-row align-h="center">
                    <b-col cols="6" xl="6" md="6">
                        <label>Nombre Servicio</label>
                        <input type="hidden" class="form-control" v-model="IdServicioEdit" required>
                        <input type="text" class="form-control" v-model="NombreSvEdit" required>
                        <div v-if="!$v.NombreSvEdit.required" class="invalid-feedback">Este campo tiene que estar
                            lleno
                        </div>
                    </b-col>
                    <b-col cols="6" xl="6" md="6">
                        <label>Precio Venta</label>
                        <input type="number" step="0.01" class="form-control" v-model="PrecioVentaSvEdit" required>
                        <div v-if="!$v.PrecioVentaSvEdit.required" class="invalid-feedback">Este campo tiene que estar
                            lleno
                        </div>
                    </b-col>
                </b-row><br>
                <b-row align-h="center">
                    <b-col xl="12" md="12" sm="12">
                        <label>Descripcion Servicio</label>
                        <textarea class="form-control" v-model="DescripcionSvEdit" required>

                        </textarea>
                        <div v-if="!$v.DescripcionSvEdit.required" class="invalid-feedback">Este campo tiene que estar
                            lleno
                        </div>
                    </b-col>
                </b-row>
            </form>

            <br>
            <b-row align-h="end" class="mr-2">
                <b-button variant="danger" class="mr-2" @click="$bvModal.hide('bv-modal-Edit-Sucursal')">Cancelar
                </b-button>
                <b-button variant="primary" @click="EditarServicio">Editar Servicio</b-button>
            </b-row>
        </b-modal>
    </div>
</template>
<script>
    import {
        required
    } from 'vuelidate/lib/validators';
    import axios from 'axios';
    import {
        Global
    } from '../../Global';
    export default {
        name: 'ListadoServicio',
        data() {
            return {
                ValidarDatosReq: '',
                // Array Listado Servicios
                LstServicios: [],
                // Listar Select Sucursales
                Sucursales: [],
                // Variables para Editar
                IdServicioEdit: '',
                SltSucursalSvEdit: '',
                NombreSvEdit: '',
                DescripcionSvEdit: '',
                PrecioVentaSvEdit: '',
                // Variables para editar Servicio
                EditNombreSv: '',
                // Buscador General
                BuscardorGeneral: '',
                // Filtro
                ValueFiltro: '0',
                //Activar Filtro Estado
                FiltroEstado: '',
                //Variables Filtro por sucursal
                FiltroIdSucursal: 'null'

            }
        },
        validations: {
            SltSucursalSvEdit: {
                required
            },
            NombreSvEdit: {
                required
            },
            DescripcionSvEdit: {
                required
            },
            PrecioVentaSvEdit: {
                required
            }
        },
        mounted() {
            this.ListarServicios();
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
            ListarServicios() {
                axios.get(Global.URL + 'ListadoServicios', {
                    headers: {
                        Authorization: Global.Token
                    }
                }).then(response => {
                    if (response.status == 200) {
                        //    console.log(response.data);
                        if (response.data == 0) {
                            this.ValidarDatosReq = 0
                        } else {
                            this.ValidarDatosReq = 1
                            for (let i = 0; i < response.data.length; i++) {
                                this.LstServicios.push({
                                    IdServicio: response.data[i].IdServicio,
                                    IdSucursal: response.data[i].IdSucursal,
                                    NombreSucursal: response.data[i].NombreSucursal,
                                    NombreServicio: response.data[i].NombreServicio,
                                    PrecioVentaSV: response.data[i].PrecioVenta,
                                    DescripcionSv: response.data[i].Descripcion,
                                    Estado: response.data[i].Estado,
                                    DecEstado: response.data[i].DecEstado,
                                });
                            }
                        }
                    } else {
                        alert('No se puedo realizar la petición');
                    }
                })
            }, //Fin listado Cursos
            DesabilitarServicio(IdServicio) {
                this.$swal.fire({
                    title: 'Estas Seguro?',
                    text: "Desabilitar Servicio!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, Desabilitarlo!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.post(Global.URL + 'DesabilitarServicio', {
                            IdServicio: IdServicio
                        }, {
                            headers: {
                                Authorization: Global.Token
                            }
                        }).then(response => {
                            if (response.status == 200) {
                                this.$emit('CambioBdServicio', 1);
                                this.$swal.fire(
                                    'Desabilitado!',
                                    'Tu has Desabilitado a un servicio.',
                                    'success'
                                )

                            } else {
                                alert('Algo Salio mal en la petición')
                            }
                        })
                    }

                })
            }, //Fin de Desabilitar Servicio
            HabilitarServicio(IdServicio) {
                this.$swal.fire({
                    title: 'Estas Seguro?',
                    text: "Habilitar Servicio!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, Habilitarlo!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.post(Global.URL + 'HabilitarServicio', {
                            IdServicio: IdServicio
                        }, {
                            headers: {
                                Authorization: Global.Token
                            }
                        }).then(response => {
                            if (response.status == 200) {
                                this.$emit('CambioBdServicio', 1);
                                this.$swal.fire(
                                    'Habilitado!',
                                    'Tu has Habilitado a un servicio.',
                                    'success'
                                )

                            } else {
                                alert('Algo Salio mal en la petición')
                            }
                        })
                    }

                })
            }, // Fin de Habilitar Servicio
            OpenModalEdit(Id) {
                this.$bvModal.show('bv-modal-Edit-Sucursal');
                axios.post(Global.URL + 'InfoEditarServicio', {
                    Id: Id
                }, {
                    headers: {
                        Authorization: Global.Token
                    }
                }).then(response => {
                    if (response.status == 200) {
                        this.IdServicioEdit = response.data.IdServicio;
                        this.SltSucursalSvEdit = response.data.IdSucursal;
                        this.NombreSvEdit = response.data.NombreServicio;
                        this.PrecioVentaSvEdit = response.data.PrecioVentaServicio;
                        this.DescripcionSvEdit = response.data.Descripcion;
                    }
                });
            }, //Fin Abrir Modal
            EditarServicio(bvModalEvt) {
                bvModalEvt.preventDefault();
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return false
                } else {
                    const Json = {
                        'IdServicioEdit': this.IdServicioEdit,
                        'SltSucursales': this.SltSucursalSvEdit,
                        'NombreSvEdit': this.NombreSvEdit,
                        'DescripcionSvEdit': this.DescripcionSvEdit,
                        'PrecioVentaSvEdit': this.PrecioVentaSvEdit,
                    }
                    axios.post(Global.URL + 'EditarServicio', Json, {
                        headers: {
                            Authorization: Global.Token
                        }
                    }).then(response => {
                        if (response.status == 200) {
                            this.$emit('CambioBdServicio', 1);
                            this.$bvModal.hide('bv-modal-Edit-Sucursal');
                            this.$swal.fire(
                                'Editado Correctamente',
                                'El Servicio ha sido modificado Correctamente',
                                'success'
                            )

                        }
                    })
                }
            }, //Fin de Editar Servicio
            FiltroPorSucursal() {
                               
                axios.post(Global.URL + 'FiltroSucursales', {
                    FiltroIdSucursal: this.FiltroIdSucursal
                }, {
                    headers: {
                        Authorization: Global.Token
                    }
                }).then(response => {
                    if (response.status == 200) {
                        if (response.data.length == 0) {
                            this.ValidarDatosReq = 0
                        } else {
                            this.FiltroEstado = 1;
                            this.ValidarDatosReq = 1;
                            this.LstServicios = [];
                            for (var i = 0; i < response.data.length; i++) {
                                this.LstServicios.push({
                                    IdServicio: response.data[i].IdServicio,
                                    IdSucursal: response.data[i].IdSucursal,
                                    NombreSucursal: response.data[i].NombreSucursal,
                                    NombreServicio: response.data[i].NombreServicio,
                                    PrecioVentaSV: response.data[i].PrecioVenta,
                                    DescripcionSv: response.data[i].Descripcion,
                                    Estado: response.data[i].Estado,
                                    DecEstado: response.data[i].DecEstado,
                                });
                            }
                        }

                    } else {
                        alert('No se pudo realizar la peticion');
                    }
                })

            },
            BuscadorFiltro() {
                axios.post(Global.URL + 'FiltroEstados', {
                    Estado: this.ValueFiltro,
                    IdSucursal:  this.FiltroIdSucursal
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
                            this.LstServicios = []
                            for (var i = 0; i < response.data.length; i++) {
                                this.LstServicios.push({
                                    IdServicio: response.data[i].IdServicio,
                                    IdSucursal: response.data[i].IdSucursal,
                                    NombreSucursal: response.data[i].NombreSucursal,
                                    NombreServicio: response.data[i].NombreServicio,
                                    PrecioVentaSV: response.data[i].PrecioVenta,
                                    DescripcionSv: response.data[i].Descripcion,
                                    Estado: response.data[i].Estado,
                                    DecEstado: response.data[i].DecEstado,
                                });
                            }
                        }

                    } else {
                        alert('No se pudo realizar la peticion');
                    }
                })
            }, //Fin Filtrado Estados
            BuscardorGeneralSv(Datos) {
                axios.post(Global.URL + 'BuscardorGeneralSv', {
                    Datos: Datos
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
                            this.LstServicios = []
                            for (var i = 0; i < response.data.length; i++) {
                                this.LstServicios.push({
                                    IdServicio: response.data[i].IdServicio,
                                    IdSucursal: response.data[i].IdSucursal,
                                    NombreSucursal: response.data[i].NombreSucursal,
                                    NombreServicio: response.data[i].NombreServicio,
                                    PrecioVentaSV: response.data[i].PrecioVenta,
                                    DescripcionSv: response.data[i].Descripcion,
                                    Estado: response.data[i].Estado,
                                    DecEstado: response.data[i].DecEstado,
                                });
                            }
                        }

                    } else {
                        alert('No se pudo realizar la peticion');
                    }
                })
            }
        }
    }
</script>