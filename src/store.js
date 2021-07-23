import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {Global} from './Global';

Vue.use(Vuex)

const store = new Vuex.Store({
    state : {
        token : localStorage.getItem('access_token') || null,
        
    },
    getters : {
        loggedIn(state){
            return state.token !== null 
            
        }
    },
    mutations : {
        retriveToken(state, token){
            state.token = token
        },
        destroyToken(state){
            state.token = null
        }             
    },actions: {
        retriveToken(context, credentials){
            return new Promise((resolve, reject) => {
                axios.post(Global.URL+ 'Login',{
                    email : credentials.email,
                    password : credentials.password,
                    remember_me : credentials.remember_me
                })
                .then(response =>{
                    // console.log(response);
                   const IdUsuario = response.data.IdUsuario;
                    const IdTipoUser = response.data.IdTipoUsuario;
                    const token = response.data.acces_token                   
                    localStorage.setItem('access_token', token);
                    localStorage.setItem('IdTipoUser', IdTipoUser);
                    localStorage.setItem('IdUsuario', IdUsuario);
                    Global.IdTipoUser = IdTipoUser;
                    Global.IdUsuario = IdUsuario;
                    context.commit('retriveToken', token)

                    resolve(response)
                })
                .catch(error => {
                    reject(error);
                })
            });
        },
        destroyToken(context){
           
            if(context.getters.loggedIn){
                return new Promise((resolve, reject) =>{
                    axios.get(Global.URL+'logout', {
                        headers : { Authorization : 'Bearer ' + context.state.token}
                    }).then(response =>{
                        localStorage.removeItem('IdTipoUser');
                        localStorage.removeItem('access_token');
                        context.commit('destroyToken')

                        resolve(response)
                    })
                    .catch(error => {
                        localStorage.removeItem('access_token');
                        context.commit('destroyToken')

                        reject(error);
                    })
                })
            }
        }
    }
});
export default store;