<template>
  <div><br>
    <b-container fluid class="shadow-lg p-5 mb-5 rounded" style="width: 99%;">
      <b-row align-h="center">
        <h3><strong>Agenda</strong></h3>
      </b-row>
      <b-row align-h="center">
        <b-col cols="12" xl="4" md="4">
          <label><strong>Sucursal</strong></label>
          <select v-model="SltSucursal" class="form-control" @change="VerDatosCard()">
            <option :value="null" :disabled="true">Elige una sucursal</option>
            <option v-for="(Listado, index) in Sucursales" v-bind:key="index" :value="Listado.IdSucursal">
              {{Listado.NombreSucursal}}
            </option>
          </select>
        </b-col>
      </b-row>
      <hr style="width: 50%; zise: 2em;">
      <b-row align-h="center" v-if="DatosVista == 1">

        <b-col cols="12" xl="3" md="5" class="Col-Dashboard">
          <div class="card">
            <div class="card-body">
              <b-row align-h="center">
                <i class="fas fa-money-bill-alt fa-3x text-success text-center"></i>
              </b-row>
              <b-row align-h="center" class="pt-2">
                <h6 class="text-center"><strong>COMPRAS</strong></h6>
              </b-row>
            </div>
            <div class="card-footer">
              <h5 class="text-center">Q.<strong>{{TotalCompras.toFixed(2)}}</strong></h5>
            </div>
          </div>

        </b-col>

        <!-- fIN Compras -->
        <b-col cols="12" xl="3" md="5" class="Col-Dashboard">
          <div class="card">
            <div class="card-body">
              <b-row align-h="center">
                <i class="fas fa-hand-holding-usd fa-3x text-danger"></i>
              </b-row>
              <b-row align-h="center" class="pt-2">
                <h6 class="text-center"><strong>VENTAS</strong></h6>
              </b-row>
            </div>
            <div class="card-footer">
              <h5 class="text-center">Q.<strong>{{TotalVentas.toFixed(2)}}</strong></h5>
            </div>
          </div>
        </b-col>
        <!-- Fin Ventas -->
        <b-col cols="12" xl="3" md="5" class="Col-Dashboard">
          <div class="card">
            <div class="card-body">
              <b-row align-h="center">
                <i class="fas fa-dollar-sign fa-3x text-success"></i>
              </b-row>
              <b-row align-h="center" class="pt-2">
                <h6 class="text-center"><strong>Ganancias</strong></h6>
              </b-row>
            </div>
            <div class="card-footer">
              <h5 class="text-center">Q.<strong>{{Ganancias.toFixed(2)}}</strong></h5>
            </div>
          </div>
        </b-col>
        <!-- Fin Ganancias -->
        <b-col cols="12" xl="3" md="5" class="Col-Dashboard">
          <div class="card" @click="IrACitas">
            <div class="card-body">
              <b-row align-h="center">
                <i class="far fa-calendar-alt fa-3x text-primary"></i>
              </b-row>
              <b-row align-h="center" class="pt-2">
                <h6 class="text-center"><strong>Citas Pendientes</strong></h6>
              </b-row>
            </div>
            <div class="card-footer">
              <h5 class="text-center"><strong>{{TotalCitasPendiente}}</strong></h5>
            </div>
          </div>
        </b-col>
        <!-- Fin Citas Pendientes -->
        <b-col cols="12" xl="3" md="5" class="Col-Dashboard">
          <div class="card" @click="IrACitas">
            <div class="card-body">
              <b-row align-h="center">
                <i class="fas fa-calendar-check fa-3x text-success"></i>
              </b-row>
              <b-row align-h="center" class="pt-2">
                <h6 class="text-center"><strong>Citas Finalizadas</strong></h6>
              </b-row>
            </div>
            <div class="card-footer">
              <h5 class="text-center"><strong>{{TotalCitasFinalizadas}}</strong></h5>
            </div>
          </div>
        </b-col>

      </b-row>
    </b-container>
  </div>
</template>
<script>
  import axios from 'axios'
  import {
    Global
  } from '../Global'

  export default {
    name: 'Dashboard',
    data() {
      return {
        TotalVentas: 0,
        TotalCompras: 0,
        Ganancias: '',
        TotalCitasPendiente: 0,
        TotalCitasFinalizadas: 0,
        SltSucursal: 'null',
        Sucursales: [],
        DatosVista: ''
      }
    },
    mounted() {
      this.ListSucurSelc();

    },
    methods: {
      VerDatosCard(){
        this.TotalVentas = 0;
        this.TotalCompras = 0;
        this.Ganancias = 0;
        this.TotalCitasPendiente = 0;
        this.TotalCitasFinalizadas = 0;
      this.UltimasVentasMes();
      this.UltimasComprasMes();
      this.CitasPendientesDia();
      this.CitasFinalizadasDia();
      this.DatosVista = 1;
      },
      ListSucurSelc() {
        // const tok = localStorage.getItem('access_token');
        axios.get(Global.URL + 'ListarTodasSucursales', {
          headers: {
            Authorization: Global.Token
          }
        }).then(response => {
          if (response.status == 200) {
            // console.log(response);
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
      UltimasVentasMes() {
        axios.post(Global.URL + 'UltimasVentasMes',{IdSucursal: this.SltSucursal}, {
          headers: {
            Authorization: Global.Token
          }
        }).then(response => {
          if (response.status == 200) {
            this.TotalVentas = response.data
          }
        })
      }, //Fin Ventas      
      UltimasComprasMes() {
        axios.post(Global.URL + 'UltimasComprasMes', {IdSucursal: this.SltSucursal},{
          headers: {
            Authorization: Global.Token
          }
        }).then(response => {
          if (response.status == 200) {
            this.TotalCompras = response.data
            this.GananciasFunctio();
          }
        })
      }, //Fin Compras
      GananciasFunctio() {
       
        this.Ganancias = parseFloat(this.TotalVentas - this.TotalCompras);
        // console.log(this.Ganancias);
      }, //Fin Ganancia
      CitasPendientesDia() {
        axios.post(Global.URL + 'CitasPendienteDelDia',{IdSucursal: this.SltSucursal}, {
          headers: {
            Authorization: Global.Token
          }
        }).then(response => {
          if (response.status == 200) {
            this.TotalCitasPendiente = response.data

          }
        })
      }, //Fin Citas Pendientes
      IrACitas() {
        this.$router.push('ListadoCitas');

      }, //Fin Ir a Citas
      CitasFinalizadasDia() {
        axios.post(Global.URL + 'CitasFinalizadasDelDia',{IdSucursal: this.SltSucursal}, {
          headers: {
            Authorization: Global.Token
          }
        }).then(response => {
          if (response.status == 200) {
            this.TotalCitasFinalizadas = response.data

          }
        })
      }, //Fin Citas Pendientes


    }
  }
</script>