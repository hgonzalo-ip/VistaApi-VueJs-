<template>
    <div>
        <b-container fluid>
            <b-row align-h="end" class="mr-5  mt-4">
                <frm-crear-categoria  :key="CambioBdCate" @CambioBdCate="CambioBd()"></frm-crear-categoria>
            </b-row>
            <b-row align-h="center">
                <h4 class="text-light"><strong>Categorias Productos</strong></h4>
            </b-row>
            <listado-categorias :key="CambioBdCate" @CambioBdCate="CambioBd()"></listado-categorias>
        </b-container>
    </div>
</template>
<script>
import FrmCrearCategoria from '../components/CategoriaProductos/FrmCrearCategoria.vue'
import ListadoCategorias from '../components/CategoriaProductos/ListadoCategorias.vue'
export default {
  components: { FrmCrearCategoria, ListadoCategorias },
    name: 'CategoriasProductos',
    data(){
        return{
            CambioBdCate : 0
        }
    },
    methods:{
        CambioBd(){
            this.CambioBdCate ++
        }
    }
}
</script>