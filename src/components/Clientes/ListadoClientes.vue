<template>
    <div>
        <b-row align-h="center">
            <b-col cols="7" class="form-group">
                <label><strong>Buscador</strong></label>
                <input type="search" class="form-control" v-model="DataBuscador" @keyup="BuscarCliente">
            </b-col>
            <b-col cols="2" class="mt-2">
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
        <b-row align-h="center" v-if="ValidarDatos == 0">
            <h4 class="text-dark">No hay Datos</h4>
        </b-row>
        <b-row v-if="ValidarDatos==1">
            <b-col cols="12" md="5" xl="3" v-for="(Listado , index) in Clientes" v-bind:key="index">
                
                <div class="card" id="CardCliente">
                    <div class="card-boody">
                        <!-- Botones solo seran visibles en movil -->
                        <b-row class="p-2">
                            <b-col cols="10">
                                <h6><strong>{{Listado.Nombres +' '+ Listado.Apellidos}}</strong></h6>
                                <small> <time>{{Listado.DecUsuario}}</time></small>
                            </b-col>
                            <b-col cols="1" class="DropBtnMovil">
                                <div>
                                    <b-dropdown id="dropdown-dropleft" dropleft variant="ligth">
                                        <div v-if="Listado.Estado == 1">
                                            <b-dropdown-item href="#">Editar</b-dropdown-item>
                                            <b-dropdown-item @click="DesabilitarCliente(Listado.IdCliente)">Desabilitar
                                            </b-dropdown-item>
                                            <b-dropdown-item href="#">Agregar Foto</b-dropdown-item>
                                        </div>
                                        <div v-if="Listado.Estado == 2">
                                            <b-dropdown-item @click="HabilitarCliente(Listado.IdCliente)">Habilitar
                                            </b-dropdown-item>
                                        </div>
                                    </b-dropdown>
                                </div>
                            </b-col>
                        </b-row>
                        <!-- Botones solo seran visibles en movil FIN-->

                        <b-row class="p-2">
                            <b-col cols="8">
                                <small> Direccion: <strong>{{Listado.Direccion}}.</strong></small>
                                <br>
                                <small> Telefono: <strong>{{Listado.Telefono}}.</strong></small>
                                <br>
                                <small> Estado: <strong>{{Listado.EstadoDec}}.</strong></small>
                            </b-col>
                            <b-col cols="4">
                                <b-avatar  size="4rem" :src="UrlImg+'VerImgCliente/'+Listado.Foto"></b-avatar>
                            </b-col>
                        </b-row><br>
                    </div>
                    <div class="card-footer p-3 ">

                        <b-row align-h="center" id="RowBtnListEmpleados">
                            <div v-if="Listado.Estado == 1">
                                <b-button pill variant="primary" class="mr-2" @click="AbrirMdEditCliente(Listado)">Editar</b-button>
                                <b-button pill variant="danger" @click="DesabilitarCliente(Listado.IdCliente)">
                                    Desabilitar
                                </b-button>
                                <b-button pill variant="dark" class="ml-2" @click="AbrirMdAgregarFoto(Listado.IdCliente)">Agregar Foto</b-button>
                            </div>
                            <div v-if="Listado.Estado == 2">
                                <b-button pill variant="danger" @click="HabilitarCliente(Listado.IdCliente)">
                                    Habilitar
                                </b-button>
                            </div>
                        </b-row>


                    </div>
                </div>
                <br>
            </b-col>

        </b-row>
       
        <!--Modales -->
        <!-- MODAL EDITAR INFO CLIENTE -->
            <b-modal id="bv-modal-edit-Cliente" size="lg" hide-footer>
            <template #modal-title>
                Editar Cliente
            </template>
            <b-row align-h="center">
                <b-col cols="5">
                    <label>Nombres</label>
                    <input class="form-control" v-model="InfoClienteEdit.NombreEdit" required>
                </b-col>
                 <b-col cols="5">
                    <label>Apellidos</label>
                    <input class="form-control" v-model="InfoClienteEdit.ApellidoEdit" required>
                </b-col>
            </b-row>
            <br>
               <b-row align-h="center">
                <b-col cols="5">
                    <label>Telefono</label>
                    <input class="form-control" v-model="InfoClienteEdit.TelefonoEdit" required>
                </b-col>
                 <b-col cols="5">
                    <label>Direccion</label>
                    <input class="form-control" v-model="InfoClienteEdit.DireccionEdit" required>
                </b-col>
            </b-row>
            <hr class="bg-dark">
            <b-row align-h="center"> 
                  <b-button  variant="danger" class="m-1" @click="$bvModal.hide('bv-modal-edit-Cliente')">Cancelar</b-button>
                <b-button  variant="primary" class="m-1" @click="EditarCliente(InfoClienteEdit)">Editar Cliente</b-button>              
            </b-row>
        </b-modal>
             <!-- Modal para agregar Foto Cliente -->
             <b-modal id="bv-modal-AgregarFt-Cliente" size="lg" hide-footer>
            <template #modal-title>
                Agregar Foto Cliente
            </template>
            <b-row align-h="center">
                <input type="hidden" v-model="IdClienteSubirFoto">
                <b-col xl="6" sm="10">
                    <label>Foto Cliente</label>
                    <input type="file" @change="FileChange()" name="file" class="form-control" ref="file" required >
                </b-col>
       
            </b-row>
            <hr class="bg-dark">
            <b-row align-h="center"> 
                  <b-button pill variant="danger" class="m-1" @click="$bvModal.hide('bv-modal-AgregarFt-Cliente')">Cancelar</b-button>
                <b-button pill variant="primary" class="m-1" @click="GuardarFoto(IdClienteSubirFoto)">Agregar Foto Usuario</b-button>              
            </b-row>
        </b-modal>
    </div>
</template>
<script>
    import axios from 'axios'
    import {
        Global
    } from '../../Global';
    export default {
        name: 'ListadoCliente',
        data() {
            return {
                DataBuscador: '',
                ValueFiltro: 0,
                Clientes: [],
                InfoClienteEdit:{
                    IdClienteEdit: '',
                    NombreEdit:'',
                    ApellidoEdit: '',
                    DireccionEdit: '',
                    TelefonoEdit: '',
                },
                // Validar datos de las peticiones
                ValidarDatos :'', 
                // Subir Foto
                file: '',
                IdClienteSubirFoto: '',
                // Listar Imagenes
                UrlImg: Global.URL
            }
        },
        mounted() {
            this.ListadoClientes();
        },
        methods: {
            ListadoClientes() {
                axios.get(Global.URL + "ListarCliente", {
                    headers: {
                        Authorization: Global.Token
                    }
                }).then(response => {
                    if (response.status == 200) {
                        if(response.data.length == 0){
                            this.ValidarDatos = 0
                        }else{
                            console.log(response);
                            this.ValidarDatos = 1
                               for (var i = 0; i < response.data.length; i++) {
                            this.Clientes.push({
                                IdCliente: response.data[i].IdCliente,
                                Nombres: response.data[i].Nombres,
                                Apellidos: response.data[i].Apellidos,
                                Direccion: response.data[i].Direccion,
                                Telefono: response.data[i].Telefono,
                                Foto: response.data[i].Foto,
                                Estado: response.data[i].Estado,
                                EstadoDec: response.data[i].EstadoDec,
                            });
                        }
                        }
                    } else {
                        alert('No se pudo realizar la peticion');
                    }
                })
            },
            DesabilitarCliente(IdCliente) {
                this.$swal.fire({
                    title: 'Estas Seguro?',
                    text: "Desabilitar Cliente!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, Desabilitarlo!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.post(Global.URL + 'DesabilitarCliente', {
                            IdCliente: IdCliente
                        }, {
                            headers: {
                                Authorization: Global.Token
                            }
                        }).then(response => {
                            if (response.status == 200) {
                                this.$emit('CambioBd', 1);
                                this.$swal.fire(
                                    'Desabilitado!',
                                    'Tu has Desabilitado a un Cliente.',
                                    'success'
                                )

                            } else {
                                alert('Algo Salio mal en la petición')
                            }
                        })
                    }

                })
            },
            HabilitarCliente(IdCliente) {
                this.$swal.fire({
                    title: 'Estas Seguro?',
                    text: "Habilitar Cliente!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, Habilitarlo!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.post(Global.URL + 'HabilitarCliente', {
                            IdCliente: IdCliente
                        }, {
                            headers: {
                                Authorization: Global.Token
                            }
                        }).then(response => {
                            if (response.status == 200) {
                                this.$emit('CambioBd', 1);
                                this.$swal.fire(
                                    'Habilitado!',
                                    'Tu has Habilitado a un Cliente.',
                                    'success'
                                )

                            } else {
                                alert('Algo Salio mal en la petición')
                            }
                        })
                    }

                })
            },
            BuscarCliente() {
                axios.post(Global.URL + "BuscarCliente", {
                    DataBuscador: this.DataBuscador
                }, {
                    headers: {
                        Authorization: Global.Token
                    }
                }).then(response => {
                    if (response.status == 200) {
                        if(response.data.length == 0){
                            this.ValidarDatos = 0
                        }else{
                            this.ValidarDatos = 1
                            this.Clientes = [];
                            for (var i = 0; i < response.data.length; i++) {
                                this.Clientes.push({
                                    IdCliente: response.data[i].IdCliente,
                                    Nombres: response.data[i].Nombres,
                                    Apellidos: response.data[i].Apellidos,
                                    Direccion: response.data[i].Direccion,
                                    Telefono: response.data[i].Telefono,
                                      Foto: response.data[i].Foto,
                                    Estado: response.data[i].Estado,
                                    EstadoDec: response.data[i].EstadoDec,
                                });
                            }
                        }
                   

                    } else {
                        alert('No se pudo realizar la peticion');
                    }
                })
            },
            // Function Buscar Filtro 
            BuscadorFiltro(){
                axios.post(Global.URL + 'BuscadorFiltro',{Estado: this.ValueFiltro},{
                    headers: {
                        Authorization: Global.Token    
                    }
                }).then(response =>{
                    if(response.status == 200){
                        if(response.data.length == 0){
                             this.ValidarDatos = 0
                        }else{
                             this.ValidarDatos = 1
                            this.Clientes = []
                            for (var i = 0; i < response.data.length; i++) {
                                this.Clientes.push({
                                    IdCliente: response.data[i].IdCliente,
                                    Nombres: response.data[i].Nombres,
                                    Apellidos: response.data[i].Apellidos,
                                    Direccion: response.data[i].Direccion,
                                    Telefono: response.data[i].Telefono,
                                      Foto: response.data[i].Foto,
                                    Estado: response.data[i].Estado,
                                    EstadoDec: response.data[i].EstadoDec,
                                });
                            }
                        }
                     
                    }else{
                        alert('No se pudo realizar la peticion');
                    }
                })
            },//Fin Buscador
            AbrirMdEditCliente(Datos){
                  this.$bvModal.show("bv-modal-edit-Cliente")
                    axios.post(Global.URL+ 'InfoEditCliente',{IdCliente: Datos.IdCliente},{
                        headers:{
                            Authorization: Global.Token
                        }
                    }).then(response => {
                        // console.log(response);
                        if(response.status == 200){
                            this.InfoClienteEdit.IdClienteEdit     =  response.data.IdCliente;
                            this.InfoClienteEdit.NombreEdit     =  response.data.Nombres;
                            this.InfoClienteEdit.ApellidoEdit   =  response.data.Apellidos;
                            this.InfoClienteEdit.DireccionEdit  =  response.data.Direccion;
                            this.InfoClienteEdit.TelefonoEdit   =  response.data.Telefono;
                        }else{
                            alert('No se puedo realizar la peticion');
                        }
                    });
            },//Fin Abri Modal Editar Cliente
            EditarCliente(DatosEdit){
                axios.post(Global.URL+ 'EditarCliente',DatosEdit,{
                    headers:{
                        Authorization: Global.Token
                    }
                }).then(response =>{
                    if(response.status == 200){
                      this.$emit('CambioBd', 1);
                        this.$swal.fire(
                            'Edicato Correctamente!',
                            'Tu has Editado a un Cliente.',
                            'success'
                        )
                    }else{
                        alert('No se pudo realizar la petición');
                    }
                })
            }, //Fin Editar Cliente
            AbrirMdAgregarFoto(Id){
                    this.IdClienteSubirFoto = Id;                    
                    this.$bvModal.show("bv-modal-AgregarFt-Cliente");
            }, //Fin Abrir Modal Agregar Foto
            FileChange(){
                this.file = this.$refs.file.files[0];
            },//Fin File Change
            GuardarFoto(IdClienteSubirFoto){              
                const formData = new FormData();
                formData.append('Foto', this.file, this.file.name);               
                axios.post(Global.URL+ 'SubirFotoCliente/'+IdClienteSubirFoto,formData,{
                    headers:{
                        Authorization: Global.Token
                    }
                }).then(response =>{
                   if(response.status == 200){
                        this.NombreImagen =  response.data
                        this.$emit('CambioBd', 1);
                        this.$swal.fire(
                            'Agregada Correctamente',
                            'Se ha Asignado una foto al Cliente',
                            'success'
                        )
                   }else{
                       alert('No se puedo realizar la petición');
                   }
                }).catch(error =>{
                    console.log(error);
                });
               
            },//Fin Guardar Foto
         
        }

    }
</script>