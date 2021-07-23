<template>
    <div><br>

        <b-row align-h="center">
            <b-col cols="9" xl="6" md="6">
                <!-- Select para Seleccionar un cliente -->
                <label><strong>Seleccione un Cliente</strong></label>
                <template>
                    <v-select v-model="IdCliente" :options="Clientes" :map-keydown="VerImg(IdCliente.IdCliente)"></v-select>
                </template>
            </b-col>
            <b-col cols="2" xl="1" class="mt-4">
                <frm-crear-cliente></frm-crear-cliente>
            </b-col>
        </b-row><br>

        <b-row align-h="center">
            <b-col cols="6" xl="1" md="6">
                <b-avatar  v-if="Foto != ''" size="4rem" :src="UrlImg+'VerImgCliente/'+Foto"></b-avatar>
            </b-col>
            <b-col cols="6" xl="3" md="4">
                <label>Nombres Cliente</label>
                <input type="text" :value="IdCliente.label" class="form-control" readonly>
            </b-col>
            <b-col cols="6" xl="3" md="4">
                <label>Telefono</label>
                <input type="text" :value="IdCliente.Telefono" class="form-control" readonly>
            </b-col>
            <b-col cols="6" xl="3" md="4">
                <label>Direccion</label>
                <input type="text" :value="IdCliente.Direccion" class="form-control" readonly>
            </b-col>
            <b-col cols="6" xl="1" md="1" class="mt-2">
                <label></label>
                <button class="btn btn-danger btn-sm form-control mt-4" @click="Limpiar">Limpiar</button>
            </b-col>
        </b-row>
        <b-row>
        </b-row>
        <b-row align-h="center" class="p-3">
            <b-col cols="12" xl="6">
                <hr>
                <b-row>
                    <b-col cols="9" xl="8" md="8" class="mb-2">
                        <label><strong>Sucursal</strong></label>
                        <input type="text" class="form-control" v-model="NombreSucursalUser" readonly>
                        <input type="hidden" v-model="IdSucursalUser">
                    </b-col>
                    <b-col cols="2"  id="IconoCarrito">
                            <label></label>
                            <i class="fas fa-cart-plus fa-2x text-center" v-if="ProductosVender.length != 0" @click="VerProductos"></i>
                           <strong class="text-light" v-if="ProductosVender.length != 0"> {{ProductosVender.length}}</strong>
                    </b-col>
                    <b-col cols="12" xl="4" md="4">
                        <label><strong>Fecha Venta</strong></label>
                        <input type="date" :readonly="true" class="form-control bg-info text-light"
                            v-model="HoraActual">
                    </b-col>
                </b-row>
                <b-row v-if="ActivarBuscador == 1">
                    <b-col cols="12" xl="12" md="12" class="mt-3">
                        <input type="search" class="form-control" placeholder="Buscador" v-model="BuscarProductos"
                            @keydown="FindProductosVenta">
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
                                    <b-img id="ImgProducto" v-else :src="UrlImg+'VerImgSinFoto/SinFoto.jpg'"
                                        height="80px" rounded alt="No Hay Foto"></b-img>
                                </b-row>


                                <b-card-text>
                                    <h6><small> Precio Venta: <strong>Q.{{Listado.PrecioVenta}}</strong> </small></h6>
                                    <h6><small>Stok: <strong>{{Listado.Stok}}</strong></small>
                                        <i v-if="Listado.Stok == 0"
                                            class="fas fa-exclamation-triangle ml-2 text-danger fa-1"></i>
                                    </h6>
                                    <b-row align-h="center">
                                        <button class="btn btn-success" v-if="Listado.Stok >= 1"
                                            @click="AgregarCantidadProducto(Listado.IdProducto, Listado.Stok)">Vender</button>
                                        <button class="btn btn-light text-dark" v-else>No se Puede Vender</button>

                                    </b-row>
                                </b-card-text>

                                <b-row align-h="center">
                                    <i class="fas fa-chevron-down" v-b-toggle="'collapse-'+Listado.IdProducto"></i>
                                </b-row>
                            </div>
                            <b-collapse :id="'collapse-'+Listado.IdProducto">
                                <b-card-footer>
                                    <h6 v-if="IdTipoUsuario == 1" class="Info-Productp-Cell"><small> Sucursal:
                                            <strong>{{Listado.NombreSucursal}}</strong></small></h6>
                                    <h6 v-if="IdTipoUsuario == 1" class="Info-Productp-Cell"><small>Estado:
                                            <strong>{{Listado.DescripcionEstado}}</strong></small></h6>
                                    <h6 v-if="IdTipoUsuario == 1"><small> Precio Venta:
                                            <strong>Q.{{Listado.PrecioVenta}}</strong></small></h6>
                                    <h6 v-if="IdTipoUsuario == 1"><small> Proveedor:
                                            <strong>{{Listado.NombreProveedor}}</strong></small></h6>
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
            <b-col cols="12" xl="6" class="mt-5" id="TablaGenerarVentaPC">
                <table class="table table-hover table-light" v-if="ValidarDatosTablaVenta == 1">
                    <thead>
                        <th class="text-center">#</th>
                        <th class="text-center">Producto</th>
                        <th class="text-center">Precio Venta</th>
                        <th class="text-center"> Cantidad</th>
                        <th class="text-center"> SubTotal</th>
                        <th class="text-center">Eliminar</th>
                    </thead>
                    <tbody>
                        <tr v-for="(ListaCompra , index) in ProductosVender" v-bind:key="index">
                            <td class="text-center">{{index+1}}</td>
                            <td class="text-center">{{ListaCompra.NombreProducto}}</td>
                            <td class="text-center">Q.{{ListaCompra.PrecioVenta}}</td>
                            <td class="text-center">{{ListaCompra.Cantidad}}</td>
                            <td class="text-center">Q.{{ListaCompra.SubTotal}}</td>
                            <td class="text-center">
                                <button class="btn btn-danger btn-sm" @click="EliminarProductoVenta(index)">
                                    Eliminar
                                </button>
                            </td>
                        </tr>

                        <tr>
                         
                            <td colspan="5" class="text-right border-top border-danger">
                                <strong>Total</strong>
                            </td>
                            <td colspan="1" class="text-right border-top border-danger">
                                <strong>Q.{{TotalVentaPagar.toFixed(2)}}</strong>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" class="text-right">
                                <button class="btn btn-success" @click="AgregarPagos">Agregar Pago</button>
                            </td>
                            <td colspan="3" class="text-left">
                                <button class="btn btn-danger" @click="CancelarVenta">Cancelar Venta</button>
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
                        <input type="number" class="form-control" v-model="CantidadVentaProducto" required>
                        <input type="hidden" v-model="IdPrductoVender">
                        <input type="hidden" v-model="StokValidar">
                    </b-col>
                </b-row>
            </form>
            <!-- Botones -->
            <br>
            <b-row align-h="end" class="mr-2">
                <b-button variant="danger" class="mr-2" @click="$bvModal.hide('bv-modal-Agregar-Cantidad-Producto')">
                    Cancelar
                </b-button>
                <b-button variant="primary" @click="AgregarAlCarrito(CantidadVentaProducto, StokValidar)">Agregar
                    Producto
                </b-button>
            </b-row>
        </b-modal>
        <!-- Modal para Pagar  -->
        <b-modal id="bv-modal-Agregar-Pago-Producto" size="lg" title="Agregar Pago a la Venta" hide-footer
            ok-title="Generar Venta">
            <!-- Fomulario -->
            <form @submit.stop.prevent class="was-validated">
                <b-row align-h="center">
                    <b-col cols="12" xl="6" md="6">
                        <label><strong>Total De la Venta</strong></label>
                        <input type="number" class="form-control" v-model="TotalVentaPagar" step="any" readonly>
                    </b-col>
                </b-row>
                <b-row align-h="center">
                    <b-col cols="12" xl="5" md="5">
                        <label>Pago</label>
                        <input type="number" class="form-control" v-model="PagoVenta" step="0.05"
                            @change="GenerarVuelto" required>
                    </b-col>
                    <b-col cols="12" xl="5" md="5">
                        <label>Veulto</label>
                        <input type="number" class="form-control" v-model="VueltoVenta" required readonly>
                    </b-col>
                </b-row>
            </form>
            <!-- Botones --><br>
            <b-row align-h="center">
                 <b-button variant="primary" @click="GenerarVenta">
                    Generar Venta
                </b-button>
            </b-row>
            <br>

        </b-modal>
        <!-- Modal para Generar Venta Ver Productos Telfono -->
         <b-modal id="Ver-Producto-Telefono" size="md" title="Agregar Cantidad" hide-footer>
              <table class="table table-hover table-light table-responsive" v-if="ValidarDatosTablaVenta == 1">
                    <thead>
                        <th class="text-center">#</th>
                        <th class="text-center">Producto</th>
                        <th class="text-center">Precio Venta</th>
                        <th class="text-center"> Cantidad</th>
                        <th class="text-center"> SubTotal</th>
                        <th class="text-center">Eliminar</th>
                    </thead>
                    <tbody>
                        <tr v-for="(ListaCompra , index) in ProductosVender" v-bind:key="index">
                            <td class="text-center">{{index+1}}</td>
                            <td class="text-center">{{ListaCompra.NombreProducto}}</td>
                            <td class="text-center">Q.{{ListaCompra.PrecioVenta}}</td>
                            <td class="text-center">{{ListaCompra.Cantidad}}</td>
                            <td class="text-center">Q.{{ListaCompra.SubTotal}}</td>
                            <td class="text-center">
                                <button class="btn btn-danger btn-sm" @click="EliminarProductoVenta(index)">
                                    Eliminar
                                </button>
                            </td>
                        </tr>

                        <tr>
                         
                            <td colspan="5" class="text-right border-top border-danger">
                                <strong>Total</strong>
                            </td>
                            <td colspan="1" class="text-right border-top border-danger">
                                <strong>Q.{{TotalVentaPagar.toFixed(2)}}</strong>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" class="text-right">
                                <button class="btn btn-success" @click="AgregarPagos">Agregar Pago</button>
                            </td>
                            <td colspan="3" class="text-left">
                                <button class="btn btn-danger" @click="CancelarVenta">Cancelar Venta</button>
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
        name: 'GenerarVenta',
        data() {
            return {
                // Listar Productos
                Productos: [],
                // Productos para vender find
                ProductosVender: [],
                // Listar Clientes
                Clientes: [],
                // Compra
                IdCliente: '',
                IdPrductoVender: '',
                IdProductos: [],
                CantidadVentaPructos: [],
                SubTotales: [],
                StokValidar: '',
                CantidadVentaProducto: '',
                // Sucursal
                IdSucursalUser: '',
                NombreSucursalUser: '',
                // Usuario
                IdUsuario: '',
                IdTipoUsuario: '',
                ValidarDatosTablaVenta: '0',
                ActivarBuscador: '',
                ValidarDatos: '',
                UrlImg: Global.URL,

                //   Productos
                BuscarProductos: '',
                // Hora actual
                HoraActual: '',
                // Operacciones 
                Suma: '',
                TotalVentaPagar: '',
                PagoVenta: '',
                VueltoVenta: '',
                IdUsuarioLogueado: Global.IdUsuario,
                Foto : ''
            }
        },
        mounted() {
            this.ListadoClientes();
            this.Usuario();
            this.ListHoraActual();


        },
        methods: {
            Usuario() {
                axios.get(Global.URL + 'user', {
                    headers: {
                        Authorization: Global.Token
                    }
                }).then(response => {
                    // console.log(response.data);
                    if (response.status == 200) {
                        this.IdUsuario = response.data[0].IdUsuario
                        this.IdTipoUsuario = response.data[0].IdTipoUsuario
                        this.IdSucursalUser = response.data[0].IdSucursal,
                            this.NombreSucursalUser = response.data[0].Sucursal,
                            console.log(this.IdUsuario);
                        this.ListarProductos();
                    }
                });
            },
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
                           

                            this.ValidarDatos = 1
                            for (var i = 0; i < response.data.length; i++) {
                                this.Clientes.push({
                                        'label': response.data[i].Nombres + ' ' + response.data[i]
                                            .Apellidos,
                                        'IdCliente': response.data[i].IdCliente,
                                        'Telefono': response.data[i].Telefono,
                                        'Direccion': response.data[i].Direccion,
                                        'Foto': response.data[i].Foto
                                    }
                                  
                                );


                            }

                        }
                    } else {
                        alert('No se pudo realizar la peticion');
                    }
                })
            }, //Fin Listado Cliente
            Limpiar() {
                this.IdCliente = ''
                this.Foto = ''
            }, //Fin Limpiar Cliente
            ListarProductos() {
                // console.log(this.SltSucursal + 'ASDF');
                axios.post(Global.URL + 'ListarProductosIdSucursal', {
                    IdSucursal: this.IdSucursalUser
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
            FindProductosVenta() {
                // console.log(this.BuscarProductos);
                const Json = {
                    'IdSucursal': this.IdSucursalUser,
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
            },
            AgregarCantidadProducto(IdProducto, StokActual) {
                    for (let a = 0; a < this.ProductosVender.length; a++) {
                    if (this.ProductosVender[a].IdProducto == IdProducto) {
                        this.$swal.fire(
                            'Alerta',
                            'El Producto ya esta en la Venta',
                            'warning'
                        )
                     return false
                    }
                   
                }
                this.$bvModal.show('bv-modal-Agregar-Cantidad-Producto');
                this.IdPrductoVender = IdProducto
                this.StokValidar = StokActual

            },
            AgregarAlCarrito(CantidadVentaProducto, StokValid) {
                if (CantidadVentaProducto == 0 || CantidadVentaProducto == "" || CantidadVentaProducto < 0) {
                    this.$swal.fire(
                        'Ingresar datos',
                        'La Cantidad Tiene que ser mayor a 1',
                        'warning'
                    )
                } else if (CantidadVentaProducto > StokValid) {
                    this.$swal.fire(
                        'Alerta',
                        'La Cantidad Tiene que ser mayor al Stok Actual',
                        'warning'
                    )
                } else {
                    axios.post(Global.URL + 'BuscarProductoId', {
                        IdProducto: this.IdPrductoVender
                    }, {
                        headers: {
                            Authorization: Global.Token
                        }
                    }).then(response => {
                        // console.log(response.data);
                        this.Suma = 0;
                        if (response.status == 200) {
                            console.log(response.data);
                            for (let i = 0; i < response.data.length; i++) {

                                this.ProductosVender.push({
                                    'IdProducto': response.data[i].IdProducto,
                                    'NombreProducto': response.data[i].NombreProducto,
                                    'PrecioVenta': response.data[i].PrecioVenta,
                                    'Cantidad': this.CantidadVentaProducto,
                                    'SubTotal': this.CantidadVentaProducto * response.data[i]
                                        .PrecioVenta,
                                })
                                this.IdProductos.push(
                                    response.data[i].IdProducto
                                )
                                this.CantidadVentaPructos.push(
                                    this.CantidadVentaProducto
                                )
                                this.SubTotales.push(
                                    this.CantidadVentaProducto * response.data[i]
                                    .PrecioVenta
                                )
                            }

                            for (let a = 0; a < this.ProductosVender.length; a++) {
                                this.Suma = this.ProductosVender[a].SubTotal

                            }
                            this.TotalVentaPagar = parseFloat(this.TotalVentaPagar + this.Suma);
                            this.ValidarDatosTablaVenta = 1;
                            this.CantidadVentaProducto = '';
                            this.$bvModal.hide('bv-modal-Agregar-Cantidad-Producto');
                        }
                    })
                }
            }, // Fin Agregar Carrito
            EliminarProductoVenta(indice) {
                this.Suma = this.ProductosVender[indice].SubTotal
                this.TotalVentaPagar = parseFloat(this.TotalVentaPagar - this.Suma)
                this.ProductosVender.splice(indice, 1);
            }, //Fin De Eliminar Fila de tabla para comprar
            AgregarPagos() {
                if(this.ProductosVender.length == 0){
                    this.$swal.fire(
                        'Alerta',
                        'Tienes que seleccionar un producto',
                        'warning'
                    )
                }else{
                    this.$bvModal.show('bv-modal-Agregar-Pago-Producto');
                }
                
            },
            GenerarVuelto() {
                if (this.PagoVenta <= 0 || this.PagoVenta < this.TotalVentaPagar) {
                    this.$swal.fire(
                        'Alerta',
                        'Verifique bien el pago a recibir',
                        'warning'
                    )

                } else {
                    this.VueltoVenta = parseFloat(this.PagoVenta - this.TotalVentaPagar).toFixed(2);
                    
                }

            }, //Fin Generar Vuelto
            GenerarVenta() {
                if (this.ProductosVender.length == 0) {
                    this.$swal.fire(
                        'Alerta',
                        'Tienes que agregar un producto',
                        'warning'
                    )
                } else {
                    if (this.PagoVenta < this.TotalVentaPagar || this.PagoVenta == '') {
                       
                        this.$swal.fire(
                            'Alerta',
                            'Verifique bien el pago a recibir',
                            'warning'
                        )
                    }else{
                             const Json = {
                        'IdCliente': this.IdCliente.IdCliente,
                        'IdUsuario': this.IdUsuarioLogueado,
                        'TotalVenta': this.TotalVentaPagar,
                        'Pago' :parseFloat(this.PagoVenta).toFixed(2),
                        'Vuelto' : parseFloat(this.VueltoVenta).toFixed(2),
                        'IdSucursal' :  this.IdSucursalUser,
                        'IdProductos': this.IdProductos,
                        'Cantidades': this.CantidadVentaPructos,
                        'SubTotales': this.SubTotales
                    }
                    console.log(Json);
                    axios.post(Global.URL + 'GenerarVenta', Json, {
                        headers:{
                            Authorization: Global.Token
                        }
                    }).then(response => {
                        if (response.status == 200) {
                            this.$swal.fire(
                                'Listo',
                                'Se vendieron: '+response.data.TotalProducto+' productos con un total de: Q.' +response.data.TotalVenta,
                                'success'
                            )
                            this.ProductosVender = [];
                            this.TotalVentaPagar = 0.00;
                            this.PagoVenta = '';
                            this.VueltoVenta = '';
                            this.ValidarDatosTablaVenta  = 0;
                            this.Limpiar();
                            this.$bvModal.hide('bv-modal-Agregar-Pago-Producto');                            
                            this.$router.push('/ListadoVentas');
                        }
                    })
                    }
               
                }
            }, //Fin Cancelar Venta
            CancelarVenta() {
                this.$swal.fire({
                    title: 'Estas Seguro?',
                    text: "Cancelar Venta !!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, Cancelar!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.ProductosVender = [];
                        this.TotalVentaPagar = 0;
                        this.ValidarDatosTablaVenta = 0
                    }                              
                    this.PagoVenta = '';
                    this.VueltoVenta = '';
                     this.$bvModal.hide('bv-modal-Agregar-Pago-Producto');

                })
            },
            VerProductos(){
                this.$bvModal.show('Ver-Producto-Telefono');
            },
            VerImg(Id){
              
               axios.post(Global.URL+'BuscarClienteId',{IdCliente: Id},{
                   headers:{
                       Authorization: Global.Token
                   }
               }).then(response =>{
                   if(response.status == 200){
                       this.Foto = response.data[0].Foto;
                   }
               })
            }


        }
    }
</script>