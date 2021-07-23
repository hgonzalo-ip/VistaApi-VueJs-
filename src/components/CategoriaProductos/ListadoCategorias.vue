<template>
    <div><br>
        <b-row align-h="center">
            <b-col cols="12" xl="5" md="5">
                <label><strong>Buscador General</strong></label>
                <input type="text" class="form-control" v-model="DataBuscardor" @keyup="BuscadorGeneral">
            </b-col>
            <b-col cols="12" xl="3" md="3">
                <label><strong>Filtrado</strong></label>
                <select class="form-control" v-model="DataFiltro" @change="FiltroEstados">
                    <option :value="null">Elige una Opción</option>
                    <option :value="1">Activo</option>
                    <option :value="2">Inactivos</option>
                </select>
                
            </b-col>
        </b-row><br>
        <b-row align-h="center">
            <b-col cols="10" xl="10" md="10">
                <table class="table table-hover table-light">
                    <thead>
                        <tr>
                            <th class="text-center">#</th>
                            <th class="text-center">Categoria</th>
                            <th class="text-center">Estado</th>
                            <th class="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tr v-if="ValidarRequest == 0">
                        <td class="text-dark text-center" colspan="5"><strong>No hay datos</strong></td>
                    </tr>
                    <tbody>

                        <tr v-for="(Listado, index) in TipoProductos" v-bind:key="index">
                            <td class="text-center">{{index+1}}</td>
                            <td class="text-center">{{Listado.Descripcion}}</td>
                            <td class="text-center">{{Listado.DecEstado}}
                                <i v-if="Listado.Estado == 1" class="fas fa-check-circle text-success ml-2"></i>
                                <i v-else class="fas fa-exclamation-triangle text-danger ml-2"></i>
                            </td>
                            <td v-if="Listado.Estado == 1" class="text-center" >
                                <button class="btn btn-warning btn-sm" @click="AbrirModalEdita(Listado.IdTipo)">
                                    Editar
                                </button>
                                <button class="btn btn-danger btn-sm ml-2" @click="EliminarCategorias(Listado.IdTipo)">
                                    Eliminar
                                </button>
                            </td>
                            <td v-if="Listado.Estado == 2" class="text-center">
                                <button class="btn btn-success btn-sm"
                                    @click="HabilitarCategoria(Listado.IdTipo)">Habilitar</button>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </b-col>
        </b-row>
        <!-- Modal -->
        <b-modal id="modal-prevent-Editar" title="Editar Categoria" ok-title="Editar Categoria" @ok="EditarCategoria"
            cancel-variant="danger" cancel-title="Cancelar" size="lg">
            <form @submit.stop.prevent class="was-validated">
                <b-row align-h="center">
                    <b-col cols="12" xl="6" md="6">
                        <label>Categoria</label>
                        <input class="form-control" v-model="NombreCategoria" required>
                        <input type="hidden" v-model="IdCategoEdit">
                        <div v-if="this.ValidarCategoria == 0" class="invalid-feedback">Este campo tiene que estar lleno
                        </div>
                    </b-col>

                </b-row>
            </form>
        </b-modal>
    </div>
</template>
<script>
    import axios from 'axios';
    import {
        Global
    } from '../../Global';

    export default {
        name: 'ListadoCategorias',
        data() {
            return {
                TipoProductos: [],
                DataFiltro: 'null',
                // Buscardo 
                DataBuscardor: '',
                // Validar Datos request
                ValidarRequest: '',
                // Editar Categoria 
                IdCategoEdit: '',
                NombreCategoria: '',
                ValidarCategoria: '',

            }
        },
        mounted() {
            this.ListTipoProducto();
        },
        methods: {
            ListTipoProducto() {
                axios.get(Global.URL + 'ListarTiposProductos', {
                    headers: {
                        Authorization: Global.Token
                    }
                }).then(response => {
                    if (response.status == 200) {
                        if (response.data.length == 0) {
                            this.ValidarRequest = 0
                        } else {
                            this.ValidarRequest = 1
                            // console.log(response);                            
                            for (var i = 0; i < response.data.length; i++) {
                                this.TipoProductos.push({
                                    IdTipo: response.data[i].IdTipoProducto,
                                    Descripcion: response.data[i].Descripcion,
                                    Estado: response.data[i].Estado,
                                    DecEstado: response.data[i].DecEstado,
                                });
                            }
                        }

                    } else {
                        alert('No se puedo realizar la petición');
                    }
                })
            }, //Fin de  Listado Tipo PRODUCTO
            EliminarCategorias(Id) {
                this.$swal.fire({
                    title: 'Estas Seguro?',
                    text: "Desabilitar Categoria!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, Desabilitar!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.post(Global.URL + 'DesabilitarCategoria', {
                            IdCategoria: Id
                        }, {
                            headers: {
                                Authorization: Global.Token
                            }
                        }).then(response => {
                            if (response.status == 200) {
                                this.$emit('CambioBdCate', 1);
                                this.$swal.fire(
                                    'Desabilitado!',
                                    'Tu has Desabilitado a una Categoria ' + response.data
                                    .Descripcion,
                                    'success'
                                )

                            } else {
                                alert('Algo Salio mal en la petición')
                            }
                        })
                    }

                })

            }, //Fin de eliminar 
            HabilitarCategoria(Id) {
                this.$swal.fire({
                    title: 'Estas Seguro?',
                    text: "Habilitar Categoria!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, Habilitar!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.post(Global.URL + 'HabilitarCategoria', {
                            IdCategoria: Id
                        }, {
                            headers: {
                                Authorization: Global.Token
                            }
                        }).then(response => {
                            if (response.status == 200) {
                                this.$emit('CambioBdCate', 1);
                                this.$swal.fire(
                                    'Habilitada!',
                                    'Tu has Habilitado la Categoria ' + response.data
                                    .Descripcion,
                                    'success'
                                )

                            } else {
                                alert('Algo Salio mal en la petición')
                            }
                        })
                    }

                })

            }, //Fin de eliminar 
            BuscadorGeneral() {
                axios.post(Global.URL + 'BuscadorGeneral', {
                    Data: this.DataBuscardor
                }, {
                    headers: {
                        Authorization: Global.Token
                    }
                }).then(response => {

                    if (response.status == 200) {
                        if (response.data.length == 0) {
                            this.ValidarRequest == 0
                        } else {
                            this.ValidarRequest == 1
                            this.TipoProductos = [];
                            for (var i = 0; i < response.data.length; i++) {
                                this.TipoProductos.push({
                                    IdTipo: response.data[i].IdTipoProducto,
                                    Descripcion: response.data[i].Descripcion,
                                    Estado: response.data[i].Estado,
                                    DecEstado: response.data[i].DecEstado,
                                });
                            }
                        }
                    }
                })
            }, //Fin Buscador General
            FiltroEstados() {
                // alert(this.DataFiltro)
                axios.post(Global.URL + 'FiltradoEstados', {
                    Data: this.DataFiltro
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
                            this.TipoProductos = [];
                            for (var i = 0; i < response.data.length; i++) {
                                this.TipoProductos.push({
                                    IdTipo: response.data[i].IdTipoProducto,
                                    Descripcion: response.data[i].Descripcion,
                                    Estado: response.data[i].Estado,
                                    DecEstado: response.data[i].DecEstado,
                                });
                            }
                        }
                    }
                })
            }, //Fin de Filtrado
            AbrirModalEdita(IdCategoria) {
                this.$bvModal.show('modal-prevent-Editar');
                axios.post(Global.URL+'BuscarTipoProductoId',{IdTipo: IdCategoria},{
                    headers:{
                        Authorization: Global.Token
                    }
                }).then(response =>{
                    console.log(response.data);
                    if(response.status == 200){
                        this.NombreCategoria = response.data.Descripcion;
                        this.IdCategoEdit = response.data.IdTipoProducto;
                    }
                })

            }, //Fin de abrir Modal
            EditarCategoria(bvModalEvt) {
                bvModalEvt.preventDefault();
                if (this.NombreCategoria == '') {
                    this.ValidarCategoria = 0;
                    return false;
                } else {
                    this.ValidarCategoria = 1;
                    axios.post(Global.URL + 'EditarCategoria', {
                        NombreCategoria: this.NombreCategoria,
                        IdCategoria : this.IdCategoEdit
                    }, {
                        headers: {
                            Authorization: Global.Token
                        }
                    }).then(response => {
                        if (response.status == 200) {
                            this.$emit('CambioBdCate', 1);
                            this.$swal.fire(
                                'Editada Correctamente',
                                'Categoria Editada : ' + response.data.Descripcion,
                                'success'
                            )                            
                            this.$bvModal.hide('modal-prevent-Editar');
                        }
                    })
                }
            }
        }
    }
</script>