<template>
    <div>
        <b-row align-h="center">
            <b-col cols="12" sm="6" class="form-group">
                <label><strong>Buscador</strong></label>
                <input type="search" class="form-control" v-model="DataBuscador" @keydown="BuscarEmpleado">
            </b-col>
           <b-col cols="2" class="mt-2">
                <label></label>
                <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1"><i class="fas fa-filter"></i></span>
                </div>               
                 <b-form-select v-model="SltIdSucursal" required @change="FiltrarPorSucursal(SltIdSucursal)">
                       
                        <b-form-select-option :value="0">Todos</b-form-select-option>
                        <b-form-select-option v-for="(Listado ,index) in Sucursales" v-bind:key="index"
                            :value="Listado.IdSucursal">
                            {{Listado.NombreSucursal}}
                        </b-form-select-option>
                    </b-form-select>
                </div>
            </b-col>
        </b-row>
        <br>
         <b-row align-h="center" v-if="ValidarDatos==0">
             <h4 class="text-dark">No hay datos</h4>
        </b-row>
        <b-row v-if="ValidarDatos == 1">

            <b-col cols="12" sm="3" v-for="(Listado , index) in Empleado" v-bind:key="index">
                <div class="card" id="CardEmpleado">
                    <div class="card-body">
                        <!-- Botones solo seran visibles en movil -->
                        <b-row>
                            <b-col cols="10">
                                <h6><strong>{{Listado.NombreEmpleado +' '+ Listado.Apellido}}</strong></h6>
                                <small> <time>{{Listado.DecUsuario}}</time></small>
                            </b-col>
                            <b-col cols="1" class="DropBtnMovil">
                                <div>
                                    <b-dropdown id="dropdown-dropleft" dropleft variant="ligth">
                                        <div v-if="Listado.Estado == 1">
                                             <b-dropdown-item @click="AbrirModal(Listado)">Datos Empleado</b-dropdown-item>
                                            <b-dropdown-item @click="AbrirModalUser(Listado.IdUsuario)">Datos Usuario</b-dropdown-item>
                                            <b-dropdown-item @click="EliminarEmpleado(Listado.IdEmpleado)">Eliminar
                                            </b-dropdown-item>
                                            <b-dropdown-item href="#">Agregar Foto</b-dropdown-item>
                                        </div>
                                        <div v-if="Listado.Estado == 2">
                                            <b-dropdown-item @click="HabilitarEmpleado(Listado.IdEmpleado)">Habilitar
                                            </b-dropdown-item>
                                        </div>
                                    </b-dropdown>
                                </div>
                            </b-col>
                        </b-row>
                        <!-- Botones solo seran visibles en movil FIN-->

                        <b-row>
                            <b-col cols="8">
                                <small> Direccion: <strong>{{Listado.Direccion}}.</strong></small>
                                <br>
                                <small> Telefono: <strong>{{Listado.Telefono}}.</strong></small>
                                <br>
                                <small> Sucursal: <strong>{{Listado.NombreSucursal}}.</strong></small>
                               
                                
                                <br>
                                <small> Estado: <strong>{{Listado.DescEstado}}.</strong></small>

                            </b-col>
                            <b-col cols="4">
                                <b-avatar  size="4rem" :src="UrlImg+'VerImgEmpleado/'+Listado.Foto"></b-avatar>
                            </b-col>
                        </b-row><br>
                    </div>
                    <div class="card-footer">
                        <b-row align-h="center" id="RowBtnListEmpleados" v-if="Listado.Estado == 1">

                            <b-dropdown right pill text="Editar" variant="primary" class="mr-2 rounded-rounded-pill">
                                <b-dropdown-item @click="AbrirModal(Listado)">Datos Empleado</b-dropdown-item>
                                <b-dropdown-item @click="AbrirModalUser(Listado.IdUsuario)">Datos Usuario</b-dropdown-item>

                            </b-dropdown>


                            <b-button variant="danger" @click="EliminarEmpleado(Listado.IdEmpleado)">Eliminar
                            </b-button>
                            <b-button v-b-modal.Modal-1 class="ml-2" @click="AbrirMdAgregarFoto(Listado.IdEmpleado)">Agregar Foto</b-button>

                        </b-row>
                        <!-- El Estado 2 hace referencia que el Empleado esta desabilitado -->
                        <b-row align-h="center" id="RowBtnListEmpleados" v-if="Listado.Estado == 2">
                            <b-button pill variant="success" @click="HabilitarEmpleado(Listado.IdEmpleado)">Habilitar
                                Empleado
                            </b-button>
                        </b-row>
                    </div>
                </div>
            </b-col>

        </b-row>
        <!-- Modales  -->
        <!-- Modal Editar Empleado -->
        <b-modal id="bv-modal-edit" size="lg" hide-footer>
            <template #modal-title>
                Editar
            </template>
            <!-- CODIGO DEL BODY -->
            <h6>---Datos Empleado</h6>
            <b-row align-h="center">
                <b-col xl="6" sm="8">
                    <label>Sucursal</label>
                    <b-form-select v-model="EmpleadoEdit.IdSucursal" required>
                        <b-form-select-option :value="null">Eliga una Sucursal</b-form-select-option>
                        <b-form-select-option v-for="(Listado ,index) in Sucursales" v-bind:key="index"
                            :value="Listado.IdSucursal">
                            {{Listado.NombreSucursal}}
                        </b-form-select-option>
                    </b-form-select>
                </b-col>
            </b-row><br>
            <b-row align-h="center">
                <b-col xl="4" sm="10">
                    <label>Nombre</label>
                    <input type="text" class="form-control" v-model="EmpleadoEdit.NombreEmpleado">
                </b-col>
                <b-col xl="4" sm="10">
                    <label>Apellido</label>
                    <input type="text" class="form-control" v-model="EmpleadoEdit.Apellido">
                </b-col>
                <b-col xl="4" sm="10">
                    <label>Direccion</label>
                    <input type="text" class="form-control" v-model="EmpleadoEdit.Direccion">
                </b-col>
            </b-row><br>
            <b-row align-h="center">
                <b-col xl="4" sm="10">
                    <label>Telefono</label>
                    <input type="text" class="form-control" v-model="EmpleadoEdit.Telefono">
                </b-col>
            </b-row>

            <!-- CODIGO DEL FOOTER -->
            <hr class="bg-secondary">
            <b-row align-h="center">
                <b-button pill variant="primary" class="m-1" @click="EditarEmpleado(EmpleadoEdit)">Editar Empleado</b-button>
                <b-button pill variant="danger" class="m-1" @click="Cancelar()">Cancelar</b-button>
            </b-row>
        </b-modal>
        <!-- Fin Modal Editar Empleado -->
        <!-- Modal Editar Usuario -->
        <b-modal id="bv-modal-edit-User" size="lg" hide-footer>
            <template #modal-title>
                Editar Usuario
            </template>
            <b-row align-h="center">
                <b-col xl="4" sm="10">
                     <label for="TipoUsuario">Tipo de Usuario</label>
                        <b-form-select v-model="UsuarioEdit.IdTipoUsuario" required>
                            <b-form-select-option :value="null">Eliga un tipo de usuario</b-form-select-option>
                            <b-form-select-option v-for="(Listado ,index) in TipoUsuario" v-bind:key="index"
                                :value="Listado.IdTipo">
                                {{Listado.Descripcion}}
                            </b-form-select-option>
                        </b-form-select>
                </b-col>
                <b-col xl="4" sm="10">
                    <label>Correo</label>
                    <input type="email" class="form-control" required v-model="UsuarioEdit.Correo">
                </b-col>
                <b-col xl="4" sm="10">
                    <label>Nueva Contraseña</label>
                    <input type="password" class="form-control" v-model="UsuarioEdit.PasswordNew">
                </b-col>
            </b-row>
            <hr class="bg-dark">
            <b-row align-h="center"> 
                  <b-button pill variant="danger" class="m-1" @click="CancelarEditUsuario()">Cancelar</b-button>
                <b-button pill variant="primary" class="m-1" @click="EditarUsuario(UsuarioEdit)">Editar Usuario</b-button>              
            </b-row>
        </b-modal>
        <!-- Modal para agregar Foto Empleado -->
             <b-modal id="bv-modal-AgregarFt-Empleado" size="lg" hide-footer>
            <template #modal-title>
                Agregar Foto Empleado
            </template>
            <b-row align-h="center">
                <input type="hidden" v-model="IdEmpleadoSubirFoto">
                <b-col xl="6" sm="10">
                    <label>Foto Empleado</label>
                    <input type="file" @change="FileChange()" name="file" class="form-control" ref="file" required >
                </b-col>
       
            </b-row>
            <hr class="bg-dark">
            <b-row align-h="center"> 
                  <b-button pill variant="danger" class="m-1" @click="$bvModal.hide('bv-modal-AgregarFt-Empleado')">Cancelar</b-button>
                <b-button pill variant="primary" class="m-1" @click="GuardarFoto(IdEmpleadoSubirFoto)">Agregar Foto Usuario</b-button>              
            </b-row>
        </b-modal>
    
        <!-- Modal para agregar Foto Empleado -->
             <b-modal id="bv-modal-AgregarFt-Empleado" size="lg" hide-footer>
            <template #modal-title>
                Agregar Foto Empleado
            </template>
            <b-row align-h="center">
                <input type="hidden" v-model="IdEmpleadoSubirFoto">
                <b-col xl="6" sm="10">
                    <label>Foto Empleado</label>
                    <input type="file" @change="FileChange()" name="file" class="form-control" ref="file" required >
                </b-col>
       
            </b-row>
            <hr class="bg-dark">
            <b-row align-h="center"> 
                  <b-button pill variant="danger" class="m-1" @click="$bvModal.hide('bv-modal-AgregarFt-Empleado')">Cancelar</b-button>
                <b-button pill variant="primary" class="m-1" @click="GuardarFoto(IdEmpleadoSubirFoto)">Agregar Foto Usuario</b-button>              
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

        name: 'ListadoEmpleado',
        data() {
            return {

                SltSucursal: null,
                DataBuscador: '',
                Empleado: [],
                ValidarDatos :'',                
                EmpleadoEdit: {
                    IdEmpleado: '',
                    IdSucursal: '',
                    NombreEmpleado: '',
                    Apellido: '',
                    DataIdEmpleado: '',
                    Direccion: '',
                    Telefono: ''
                },
                UsuarioEdit:{
                    IdUsuario: '',
                    IdTipoUsuario: '',
                    Correo: '',
                    PasswordNew: ''
                },
                // 
             
                Sucursales: [],
                TipoUsuario: [],
                // Filtrado
                SltIdSucursal: 0,
                // Variables para subir Foto 
                IdEmpleadoSubirFoto: '' ,
                file: '',
                NombreImagen: '',
                // Ver Foto
                UrlImg : Global.URL
            }
        },
        mounted() {
            this.ListadoEmpleado();
            this.ListSucurSelc();
            this.ListTipoUsuario();
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
            },
            ListadoEmpleado() {
                axios.get(Global.URL + "ListarEmpleados", {
                    headers: {
                        Authorization: Global.Token
                    }
                }).then(response => {
                    if (response.status == 200) {
                        if(response.data.length == 0){
                            this.ValidarDatos = 0;
                        }else{
                             this.ValidarDatos = 1;
                               console.log(response);
                        for (var i = 0; i < response.data.length; i++) {
                            
                            this.Empleado.push({
                                IdEmpleado: response.data[i].IdEmpleado,
                                IdUsuario: response.data[i].IdUsuario,
                                NombreEmpleado: response.data[i].NombreEmpleado,
                                Apellido: response.data[i].Apellido,
                                Direccion: response.data[i].Direccion,
                                Telefono: response.data[i].Telefono,
                                DecUsuario: response.data[i].DecUsuario,
                                Foto : response.data[i].Foto,
                                NombreSucursal: response.data[i].NombreSucursal,
                                Estado: response.data[i].Estado,
                                DescEstado: response.data[i].DescEstado,
                            });
                        }
                        }

                    } else {
                        alert('No se pudo realizar la peticion');
                    }
                })
            },
            BuscarEmpleado() {
                axios.post(Global.URL + "BuscarEmpleado", {
                    DataBuscador: this.DataBuscador
                }, {
                    headers: {
                        Authorization: Global.Token
                    }
                }).then(response => {
                    if (response.status == 200) {
                        if(response.data.length == 0){
                            this.ValidarDatos = 0; 
                        }else{
                            this.ValidarDatos = 1; 
                            this.Empleado = []                        
                            for (var i = 0; i < response.data.length; i++) {
                                this.Empleado.push({
                                    IdEmpleado: response.data[i].IdEmpleado,
                                    IdUsuario: response.data[i].IdUsuario,
                                    NombreEmpleado: response.data[i].NombreEmpleado,
                                    Apellido: response.data[i].Apellido,
                                    Direccion: response.data[i].Direccion,
                                    Telefono: response.data[i].Telefono,
                                    Foto : response.data[i].Foto,
                                    DecUsuario: response.data[i].DecUsuario,
                                    NombreSucursal: response.data[i].NombreSucursal,
                                    Estado: response.data[i].Estado,
                                    DescEstado: response.data[i].DescEstado,
                                });
                            }
                        }
                   

                    } else {
                        alert('No se pudo realizar la peticion');
                    }
                })
            },
            // Funcion Desabilitar Empleado 
            EliminarEmpleado(IdEmpleado) {
                this.$swal.fire({
                    title: 'Estas Seguro?',
                    text: "Desabilitar Empleado!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, Desabilitarlo!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.post(Global.URL + 'DesabilitarEmpleado', {
                            IdEmpleado: IdEmpleado
                        }, {
                            headers: {
                                Authorization: Global.Token
                            }
                        }).then(response => {
                            if (response.status == 200) {
                                this.$emit('CambioBdEmpleado', 1);
                                this.$swal.fire(
                                    'Desabilitado!',
                                    'Tu has Desabilitado a un Empleado.',
                                    'success'
                                )

                            } else {
                                alert('Algo Salio mal en la petición')
                            }
                        })
                    }

                })
            },
            HabilitarEmpleado(IdEmpleado) {

                this.$swal.fire({
                    title: 'Estas Seguro?',
                    text: "Habilitar Empleado!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, Habilitar!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.post(Global.URL + 'HabilitarEmpleado', {
                            IdEmpleado: IdEmpleado
                        }, {
                            headers: {
                                Authorization: Global.Token
                            }
                        }).then(response => {
                            if (response.status == 200) {
                                this.$emit('CambioBdEmpleado', 1);
                                this.$swal.fire(
                                    'Habilitado!',
                                    'Tu has Habilitado a un Empleado.',
                                    'success'
                                )

                            } else {
                                alert('Algo Salio mal en la petición')
                            }
                        })
                    }

                })

            }, //Fin Habilitar
            AbrirModal(DatosEdit) {
                
                this.$bvModal.show("bv-modal-edit")
                axios.post(Global.URL + "ListEmpleadoEdit", {
                    IdEmpleado: DatosEdit.IdEmpleado
                }, {
                    headers: {
                        Authorization: Global.Token
                    }
                }).then(response => {
                    if (response.status == 200) {
                        console.log(response);
                        this.EmpleadoEdit.IdEmpleado = response.data[0].IdEmpleado,
                            this.EmpleadoEdit.IdSucursal = response.data[0].IdSucursal,
                            this.EmpleadoEdit.NombreEmpleado = response.data[0].Nombre,
                            this.EmpleadoEdit.Apellido = response.data[0].Apellido,
                            this.EmpleadoEdit.Direccion = response.data[0].Direccion,
                            this.EmpleadoEdit.Telefono = response.data[0].Telefono,
                            this.EmpleadoEdit.DecUsuario = response.data[0].DecUsuario,
                            this.EmpleadoEdit.NombreSucursal = response.data[0].NombreSucursal,
                            this.EmpleadoEdit.Estado = response.data[0].Estado
                    } else {
                        alert('No se pudo realizar la peticion');
                    }
                })
            },
            // Cancelar 
            Cancelar() {
                this.$bvModal.hide("bv-modal-edit")
            },
            EditarEmpleado(Datos){
                axios.post(Global.URL + 'EditarEmpleado',Datos,{
                    headers:{
                        Authorization: Global.Token
                    }
                }).then(response => {
                    if(response.status == 200){
                        this.$emit('CambioBdEmpleado', 1);
                        this.$swal.fire(
                            'Editado Correctamente',
                            'La Información del Empleado fue Editada',
                            'success'
                        )
                    }
                });
                console.log(Datos);
            },//Fin Editar Empleado
            AbrirModalUser(IdUsuario){
                 this.$bvModal.show("bv-modal-edit-User");
                 axios.post(Global.URL+ 'InfoEditUsuario',{IdUsuario: IdUsuario},{
                         headers:{
                             Authorization: Global.Token
                         }                    
                 }).then(response => {
                  
                     if(response.status == 200){                            
                            this.UsuarioEdit.IdUsuario = response.data.IdUsuario,
                            this.UsuarioEdit.IdTipoUsuario = response.data.IdTipoUsuario,
                            this.UsuarioEdit.Correo =response.data.email                          
                     }
                 });
            },//fIN Modal Editar Usuario
              ListTipoUsuario() {
                    // const tok = localStorage.getItem('access_token');
                axios.get(Global.URL +'ListTipoUsuario', {
                    headers: {
                          Authorization: Global.Token
                    }
                }).then(response => {
                    if (response.status == 200) {

                        for (var i = 0; i < response.data.length; i++) {
                            this.TipoUsuario.push({
                                IdTipo: response.data[i].IdTipoUsuario,
                                Descripcion: response.data[i].Descripcion,
                            });


                        }

                    } else {
                        alert('No se puedo realizar la petición');
                    }
                })
            },   //Listado Tipo Usuario
            CancelarEditUsuario(){
                 this.$bvModal.hide("bv-modal-edit-User");
            },//Fin Cancelar Editar Usuario
            EditarUsuario(Usuario){
                axios.post(Global.URL+ 'EditarUsuario',Usuario,{
                    headers:{
                        Authorization: Global.Token
                    }
                }).then(response =>{
                    if(response.status == 200){
                       this.$emit('CambioBdEmpleado', 1);
                        this.$swal.fire(
                            'Editado Correctamente',
                            'La Información del Usuario fue Editada',
                            'success'
                        )
                    }
                });
            },//Fin Editar Empleado

                    // Filtrado 
            FiltrarPorSucursal(IdSucursal){
                axios.post(Global.URL+ 'FiltroPorSucursal',{IdSucursal: IdSucursal},{
                    headers:{
                        Authorization: Global.Token
                    }
                }).then(response =>{
                    if(response.status == 201){
                        if(response.data.length == 0){
                            this.ValidarDatos = 0;
                        }else{
                            this.Empleado = [];
                            this.ValidarDatos = 1;
                            for (var i = 0; i < response.data.length; i++) {
                                this.Empleado.push({
                                    IdEmpleado: response.data[i].IdEmpleado,
                                    IdUsuario: response.data[i].IdUsuario,
                                    NombreEmpleado: response.data[i].NombreEmpleado,
                                    Apellido: response.data[i].Apellido,
                                    Direccion: response.data[i].Direccion,
                                    Telefono: response.data[i].Telefono,
                                    DecUsuario: response.data[i].DecUsuario,
                                    Foto : response.data[i].Foto,
                                    NombreSucursal: response.data[i].NombreSucursal,
                                    Estado: response.data[i].Estado,
                                    DescEstado: response.data[i].DescEstado,
                                });
                            }
                        }
                    }else if(response.status == 404){
                        alert('No se pudo Realizar la peticion');
                    }
                });                                             
             
            }, //Fin Filtro Por Sucursales
            AbrirMdAgregarFoto(Id){
                    this.IdEmpleadoSubirFoto = Id;                    
                    this.$bvModal.show("bv-modal-AgregarFt-Empleado");
            }, //Fin Abrir Modal Agregar Foto
            FileChange(){
                this.file = this.$refs.file.files[0];

            },//Fin File Change
            GuardarFoto(IdEmpleadoSubirFoto){
              
                const formData = new FormData();
                formData.append('Foto', this.file, this.file.name);
               
                axios.post(Global.URL+ 'SubirFotoEmpleado/'+IdEmpleadoSubirFoto,formData,{
                    headers:{
                        Authorization: Global.Token
                    }
                }).then(response =>{
                   if(response.status == 200){
                        this.NombreImagen =  response.data
                        this.$emit('CambioBdEmpleado', 1);
                        this.$swal.fire(
                            'Agregada Correctamente',
                            'Se ha Asignado una foto al Empleado',
                            'success'
                        )
                   }else{
                       alert('No se puedo realizar la petición');
                   }
                }).catch(error =>{
                    console.log(error);
                });
                // console.log(formData);
            },//Fin Guardar Foto

        }//Fin Metodos  

    }
</script>