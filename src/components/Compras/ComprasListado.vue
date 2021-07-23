<template>
    <div>
        <b-row align-h="center">
            <b-col cols="12" xl="6" md="10">
                <label><strong>Sucursal</strong></label>
                <select v-model="SltSucursal" class="form-control" @change="ListarComprasIdSucursal()">
                    <option :value="null" :disabled="true">Elige una sucursal</option>
                    <option v-for="(Listado, index) in Sucursales" v-bind:key="index" :value="Listado.IdSucursal">
                        {{Listado.NombreSucursal}}
                    </option>
                </select>

            </b-col>
            <b-col cols="12" xl="2" md="10">
                <label><strong>Filtrado</strong></label>
                <select class="form-control" v-model="TipoFiltro" @change="ValidarSeleccionSucursal">
                    <option value="null" :disabled="true">Elige una Opcion</option>
                    <option :value="2">Mes</option>
                    <option :value="3">Entre Fechas</option>
                    <option :value="4">Buscador</option>
                </select>
            </b-col>
        </b-row>
        <b-row align-h="center" class="mt-2">
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
                <b-col cols="12" xl="3" md="5" v-for="(Listado , index) in ListCompras" v-bind:key="(index)">
                    <div class="card" id="card-Compras" @click="VerDetalleCompra(Listado.IdCompra)">
                        <div class="card-body">
                            <h4>{{Listado.FechaCompra}}</h4>
                            <h6>{{Listado.DecSucursal}}</h6>
                            <h6>Total Compra: Q.<strong>{{Listado.TotalCompra}}</strong></h6>
                            <h6>Total Productos: <strong>{{Listado.TotalProductos}}</strong></h6>
                        </div>
                    </div>
                    <br>
                </b-col>
            </b-row>
        </div>
        <!-- Modal  -->
        <b-modal id="Detalle-Compra" title="Detalle Compra" size="lg" hide-footer>
            <div ref="pdf">


                <b-row align-h="center" v-if="this.CompraDelDetalle.length == 1">
                    <b-col cols="12" xl="4" md="4">
                        <h6>Fecha Compra: <strong>{{this.CompraDelDetalle[0].FechaCompra}}</strong></h6>
                    </b-col>
                    <b-col cols="12" xl="4" md="4">
                        <h6>Usuario: <strong>{{this.CompraDelDetalle[0].Empleado}}</strong></h6>
                    </b-col>
                    <b-col cols="12" xl="4" md="4">
                        <h6>Sucursal: <strong>{{this.CompraDelDetalle[0].NombreSucursal}}</strong></h6>
                        <h6>Direccion: <strong>{{this.CompraDelDetalle[0].Direccion}}</strong></h6>

                    </b-col>
                </b-row><br>
                <b-row align-h="center">
                    <b-col cols="12" xl="12" md="12">
                        <table class="table table-hover table-responsive">
                            <thead>
                                <tr>
                                    <th class="text-center">#</th>
                                    <th class="text-center">Producto</th>
                                    <th class="text-center">Proveedor</th>
                                    <th class="text-center">Cantidad</th>
                                    <th class="text-center">SubTotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(Listado , index) in DetalleCompra" v-bind:key="index">
                                    <td class="text-center">{{index+1}}</td>
                                    <td class="text-center">{{Listado.NombreProducto}}</td>
                                    <td class="text-center">{{Listado.NombreProveedor}}</td>
                                    <td class="text-center">{{Listado.SubTotalProduc}}</td>
                                    <td class="text-center">{{Listado.SubTotalCompra}}</td>
                                </tr>
                                <tr v-if="this.CompraDelDetalle.length == 1">
                                    <td colspan="4" class="text-right border-top border-danger">
                                        <strong>Total</strong>
                                    </td>
                                    <td colspan="1" class="text-center border-top border-danger">
                                        <strong>Q.{{this.CompraDelDetalle[0].TotalCompra}}</strong>
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
    import axios from 'axios'
    import {
        Global
    } from '../../Global'
    export default {
        name: 'ComprasListado',
        data() {
            return {
                Sucursales: [],
                // Array Compras
                ListCompras: [],
                // Tipo Filtro
                TipoFiltro: 'null',
                SltSucursal: 'null',
                DataFiltro: '',
                ValidarDatos: '',
                FechaInicial: '',
                FechaFinal: '',

                // DetalleCompra
                DetalleCompra: [],
                CompraDelDetalle: []
            }
        },
        mounted() {
            this.ListarComprasDelDia();
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
                        console.log(response);
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
            ListarComprasDelDia() {
                axios.get(Global.URL + 'ListarComprasDelDia', {
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
                                this.ListCompras.push({
                                    'IdCompra': response.data[i].IdCompra,
                                    'IdSucursal': response.data[i].IdSucursal,
                                    'DecSucursal': response.data[i].DecSucursal,
                                    'FechaCompra': response.data[i].FechaCompra,
                                    'TotalProductos': response.data[i].TotalProductos,
                                    'TotalCompra': response.data[i].TotalCompra,

                                    'Estado': response.data[i].Estado,
                                    'DecEstado': response.data[i].DecEstado
                                })
                            }
                        }
                    }
                })
            }, //Fin de listar Sucursal
            ListarComprasIdSucursal() {
                axios.post(Global.URL + 'ListarComprasIdSucursal', {
                    IdSucursal: this.SltSucursal
                }, {
                    headers: {
                        Authorization: Global.Token
                    }
                }).then(response => {
                    this.TipoFiltro = 'null';
                    this.DataFiltro = '';
                    if (response.status == 200) {
                        if (response.data.length == 0) {
                            this.ValidarDatos = 0;
                        } else {
                            this.ValidarDatos = 1;
                            this.ListCompras = [];

                            // console.log(response.data);
                            for (let i = 0; i < response.data.length; i++) {
                                this.ListCompras.push({
                                    'IdCompra': response.data[i].IdCompra,
                                    'IdSucursal': response.data[i].IdSucursal,
                                    'DecSucursal': response.data[i].DecSucursal,
                                    'FechaCompra': response.data[i].FechaCompra,
                                    'TotalProductos': response.data[i].TotalProductos,
                                    'TotalCompra': response.data[i].TotalCompra,
                                    'Estado': response.data[i].Estado,
                                    'DecEstado': response.data[i].DecEstado
                                })
                            }
                        }
                    }
                })
            }, //Fin de listar Sucursal
            BuscarProFiltro() {
                const Json = {
                    'TipoFiltro': this.TipoFiltro,
                    'DatosFiltro': this.DataFiltro,
                    'IdSucursal': this.SltSucursal,
                    'FechaInicial': this.FechaInicial,
                    'FechaFinal': this.FechaFinal
                }
                if (this.FechaFinal < this.FechaInicial) {
                    alert('La Fecha Final no puede ser menor que la final');
                    this.FechaFinal = '';
                    return false;
                }
                axios.post(Global.URL + 'FiltroCompras', Json, {
                    headers: {
                        Authorization: Global.Token
                    }
                }).then(response => {
                    if (response.data.length == 0) {
                        this.ValidarDatos = 0;
                    } else {
                        this.ValidarDatos = 1;
                        this.ListCompras = [];

                        console.log(response.data);
                        for (let i = 0; i < response.data.length; i++) {
                            this.ListCompras.push({
                                'IdCompra': response.data[i].IdCompra,
                                'IdSucursal': response.data[i].IdSucursal,
                                'DecSucursal': response.data[i].DecSucursal,
                                'FechaCompra': response.data[i].FechaCompra,
                                'TotalProductos': response.data[i].TotalProductos,
                                'TotalCompra': response.data[i].TotalCompra,
                                'Estado': response.data[i].Estado,
                                'DecEstado': response.data[i].DecEstado
                            })
                        }
                    }
                })
            }, //FIn del Filtros
            ValidarSeleccionSucursal() {
                if (this.SltSucursal == 'null' || this.SltSucursal == '') {
                    this.$swal.fire(
                        'Sucursal',
                        'Selecciona una sucursal',
                        'warning'
                    )
                    this.TipoFiltro = 'null';
                }
            }, //fIN DE VALIDAR
            VerDetalleCompra(IdCompra) {

                this.$bvModal.show('Detalle-Compra');
                axios.post(Global.URL + 'VerDetalleCompra', {
                    IdCompra: IdCompra
                }, {
                    headers: {
                        Authorization: Global.Token
                    }
                }).then(response => {
                    if (response.status == 200) {
                        console.log(response);
                        this.DetalleCompra = [];
                        this.CompraDelDetalle = [];

                        console.log(this.CompraDelDetalle);
                        for (let i = 0; i < response.data.length; i++) {
                            this.DetalleCompra.push({
                                'IdDetalleCompra': response.data[i].IdDetalleCompra,
                                'TotalProductos': response.data[i].TotalProductos,



                                // Detalle Compra                                 
                                'NombreProducto': response.data[i].NombreProducto,
                                'NombreProveedor': response.data[i].NombreProveedor,
                                'SubTotalProduc': response.data[i].SubTotalProduc,
                                'SubTotalCompra': response.data[i].SubTotalCompra,
                            })
                        }
                        this.CompraDelDetalle = [{
                            'NombreSucursal': response.data[0].NombreSucursal,
                            'Direccion': response.data[0].Direccion,
                            'FechaCompra': response.data[0].FechaCompra,
                            'Empleado': response.data[0].Empleado,
                            'TotalCompra': response.data[0].TotalCompra,
                        }];

                    }
                })
            },
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