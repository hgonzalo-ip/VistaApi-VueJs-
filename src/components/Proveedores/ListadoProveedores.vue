<template>
    <b-container>
        <!-- User Interface controls -->
        <b-row align-h="center">
            <b-col sm="8" xl="6" md="8">
                <label><strong>Buscador </strong></label>
                <input type="search" class="form-control" placeholder="Buscador General" v-model="InforBuscador"
                    @keyup="BuscardorGeneral(InforBuscador)">
            </b-col>
            <b-col sm="4" xl="2" md="4" class="mt-2">
                <label></label>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1"><i class="fas fa-filter"></i></span>
                    </div>
                    <select v-model="ValueFiltro" @change="BuscadorFiltro(ValueFiltro)" class="form-control">
                        <option value="0">Todos</option>
                        <option :value="1">Habilitados</option>
                        <option value="2">Desabilitados</option>
                    </select>
                </div>
            </b-col>
        </b-row>
        <br>
        <!-- Main table element -->
        <table class="table table-hover table-light table-responsive-lg">
            <thead>
                <tr class="text-dark text-center">
                    <th><strong>#</strong></th>
                    <th><strong>Nombre</strong></th>
                    <th><strong>Dirección</strong></th>
                    <th><strong>Telefono</strong></th>
                    <th><strong>Estado</strong></th>
                    <th><strong>Acciones</strong></th>
                </tr>
            </thead>
            <tbody v-for="(Listado, index) in items" v-bind:key="index">
                <tr v-if="ValidarDatos == 1" class="text-dark text-center">
                    <td>{{Listado.No}}</td>
                    <td>{{Listado.Nombre}}</td>
                    <td>{{Listado.Direccion}}</td>
                    <td>{{Listado.Telefono}}</td>
                    <td>{{Listado.Estado}}</td>
                    <td v-if="Listado.EstadoNum == 1">
                        <b-button pill variant="primary" class="BtnAcciones" @click="AbirMdEditarProve(Listado.No)">
                            Editar</b-button>
                        <b-button pill variant="danger" @click="EliminarProveedor(Listado.No)" class="BtnAcciones">
                            Eliminar</b-button>
                    </td>
                    <td v-else>
                        <b-button pill variant="success" @click="HabilitarProveedor(Listado.No)" class="BtnAcciones">
                            Habilitar</b-button>
                    </td>
                </tr>

            </tbody>
            <tr v-if="ValidarDatos == 0" class="text-center">
                <td colspan="12"><strong>No hay datos</strong></td>
            </tr>
        </table>
        <br>
        <!-- Modales  -->
        <!-- Modal para agregar Foto Cliente -->
        <b-modal id="bv-modal-Editar-Proveedor" size="lg" hide-footer>
            <template #modal-title>
                Editar Proveedor
            </template>
            <b-row align-h="center">
                <b-col xl="4" sm="10">
                    <label>Nombre</label>
                    <input class="form-control" v-model="ProveedorEdit.NombreEdit">
                </b-col>
                <b-col xl="4" sm="10">
                    <label>Direccion</label>
                    <input class="form-control" v-model="ProveedorEdit.DireccionEdit">
                </b-col>
                <b-col xl="4" sm="10">
                    <label>Telefono</label>
                    <input class="form-control" v-model="ProveedorEdit.TelefonoEdit">
                </b-col>
            </b-row>
            <hr class="bg-dark">
            <b-row align-h="center">
                <b-button variant="danger" class="m-1" @click="$bvModal.hide('bv-modal-Editar-Proveedor')">Cancelar
                </b-button>
                <b-button variant="primary" class="m-1" @click="EditarProoveedor(ProveedorEdit)">Editar Proveedor
                </b-button>
            </b-row>
        </b-modal>

    </b-container>

</template>

<script>
    import axios from 'axios'
    import {
        Global
    } from '../../Global';
    export default {
        name: 'ListadoProveedores',
        data() {
            return {
                items: [],
                ProveedorEdit: {
                    IdProveedorEdit: '',
                    NombreEdit: '',
                    TelefonoEdit: '',
                    DireccionEdit: ''
                },
                // Variable Para almacenar el Buscador
                InforBuscador: '',
                ValueFiltro: 0,
                // Variable para Validar datos en la request 
                ValidarDatos: '',
            }
        },

        mounted() {
            // Set the initial number of items
            this.ListadoProveedor()

        },
        methods: {
            info(item) {
                this.infoModal.title = `Editar Proveedor` + item
                this.infoModal.content = JSON.stringify(item, null, 2)
                this.$root.$emit('bv::show::modal', this.infoModal.id)
            },
            resetInfoModal() {
                this.infoModal.title = ''
                this.infoModal.content = ''
            },
            onFiltered(filteredItems) {
                // Trigger pagination to update the number of buttons/pages due to filtering
                this.totalRows = filteredItems.length
                this.currentPage = 1
            },

            ListadoProveedor() {

                axios.get(Global.URL + 'ListarProveedor', {
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
                                this.items.push({
                                    No: response.data[i].IdProveedor,
                                    Nombre: response.data[i].NombreProveedor,
                                    Direccion: response.data[i].Direccion,
                                    Telefono: response.data[i].Telefono,
                                    Estado: response.data[i].EstadoDesc,
                                    EstadoNum: response.data[i].EstadoNum,
                                });
                            }
                        }
                    } else {
                        alert('No se encontro la direccion');
                    }
                })


            },
            EliminarProveedor(IdProveedor) {
                this.$swal.fire({
                    title: 'Estas Seguro?',
                    text: "Tu Quieres Desabilitar este proveedor!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, Desabilitado!'
                }).then((result) => {
                    if (result.isConfirmed) {

                        axios.post(Global.URL + 'DesabilitarProveedor', {
                            IdProveedor: IdProveedor
                        }, {
                            headers: {
                                Authorization: Global.Token
                            }
                        }).then(response => {
                            if (response.status == 200) {
                                this.$emit('CambioBdProvee', 1);
                                this.$swal.fire(
                                    'Desabilitado!',
                                    'Tu has desabilitado este dato.',
                                    'success'
                                )
                            }
                        })

                    }
                })
            }, //Fin Eliminar 
            HabilitarProveedor(IdProveedor) {
                this.$swal.fire({
                    title: 'Estas Seguro?',
                    text: "Tu Quieres Habilitar este proveedor!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, Habilitarlo!'
                }).then((result) => {
                    if (result.isConfirmed) {

                        axios.post(Global.URL + 'HabilitarProveedor', {
                            IdProveedor: IdProveedor
                        }, {
                            headers: {
                                Authorization: Global.Token
                            }
                        }).then(response => {
                            if (response.status == 200) {
                                this.$emit('CambioBdProvee', 1);
                                this.$swal.fire(
                                    'Habilitado!',
                                    'Tu has Habilitado este Proveedor.',
                                    'success'
                                )
                            } else {
                                alert('No se pudo realizar la petición');
                            }
                        })

                    }
                })
            }, //Fin de Habilitar 
            AbirMdEditarProve(IdProveedor) {
                this.$bvModal.show('bv-modal-Editar-Proveedor')
                axios.post(Global.URL + 'InfoEditarProveedor', {
                    IdProveedor: IdProveedor
                }, {
                    headers: {
                        Authorization: Global.Token
                    }
                }).then(response => {
                    if (response.status == 200) {
                        this.ProveedorEdit.IdProveedorEdit = response.data.IdProveedor;
                        this.ProveedorEdit.NombreEdit = response.data.NombreProveedor;
                        this.ProveedorEdit.TelefonoEdit = response.data.Telefono;
                        this.ProveedorEdit.DireccionEdit = response.data.Direccion;
                    } else {
                        alert('No se encontro la dirección');
                    }
                });
                console.log(IdProveedor);
            }, // Fin Modal Editar Proveedor
            EditarProoveedor(Datos) {
                axios.post(Global.URL + 'EditarProoveedor', Datos, {
                    headers: {
                        Authorization: Global.Token
                    }
                }).then(response => {
                    if (response.status == 200) {
                        this.$emit('CambioBdProvee', 1);
                        this.$swal.fire(
                            'Editado Correctamente!',
                            'Tu has Editado la Información de un Proveedor.',
                            'success'
                        )
                    } else {
                        alert('No se pudo realizar la petición');
                    }
                });
                console.log(Datos);
            }, //Fin Editar Proveedor
            BuscardorGeneral(Datos) {
                axios.post(Global.URL + "BuscarProveedor", {
                    Datos: Datos
                }, {
                    headers: {
                        Authorization: Global.Token
                    }
                }).then(response => {
                    if (response.status == 200) {
                        if (response.data.length == 0) {
                            this.ValidarDatos = 0
                        } else {
                            this.ValidarDatos = 1
                            this.items = [];
                            for (var i = 0; i < response.data.length; i++) {
                                this.items.push({
                                    No: response.data[i].IdProveedor,
                                    Nombre: response.data[i].NombreProveedor,
                                    Direccion: response.data[i].Direccion,
                                    Telefono: response.data[i].Telefono,
                                    Estado: response.data[i].EstadoDesc,
                                    EstadoNum: response.data[i].EstadoNum,
                                });
                            }
                        }


                    } else {
                        alert('No se pudo realizar la peticion');
                    }
                })
            }, //Fin Buscador General
            BuscadorFiltro() {
                axios.post(Global.URL + 'BuscadorFiltroProvee', {
                    Estado: this.ValueFiltro
                }, {
                    headers: {
                        Authorization: Global.Token
                    }
                }).then(response => {
                    if (response.status == 200) {
                        if (response.data.length == 0) {
                            this.ValidarDatos = 0
                        } else {
                            this.ValidarDatos = 1
                            this.items = [];
                            for (var i = 0; i < response.data.length; i++) {
                                this.items.push({
                                    No: response.data[i].IdProveedor,
                                    Nombre: response.data[i].NombreProveedor,
                                    Direccion: response.data[i].Direccion,
                                    Telefono: response.data[i].Telefono,
                                    Estado: response.data[i].EstadoDesc,
                                    EstadoNum: response.data[i].EstadoNum,
                                });
                            }
                        }

                    } else {
                        alert('No se pudo realizar la peticion');
                    }
                })
            }, //Fin Buscador Filtro
        }
    }
</script>