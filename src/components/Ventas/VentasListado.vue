<template>
    <div>
        <b-row align-h="center" v-if="IdTipoUser == 1">
            <b-col cols="12" xl="6" md="10">
                <label><strong>Sucursal</strong></label>
                <select v-model="SltSucursal" class="form-control" @change="ListarVentasPorSucursal()">
                    <option :value="null" :disabled="true">Elige una sucursal</option>
                    <option v-for="(Listado, index) in Sucursales" v-bind:key="index" :value="Listado.IdSucursal">
                        {{Listado.NombreSucursal}}
                    </option>
                </select>
            </b-col>
            <b-col cols="12" xl="2" md="10">
                <label><strong>Filtrado</strong></label>
                <select class="form-control" v-model="TipoFiltro" @change="ValidarSeleccionSucursalF">
                    <option value="null" :disabled="true">Elige una Opcion</option>
                    <option :value="2">Mes</option>
                    <option :value="3">Entre Fechas</option>
                    <option :value="4">Buscador</option>
                </select>
            </b-col>
        </b-row>
        <b-row align-h="center" class="mt-2" v-if="IdTipoUser==1">
            <b-col cols="12" xl="8" md="10">
                <label v-if="TipoFiltro == 2"><strong>Buscar Por Mes</strong></label>
                <input type="month" class="form-control" v-model="DataFiltro" v-if="TipoFiltro == 2"
                    @change="BuscarProFiltro">
                <label v-if="TipoFiltro == 4"><strong>Buscar Por Fecha</strong></label>
                <input type="date" class="form-control" v-model="DataFiltro" v-if="TipoFiltro == 4"
                    @change="BuscarProFiltro">
            </b-col>
        </b-row>
        <b-row align-h="center" v-if="TipoFiltro ==3">
            <b-col cols="12" xl="5" md="5">
                <label><strong>Fecha Inicial</strong></label>
                <input type="date" class="form-control" v-model="FechaInicial">
            </b-col>
            <b-col cols="12" xl="5" md="5">
                <label><strong>Fecha Final</strong></label>
                <input type="date" class="form-control" v-model="FechaFinal" @change="BuscarProFiltro">
            </b-col>
        </b-row>
        <hr>
        <b-row align-h="center" v-if="this.ValidarDatos == 0">
            <h5><strong>No hay datos</strong></h5>
        </b-row>
        <div id="RowScroll" v-if="this.ValidarDatos == 1">
            <b-row align-h="center">
                <b-col cols="12" xl="3" md="5" v-for="(Listado , index) in ListVentas" v-bind:key="(index)">
                    <div class="card" id="card-Compras" @click="VerDetalleVentas(Listado.IdVenta)">
                        <div class="card-body">
                            <b-row align-h="center">

                                <h4>{{Listado.FechaVenta}}</h4>

                                <h6 class="date ml-2">{{Listado.Hora}}</h6>

                            </b-row>


                            <h6>{{Listado.Sucursal}}</h6>
                            <h6>Total Productos: <strong>{{Listado.CantidadProducto}}</strong></h6>
                            <h6>Total Venta: Q.<strong>{{Listado.TotalVenta}}</strong></h6>

                        </div>
                    </div>
                    <br>
                </b-col>
            </b-row>
        </div>
        <!-- Modales -->
        <!-- Modal  -->
        <b-modal id="Detalle-Venta" title="Detalle Venta" size="lg" hide-footer>
            <div ref="pdf">
                <b-row align-h="center" v-if="this.VentaDetalleVenta.length != 0">
                    <b-col cols="12" xl="4" md="6">
                        <h6 class="date">Fecha: <strong>{{this.VentaDetalleVenta[0].FechaVenta}}</strong></h6>
                        <h6>Hora: <strong>{{this.VentaDetalleVenta[0].Hora}}</strong></h6>
                    </b-col>
                    <b-col cols="12" xl="4" md="6">
                        <h6>Empleado: <strong>{{this.VentaDetalleVenta[0].NombreEmpleado}}</strong></h6>
                        <h6>Cliente: <strong>{{this.VentaDetalleVenta[0].NombreCliente}}
                                {{this.VentaDetalleVenta[0].ApellidoCliente}}</strong></h6>
                    </b-col>
                    <b-col cols="12" xl="4">
                        <h6>Sucursal: <strong>{{this.VentaDetalleVenta[0].NombresSucursal}}</strong></h6>
                    </b-col>
                </b-row><br>
                <b-row align-h="center">
                    <b-col cols="12" xl="12" md="12">
                        <table class="table table-hover border-top border-danger">
                            <thead>
                                <tr>
                                    <th class="text-center">#</th>
                                    <th class="text-center">Producto</th>
                                    <th class="text-center">Cantidad</th>
                                    <th class="text-center">SubTotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(Listado , index) in DetalleVenta" v-bind:key="index">
                                    <td class="text-center">{{index+1}}</td>
                                    <td class="text-center">{{Listado.NombreProducto}}</td>

                                    <td class="text-center">{{Listado.Cantidad}}</td>
                                    <td class="text-center">{{Listado.SubTotal}}</td>
                                </tr>

                                <tr v-if="this.VentaDetalleVenta.length != 0">
                                    <td class="text-right ">
                                        <strong class="bg-success text-light p-1">Pago:
                                            Q.{{this.VentaDetalleVenta[0].Pago}}</strong>
                                    </td>
                                    <td class="text-right ">
                                        <strong class="bg-danger text-light p-1">Vuelto:
                                            Q.{{this.VentaDetalleVenta[0].Vuelto}}</strong>
                                    </td>
                                    <td colspan="2" class="text-right ">
                                        <strong class="bg-primary text-light p-1">Total:
                                            Q.{{this.VentaDetalleVenta[0].TotalVenta}}</strong>
                                    </td>
                                </tr>
                            </tbody>
                        </table>


                    </b-col>

                </b-row>
            </div>
            <button @click="GenerarRecibo" class="btn btn-success">Descargar PDF</button>
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
                // TIpo Usuario
                IdTipoUser: Global.IdTipoUser,
                ListVentas: [],
                Sucursales: [],
                SltSucursal: 'null',
                ValidarDatos: '',
                ValidarSeleccionSucursal: '',
                TipoFiltro: 'null',
                DetalleVenta: [],
                VentaDetalleVenta: [],
                DataFiltro: '',
                FechaInicial: '',
                FechaFinal: ''
            }
        },
        mounted() {
            this.ListSucurSelc();

            if (Global.IdTipoUser == 1) {
                this.ListarVentasDelDia();
            } else {
                this.ListarVentasVendedor();
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
            ListarVentasDelDia() {
                axios.get(Global.URL + 'ListarVentasDelDia', {
                    headers: {
                        Authorization: Global.Token
                    }
                }).then(response => {
                    if (response.status == 200) {
                        if (response.data.length == 0) {
                            this.ValidarDatos = 0;
                        } else {
                            this.ValidarDatos = 1;
                            console.log(response.data);
                            for (let i = 0; i < response.data.length; i++) {
                                this.ListVentas.push({
                                    'IdVenta': response.data[i].IdVenta,
                                    'NombreCliente': response.data[i].NombreCliente,
                                    'ApellidoCliente': response.data[i].ApellidoCliente,
                                    'Sucursal': response.data[i].Sucursal,
                                    'DecUser': response.data[i].DecUser,
                                    'TotalVenta': response.data[i].TotalVenta,
                                    'Pago': response.data[i].Pago,
                                    'Vuelto': response.data[i].Vuelto,
                                    'CantidadProducto': response.data[i].CantidadProducto,
                                    'FechaVenta': response.data[i].FechaVenta,
                                    'Hora': response.data[i].Hora,
                                    'Estado': response.data[i].Estado,
                                    'DecEstado': response.data[i].DecEstado
                                })
                            }
                        }
                    }
                })
            }, //Fin de listar Sucursal
            ListarVentasVendedor() {
                axios.post(Global.URL + 'ListarVentasVendedor', {
                    IdUser: Global.IdUsuario
                }, {
                    headers: {
                        Authorization: Global.Token
                    }
                }).then(response => {
                    if (response.status == 200) {
                        if (response.data.length == 0) {
                            this.ValidarDatos = 0;
                        } else {
                            this.ValidarDatos = 1;
                            console.log(response.data);
                            for (let i = 0; i < response.data.length; i++) {
                                this.ListVentas.push({
                                    'IdVenta': response.data[i].IdVenta,
                                    'NombreCliente': response.data[i].NombreCliente,
                                    'ApellidoCliente': response.data[i].ApellidoCliente,
                                    'Sucursal': response.data[i].Sucursal,
                                    'DecUser': response.data[i].DecUser,
                                    'TotalVenta': response.data[i].TotalVenta,
                                    'Pago': response.data[i].Pago,
                                    'Vuelto': response.data[i].Vuelto,
                                    'CantidadProducto': response.data[i].CantidadProducto,
                                    'FechaVenta': response.data[i].FechaVenta,
                                    'Hora': response.data[i].Hora,
                                    'Estado': response.data[i].Estado,
                                    'DecEstado': response.data[i].DecEstado
                                })
                            }
                        }
                    }
                })
            }, //Fin de listar Por Usuario
            ListarVentasPorSucursal() {
                this.TipoFiltro = "null"
                axios.post(Global.URL + 'ListarVentasPorSucursal', {
                    IdSucursal: this.SltSucursal
                }, {
                    headers: {
                        Authorization: Global.Token
                    }
                }).then(response => {
                    if (response.status == 200) {
                        if (response.data.length == 0) {
                            this.ValidarDatos = 0;
                        } else {
                            this.ValidarDatos = 1;
                            console.log(response.data);
                            this.ListVentas = [];
                            for (let i = 0; i < response.data.length; i++) {
                                this.ListVentas.push({
                                    'IdVenta': response.data[i].IdVenta,
                                    'NombreCliente': response.data[i].NombreCliente,
                                    'ApellidoCliente': response.data[i].ApellidoCliente,
                                    'Sucursal': response.data[i].Sucursal,
                                    'DecUser': response.data[i].DecUser,
                                    'TotalVenta': response.data[i].TotalVenta,
                                    'Pago': response.data[i].Pago,
                                    'Vuelto': response.data[i].Vuelto,
                                    'CantidadProducto': response.data[i].CantidadProducto,
                                    'FechaVenta': response.data[i].FechaVenta,
                                    'Hora': response.data[i].Hora,
                                    'Estado': response.data[i].Estado,
                                    'DecEstado': response.data[i].DecEstado
                                })
                            }
                        }
                    }
                })
            }, //Fin listar Ventas por sucursal
            VerDetalleVentas(IdVenta) {
                this.$bvModal.show('Detalle-Venta');
                axios.post(Global.URL + 'VerDetalleVenta', {
                    IdVenta: IdVenta
                }, {
                    headers: {
                        Authorization: Global.Token
                    }
                }).then(response => {
                    if (response.status == 200) {
                        // console.log(response.data);
                        this.VentaDetalleVenta = [];
                        this.DetalleVenta = [];
                        for (let i = 0; i < response.data.length; i++) {
                            this.DetalleVenta.push({
                                'NombreProducto': response.data[i].NombreProducto,
                                'Cantidad': response.data[i].Cantidad,
                                'SubTotal': response.data[i].SubTotal,
                            })
                            this.VentaDetalleVenta.push({
                                'NombresSucursal': response.data[0].NombreSucursal,
                                'NombreEmpleado': response.data[0].Empleado,
                                'EmpleaApellido': response.data[0].EmpleaApellido,
                                'Usuario': response.data[0].Usuario,
                                'FechaVenta': response.data[0].FechaVenta,
                                'Hora': response.data[0].Hora,
                                'NombreCliente': response.data[0].NombreCliente,
                                'ApellidoCliente': response.data[0].ApellidoCliente,
                                'TotalVenta': response.data[0].TotalVenta,
                                'Pago': response.data[0].Pago,
                                'Vuelto': response.data[0].Vuelto,
                            })
                        }
                        // console.log(this.VentaDetalleVenta);

                    }
                })

            },
            BuscarProFiltro() {
                const Json = {
                    'TipoFiltro': this.TipoFiltro,
                    'DatosFiltro': this.DataFiltro,
                    'IdSucursal': this.SltSucursal,
                    'FechaInicial': this.FechaInicial,
                    'FechaFinal': this.FechaFinal
                }
                if (this.TipoFiltro == 3) {
                    if (this.FechaFinal < this.FechaInicial) {
                        alert('La Fecha Final no puede ser menor que la final');
                        this.FechaFinal = '';
                        return false;
                    }
                }
                axios.post(Global.URL + 'FiltroVentas', Json, {
                    headers: {
                        Authorization: Global.Token
                    }
                }).then(response => {
                    if (response.data.length == 0) {
                        this.ValidarDatos = 0;
                    } else {
                        this.ValidarDatos = 1;
                        this.ListVentas = [];
                        for (let i = 0; i < response.data.length; i++) {
                            this.ListVentas.push({
                                'IdVenta': response.data[i].IdVenta,
                                'NombreCliente': response.data[i].NombreCliente,
                                'ApellidoCliente': response.data[i].ApellidoCliente,
                                'Sucursal': response.data[i].Sucursal,
                                'DecUser': response.data[i].DecUser,
                                'TotalVenta': response.data[i].TotalVenta,
                                'Pago': response.data[i].Pago,
                                'Vuelto': response.data[i].Vuelto,
                                'CantidadProducto': response.data[i].CantidadProducto,
                                'FechaVenta': response.data[i].FechaVenta,
                                'Hora': response.data[i].Hora,
                                'Estado': response.data[i].Estado,
                                'DecEstado': response.data[i].DecEstado
                            })
                        }
                    }
                })
            }, //FIn del Filtros
            ValidarSeleccionSucursalF() {
                if (this.SltSucursal == 'null' || this.SltSucursal == '') {
                    this.$swal.fire(
                        'Sucursal',
                        'Selecciona una sucursal',
                        'warning'
                    )
                    this.TipoFiltro = 'null';
                }
            }, //fIN DE VALIDAR
            GenerarRecibo() {
                let windowHeight = window.innerHeight;
                let windowWidth = window.innerWidth;

                let pdf = new jsPDF("p", "mm", "a7");

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
                    pdf.addImage(img, "JPEG", 3, 5, width + 50, height);
                    pdf.save("Venta.pdf");

                    alert('Descargando')
                }).catch(err => {
                    alert('error' + err)
                });
            }
        }
    }
</script>