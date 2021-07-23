<template>
    <div>

        <b-row align-h="center">
            <b-col xl="8" md="10" sm="12" class="mb-3">
                <select class="form-control" v-model="TipoFiltro">
                    <option :value="0" :disabled="true">Elina un filtro</option>                    
                    <option :value="1">Buscador General</option>
                    <option :value="2">Estados</option>
                    <option :value="3">Sucursales</option>
                    <option :value="4">Tipo Producto</option>
                    <option :value="5">Proveedor</option>
                    
                </select>
            </b-col>
            <b-col xl="8" md="10" sm="12" v-if="TipoFiltro == 1">
                <label><strong>Buscador</strong></label>
                <input type="search" class="form-control" v-model="DataFiltroBuscador" placeholder="Buscador"
                    @keydown="Buscador(DataFiltroBuscador)">
            </b-col>
            <b-col xl="8" md="10" sm="12" v-if="TipoFiltro == 2">
                <label></label>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1"><i class="fas fa-filter"></i></span>
                    </div>
                    <select v-model="DataFiltro" class="form-control" @change="Filtrado(TipoFiltro,DataFiltro)" required>
                        <option :value="0" :disabled="true" selected>Eliga un Estado</option>
                        <option :value="1">Activos</option>
                        <option :value="2">Inactivos</option>
                    </select>
                </div>
            </b-col>           
            <b-col xl="8" md="10" sm="12" v-if="TipoFiltro == 3">
                <label>Sucursal</label>
                  <b-form-select v-model="DataFiltro" required @change="Filtrado(TipoFiltro,DataFiltro)">
                            <b-form-select-option :value="0" :disabled="true">Eliga una Sucursal
                            </b-form-select-option>
                            <b-form-select-option v-for="(ListadoSucursales ,index) in Sucursales" v-bind:key="index"
                                :value="ListadoSucursales.IdSucursal">
                                {{ListadoSucursales.NombreSucursal}}
                            </b-form-select-option>
                        </b-form-select>
            </b-col>
            <b-col sm="10" md="10" xl="8" v-if="TipoFiltro == 4" >
                <label>Tipo Producto</label>
                <b-form-select v-model="DataFiltro" required @change="Filtrado(TipoFiltro,DataFiltro)">
                    <b-form-select-option :value="0" :disabled="true">Eliga un Tipo</b-form-select-option>
                    <b-form-select-option v-for="(ListadoTipoProductos ,index) in TipoProductos" v-bind:key="index"
                        :value="ListadoTipoProductos.IdTipo">
                        {{ListadoTipoProductos.Descripcion}}
                    </b-form-select-option>
                </b-form-select>
            </b-col>
                  <b-col sm="10" md="10" xl="8" v-if="TipoFiltro == 5">
                        <label>Proveedor</label>
                        <b-form-select v-model="DataFiltro" required  @change="Filtrado(TipoFiltro,DataFiltro)">
                            <b-form-select-option :value="0" :disabled="true">Eliga un proveedor
                            </b-form-select-option>
                            <b-form-select-option v-for="(Listado ,index) in ListProveedor" v-bind:key="index"
                                :value="Listado.IdProveedor">
                                {{Listado.Nombre}}
                            </b-form-select-option>
                        </b-form-select>
                       
                    </b-col>
        </b-row><br>
        <b-row align-h="center" v-if="ValidarDatos==0">
            <h4 class="text-dark">No hay Datos</h4>
        </b-row><br>
        <b-row id="RowScroll" align-h="center" v-if="ValidarDatos==1">
            <b-col cols="6" xl="2" md="4" v-for="(Listado , index) in Producto" v-bind:key="index">
                <div class="card " :id="'CardEmpleado'+Listado.IdProducto">
                    <div class="card-body">
                        <!-- Botones solo seran visibles en movil -->
                        <b-row align-h="center">
                            <b-col cols="12" xl="12" md="12">
                                <h6><strong>{{Listado.NombreProducto}}</strong></h6>
                                <time class="Info-Producto-Pc"><small>{{Listado.NombreSucursal}}</small></time>
                            </b-col>
                        </b-row>
                        <b-row align-h="end">
                            <b-col cols="1" xl="1" md="1" class="mr-4">
                                <div>
                                    <b-dropdown id="dropdown-dropleft" dropleft variant="ligth">
                                        <div v-if="Listado.Estado == 1">
                                            <b-dropdown-item @click="AbrirModal(Listado.IdProducto)">Editar Datos
                                            </b-dropdown-item>
                                            <b-dropdown-item @click="Eliminar(Listado.IdProducto)">Eliminar
                                            </b-dropdown-item>
                                            <b-dropdown-item @click="AbriModalAgregarFoto(Listado.IdProducto)">Agregar
                                                Foto</b-dropdown-item>
                                        </div>
                                        <div v-if="Listado.Estado == 2">
                                            <b-dropdown-item @click="HabilitarProducto(Listado.IdProducto)">Habilitar
                                            </b-dropdown-item>
                                        </div>
                                    </b-dropdown>
                                </div>
                            </b-col>
                        </b-row>
                        <!-- Botones solo seran visibles en movil FIN-->

                        <b-row align-h="center" class="mb-2">
                            <b-img id="ImgProducto" v-if="Listado.Foto" :src="UrlImg+'VerImgProducto/'+Listado.Foto"
                                rounded alt="No Hay Foto"></b-img>
                            <b-img id="ImgProducto" v-else :src="UrlImg+'VerImgSinFoto/SinFoto.jpg'" rounded
                                alt="No Hay Foto"></b-img>
                        </b-row>


                        <b-card-text>
                            <h6><small> Precio Venta: <strong>Q.{{Listado.PrecioVenta}}</strong> </small></h6>
                            <h6><small>Stok: <strong>{{Listado.Stok}}</strong></small>
                                <i v-if="Listado.Stok == 0"
                                    class="fas fa-exclamation-triangle ml-2 text-danger fa-1"></i>
                            </h6>

                            <h6 class="Info-Producto-Pc"><small>Estado:
                                    <strong>{{Listado.DescripcionEstado}}</strong></small></h6>
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
                            <h6><small> Precio Compra: <strong>Q.{{Listado.PrecioCompra}}</strong></small></h6>
                            <h6><small> Proveedor: <strong>{{Listado.NombreProveedor}}</strong></small></h6>
                            <p>Descripcion:
                                {{Listado.DescripcionProduc}}
                            </p>
                        </b-card-footer>
                    </b-collapse>
                </div><br>
            </b-col>
        </b-row>
        <!-- Modales  -->

        <!-- Modal Para Editar Un Producto -->
        <b-modal id="bv-modal-edit-Producto" size="lg" title="Editar Producto" hide-footer>
            <!-- Fomulario -->
            <form @submit.stop.prevent class="was-validated">
                <b-row align-h="center">
                    <b-col sm="10" md="6" xl="4">
                        <label>Proveedor</label>
                        <b-form-select v-model="SltProveedorEdit" required>
                            <b-form-select-option :value="null" :disabled="true">Eliga un proveedor
                            </b-form-select-option>
                            <b-form-select-option v-for="(Listado ,index) in ListProveedor" v-bind:key="index"
                                :value="Listado.IdProveedor">
                                {{Listado.Nombre}}
                            </b-form-select-option>
                        </b-form-select>
                        <div v-if="!$v.SltProveedorEdit.required" class="invalid-feedback">Este campo tiene que estar
                            lleno
                        </div>
                    </b-col>
                    <b-col sm="10" md="6" xl="4">
                        <label>Sucursal</label>
                        <b-form-select v-model="SltSucursalEdit" required>
                            <b-form-select-option :value="null" :disabled="true">Eliga una Sucursal
                            </b-form-select-option>
                            <b-form-select-option v-for="(ListadoSucursales ,index) in Sucursales" v-bind:key="index"
                                :value="ListadoSucursales.IdSucursal">
                                {{ListadoSucursales.NombreSucursal}}
                            </b-form-select-option>
                        </b-form-select>
                        <div v-if="!$v.SltSucursalEdit.required" class="invalid-feedback">Este campo tiene que estar
                            lleno
                        </div>
                    </b-col>
                    <b-col sm="10" md="6" xl="4">
                        <label>Tipo Producto</label>
                        <b-form-select v-model="SltTipoProductoEdit" required>
                            <b-form-select-option :value="null" :disabled="true">Eliga un Tipo</b-form-select-option>
                            <b-form-select-option v-for="(ListadoTipoProductos ,index) in TipoProductos"
                                v-bind:key="index" :value="ListadoTipoProductos.IdTipo">
                                {{ListadoTipoProductos.Descripcion}}
                            </b-form-select-option>
                        </b-form-select>
                        <div v-if="!$v.SltTipoProductoEdit.required" class="invalid-feedback">Este campo tiene que estar
                            lleno
                        </div>
                    </b-col>
                </b-row>
                <br>
                <b-row align-h="center">
                    <b-col xl="4" md="4" sm="10">
                        <input type="number" v-model="IdProductoEdit">
                        <label>Nombre Producto</label>
                        <input type="text" class="form-control" v-model="NombreProductoEdit" required>
                        <div v-if="!$v.NombreProductoEdit.required" class="invalid-feedback">Este campo tiene que estar
                            lleno
                        </div>
                    </b-col>
                    <b-col xl="4" md="4" sm="10">
                        <label>Precio Compra</label>
                        <input type="number" step="0.01" class="form-control" v-model="PrecioCompraEdit" required>
                        <div v-if="!$v.PrecioCompraEdit.required" class="invalid-feedback">Este campo tiene que estar
                            lleno
                        </div>
                    </b-col>
                    <b-col xl="4" md="4" sm="10">
                        <label>Precio Venta</label>
                        <input type="number" step="0.01" class="form-control" v-model="PrecioVentaEdit" required>
                        <div v-if="!$v.PrecioVentaEdit.required" class="invalid-feedback">Este campo tiene que estar
                            lleno
                        </div>
                    </b-col>
                </b-row>
                <br>
                <b-row align-h="center">
                    <b-col xl="12" md="12" sm="12">
                        <label>Descripción del Producto</label>
                        <textarea class="form-control" v-model="DescripcionEdit" required>

                        </textarea>
                        <div v-if="!$v.DescripcionEdit.required" class="invalid-feedback">Este campo tiene que estar
                            lleno
                        </div>
                    </b-col>
                </b-row>
            </form>
            <!-- Botones -->
            <br>
            <b-row align-h="end" class="mr-2">
                <b-button variant="danger" class="mr-2" @click="$bvModal.hide('bv-modal-edit-Producto')">Cancelar
                </b-button>
                <b-button variant="primary" @click="EditarProducto">Editar Producto</b-button>
            </b-row>
        </b-modal>
        <!-- Fin Modal Crar Producto -->
        <!-- Inicio De Modal Agregar Foto -->
        <b-modal id="bv-modal-Foto-Producto" size="lg" title="Editar Producto" hide-footer>
            <!-- Fomulario -->
            <form @submit.stop.prevent class="was-validated">


                <b-row align-h="center">
                    <b-col xl="6" md="8" sm="10">
                        <input type="hidden" v-model="IdProductoFoto">
                        <label>Foto</label>
                        <input type="file" @change="FileChange()" name="file" ref="file" class="form-control" required>
                        <!-- <div v-if="!$v.NombreProductoEdit.required" class="invalid-feedback">Este campo tiene que estar
                            lleno
                        </div> -->
                    </b-col>

                </b-row>
                <br>

            </form>
            <!-- Botones -->
            <br>
            <b-row align-h="end" class="mr-2">
                <b-button variant="danger" class="mr-2" @click="$bvModal.hide('bv-modal-Foto-Producto')">Cancelar
                </b-button>
                <b-button variant="primary" @click="GuardarFotoProducto(IdProductoFoto)">Agregar Fotos</b-button>
            </b-row>
        </b-modal>
    </div>
</template>
<script>
    import {
        required
    } from 'vuelidate/lib/validators'
    import axios from 'axios'
    import {
        Global
    } from '../../Global';

    export default {
        name: 'Listado',
        data() {
            return {
                // Tipo Filtrado
                TipoFiltro: '2',
                // Data Del Filtro
                DataFiltro: 0,
                DataFiltroBuscador: '',
                // Array para listar Proveedores y sucursales en el select
                ListProveedor: [],
                Sucursales: [],
                TipoProductos: [],
                // Buscador
                InfoSearchGeneral: '',
                SltEstadoFilter: 1,
                ValidarResponse: '',
                Producto: [],
                // Validar Datos en la response
                ValidarDatos: '',
                // Ver Foto Producto
                UrlImg: Global.URL,

                // Json Para Editar

                IdProductoEdit: '',
                SltProveedorEdit: null,
                SltSucursalEdit: null,
                SltTipoProductoEdit: null,
                NombreProductoEdit: '',
                PrecioVentaEdit: '',
                PrecioCompraEdit: '',
                DescripcionEdit: '',
                // Variables para agregar Foto
                IdProductoFoto: '',
                file: '',
                NombreFoto: ''


            }
        },
        validations: {
            SltProveedorEdit: {
                required
            },
            SltSucursalEdit: {
                required
            },
            SltTipoProductoEdit: {
                required
            },
            NombreProductoEdit: {
                required
            },
            PrecioVentaEdit: {
                required
            },
            PrecioCompraEdit: {
                required
            },
            DescripcionEdit: {
                required
            },
        },
        mounted() {
            this.ListadoProductos();
            this.ListadoProveedor();
            this.ListSucurSelc();
            this.ListTipoProductoSelc();
        },
        methods: {
            ListadoProveedor() {
                axios.get(Global.URL + 'ListarProveedor', {
                    headers: {
                        Authorization: Global.Token
                    }
                }).then(response => {
                    if (response.status == 200) {
                        // console.log(response);
                        if (response.data.length == 0) {
                            this.ValidarDatos = 0
                        } else {
                            this.ValidarDatos = 1
                            for (var i = 0; i < response.data.length; i++) {
                                this.ListProveedor.push({
                                    IdProveedor: response.data[i].IdProveedor,
                                    Nombre: response.data[i].NombreProveedor,
                                });
                            }
                        }
                    } else {
                        alert('No se encontro la direccion');
                    }
                })
            }, //Fin Crear Funcion de List Proveedores
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
            ListTipoProductoSelc() {
                axios.get(Global.URL + 'ListarTiposProductos', {
                    headers: {
                        Authorization: Global.Token
                    }
                }).then(response => {
                    if (response.status == 200) {
                        // console.log(response);
                        for (var i = 0; i < response.data.length; i++) {
                            this.TipoProductos.push({
                                IdTipo: response.data[i].IdTipoProducto,
                                Descripcion: response.data[i].Descripcion,
                            });
                        }
                    } else {
                        alert('No se puedo realizar la petición');
                    }
                })
            }, //Fin de  Listado Tipo PRODUCTO
            AbrirCollap(IdProducto) {
                alert(IdProducto)
                this.$root.$on('bv::toggle::collapse', 'collapse' + IdProducto);
            },
            ListadoProductos() {
                axios.get(Global.URL + "ListadoProductos", {
                    headers: {
                        Authorization: Global.Token
                    }
                }).then(response => {
                    if (response.status == 200) {
                        // console.log(response);
                        if (response.data.length == 0) {
                            this.ValidarDatos = 0;
                        } else {
                            this.ValidarDatos = 1;
                            for (var i = 0; i < response.data.length; i++) {
                                this.Producto.push({
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

                    } else {
                        alert('No se pudo realizar la peticion');
                    }
                })
            }, //
            Eliminar(IdProducto) {
                this.$swal.fire({
                    title: 'Estas Seguro?',
                    text: "Desabilitar Producto!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, Desabilitarlo!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.post(Global.URL + 'DesabilitarProducto', {
                            IdProducto: IdProducto
                        }, {
                            headers: {
                                Authorization: Global.Token
                            }
                        }).then(response => {
                            if (response.status == 200) {
                                this.$emit('CambioBdProducto', 1);
                                this.$swal.fire(
                                    'Desabilitado!',
                                    'Tu has Desabilitado a un Producto.',
                                    'success'
                                )

                            } else {
                                alert('Algo Salio mal en la petición')
                            }
                        })
                    }

                })
            }, //Fin Eliminar(Desabilitar)
            HabilitarProducto(IdProducto) {
                this.$swal.fire({
                    title: 'Estas Seguro?',
                    text: "Habilitar Producto!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, Habilitarlo!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.post(Global.URL + 'HabilitarProducto', {
                            IdProducto: IdProducto
                        }, {
                            headers: {
                                Authorization: Global.Token
                            }
                        }).then(response => {
                            if (response.status == 200) {
                                this.$emit('CambioBdProducto', 1);
                                this.$swal.fire(
                                    'Habilitado!',
                                    'Tu has Habilitado a un Producto.',
                                    'success'
                                )

                            } else {
                                alert('Algo Salio mal en la petición')
                            }
                        })
                    }

                })
            }, //Fin Eliminar(Habilitar)
            FiltrarPorSucursal(Estado) {
                axios.post(Global.URL + 'FiltradoProductosEstados', {
                    Estado: Estado
                }, {
                    headers: {
                        Authorization: Global.Token
                    }
                }).then(response => {
                    if (response.status == 200) {
                        // console.log(response);
                        if (response.data.length == 0) {
                            this.ValidarDatos = 0;
                        } else {
                            this.Producto = [];
                            this.ValidarDatos = 1;
                            for (var i = 0; i < response.data.length; i++) {
                                this.Producto.push({
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

                    } else {
                        alert('No se pudo realizar la peticion');
                    }
                });
            }, //Filtrado Datos por estado
            AbrirModal(IdProducto) {
                // console.log(IdProducto);
                this.$bvModal.show("bv-modal-edit-Producto")
                axios.post(Global.URL + 'InfoEditarProducto', {
                    IdProducto: IdProducto
                }, {
                    headers: {
                        Authorization: Global.Token
                    }
                }).then(response => {
                    // console.log('Edit',response);
                    if (response.status == 200) {
                        this.IdProductoEdit = response.data.IdProducto;
                        this.SltProveedorEdit = response.data.IdProveedor;
                        this.SltSucursalEdit = response.data.IdSucursal;
                        this.SltTipoProductoEdit = response.data.IdTipoProducto;
                        this.NombreProductoEdit = response.data.NombreProducto;
                        this.PrecioVentaEdit = response.data.PrecioVenta;
                        this.PrecioCompraEdit = response.data.PrecioCompra;
                        this.DescripcionEdit = response.data.DescripcionProduc;

                    }
                })
            }, // Fin de Cerrar Modal Editar
            EditarProducto(bvModalEvt) {
                bvModalEvt.preventDefault();
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return false
                } else {
                    const Json = {
                        'IdProductoEdit': this.IdProductoEdit,
                        'SltProveedorEdit': this.SltProveedorEdit,
                        'SltSucursalEdit': this.SltSucursalEdit,
                        'SltTipoProductoEdit': this.SltTipoProductoEdit,
                        'NombreProductoEdit': this.NombreProductoEdit,
                        'PrecioVentaEdit': this.PrecioVentaEdit,
                        'PrecioCompraEdit': this.PrecioCompraEdit,
                        'DescripcionEdit': this.DescripcionEdit
                    }
                    axios.post(Global.URL + 'EditarProducto', Json, {
                        headers: {
                            Authorization: Global.Token
                        }
                    }).then(response => {
                        if (response.status == 200) {
                            this.$emit('CambioBdProducto', 1);
                            this.$swal.fire(
                                'Editado Correctamente',
                                'La Información del Producto fué editada con exitoo!!!',
                                'success'
                            )
                        } else {
                            alert('Error en la petición');
                        }
                    });
                }
            }, //Fin Editar Producto
            AbriModalAgregarFoto(IdProducto) {
                this.IdProductoFoto = IdProducto
                this.$bvModal.show("bv-modal-Foto-Producto")
            }, //Fin Modal Agregar Foto Producto
            FileChange() {
                this.file = this.$refs.file.files[0];

            }, //Fin FileChange
            GuardarFotoProducto(IdProductoFoto) {
                const formData = new FormData();
                formData.append('Foto', this.file, this.file.name);
                axios.post(Global.URL + 'SubirFotoProducto/' + IdProductoFoto, formData, {
                    headers: {
                        Authorization: Global.Token
                    }
                }).then(response => {
                    if (response.status == 200) {
                        this.NombreFoto = response.data
                        this.$emit('CambioBdProducto', 1);
                        this.$swal.fire(
                            'Foto Subida Correctamente',
                            'Subiste una foto con exito!!!',
                            'success'
                        )
                    } else {
                        alert('No se pudo realizar la petición con exito');
                    }
                });
            }, //Fin funcion para aguardar foto
            Buscador(Datos) {
                axios.post(Global.URL + 'BuscadorProducto', {
                    Datos: Datos
                }, {
                    headers: {
                        Authorization: Global.Token
                    }
                }).then(response => {
                    if (response.status == 200) {
                        // console.log(response);
                        if (response.data.length == 0) {
                            this.ValidarDatos = 0;
                        } else {
                            this.Producto = [];
                            this.ValidarDatos = 1;
                            for (var i = 0; i < response.data.length; i++) {
                                this.Producto.push({
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
                    } else {
                        alert('No se realizo la petición');
                    }
                });
            }, //Fin Buscador General
            Filtrado(TipoFiltro, Dato) {
                const Json = {
                    'TipoFiltro': TipoFiltro,
                    'Dato': Dato
                }
                axios.post(Global.URL + 'FiltroProducto',Json, {
                    headers: {
                        Authorization: Global.Token
                    }
                }).then(response => {
                    if (response.status == 200) {
                        // console.log(response);
                        if (response.data.length == 0) {
                            this.ValidarDatos = 0;
                        } else {
                            this.Producto = [];
                            this.ValidarDatos = 1;
                            for (var i = 0; i < response.data.length; i++) {
                                this.Producto.push({
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
                    } else {
                        alert('No se realizo la petición');
                    }
                });

            }

        }
    }
</script>