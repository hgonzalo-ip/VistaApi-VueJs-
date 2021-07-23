<template>
    <div>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-xl-6">
                    <b-card id="CardLogin" text-variant="white">
                        <b-row align-h="center">
                            <img src="../assets/Img/Logo.png" width="275px" height="230px">
                        </b-row>
                        <b-form @submit.prevent="Login" class="was-validated" >
                            <b-row align-h="center">
                                <b-col  xl="9" lg="6" cols="12">
                                    <label>Correo</label>
                                    <input type="email" class="form-control" v-model="Correo" placeholder="Correo Electronico" required minlength="5">
                                    <div v-if="!$v.Correo.required"  class="invalid-feedbackt text-withe">Este campo es necesario</div>
                                    <div v-if="!$v.Correo.minLength"  class="invalid-feedbackt text-withe">Este necesita mas de 5 caracteres</div>
                                </b-col>
                                
                            </b-row><br>
                            <b-row align-h="center">
                                <b-col  xl="9" lg="6" cols="12">
                                    <label>Contraseña</label>
                                    <b-form-input type="password"  v-model="Password" placeholder="Contraseña" required minlength="5"> 
                                    </b-form-input>
                                    <div v-if="!$v.Password.required"  class="invalid-feedbackt text-withe">Este campo es necesario</div>
                                    <div v-if="!$v.Password.minLength"  class="invalid-feedbackt text-withe">Este necesita mas de 8 caracteres</div>
                                </b-col>
                            </b-row><br>
                              <b-row align-h="center">
                                <b-col  xl="6" lg="6" cols="8">
                                      <b-button type="submit"  id="BtnIngresar">Ingresar</b-button>
                                </b-col>
                            </b-row>
                        </b-form>
                    </b-card>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { required, minLength} from "vuelidate/lib/validators";
    export default {
        name: 'Login',
        data(){
            return{
                Correo : '',
                Password: '',
                remember_me : true,
                error: null
            }
        },
        validations:{
            Correo : {
                required,
                minLength: minLength(5)
            },
            Password:{
                required,
                minLength: minLength(5)
            }      
        },
        mounted(){
            if(this.$store.getters.loggedIn){
                   this.$emit('Logueado', true);
            }
        },
        methods:{
            Login(){
                this.$v.$touch();
                if(this.$v.$invalid){
                    return false;
                }else{
                    
                    this.$store.dispatch("retriveToken", {
                        email: this.Correo,
                        password: this.Password,
                        remember_me: this.remember_me,
                    }).then(response => {
                    //   console.log(response.data);
                       if(response.data.IdTipoUsuario == 1 ){
                            this.$emit('Logueado', true);
                           this.$router.push({ name : 'Dashboard' });
                       }else{
                            this.$emit('Logueado', true);
                           this.$router.push({ name : 'Ventas' });
                       }
                    })
                    .catch(error => {
                        
                        this.$swal.fire(
                            'Error',
                            'Verifique su correo o contraseña por favor',
                            'warning'
                        )
                        this.error = error.response.data.message
                    });
                }
                
            }
        }
        
    }
</script>