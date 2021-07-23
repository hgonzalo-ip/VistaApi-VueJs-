<template>
    <div><br>
        <b-row align-h="center">
            <b-col cols="12" xl="2" md="1">
                <label><strong>Listar Todas</strong></label>
                <button class="btn btn-primary form-control" @click="ListadoCitasDelDia">
                    <i class="fas fa-clipboard-list"></i>
                </button>
            </b-col>
            <b-col cols="12" xl="4" md="4">
                <label><strong>Sucursal</strong></label>
                <select v-model="SltSucursal" class="form-control" @change="ListarCitasPorSucursal()">
                    <option :value="null" :disabled="true">Elige una sucursal</option>
                    <option v-for="(Listado, index) in Sucursales" v-bind:key="index" :value="Listado.IdSucursal">
                        {{Listado.NombreSucursal}}
                    </option>
                </select>
            </b-col>
            <b-col class="12" xl="2" md="3">
                <label><strong>Estado</strong></label>
                <select class="form-control" v-model="EstadoCita" @change="ListarCitasEstado">
                    <option value="null">Elige un tipo de Estado</option>
                    <option value="5">Pendientes</option>
                    <option value="6">Finalizadas</option>
                </select>
            </b-col>
            <b-col cols="12" xl="2" md="4">
                <label><strong>Fecha</strong></label>
                <input type="date" class="form-control" v-model="FechaBusqueda" @change="ListarCitasFecha">
            </b-col>
            <b-col cols="12" xl="2" md="4">
                <label><strong>Por Mes</strong></label>
                <input type="month" class="form-control" v-model="FechaPorMes" @change="ListarCitasPorMes">
            </b-col>
        </b-row><br>
        <b-row align-h="center" v-if="AcitvarPorMes == 1">
            <b-col cols="10" xl="5" md="6">
                <label><strong>Clientes</strong></label>
                <select v-model="DatosBuscador" class="form-control" @change="BuscarGeneral">
                    <option :value="null" :disabled="true">Elige un Cliente</option>
                    <option v-for="(Listado, index) in Clientes" v-bind:key="index" :value="Listado.IdCliente">
                        {{Listado.Nombre}}
                    </option>
                </select>

            </b-col>
        </b-row>
        <hr>
        <b-row align-h="center" v-if="ValidarRequest == 0">
            <h6 class="text-light"><strong>No hay Datos</strong></h6>
        </b-row>
        <b-row align-h="center" v-if="ValidarRequest == 1" ref="content">
            <b-col cols="11" xl="3" md="4" v-for="(Listado, index ) in LstCitas" v-bind:key="index">
                <div class="card Card-Servicios">
                    <div class="card-body mb-4">
                        <b-row align-h="center" @click="VerDetalleCita(Listado.IdCita)">
                            <h5>{{Listado.FechaCita}}</h5>
                            <h5 class="ml-2"><small>{{Listado.Hora}}</small></h5><br>
                        </b-row>
                        <b-row align-h="center">
                            <label class="text-center">{{Listado.Sucursal}}</label>
                        </b-row>
                        <h6>Cliente: <strong>{{Listado.NombreCliente}} {{Listado.ApellidoCliente}}</strong></h6>
                        <h6>Servicios: <strong>{{Listado.TotalServicios}}</strong></h6>

                        <h6 v-if="Listado.Estado == 5">Estado: <strong>{{Listado.DecEstado}}</strong>
                            <i class="fas fa-exclamation-circle ml-1 text-danger"></i></h6>
                        <h6 v-if="Listado.Estado == 6">Estado: <strong>{{Listado.DecEstado}}</strong>
                            <i class="fas fa-clipboard-check ml-1 text-success"></i></h6>
                        <h6 v-if="Listado.Estado == 6">Fecha Fin: {{Listado.FechaFinCita}}</h6>
                        <b-row align-h="center" class="Cd-Servicio-Footer">
                            <b-col cols="12" xl="12" md="12">
                                <p class="text-justify">Descripción: {{Listado.DescripcionCita}}
                                </p>
                            </b-col>
                        </b-row>
                    </div>
                    <div class="card-footer mt-2">
                        <!-- v-if="Listado.Estado == 1" -->
                        <b-row align-h="center">
                            <b-col cols="5" xl="6" md="7" class="mt-2">
                                <h6>Total: <strong>Q.{{Listado.TotalCita}}</strong></h6>
                            </b-col>
                            <b-col cols="6" xl="6" md="5">
                                <b-dropdown right text="Opciones" variant="success" v-if="Listado.Estado == 5">
                                    <b-dropdown-item v-if="Listado.Estado == 5" @click="FinalizarCita(Listado.IdCita)">
                                        Finalizar Cita
                                    </b-dropdown-item>
                                    <b-dropdown-item @click="AbirModalEditaCita(Listado.IdCita)">Editar Cita
                                    </b-dropdown-item>
                                    <b-dropdown-item v-if="IdTipoUser == 1"
                                        @click="AgregarServicios(Listado.IdCita, Listado.IdSucursal)">Agregar Servicios
                                    </b-dropdown-item>
                                </b-dropdown>
                                <!--  -->
                            </b-col>
                        </b-row>

                    </div>
                </div>
            </b-col>
        </b-row>
        <!-- Inicio Modal -->
        <b-modal id="Ve-Detalle-Cita" size="lg" hide-footer title="Detalle Cita">
            <div ref="pdf">
                <b-row align-h="center" v-if="DetalleCita.length != 0">
                    <b-col cols="12" xl="4" md="4">

                        <h6>Feha: {{CitaDetalle[0].FechaCita}}</h6>
                        <h6>Hora: {{CitaDetalle[0].Hora}}</h6>
                    </b-col>
                    <b-col cols="12" xl="4" md="4">
                        <h6>Empleado: {{CitaDetalle[0].Empleado}}</h6>
                        <h6>Cliente: {{CitaDetalle[0].NombreCliente}} {{CitaDetalle[0].ApellidoCliente}}</h6>
                    </b-col>
                    <b-col cols="12" xl="4" md="4">
                        <h6>Sucursal: {{CitaDetalle[0].NombreSucursal}}</h6>
                        <h6>Direccion: {{CitaDetalle[0].Direccion}}</h6>
                    </b-col>

                </b-row>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th class="text-center">Servicio</th>
                            <th class="text-right">SubTotal</th>
                            <th class="text-center" v-if="IdTipoUser == 1 && GenerarPdf == 1">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(Listado, index) in DetalleCita" v-bind:key="index">
                            <td>{{index+1}}</td>
                            <td class="text-center">{{Listado.NombreServicio}}</td>
                            <td class="text-right">{{Listado.SubTotal}}</td>
                            <td class="text-center" v-if="IdTipoUser == 1 && GenerarPdf == 1">

                                <input type="checkbox" v-model="IdDetalleCitaEliminar" :value="Listado.IdDetalleCita">
                            </td>
                        </tr>
                        <tr v-if="DetalleCita.length != 0">
                            <td colspan="4" class="text-right">
                                <strong> Total: {{CitaDetalle[0].TotalCita}}</strong>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
            <b-row align-h="center">
                <button @click="GenerarRecibo" class="btn btn-success mr-3">Descargar PDF</button>
                <button @click="AgregarParaEliminar" class="btn btn-danger">Eliminar Servicios</button>
            </b-row>
        </b-modal>
        <!-- Edita Cita -->
        <b-modal id="Editar-Cita" size="lg" hide-footer title="Editar Cita">
            <b-row align-h="center" v-if='HoraCitaEdit != "" '>
                <b-col cols="12" xl="5" md="5" class="mb-2">
                    <label><strong>Fecha Cita</strong></label>
                    <input type="date" v-model="FechaCitaEdit" class="form-control">
                </b-col>
                <b-col cols="12" xl="5" md="5">
                    <label><strong>Hora Cita</strong></label>
                    <input type="time" class="form-control" v-model="HoraCitaEdit">
                </b-col>
            </b-row>
            <hr>
            <b-row align-h="center">
                <b-col cols="12" xl="3" md="5">
                    <button class="btn btn-success btn-sm" @click="EditarCita">Editar Cita</button>
                </b-col>
            </b-row>
        </b-modal>
        <!-- Modal Agregar Servicios -->
        <b-modal id="Agregar-Servicios" size="xl" hide-footer title="Agregar Servicios">
            <b-row align-h="center">
                <b-col cols="12" xl="6">
                    <b-row v-if="ActivarBuscador == 1">
                        <b-col cols="10" xl="12" md="12" class="mt-3">
                            <label>Buscador</label>
                            <input type="search" class="form-control" placeholder="Buscador" v-model="BuscarServicios"  @keyup="SearchServicios">
                        </b-col>

                    </b-row><br>
                    <b-row v-if="ValidarDatos == 0" align-h="center">
                        <h6><strong>No hay datos</strong></h6>
                    </b-row>
                    <b-row align-h="center" id="RowLstAgregarProducto" v-else>
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
                                            <p class="text-justify">Descripción:
                                                <strong>{{Listado.DescripcionSv}}</strong>
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
                    <table class="table table-hover table-light">
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
                                    <strong
                                        v-if="ValidarDatosTablaCompra == 1">{{TotalPagarCitaEdit}}</strong>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" class="text-right">
                                    <button class="btn btn-success" v-if="ValidarDatosTablaCompra == 1"
                                        @click="AgregarServiciosCita">Agregar
                                        Servicios</button>
                                </td>
                                <td colspan="2" class="text-left">
                                    <button class="btn btn-danger" v-if="ValidarDatosTablaCompra == 1">Cancelar
                                        Compra</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </b-col>
            </b-row>
        </b-modal>
    </div>
</template>
<script>
    import jsPDF from 'jspdf'
    import html2canvas from "html2canvas"
    import axios from 'axios';
    import {
        Global
    } from '../../Global';

    export default {

        name: 'VentasListado',
        data() {
            return {
                IdTipoUser: Global.IdTipoUser,
                SltSucursal: 'null',
                Sucursales: [],
                EstadoCita: 'null',
                ValidarDatos: '',
                // ListarCitas
                LstCitas: [],
                ValidarRequest: '',
                FechaBusqueda: '',
                IdCitaDetalle: '',
                DetalleCita: [],
                CitaDetalle: [],
                // Editar Cita
                IdCitaEdit: '',
                FechaCitaEdit: '',
                HoraCitaEdit: '',
                FechaPorMes: '',
                AcitvarPorMes: '0',
                DatosBuscador: '',
                // Listar Cliente
                Clientes: [],
                // pdf
                margins: {},
                // Agregar Servicios
                LstServicios: [],

                LstServiciosTabla: [],
                ValidarDatosTablaCompra: 0,
                Suma: '',
                TotalPagarCitaEdit: '',
                // buscar Servicios
                BuscarServicios: '',
                ActivarBuscador: '',
                // array para agruadar Datos
                IdServicios: [],
                SubTotales: [],
                IdCitaAgregarServicio: '',
                IdDetalleCitaEliminar: [],
                IdSucursalBuscarServicio : '',
                GenerarPdf : ''
            }
        },
        mounted() {
            this.ListSucurSelc();
            this.ListadoCitasDelDia();
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
                        // console.log(response);
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
            ListadoCitasDelDia() {
                this.FechaPorMes = '';
                this.AcitvarPorMes = 0;
                axios.get(Global.URL + 'ListarCitasDelDia', {
                    headers: {
                        Authorization: Global.Token
                    }
                }).then(response => {
                    if (response.status == 200) {
                        if (response.data.length == 0) {
                            this.ValidarRequest = 0
                        } else {
                            this.EstadoCita = null;
                            this.SltSucursal = null;
                            this.FechaBusqueda = '';
                            this.LstCitas = [];
                            this.ValidarRequest = 1
                            // console.log(response.data);
                            for (let i = 0; i < response.data.length; i++) {
                                this.LstCitas.push({
                                    'IdCita': response.data[i].IdCita,
                                    'NombreCliente': response.data[i].NombreCliente,
                                    'ApellidoCliente': response.data[i].ApellidoCliente,
                                    'IdSucursal': response.data[i].IdSucursal,
                                    'Sucursal': response.data[i].Sucursal,
                                    'DecUser': response.data[i].DecUser,
                                    'FechaCita': response.data[i].FechaCita,
                                    'Hora': response.data[i].Hora,
                                    'DescripcionCita': response.data[i].DescripcionCita,
                                    'TotalCita': response.data[i].TotalCita,
                                    'DecEstado': response.data[i].DecEstado,
                                    'Estado': response.data[i].Estado,
                                    'TotalServicios': response.data[i].TotalServicios,
                                    'FechaFinCita': response.data[i].FechaFinCita

                                })
                            }
                        }
                    }
                })
            }, //Fin De listar Citas Del dia
            ListarCitasPorSucursal() {
                this.EstadoCita = 'null';
                this.FechaBusqueda = '';
                axios.post(Global.URL + 'ListarCitasIdSucursal', {
                    IdSucursal: this.SltSucursal
                }, {
                    headers: {
                        Authorization: Global.Token
                    }
                }).then(response => {
                    if (response.status == 200) {
                        if (response.data.length == 0) {
                            this.ValidarRequest = 0
                        } else {

                            this.ValidarRequest = 1

                            this.LstCitas = [];
                            // console.log(response.data);
                            for (let i = 0; i < response.data.length; i++) {
                                this.LstCitas.push({
                                    'IdCita': response.data[i].IdCita,
                                    'NombreCliente': response.data[i].NombreCliente,
                                    'ApellidoCliente': response.data[i].ApellidoCliente,
                                    'IdSucursal': response.data[i].IdSucursal,
                                    'Sucursal': response.data[i].Sucursal,
                                    'DecUser': response.data[i].DecUser,
                                    'FechaCita': response.data[i].FechaCita,
                                    'Hora': response.data[i].Hora,
                                    'DescripcionCita': response.data[i].DescripcionCita,
                                    'TotalCita': response.data[i].TotalCita,
                                    'DecEstado': response.data[i].DecEstado,
                                    'Estado': response.data[i].Estado,
                                    'TotalServicios': response.data[i].TotalServicios,
                                    'FechaFinCita': response.data[i].FechaFinCita

                                })
                            }
                        }
                    }
                })
            }, //Fin Listado Por Sucursales
            ListarCitasEstado() {
                this.FechaBusqueda = '';
                const Json = {
                    'IdSucursal': this.SltSucursal,
                    'Estado': this.EstadoCita
                }
                axios.post(Global.URL + 'ListarCitasPorEstados', Json, {
                    headers: {
                        Authorization: Global.Token
                    }
                }).then(response => {
                    if (response.status == 200) {
                        if (response.data.length == 0) {
                            this.ValidarRequest = 0
                        } else {
                            this.ValidarRequest = 1
                            this.LstCitas = [];
                            // console.log(response.data);
                            for (let i = 0; i < response.data.length; i++) {
                                this.LstCitas.push({
                                    'IdCita': response.data[i].IdCita,
                                    'NombreCliente': response.data[i].NombreCliente,
                                    'ApellidoCliente': response.data[i].ApellidoCliente,
                                    'IdSucursal': response.data[i].IdSucursal,
                                    'Sucursal': response.data[i].Sucursal,
                                    'DecUser': response.data[i].DecUser,
                                    'FechaCita': response.data[i].FechaCita,
                                    'Hora': response.data[i].Hora,
                                    'DescripcionCita': response.data[i].DescripcionCita,
                                    'TotalCita': response.data[i].TotalCita,
                                    'DecEstado': response.data[i].DecEstado,
                                    'Estado': response.data[i].Estado,
                                    'TotalServicios': response.data[i].TotalServicios,
                                    'FechaFinCita': response.data[i].FechaFinCita

                                })
                            }
                        }
                    }
                })
            }, //Fin Filtro por estados
            ListarCitasFecha() {

                if (this.SltSucursal == '' || this.SltSucursal == "null") {
                    this.$swal.fire('Alerta', 'Seleccione una sucursal', 'warning');
                    this.FechaBusqueda = '';
                    return false;
                }
                const Json = {
                    'IdSucursal': this.SltSucursal,
                    'Estado': this.EstadoCita,
                    'FechaCita': this.FechaBusqueda
                }
                axios.post(Global.URL + 'ListarCitasPorFecha', Json, {
                    headers: {
                        Authorization: Global.Token
                    }
                }).then(response => {
                    if (response.status == 200) {
                        if (response.data.length == 0) {
                            this.ValidarRequest = 0
                        } else {
                            this.ValidarRequest = 1
                            this.LstCitas = [];
                            // console.log(response.data);
                            for (let i = 0; i < response.data.length; i++) {
                                this.LstCitas.push({
                                    'IdCita': response.data[i].IdCita,
                                    'NombreCliente': response.data[i].NombreCliente,
                                    'ApellidoCliente': response.data[i].ApellidoCliente,
                                    'IdSucursal': response.data[i].IdSucursal,
                                    'Sucursal': response.data[i].Sucursal,
                                    'DecUser': response.data[i].DecUser,
                                    'FechaCita': response.data[i].FechaCita,
                                    'Hora': response.data[i].Hora,
                                    'DescripcionCita': response.data[i].DescripcionCita,
                                    'TotalCita': response.data[i].TotalCita,
                                    'DecEstado': response.data[i].DecEstado,
                                    'Estado': response.data[i].Estado,
                                    'TotalServicios': response.data[i].TotalServicios,
                                    'FechaFinCita': response.data[i].FechaFinCita

                                })
                            }
                        }
                    }
                })
            }, //Fin Filtro Fechas
            VerDetalleCita(IdCita) {
                this.GenerarPdf = 1;
                this.$bvModal.show('Ve-Detalle-Cita');
                axios.post(Global.URL + 'VerDetalleCita', {
                    IdCita: IdCita
                }, {
                    headers: {
                        Authorization: Global.Token
                    }
                }).then(response => {
                    if (response.status == 200) {
                        this.DetalleCita = [];
                        this.CitaDetalle = [];
                        // console.log(response.data);
                        for (let i = 0; i < response.data.length; i++) {
                            this.DetalleCita.push({
                                'IdDetalleCita': response.data[i].IdDetalleCita,
                                'NombreServicio': response.data[i].NombreServicio,
                                'SubTotal': response.data[i].SubTotal,

                            })
                            this.CitaDetalle.push({
                                'NombreSucursal': response.data[0].Sucursal,
                                'Direccion': response.data[0].Direccion,
                                'FechaCita': response.data[0].FechaCita,
                                'Hora': response.data[0].Hora,
                                'Empleado': response.data[0].Empleado,
                                'NombreCliente': response.data[0].NombreCliente,
                                'ApellidoCliente': response.data[0].ApellidoCliente,
                                'TotalCita': response.data[0].TotalCita,

                            })
                            this.IdCitaDetalle = response.data[0].IdCita
                        }

                    }
                })
            }, //
            FinalizarCita(IdCita) {
                this.$swal.fire({
                    title: 'Estas Seguro?',
                    text: "Finalizar Cita!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, Finalizar!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.post(Global.URL + 'FinalizarCita', {
                            IdCita: IdCita
                        }, {
                            headers: {
                                Authorization: Global.Token
                            }
                        }).then(response => {
                            if (response.status == 200) {
                                this.$swal.fire(
                                    'Finalizado', 'Tu has Finalizado una cita con exito', 'success'
                                )
                                this.ListadoCitasDelDia();
                            }
                        })
                    }

                })

            },
            ListarCitasPorMes() {
                this.FechaBusqueda = '';
                this.EstadoCita = 'null';
                this.SltSucursal = 'null'
                axios.post(Global.URL + 'ListarPorMes', {
                    FechaMes: this.FechaPorMes
                }, {
                    headers: {
                        Authorization: Global.Token
                    }
                }).then(response => {
                    if (response.status == 200) {
                        if (response.data.length == 0) {
                            this.ValidarRequest = 0
                        } else {
                            this.ValidarRequest = 1
                            this.LstCitas = [];
                            this.ListadoClientes();
                            this.AcitvarPorMes = 1
                            // console.log(response.data);
                            for (let i = 0; i < response.data.length; i++) {
                                this.LstCitas.push({
                                    'IdCita': response.data[i].IdCita,
                                    'NombreCliente': response.data[i].NombreCliente,
                                    'ApellidoCliente': response.data[i].ApellidoCliente,
                                    'IdSucursal': response.data[i].IdSucursal,
                                    'Sucursal': response.data[i].Sucursal,
                                    'DecUser': response.data[i].DecUser,
                                    'FechaCita': response.data[i].FechaCita,
                                    'Hora': response.data[i].Hora,
                                    'DescripcionCita': response.data[i].DescripcionCita,
                                    'TotalCita': response.data[i].TotalCita,
                                    'DecEstado': response.data[i].DecEstado,
                                    'Estado': response.data[i].Estado,
                                    'TotalServicios': response.data[i].TotalServicios,
                                    'FechaFinCita': response.data[i].FechaFinCita

                                })
                            }
                        }
                    }
                })
            },
            AbirModalEditaCita(IdCita) {
                this.$bvModal.show('Editar-Cita')
                this.LstServicios = [];

                axios.post(Global.URL + 'InfoEditarCita', {
                    IdCita: IdCita
                }, {
                    headers: {
                        Authorization: Global.Token
                    }
                }).then(response => {
                    if (response.status == 200) {
                        this.HoraCitaEdit = response.data.Hora;
                        this.IdCitaEdit = response.data.IdCita;
                        this.FechaCitaEdit = response.data.FechaCita;

                    }
                });
            }, //Fin Abir Modal
            EditarCita() {
                const Fechas = {
                    'FechaEdit': this.FechaCitaEdit,
                    'HoraEdit': this.HoraCitaEdit,
                    'IdCitaEdit': this.IdCitaEdit
                }
                if (this.FechaCitaEdit == '' || this.HoraCitaEdit == '') {
                    this.$swal.fire(
                        'Alerta',
                        'Faltan Datos por enviar',
                        'warning'
                    )
                } else {
                    axios.post(Global.URL + 'EditarCita', Fechas, {
                        headers: {
                            Authorization: Global.Token
                        }
                    }).then(response => {
                        if (response.status == 200) {
                            this.$swal.fire(
                                'Realizado', 'Cita Editada Correctamente', 'success'
                            )
                            this.$bvModal.hide('Editar-Cita')
                            this.ListadoCitasDelDia();
                        }
                    })
                }

            }, //Fin Edita Cita
            ListadoClientes() {
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
                            for (var i = 0; i < response.data.length; i++) {
                                this.Clientes.push({
                                        'Nombre': response.data[i].Nombres + ' ' + response.data[i]
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
            BuscarGeneral() {
                axios.post(Global.URL + 'BuscarGeneralF', {
                    FechaMes: this.FechaPorMes,
                    IdCliente: this.DatosBuscador
                }, {
                    headers: {
                        Authorization: Global.Token
                    }
                }).then(response => {
                    if (response.status == 200) {
                        if (response.data.length == 0) {
                            this.ValidarRequest = 0
                        } else {
                            this.ValidarRequest = 1
                            this.LstCitas = [];
                            // console.log(response.data);
                            for (let i = 0; i < response.data.length; i++) {
                                this.LstCitas.push({
                                    'IdCita': response.data[i].IdCita,
                                    'NombreCliente': response.data[i].NombreCliente,
                                    'ApellidoCliente': response.data[i].ApellidoCliente,
                                    'IdSucursal': response.data[i].IdSucursal,
                                    'Sucursal': response.data[i].Sucursal,
                                    'DecUser': response.data[i].DecUser,
                                    'FechaCita': response.data[i].FechaCita,
                                    'Hora': response.data[i].Hora,
                                    'DescripcionCita': response.data[i].DescripcionCita,
                                    'TotalCita': response.data[i].TotalCita,
                                    'DecEstado': response.data[i].DecEstado,
                                    'Estado': response.data[i].Estado,
                                    'TotalServicios': response.data[i].TotalServicios,
                                    'FechaFinCita': response.data[i].FechaFinCita

                                })
                            }
                        }
                    }
                })
            },
            GenerarRecibo() {
                this.GenerarPdf = 0;
                if(this.GenerarPdf == 0){
                       let windowHeight = window.innerHeight;
                let windowWidth = window.innerWidth;

                let pdf = new jsPDF();

                let canvasElement = document.createElement("canvas");
                canvasElement.width = windowWidth;
                canvasElement.height = windowHeight;

                html2canvas(this.$refs.pdf, {
                    canvas: canvasElement,
                    width: windowWidth,
                    height: windowHeight
                }).then(canvas => {
                    const img = canvas.toDataURL("image/jpeg", 1);
                    var width = pdf.internal.pageSize.getWidth();
                    var height = pdf.internal.pageSize.getHeight();
                    height = 1 * width
                    pdf.addImage(img, "JPEG", 3, 5, width + 155, height);
                    pdf.save("Cita.pdf");

                    alert('Descargando')
                }).catch(err => {
                    alert('error' + err)
                });
                }                
            }, //Fin Del pdf
            AgregarServicios(IdCita, IdSucursal) {                
                this.IdSucursalBuscarServicio = IdSucursal
                this.BuscarServicios = '';
                this.IdCitaAgregarServicio = IdCita;
                this.$bvModal.show('Agregar-Servicios');
                this.LstServiciosTabla = [];
                this.IdServicios = [];
                this.SubTotales = [];
                axios.post(Global.URL + 'FiltroSucursales', {
                    FiltroIdSucursal: IdSucursal
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
            }, //Fin Agregar Servicios
            EliminarServicioTabla(indice) {
                this.Suma = this.LstServiciosTabla[indice].PrecioVentaSV
                this.TotalPagarCitaEdit = parseInt(this.TotalPagarCitaEdit - this.Suma)
                this.LstServiciosTabla.splice(indice, 1);
            }, //Fin Eliminar Servicio en la tabla
            AgregarCarrito(IdServicio) {
                this.ValidarDatosTablaCompra = 1;
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
                console.log(this.LstServiciosTabla);
                axios.post(Global.URL + 'ListadoServiciosIdEditarCita', {
                    IdServicio: IdServicio,
                    IdCita : this.IdCitaAgregarServicio
                }, {
                    headers: {
                        Authorization: Global.Token
                    }
                }).then(response => {
                    if (response.status == 200) {
                        this.ValidarDatos = 1;

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

                        this.TotalPagarCitaEdit = parseInt(this.TotalPagarCitaEdit + this.Suma);
                        // console.log(this.LstServiciosTabla);
                    }else if(response.status == 203){
                        this.$swal.fire('Alerta',response.data,'warning');
                    }
                })
            }, //Fin Agregar Carrito
            AgregarServiciosCita() {
                var Json = {
                    'IdServicios': this.IdServicios,
                    'SubTotales': this.SubTotales,
                    'IdCita': this.IdCitaAgregarServicio
                }
                axios.post(Global.URL + 'EditarDetalleCita', Json, {
                    headers: {
                        Authorization: Global.Token
                    }
                }).then(response => {
                    if (response.status == 200) {
                        this.$swal.fire(
                            'Agregado Correctamente',
                            '',
                            'success'
                        )

                        this.TotalPagarCitaEdit = 0;
                        this.ListadoCitasDelDia();
                        this.$bvModal.hide('Agregar-Servicios');
                    }
                })
            }, //Fin de Guardar Servicios
            AgregarParaEliminar() {
                if (this.IdDetalleCitaEliminar.length != 0) {
                    this.$swal.fire({
                        title: 'Estas Seguro?',
                        text: "Si Eliminar " + this.IdDetalleCitaEliminar.length + " Servicios",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Si, Eliminar!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            //  console.log(this.IdServiciosEliminar);

                            axios.post(Global.URL + 'EliminarServiciosCita', {
                                IdDetalleCita: this.IdDetalleCitaEliminar,
                                IdCita: this.IdCitaDetalle
                            }, {
                                headers: {
                                    Authorization: Global.Token
                                }
                            }).then(response => {
                                if (response.status == 200) {
                                    this.ListadoCitasDelDia();
                                    this.$swal.fire(
                                        'Eliminado!',
                                        'Tu has Eliminado Servicios ',
                                        'success'
                                    )
                                    this.$bvModal.hide('Ve-Detalle-Cita');
                                    this.IdDetalleCitaEliminar = [];
                                } else {
                                    alert('Algo Salio mal en la petición')
                                }
                            })
                        }
                    })
                } else {
                    this.$swal.fire('Alerta', 'Seleccione por lo menos un servicio para eliminar', 'warning')
                    return false;
                }
            }, //Fin de Eliminar Servicio en la cita
            SearchServicios() {
                const Json = {
                    'Datos': this.BuscarServicios,
                    'IdSucursal': this.IdSucursalBuscarServicio
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
                            // console.log(response.data);
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
            PdfCompras(){
                axios.get(Global.URL+'PDFCita',{
                    headers:{
                        Authorization: Global.Token
                    }
                }).then(response =>{
                    if(response == 200){
                        alert('Hola');
                    }
                });
            }
        }
    }
</script>