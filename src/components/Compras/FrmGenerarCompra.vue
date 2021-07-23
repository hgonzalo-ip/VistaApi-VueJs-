<template>
    <div>
        <b-row align-h="center" class="p-3">
            <b-col cols="12" xl="6">
                <hr>
                <b-row>

                    <b-col cols="9" xl="8" md="8" class="mb-2">
                        <label><strong>Sucursal</strong></label>
                        <select v-model="SltSucursal" class="form-control" @change="ListarProductos()">
                            <option :value="null" :disabled="true">Elige una sucursal</option>
                            <option v-for="(Listado, index) in Sucursales" v-bind:key="index"
                                :value="Listado.IdSucursal">
                                {{Listado.NombreSucursal}}
                            </option>
                        </select>
                    </b-col>
                       <b-col cols="2" id="IconoCarrito">
                            <label></label>
                            <i class="fas fa-cart-plus fa-2x text-center" v-if="ProductosComprar.length != 0" @click="VerProductos"></i>
                           <strong class="text-light" v-if="ProductosComprar.length != 0"> {{ProductosComprar.length}}</strong>
                    </b-col>
                    <b-col cols="12" xl="4" md="4">
                        <label><strong>Fecha Compra</strong></label>
                        <input type="date" :readonly="true" class="form-control bg-info text-light"
                            v-model="HoraActual">
                    </b-col>
                </b-row>
                <b-row v-if="ActivarBuscador == 1">
                    <b-col cols="12" xl="12" md="12" class="mt-3">
                        <input type="search" class="form-control" placeholder="Buscador" v-model="BuscarProductos"
                            @keydown="FindProductosCompra">
                    </b-col>
                </b-row><br>
                <b-row v-if="ValidarDatos == 0" align-h="center">
                    <h6><strong>No hay datos</strong></h6>
                </b-row>
                <b-row v-if="ValidarDatos ==1" id="RowLstComprarProducto">
                    <b-col cols="6" xl="4" md="4" v-for="(Listado , index) in Productos" v-bind:key="index">
                        <div class="card " :id="'CardEmpleado'+Listado.IdProducto">
                            <div class="card-header">
                                <b-row align-h="center">
                                    <b-col cols="12" xl="12" md="12">
                                        <h6><strong>{{Listado.NombreProducto}}</strong></h6>
                                        <time class="Info-Producto-Pc"><small>{{Listado.NombreSucursal}}</small></time>
                                    </b-col>
                                </b-row>
                            </div>
                            <div class="card-body">
                                <br>
                                <!-- Botones solo seran visibles en movil FIN-->
                                <b-row align-h="center" class="mb-2">
                                    <b-img id="ImgProducto" v-if="Listado.Foto"
                                        :src="UrlImg+'VerImgProducto/'+Listado.Foto" rounded alt="No Hay Foto"></b-img>
                                    <b-img id="ImgProducto" v-else :src="UrlImg+'VerImgSinFoto/SinFoto.jpg'" rounded
                                        alt="No Hay Foto"></b-img>
                                </b-row>


                                <b-card-text>
                                    <h6><small> Precio Compra: <strong>Q.{{Listado.PrecioCompra}}</strong> </small></h6>
                                    <h6><small>Stok: <strong>{{Listado.Stok}}</strong></small>
                                        <i v-if="Listado.Stok == 0"
                                            class="fas fa-exclamation-triangle ml-2 text-danger fa-1"></i>
                                    </h6>
                                    <b-row align-h="center">
                                        <button class="btn btn-success"
                                            @click="AgregarCantidadProducto(Listado.IdProducto)">Comprar</button>
                                    </b-row>
                                </b-card-text>

                                <b-row align-h="center">
                                    <i class="fas fa-chevron-down" v-b-toggle="'collapse-'+Listado.IdProducto"></i>
                                </b-row>
                            </div>
                            <b-collapse :id="'collapse-'+Listado.IdProducto">
                                <b-card-footer>
                                    <h6 class="Info-Productp-Cell"><small> Sucursal:
                                            <strong>{{Listado.NombreSucursal}}</strong></small></h6>
                                    <h6 class="Info-Productp-Cell"><small>Estado:
                                            <strong>{{Listado.DescripcionEstado}}</strong></small></h6>
                                    <h6><small> Precio Venta: <strong>Q.{{Listado.PrecioVenta}}</strong></small></h6>
                                    <h6><small> Proveedor: <strong>{{Listado.NombreProveedor}}</strong></small></h6>
                                    <p>Descripcion:
                                        {{Listado.DescripcionProduc}}
                                    </p>
                                </b-card-footer>
                            </b-collapse>
                        </div><br>
                    </b-col>


                </b-row>
            </b-col>
            <!-- Vista para ver los producto que esta comprando -->
            <b-col cols="12" xl="6" id="TablaGenerarVentaPC">
                <table class="table table-hover table-light" v-if="ValidarDatosTablaCompra == 1">
                    <thead>
                        <th class="text-center">#</th>
                        <th class="text-center">Producto</th>
                        <th class="text-center">Precio Compra</th>
                        <th class="text-center"> Cantidad</th>
                        <th class="text-center"> SubTotal</th>
                        <th class="text-center">Eliminar</th>
                    </thead>
                    <tbody>
                        <tr v-for="(ListaCompra , index) in ProductosComprar" v-bind:key="index">
                            <td class="text-center">{{index+1}}</td>
                            <td class="text-center">{{ListaCompra.NombreProducto}}</td>
                            <td class="text-center">Q.{{ListaCompra.PrecioCompra}}</td>
                            <td class="text-center">{{ListaCompra.Cantidad}}</td>
                            <td class="text-center">Q.{{ListaCompra.SubTotal}}</td>
                            <td class="text-center">
                                <button class="btn btn-danger btn-sm" @click="EliminarProductoCompra(index)">
                                    Eliminar
                                </button>
                            </td>
                        </tr>

                        <tr>
                            <td colspan="5" class="text-right border-top border-danger">
                                <strong>Total</strong>
                            </td>
                            <td colspan="1" class="text-right border-top border-danger">
                                <strong>Q.{{TotalCompraPagar.toFixed(2)}}</strong>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" class="text-right">
                                <button class="btn btn-success" @click="GenerarCompra">Generar Compra</button>
                            </td>
                            <td colspan="3" class="text-left">
                                <button class="btn btn-danger" @click="CancelarCompra">Cancelar Compra</button>
                            </td>
                        </tr>
                    </tbody>

                </table>
            </b-col>
        </b-row>
        <!-- Modal Para Poner cantidad -->
        <!-- Inicio De Modal Agregar Foto -->
        <b-modal id="bv-modal-Agregar-Cantidad-Producto" size="md" title="Agregar Cantidad" hide-footer>
            <!-- Fomulario -->
            <form @submit.stop.prevent class="was-validated">
                <b-row align-h="center">
                    <b-col cols="12" xl="6" md="6">
                        <label><strong>Cantidad</strong></label>
                        <input type="number" class="form-control" v-model="CantidadCompraProducto" required>
                        <input type="hidden" v-model="IdPrductoComprar">
                    </b-col>
                </b-row>
            </form>
            <!-- Botones -->
            <br>
            <b-row align-h="end" class="mr-2">
                <b-button variant="danger" class="mr-2" @click="$bvModal.hide('bv-modal-Agregar-Cantidad-Producto')">
                    Cancelar
                </b-button>
                <b-button variant="primary" @click="AgregarAlCarrito(CantidadCompraProducto)">Agregar Producto
                </b-button>
            </b-row>
        </b-modal>
        <!--  -->
          <!-- Modal para Generar Venta Ver Productos Telfono -->
         <b-modal id="Ver-Producto-Telefono-Compra" size="md" title="Agregar Cantidad" hide-footer>
              <table class="table table-hover table-light table-responsive" v-if="ValidarDatosTablaCompra == 1">
                    <thead>
                        <th class="text-center">#</th>
                        <th class="text-center">Producto</th>
                        <th class="text-center">Precio Compra</th>
                        <th class="text-center"> Cantidad</th>
                        <th class="text-center"> SubTotal</th>
                        <th class="text-center">Eliminar</th>
                    </thead>
                    <tbody>
                        <tr v-for="(ListaCompra , index) in ProductosComprar" v-bind:key="index">
                            <td class="text-center">{{index+1}}</td>
                            <td class="text-center">{{ListaCompra.NombreProducto}}</td>
                            <td class="text-center">Q.{{ListaCompra.PrecioCompra}}</td>
                            <td class="text-center">{{ListaCompra.Cantidad}}</td>
                            <td class="text-center">Q.{{ListaCompra.SubTotal}}</td>
                            <td class="text-center">
                                <button class="btn btn-danger btn-sm" @click="EliminarProductoCompra(index)">
                                    Eliminar
                                </button>
                            </td>
                        </tr>

                        <tr>
                            <td colspan="5" class="text-right border-top border-danger">
                                <strong>Total</strong>
                            </td>
                            <td colspan="1" class="text-right border-top border-danger">
                                <strong>Q.{{TotalCompraPagar.toFixed(2)}}</strong>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" class="text-right">
                                <button class="btn btn-success" @click="GenerarCompra">Generar Compra</button>
                            </td>
                            <td colspan="3" class="text-left">
                                <button class="btn btn-danger" @click="CancelarCompra">Cancelar Compra</button>
                            </td>
                        </tr>
                    </tbody>

                </table>
        </b-modal>
    </div>
</template>
<script>
    import axios from 'axios'
    import {
        Global
    } from '../../Global'
    export default {
        name: 'FrmGenerarCompra',
        data() {
            return {
                Productos: [],
                Sucursales: [],
                ProductosComprar: [],
                // Array para Generar Compra
                IdUsuario: Global.IdUsuario,
                SltSucursal: null,
                IdProductos: [],
                CantidadCompraPructos: [],
                SubTotales: [],
                CantidadCompraProducto: '',

                TotalCompraPagar: '',
                Suma: '',
                IdPrductoComprar: '',
                // Buscardor
                BuscarProductos: '',
                // Hora Acutal
                HoraActual: '',
                // Validar Datos de la request 
                ValidarDatos: '',
                UrlImg: Global.URL,
                ValidarDatosTablaCompra: '0',
                ActivarBuscador: '',

            }
        },
        mounted() {
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
                        this.HoraActual = response.data


                    } else {
                        alert('No se puedo realizar la petición');
                    }
                })
            },
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
            ListarProductos() {
                // console.log(this.SltSucursal + 'ASDF');
                axios.post(Global.URL + 'ListarProductosIdSucursal', {
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
                            this.Productos = []
                            this.ActivarBuscador = 1;
                            this.ValidarDatos = 1;
                            for (var i = 0; i < response.data.length; i++) {
                                this.Productos.push({
                                    IdProducto: response.data[i].IdProducto,
                                    IdProveedor: response.data[i].IdProveedor,
                                    IdSucursal: response.data[i].IdSucursal,
                                    IdTipoProducto: response.data[i].IdTipoProducto,
                                    NombreProducto: response.data[i].NombreProducto,
                                    NombreProveedor: response.data[i].NombreProveedor,
                                    NombreSucursal: response.data[i].NombreSucursal,
                                    PrecioCompra: response.data[i].PrecioCompra,
                                    PrecioVenta: response.data[i].PrecioVenta,
                                    Stok: response.data[i].Stok,
                                    Estado: response.data[i].Estado,
                                    DescripcionProduc: response.data[i].DescripcionProduc,
                                    DescripcionEstado: response.data[i].DescripcionEstado,
                                    DescripcionTipoProd: response.data[i].DescripcionTipoProd,
                                    Foto: response.data[i].Foto,

                                });
                            }
                        }
                    }
                });

            }, // Fin Listado Productos
            AgregarCantidadProducto(IdProducto) {
                for (let a = 0; a < this.ProductosComprar.length; a++) {
                    if (this.ProductosComprar[a].IdProducto == IdProducto) {
                        this.$swal.fire(
                            'Alerta',
                            'El Producto ya esta en la Compra',
                            'warning'
                        )
                     return false
                    }
                   
                }
                this.$bvModal.show('bv-modal-Agregar-Cantidad-Producto');
                this.IdPrductoComprar = IdProducto
            },
            AgregarAlCarrito(Cantidad) {
                if (Cantidad == 0 || Cantidad == "") {
                    this.$swal.fire(
                        'Ingresar datos',
                        'La Cantidad Tiene que ser mayor a 1',
                        'warning'
                    )
                } else {

                    axios.post(Global.URL + 'BuscarProductoId', {
                        IdProducto: this.IdPrductoComprar
                    }, {
                        headers: {
                            Authorization: Global.Token
                        }
                    }).then(response => {
                        // console.log(response.data);
                        this.Suma = 0;
                        if (response.status == 200) {
                            for (let i = 0; i < response.data.length; i++) {

                                this.ProductosComprar.push({
                                    'IdProducto': response.data[i].IdProducto,
                                    'NombreProducto': response.data[i].NombreProducto,
                                    'PrecioCompra': response.data[i].PrecioCompra,
                                    'Cantidad': this.CantidadCompraProducto,
                                    'SubTotal': this.CantidadCompraProducto * response.data[i]
                                        .PrecioCompra,
                                })
                                this.IdProductos.push(
                                    response.data[i].IdProducto
                                )
                                this.CantidadCompraPructos.push(
                                    this.CantidadCompraProducto
                                )
                                this.SubTotales.push(
                                    this.CantidadCompraProducto * response.data[i]
                                    .PrecioCompra
                                )
                            }

                            for (let a = 0; a < this.ProductosComprar.length; a++) {
                                this.Suma = this.ProductosComprar[a].SubTotal

                            }
                            this.TotalCompraPagar = parseInt(this.TotalCompraPagar + this.Suma)
                            this.ValidarDatosTablaCompra = 1
                            this.CantidadCompraProducto = '',
                                this.$bvModal.hide('bv-modal-Agregar-Cantidad-Producto');

                        }
                    })
                }

            }, //Fin de Agregar Al Carrito
            EliminarProductoCompra(indice) {
                this.Suma = this.ProductosComprar[indice].SubTotal
                this.TotalCompraPagar = parseInt(this.TotalCompraPagar - this.Suma)
                this.ProductosComprar.splice(indice, 1);
            }, //Fin De Eliminar Fila de tabla para comprar
            FindProductosCompra() {
                // console.log(this.BuscarProductos);
                const Json = {
                    'IdSucursal': this.SltSucursal,
                    'Datos': this.BuscarProductos
                }
                axios.post(Global.URL + 'BuscarProductosConSucursal', Json, {
                    headers: {
                        Authorization: Global.Token
                    }
                }).then(response => {
                    if (response.status == 200) {
                        if (response.data.length == 0) {
                            this.ValidarDatos = 0;
                        } else {
                            this.Productos = []
                            this.ValidarDatos = 1;
                            for (var i = 0; i < response.data.length; i++) {
                                this.Productos.push({
                                    IdProducto: response.data[i].IdProducto,
                                    IdProveedor: response.data[i].IdProveedor,
                                    IdSucursal: response.data[i].IdSucursal,
                                    IdTipoProducto: response.data[i].IdTipoProducto,
                                    NombreProducto: response.data[i].NombreProducto,
                                    NombreProveedor: response.data[i].NombreProveedor,
                                    NombreSucursal: response.data[i].NombreSucursal,
                                    PrecioCompra: response.data[i].PrecioCompra,
                                    PrecioVenta: response.data[i].PrecioVenta,
                                    Stok: response.data[i].Stok,
                                    Estado: response.data[i].Estado,
                                    DescripcionProduc: response.data[i].DescripcionProduc,
                                    DescripcionEstado: response.data[i].DescripcionEstado,
                                    DescripcionTipoProd: response.data[i].DescripcionTipoProd,
                                    Foto: response.data[i].Foto,

                                });
                            }
                        }
                    }
                })
            }, //Fin Agregar Al Carrito
            CancelarCompra() {
                this.$swal.fire({
                    title: 'Estas Seguro?',
                    text: "Cancelar Compra !!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, Cancelar!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.ProductosComprar = []
                        this.TotalCompraPagar = 0
                    }

                })
            }, //Fin de Cancelar Compra
            GenerarCompra() {
                if (this.ProductosComprar.length == 0) {
                    this.$swal.fire(
                        'No se puede generar la compra',
                        'Por favor, elige un producto',
                        'warning'
                    )
                } else {
                    const Json = {
                        'IdProductos': this.IdProductos,
                        'Cantidades': this.CantidadCompraPructos,
                        'Subtotales': this.SubTotales,
                        'IdSucursal': this.SltSucursal,
                        'TotalCompra': this.TotalCompraPagar,
                        'IdUsuario': this.IdUsuario
                    }
                    axios.post(Global.URL + 'GuardarCompra', Json, {
                        headers: {
                            Authorization: Global.Token
                        }
                    }).then(response => {
                        if (response.status == 200) {
                            this.$swal.fire(
                                'Compra ha sido almacenada',
                                'Tu Compraste ' + response.data.TotalProductos +
                                ' Productos con un total de: ' + response.data.TotalCompra,
                                'success'
                            )
                            this.ProductosComprar = [];
                            this.IdProductos = [];
                            this.CantidadCompraPructos = [];
                            this.SubTotales.push = [];
                            this.TotalCompraPagar = 0;
                            // Redifigir a listado COmpras
                            this.$router.push('/ListadoCompras');
                        }
                    });
                }
            },
            VerProductos(){
                this.$bvModal.show('Ver-Producto-Telefono-Compra');
            }


        }
    }
</script>