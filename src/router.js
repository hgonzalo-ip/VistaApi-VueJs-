import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)

import NotFound from './Views/NotFound';
import Login from './Views/Login';
import Logout from './Views/Logout';
import Dashboard from './Views/Dashboard';
// Vistas Index 
import Empleados from './Views/Empleados';
import Proveedores from './Views/Proveedores';
import CategoriasProductos from './Views/CategoriasProductos';
import Clientes     from './Views/Clientes';
import Productos from './Views/Productos'
import Servicios from './Views/Servicios';
// Vistas De compras
import GenerarCompra from './Views/GenerarCompra';
    // Listado Compras 
import ListadoCompras from './Views/ListadoCompras';
// Venas
import Ventas from './Views/Ventas.vue';
import ListadoVentas from './Views/ListadoVentas.vue';
// Citas
import Citas from './Views/GenerarCita.vue';
import ListadoCitas from './Views/ListadoCitas.vue';
// Sucursales 
import Sucursales from './Views/Sucursales.vue';



// Routas 

const router = new VueRouter({
    
    mode: 'history',
    linkActiveClass: 'is-active',
    
        routes:[
            {               
                path : '/Login',
                name : 'Login',
                component : Login
                
            },
            {
                path : '/Logout',
                name : 'Logout',
                component : Logout,
                meta : {
                    requiredAuth : true
                    
                } 
            },
            {
                path : '/Dashboard',
                name : 'Dashboard',
                component : Dashboard,
                meta: {
                    requiredAuth : true 
                    
                }
            },
            {
                path : '/',
              
                component : Dashboard,
                meta : {
                    requiredAuth : true
                    
                } 
            },
            {
                path : '/404',
                name : '404',
                component : NotFound,
    
            },
            {
                path: '*',
                redirect : '/404'
            },
            // Vistas Index
            {
                path : '/Proveedores',
                name: 'Providers',
                component: Proveedores,
                meta : {
                    requiredAuth : true
                }
            },
            {
                path : '/Empleados',
                name: 'Empleados',
                component: Empleados,
                meta : {
                    requiredAuth : true,                    
                }
            },
            {
                path : '/Clientes',
                name: 'Clientes',
                component: Clientes,
                meta : {
                    requiredAuth : true
                } 
            },
            {
                path : '/Productos',
                name: 'Productos',
                component: Productos,
                meta : {
                    requiredAuth : true
                }
            },
            {
                path : '/Servicios',
                name: 'Servicios',
                component: Servicios,
                meta : {
                    requiredAuth : true
                } 
            },
            {
                path : '/CategoriasProductos',
                name: 'CategoriasProductos',
                component: CategoriasProductos,
                meta : {
                    requiredAuth : true
                }
            },
            {
                path : '/GenerarCompra',
                name: 'GenerarCompra',
                component: GenerarCompra,
                meta : {
                    requiredAuth : true
                }
            },
            {
                path : '/ListadoCompras',
                name: 'ListadoCompras',
                component: ListadoCompras,
                meta : {
                    requiredAuth : true
                } 
            },
            // Ventas
            {
                path : '/Ventas',
                name: 'Ventas',
                component: Ventas,
                meta : {
                    requiredAuth : true
                } 
            },
            {
                path : '/ListadoVentas',
                name: 'ListadoVentas',
                component: ListadoVentas,
                meta : {
                    requiredAuth : true
                } 
            },
            {
                path:'/Citas',
                name : 'Citas',
                component: Citas,
                meta:{
                    requiredAuth : true
                }
            },
            {
                path:'/ListadoCitas',
                name : 'ListadoCitas',
                component: ListadoCitas,
                meta:{
                    requiredAuth : true
                }
            },
            {
                path:'/Sucursales',
                name : 'Sucursales',
                component: Sucursales,
                meta:{
                    requiredAuth : true
                }
            }
            
        ]
    
  

    

});

// router.beforeEach((to, from) => {
//    console.log(to);
//    console.log(from);

//    if(localStorage.getItem("IdTipoUser") == 2){
    
//        if(to.path === '/Ventas'){
         
//        }
//    }
// });
export default router;