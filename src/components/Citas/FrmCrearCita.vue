<template>
    <div><br>
        <b-row align-h="center">
            <b-col cols="2" xl="1" md="2" class="mt-4 ">
                <frm-crear-cliente></frm-crear-cliente>
            </b-col>
            <b-col cols="9" xl="4" md="6">
                <!-- Select para Seleccionar un cliente -->
                <label><strong>Seleccione un Cliente</strong></label>
                <template>
                    <v-select v-model="IdCliente" :options="Clientes" class="bg-light"></v-select>
                </template>
            </b-col>
            <b-col cols="12" xl="3" md="8">
                <label><strong>Sucursal</strong></label>
                <select v-model="SltSucursal" class="form-control" @change="ListarServicioId()">
                    <option :value="null" :disabled="true">Elige una sucursal</option>
                    <option v-for="(Listado, index) in Sucursales" v-bind:key="index" :value="Listado.IdSucursal">
                        {{Listado.NombreSucursal}}
                    </option>
                </select>
            </b-col>
        </b-row>

        <!-- Inicio de Seleccionar Servicio -->
        <b-row align-h="center" class="p-3">
            <b-col cols="12" xl="6">
                <hr>
                <b-row align-h="center">
                    <b-col cols="12" xl="5" md="5" class="mb-2">
                        <label><strong>Fecha Cita</strong></label>
                        <input type="date" v-model="FechaCita" class="form-control bg-info text-light"
                            @change="validarFechaCita">
                    </b-col>
                    <b-col cols="12" xl="5" md="5">
                        <label><strong>Hora Cita</strong></label>
                        <input type="time" class="form-control bg-info text-light" v-model="HoraCita"
                            @change="validarFechaCita">
                    </b-col>
                </b-row>
                <b-row v-if="ActivarBuscador == 1">
                    <b-col cols="10" xl="12" md="12" class="mt-3">
                        <label>Buscador</label>
                        <input type="search" class="form-control" placeholder="Buscador" v-model="BuscarServicios"
                            @keyup="SearchServicios">
                    </b-col>
                    <b-col cols="2" class="mt-2" id="IconoCarrito">
                        <label></label>
                        <i class="fas fa-cart-plus fa-2x text-center" v-if="LstServiciosTabla.length != 0"
                            @click="VerServicios"></i>
                        <strong class="text-light" v-if="LstServiciosTabla.length != 0">
                            {{LstServiciosTabla.length}}</strong>
                    </b-col>
                </b-row><br>
                <b-row v-if="ValidarDatos == 0" align-h="center">
                    <h6><strong>No hay datos</strong></h6>
                </b-row>
                <b-row align-h="center" id="RowLstComprarProducto" v-else>
                    <!--  -->
                    <b-col cols="12" xl="6" md="4" v-for="(Listado , index) in LstServicios" v-bind:key="index">
                        <div class="card Card-Servicios">
                            <div class="card-body mb-4">
                                <h5>{{Listado.NombreServicio}}</h5>
                                <time><small>{{Listado.NombreSucursal}}</small></time>
                                <h6>Precio: <strong>Q.{{Listado.PrecioVentaSV}}</strong></h6>
                                <h6 v-if="Listado.Estado ==1">Estado: <strong>{{Listado.DecEstado}}</strong><i
                                        class="fas fa-clipboard-check ml-1 text-success"></i></h6>
                                <h6 v-if="Listado.Estado ==2">Estado: <strong>{{Listado.DecEstado}}</strong><i
                                        class="fas fa-exclamation-circle ml-1 text-danger"></i></h6>
                                <b-row align-h="center" class="Cd-Servicio-Footer">
                                    <b-col cols="12" xl="12" md="12">
                                        <p class="text-justify">Descripción: <strong>{{Listado.DescripcionSv}}</strong>
                                        </p>
                                    </b-col>
                                </b-row>
                            </div>
                            <div class="card-footer mt-2">

                                <b-row align-h="center" v-if="Listado.Estado == 1">
                                    <b-col cols="12" xl="10" md="8">
                                        <button class="btn btn-danger form-control"
                                            @click="AgregarCarrito(Listado.IdServicio)">Agregar</button>

                                    </b-col>
                                </b-row>

                            </div>
                        </div>
                    </b-col>


                </b-row>
            </b-col>
            <!-- Listado De los servicios a comprar -->
            <b-col cols="12" xl="6" md="6" class="mt-5" id="TablaGenerarVentaPC">
                <!-- -->
                <table class="table table-hover table-light" v-if="ValidarDatosTablaCompra == 1">
                    <thead>
                        <tr>
                            <th class="text-center">#</th>
                            <th class="text-center">Servicio</th>
                            <th class="text-center">SubTotal</th>
                            <th class="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(Listado, index) in LstServiciosTabla" v-bind:key="index">
                            <td class="text-center">{{index+1}}</td>
                            <td class="text-center">{{Listado.NombreServicio}}</td>
                            <td class="text-center">{{Listado.PrecioVentaSV}}</td>
                            <td class="text-center">
                                <button class="btn btn-danger btn-sm" @click="EliminarServicioTabla(index)">
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" class="text-right">
                                <strong>Total</strong>
                            </td>
                            <td class="text-center">
                                <strong>{{TotalPagarCita.toFixed(2)}}</strong>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" class="text-right">
                                <button class="btn btn-success" @click="AgregarDescripcion">Generar Cita</button>
                            </td>
                            <td colspan="2" class="text-left">
                                <button class="btn btn-danger" @click="CancelarCita">Cancelar Compra</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </b-col>
        </b-row>
        <!--Modales -->
        <!-- MODAL EDITAR INFO CLIENTE -->
        <b-modal id="Agregar-Descripcion-Cita" size="lg" title="Descripcion a la Cita" hide-footer>
            <b-row align-h="center">
                <b-col cols="10" xl="6" md="6">
                    <label>Descripcion</label>
                    <textarea v-model="DescripcionCita" cols="80" rows="5" class="form-control"
                        style="max-height : 100px;min-height : 100px; max-width: 700px">

                    </textarea>
                </b-col>
            </b-row>
            <hr class="bg-dark">
            <b-row align-h="center">
                <b-button variant="danger" class="m-1" @click="$bvModal.hide('Agregar-Descripcion-Cita')">Cancelar
                </b-button>
                <b-button variant="primary" class="m-1" @click="GuardarCita()">Guardar Cita
                </b-button>
            </b-row>
        </b-modal>
        <b-modal id="Ver-Servicio-Telefono" size="lg" title="Descripcion a la Cita" hide-footer>
            <!-- -->
            <table class="table table-hover table-light" v-if="ValidarDatosTablaCompra == 1">
                <thead>
                    <tr>
                        <th class="text-center">#</th>
                        <th class="text-center">Servicio</th>
                        <th class="text-center">SubTotal</th>
                        <th class="text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(Listado, index) in LstServiciosTabla" v-bind:key="index">
                        <td class="text-center">{{index+1}}</td>
                        <td class="text-center">{{Listado.NombreServicio}}</td>
                        <td class="text-center">{{Listado.PrecioVentaSV}}</td>
                        <td class="text-center">
                            <button class="btn btn-danger btn-sm" @click="EliminarServicioTabla(index)">
                                Eliminar
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3" class="text-right">
                            <strong>Total</strong>
                        </td>
                        <td class="text-center">
                            <strong>{{TotalPagarCita.toFixed(2)}}</strong>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" class="text-right">
                            <button class="btn btn-success" @click="AgregarDescripcion">Generar Cita</button>
                        </td>
                        <td colspan="2" class="text-left">
                            <button class="btn btn-danger" @click="CancelarCita">Cancelar Compra</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </b-modal>

    </div>
</template>
<script>
    import axios from 'axios';
    import {
        Global
    } from '../../Global';
    import FrmCrearCliente from '../Clientes/FrmCrearCliente.vue';

    export default {
        components: {
            FrmCrearCliente
        },
        name: 'FrmCreaCita',
        data() {
            return {
                // Listar Servicios
                LstServicios: [],
                // Listar Clientes
                Clientes: [],
                //Listar Sucursales
                Sucursales: [],
                SltSucursal: null,
                // Compra
                IdCliente: '',
                ActivarBuscador: '',
                BuscarProductos: '',
                // HORA Y FECHAS DE CITAS
                FechaCita: '',
                HoraCita: '',
                //Validar Datos
                ValidarDatos: '',
                LstServiciosTabla: [],
                ValidarDatosTablaCompra: 0,
                Suma: '',
                TotalPagarCita: '',
                // buscar Servicios
                BuscarServicios: '',
                // array para agruadar Datos
                IdServicios: [],
                SubTotales: [],
                DescripcionCita: '',
                IdUsuarioLogin: Global.IdUsuario,
                hoy: '',
                FechaActual: '',
                hora: '',
            }
        },
        mounted() {
            this.ListadoClientes();
            this.ListSucurSelc();
            this.ListHoraActual();
        },
        methods: {
            ListHoraActual() {
                axios.post(Global.URL + 'LstHoraActual', {}, {
                    headers: {
                        Authorization: Global.Token
                    }
                }).then(response => {
                    if (response.status == 200) {
                        this.FechaActual = response.data


                    } else {
                        alert('No se puedo realizar la petición');
                    }
                })
            },
            validarFechaCita() {
                this.hoy = new Date();
                this.hora = this.hoy.getHours() + ':' + this.hoy.getMinutes()
                if (this.FechaCita < this.FechaActual) {
                    this.FechaCita = '';
                    this.$swal.fire(
                        'Alerta', 'La fecha no puede ser menor a la actual', 'warning',
                    )
                }
                if (this.FechaCita == this.FechaActual) {
                    if (this.HoraCita < this.hora) {
                        this.HoraCita = '';
                        this.$swal.fire(
                            'Alerta', 'La hora no puede ser menor a la actual', 'warning',
                        )
                    }
                }

            },
            ListSucurSelc() {
                // const tok = localStorage.getItem('access_token');
                this.Sucursales = [];
                axios.get(Global.URL + 'ListarTodasSucursales', {
                    headers: {
                        Authorization: Global.Token
                    }
                }).then(response => {
                    if (response.status == 200) {
                        // console.log(response);
                        for (var i = 0; i < response.data.length; i++) {
                            this.Sucursales.push({
                                'IdSucursal': response.data[i].IdSucursal,
                                'NombreSucursal': response.data[i].NombreSucursal,
                            });

                        }

                    } else {
                        alert('No se puedo realizar la petición');
                    }
                })
            }, //Fin de Sucursales
            ListadoClientes() {
                this.Clientes = [];
                axios.get(Global.URL + "ListarCliente", {
                    headers: {
                        Authorization: Global.Token
                    }
                }).then(response => {
                    if (response.status == 200) {
                        if (response.data.length == 0) {
                            this.ValidarDatos = 0
                        } else {
                            // console.log(response.data);

                            this.ValidarDatos = 1
                            for (var i = 0; i < response.data.length; i++) {
                                this.Clientes.push({
                                        'label': response.data[i].Nombres + ' ' + response.data[i]
                                            .Apellidos,
                                        'IdCliente': response.data[i].IdCliente,
                                        'Telefono': response.data[i].Telefono,
                                        'Direccion': response.data[i].Direccion

                                    }

                                );

                            }

                        }
                    } else {
                        alert('No se pudo realizar la peticion');
                    }
                })
            }, //Fin Listado Cliente
            ListarServicioId() {
                if (this.LstServiciosTabla.length != 0) {
                    this.$swal.fire({
                        title: 'Estas Seguro?',
                        text: "Los Servicios de eesta cita se cambiaran !",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Si, Cambiar de Sucursal!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            this.LstServiciosTabla = [];
                            axios.post(Global.URL + 'FiltroSucursales', {
                                FiltroIdSucursal: this.SltSucursal
                            }, {
                                headers: {
                                    Authorization: Global.Token
                                }
                            }).then(response => {
                                if (response.status == 200) {
                                    this.ValidarDatosTablaCompra = 0;
                                    this.ValidarDatos = 1
                                    this.ActivarBuscador = 1;
                                    this.LstServicios = [];
                                    this.TotalPagarCita = 0;
                                    console.log(response.data);
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
                            }) //Fin de la peticion axios
                        }

                    })
                } else {
                    axios.post(Global.URL + 'FiltroSucursales', {
                        FiltroIdSucursal: this.SltSucursal
                    }, {
                        headers: {
                            Authorization: Global.Token
                        }
                    }).then(response => {
                        if (response.status == 200) {
                            this.ValidarDatos = 1
                            this.ActivarBuscador = 1;
                            this.LstServicios = [];
                            console.log(response.data);
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
                    })
                }

            }, //fIN Listar Servicios
            AgregarCarrito(IdServicio) {
                // alert(this.IdCliente)
                if (this.SltSucursal == '' || this.IdCliente == '' || this.FechaCita == '' || this.HoraCita == '' ||
                    this.IdCliente == null) {
                    this.$swal.fire(
                        'Alerta',
                        'Faltan Datos Por seleccionar',
                        'warning'
                    )

                } else {
                    for (let a = 0; a < this.LstServiciosTabla.length; a++) {
                        if (this.LstServiciosTabla[a].IdServicio == IdServicio) {
                            this.$swal.fire(
                                'Alerta',
                                'El Servicio ya esta en la sita',
                                'warning'
                            )
                            return false;
                        }
                    }
                    axios.post(Global.URL + 'ListadoServiciosId', {
                        IdServicio: IdServicio
                    }, {
                        headers: {
                            Authorization: Global.Token
                        }
                    }).then(response => {
                        if (response.status == 200) {
                            this.ValidarDatos = 1;
                            this.ValidarDatosTablaCompra = 1;
                            // console.log(response.data);                            
                            this.LstServiciosTabla.push({
                                IdServicio: response.data.IdServicio,
                                IdSucursal: response.data.IdSucursal,
                                NombreSucursal: response.data.NombreSucursal,
                                NombreServicio: response.data.NombreServicio,
                                PrecioVentaSV: response.data.PrecioVentaServicio,
                                DescripcionSv: response.data.Descripcion,
                                Estado: response.data.Estado,
                                DecEstado: response.data.DecEstado,
                            });
                            for (let a = 0; a < this.LstServiciosTabla.length; a++) {
                                this.Suma = parseFloat(this.LstServiciosTabla[a].PrecioVentaSV)

                            }
                            this.IdServicios.push(
                                response.data.IdServicio
                            )
                            this.SubTotales.push(
                                response.data.PrecioVentaServicio
                            );

                            this.TotalPagarCita = parseInt(this.TotalPagarCita + this.Suma);
                            // console.log(this.LstServiciosTabla);
                        }
                    })



                }
            }, //Fin Agregar Carrito
            EliminarServicioTabla(indice) {
                this.Suma = this.LstServiciosTabla[indice].PrecioVentaSV
                this.TotalPagarCita = parseInt(this.TotalPagarCita - this.Suma)
                this.LstServiciosTabla.splice(indice, 1);
            }, //Fin Eliminar Servicio en la tabla
            SearchServicios() {
                const Json = {
                    'Datos': this.BuscarServicios,
                    'IdSucursal': this.SltSucursal
                }
                axios.post(Global.URL + 'BuscardorGeneralSv', Json, {
                    headers: {
                        Authorization: Global.Token
                    }
                }).then(response => {
                    if (response.status == 200) {
                        if (response.data.length == 0) {
                            this.ValidarDatos = 0
                        } else {
                            this.ValidarDatos = 1
                            this.LstServicios = [];
                            console.log(response.data);
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
                    }
                })
            }, //Fin del Buscador De Servicios  
            AgregarDescripcion() {
                console.log(this.SubTotales);
                this.$bvModal.show('Agregar-Descripcion-Cita');
            },
            GuardarCita() {
                const Json = {
                    'IdServicios': this.IdServicios,
                    'IdSucursal': this.SltSucursal,
                    'IdCliente': this.IdCliente.IdCliente,
                    'IdUsuario': this.IdUsuarioLogin,
                    'Fecha': this.FechaCita,
                    'Hora': this.HoraCita,
                    'SubTotales': this.SubTotales,
                    'TotalCita': this.TotalPagarCita,
                    'DescripcionCita': this.DescripcionCita
                }
                axios.post(Global.URL + 'GenerarCita', Json, {
                    headers: {
                        Authorization: Global.Token
                    }
                }).then(response => {
                    if (response.status == 200) {
                        this.$swal.fire(
                            'Cita Creada',
                            'Tu has Creado Una cita para la fecha: ' + response.data.FechaCita,
                            'success'
                        )
                        this.$router.push('/ListadoCitas');
                    }
                })

            }, //Fin Generar Cita
            CancelarCita() {
                this.$swal.fire({
                    title: 'Estas Seguro?',
                    text: "Los Servicios de la cita se eliminaran!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, Cancelar Cita!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.TotalPagarCita = 0;
                        this.LstServiciosTabla = [];
                        this.ValidarDatosTablaCompra = 0
                    }
                })

            }, //Fin Cancelar Cita
            VerServicios() {
                this.$bvModal.show('Ver-Servicio-Telefono');
            }
        }
    }
</script>