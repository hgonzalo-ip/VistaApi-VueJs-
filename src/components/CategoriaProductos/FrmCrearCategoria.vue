<template>
    <div>
        <b-button v-b-modal.modal-prevent-closing class="mr-4"> <i class="fas fa-plus"></i></b-button>
        <b-modal id="modal-prevent-closing" title="Crear Nueva Categoria" ok-title="Crea Categoria" 
             @ok="CrearCategoria" cancel-variant="danger" cancel-title="Cancelar" size="lg">
            <form @submit.stop.prevent class="was-validated">
                <b-row align-h="center">
                    <b-col cols="12" xl="6" md="6">
                        <label>Categoria</label>
                        <input class="form-control" v-model="NombreCategoria" required>
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
import { Global } from '../../Global';
    export default {
        name: 'FrmCrearCategoriaProducto',
        data() {
            return {
                NombreCategoria: '',
                ValidarCategoria: '',
            }
        },
        methods: {
            CrearCategoria(bvModalEvt) {
                  bvModalEvt.preventDefault();
                if (this.NombreCategoria == '') {
                    this.ValidarCategoria = 0;                
                    return false;
                } else {
                    this.ValidarCategoria = 1;
                   axios.post(Global.URL+'CrearCategoria',{NombreCategoria: this.NombreCategoria},{
                       headers:{
                             Authorization: Global.Token
                       }
                   }).then(response =>{
                       if(response.status == 200){
                            this.$emit('CambioBdCate', 1);
                           this.$swal.fire(
                               'Creada Correctamente',
                               'Categoria Creada : '+response.data.Descripcion,
                               'success'
                           )
                           this.NombreCategoria = '';
                           this.$bvModal.hide('modal-prevent-closing');
                       }
                   })
                }
            }
        }
    }
</script>