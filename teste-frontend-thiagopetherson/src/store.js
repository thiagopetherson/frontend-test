import Vue from "vue"; // Importando o Vue
import Vuex from "vuex"; // Importando o Vuex
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      email: null
    }
  },
  getters: {
    user(state){
      return state.user
    }
  },
  mutations: {   
    SET_USER(state, data) { // Mutation que seta os dados do usuário logado
      state.user.email = data
      state.user.loggedIn = true
    },
    LOGOUT_USER(state) { // Mutation que seta os dados do usuário logado
        state.user.email = null
        state.user.loggedIn = false
    }
  },
  actions: {
    setUser: (context, value) => { 
        context.commit('SET_USER', value.email) // Disparando e chamando a Mutation        
    },
    logoutUser: (context) => {
        context.commit('LOGOUT_USER') // Disparando e chamando a Mutation       
    } 
  }  
});