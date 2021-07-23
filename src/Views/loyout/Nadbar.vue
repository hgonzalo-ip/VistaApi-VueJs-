<template>
  <div>

    <b-sidebar id="Sidebar" aria-labelledby="sidebar-no-header-title" no-header backdrop shadow>
      <div class="px-3 " id="DvSidebar">
        <b-row align-h="center">
          <img src="../../assets/Img/Logo.png" alt="" width="50%">
        </b-row>
        <b-row align-h="center">
          <h4 class="text-white">Menú</h4>
        </b-row>
        <b-nav vertical id="NavVerti">
          <b-list-group>
            <b-list-group-item class="ListGroup" to="/" v-if="IdTipoUser == 1">
              <h4><i class="fas fa-home mr-2"></i><small>Inicio</small></h4>
            </b-list-group-item>
            <!-- Citas -->
            <b-list-group-item v-b-toggle.collapse-citas class="ListGroup" v-if="this.IdTipoUser == 1">
              <h4> <i class="fas fa-procedures mr-2"></i><small>Citas</small></h4>
            </b-list-group-item>
            <b-collapse id="collapse-citas" class="ml-3 w-100" v-if="this.IdTipoUser == 1">
              <b-nav-item to="/Citas">
                <h5 class="SubMenus">Generar Cita</h5>
              </b-nav-item>
              <b-nav-item to="/ListadoCitas">
                <h5 class="SubMenus">Listado Citas</h5>
              </b-nav-item>
            </b-collapse>
            <!-- Items Ventas-->
            <b-list-group-item v-b-toggle.collapse-Ventas class="ListGroup" v-if="this.IdTipoUser == 1 || this.IdTipoUser == 2">
              <h4> <i class="fas fa-cart-plus mr-2"></i><small>Ventas</small></h4>
            </b-list-group-item>
            <b-collapse id="collapse-Ventas" class="ml-3 w-100" v-if="this.IdTipoUser == 1 || this.IdTipoUser == 2">
              <b-nav-item to="/Ventas">
                <h5 class="SubMenus">Generar Venta</h5>
              </b-nav-item>
              <b-nav-item to="/ListadoVentas">
                <h5 class="SubMenus">Listado Ventas</h5>
              </b-nav-item>
            </b-collapse>

            <!-- Items Compras -->

            <b-list-group-item v-b-toggle.collapse-Compras class="ListGroup" v-if="this.IdTipoUser == 1">
              <h4> <i class="fas fa-shopping-bag mr-2"></i><small>Compras</small></h4>
            </b-list-group-item>
            <b-collapse id="collapse-Compras" class="ml-4">
              <b-nav-item href="#link-1" to="/GenerarCompra">
                <h5 class="SubMenus">Generar Compra</h5>
              </b-nav-item>
              <b-nav-item href="#link-2" to="/ListadoCompras">
                <h5 class="SubMenus">Listado Compras</h5>
              </b-nav-item>
            </b-collapse>
            <!-- Productos -->
            <b-list-group-item v-b-toggle.collapse-Productos class="ListGroup" v-if="this.IdTipoUser == 1">
              <h4> <i class="fab fa-product-hunt mr-2"></i><small>Productos</small></h4>
            </b-list-group-item>
            <b-collapse id="collapse-Productos" class="ml-4">
              <b-nav-item href="#link-1" to="/Productos">
                <h5 class="SubMenus">Productos</h5>
              </b-nav-item>
              <b-nav-item href="#link-2" to="/Servicios">
                <h5 class="SubMenus">Servicios</h5>
              </b-nav-item>
              <b-nav-item href="#link-2" to="/CategoriasProductos">
                <h5 class="SubMenus">Categorias Producto</h5>
              </b-nav-item>
            </b-collapse>
            <!-- Proveedores -->
            <b-list-group-item class="ListGroup" to="/Proveedores" v-if="this.IdTipoUser == 1">
              <h4> <i class="fas fa-people-carry mr-2"></i><small>Proveedores</small></h4>
            </b-list-group-item>
            <!-- Clientes -->
            <b-list-group-item class="ListGroup" to="/Clientes" v-if="this.IdTipoUser == 1">
              <h4> <i class="fas fa-restroom mr-2"></i><small>Clientes</small></h4>
            </b-list-group-item>
            <!-- Empleados -->
            <b-list-group-item class="ListGroup" to="/Empleados" v-if="this.IdTipoUser == 1">
              <h4> <i class="fas fa-address-card mr-2"></i><small>Empleados</small></h4>
            </b-list-group-item>
            <b-list-group-item class="ListGroup" to="/Sucursales" v-if="this.IdTipoUser == 1">
              <h4> <i class="fas fa-address-card mr-2"></i><small>Sucursales</small></h4>
            </b-list-group-item>
          </b-list-group>

        </b-nav>


      </div>
    </b-sidebar>

  </div>
</template>
<script>

import { Global } from '../../Global';

  export default {
    name: 'Nabvar',
    data() {
      return {
        Titulo: 'Menú',
        IdTipoUser : Global.IdTipoUser
      }
    }
  }
    
</script>