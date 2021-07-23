<template>
    <div>
        <b-button v-b-modal.modal-Producto class="mr-5 mt-2">
             <i class="fas fa-plus"></i>
            
        </b-button>

        <!-- Modal Para Crear Un Producto -->
        <b-modal id="modal-Producto" size="lg" title="Crear Producto" hide-footer>
            <!-- Fomulario -->
            <form @submit.stop.prevent class="was-validated">
                <b-row align-h="center">
                    <b-col sm="10" md="6" xl="4">
                        <label>Proveedor</label>
                        <b-form-select v-model="SltProveedor" required>
                            <b-form-select-option :value="null">Eliga un proveedor</b-form-select-option>
                            <b-form-select-option v-for="(Listado ,index) in ListProveedor" v-bind:key="index"
                                :value="Listado.IdProveedor">
                                {{Listado.Nombre}}
                            </b-form-select-option>
                        </b-form-select>
                        <div v-if="!$v.SltProveedor.required" class="invalid-feedback">Este campo tiene que estar
                            seleccionado
                        </div>
                    </b-col>
                    <b-col sm="10" md="6" xl="4">
                        <label>Sucursal</label>
                        <b-form-select v-model="SltSucursal" required>
                            <b-form-select-option :value="null">Eliga una Sucursal</b-form-select-option>
                            <b-form-select-option v-for="(ListadoSucursales ,index) in Sucursales" v-bind:key="index"
                                :value="ListadoSucursales.IdSucursal">
                                {{ListadoSucursales.NombreSucursal}}
                            </b-form-select-option>
                        </b-form-select>
                        <div v-if="!$v.SltSucursal.required" class="invalid-feedback">Este campo tiene que estar
                            seleccionado
                        </div>
                    </b-col>
                    <b-col sm="10" md="6" xl="4">
                        <label>Tipo Producto</label>
                        <b-form-select v-model="SltTipoProducto" required>
                            <b-form-select-option :value="null">Eliga un Tipo</b-form-select-option>
                            <b-form-select-option v-for="(ListadoTipoProductos ,index) in TipoProductos"
                                v-bind:key="index" :value="ListadoTipoProductos.IdTipo">
                                {{ListadoTipoProductos.Descripcion}}
                            </b-form-select-option>
                        </b-form-select>
                        <div v-if="!$v.SltTipoProducto.required" class="invalid-feedback">Este campo tiene que estar
                            seleccionado
                        </div>
                    </b-col>
                </b-row>
                <br>
                <b-row align-h="center">
                    <b-col xl="4" md="4" sm="10">
                        <label>Nombre Producto</label>
                        <input type="text" class="form-control" v-model="NombreProducto" required>
                        <div v-if="!$v.NombreProducto.required" class="invalid-feedback">Este campo tiene que estar
                            lleno
                        </div>
                    </b-col>
                    <b-col xl="4" md="4" sm="10">
                        <label>Precio Compra</label>
                        <input type="number" step="0.01" class="form-control" v-model="PrecioCompra" required>
                        <div v-if="!$v.PrecioCompra.required" class="invalid-feedback">Este campo tiene que estar lleno
                        </div>
                    </b-col>
                    <b-col xl="4" md="4" sm="10">
                        <label>Precio Venta</label>
                        <input type="number" step="0.01" class="form-control" v-model="PrecioVenta" required>
                        <div v-if="!$v.PrecioVenta.required" class="invalid-feedback">Este campo tiene que estar lleno
                        </div>
                    </b-col>
                </b-row>
                <br>
                <b-row align-h="center">
                    <b-col xl="12" md="12" sm="12">
                        <label>Descripción del Producto</label>
                        <textarea class="form-control" v-model="Descripcion" required>

                        </textarea>
                        <div v-if="!$v.Descripcion.required" class="invalid-feedback">Este campo tiene que estar lleno
                        </div>
                    </b-col>
                </b-row>
            </form>
            <!-- Botones -->
            <br>
            <b-row align-h="end" class="mr-2">
                <b-button variant="danger" class="mr-2" @click="$bvModal.hide('modal-Producto')">Cancelar</b-button>
                <b-button variant="primary" @click="CrearProducto">Crar Producto</b-button>
            </b-row>
        </b-modal>
        <!-- Fin Modal Crar Producto -->
       
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
        name: 'FrmCrearProducto',
        data() {
            return {
                // Array para listar Proveedores y sucursales en el select
                ListProveedor: [],
                Sucursales: [],
                TipoProductos: [],
                // Variables

                SltProveedor: null,
                SltSucursal: null,
                SltTipoProducto: null,
                NombreProducto: '',
                PrecioVenta: '',
                PrecioCompra: '',
                Descripcion: '',

            }
        },
        validations: {
            SltProveedor: {
                required
            },
            SltSucursal: {
                required
            },
            SltTipoProducto: {
                required
            },
            NombreProducto: {
                required
            },
            PrecioVenta: {
                required
            },
            PrecioCompra: {
                required
            },
            Descripcion: {
                required
            }

        },
        mounted() {
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
                        console.log(response);
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
                        console.log(response);
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
            CrearProducto(bvModalEvt) {
                bvModalEvt.preventDefault();
                this.$v.$touch();
                if (this.$v.$invalid) {

                    return false

                } else {
                    var Json = {
                        'IdProveedor': this.SltProveedor,
                        'IdSucursal': this.SltSucursal,
                        'IdTipoP': this.SltTipoProducto,
                        'Nombre': this.NombreProducto,
                        'PrecioCompra': this.PrecioCompra,
                        'PrecioVenta': this.PrecioVenta,
                        'Desctipcion': this.Descripcion
                    }
                    axios.post(Global.URL + 'CrearProducto', Json, {
                        headers: {
                            Authorization: Global.Token
                        }
                    }).then(response => {
                        if (response.status == 200) {
                            this.$emit('CambioBdProducto', 1);
                            this.$swal.fire(
                                'Creado Correctamente!',
                                'Tu has Creado un Producto Nuevo Correctamente!',
                                'success'

                            )
                            this.SltProveedor = ''    
                            this.SltSucursal = ''
                            this.SltTipoProducto = ''
                            this.NombreProducto = ''
                            this.PrecioCompra = ''
                            this.PrecioVenta = ''
                            this.Descripcion = ''
                        } else {
                            alert('No se pudo Realizar la petición')
                        }
                    });
                }

            }
        }
    }
</script>