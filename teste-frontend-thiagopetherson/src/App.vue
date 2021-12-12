<template>
	<div id="app">		
		<Menu v-if="isAuthenticated"></Menu>   	
		<router-view></router-view>			
	</div>
</template>

<script>
import store from './store' // Importando o Vuex
import Menu from './components/templates/Menu.vue'

export default {
  name: 'App',
	components: { Menu },
  computed: { 
    // Usamos essa computada para verificar se o usuário está logado (para mostrarmos ou não o menu)
    isAuthenticated() {
      return store.getters.user.loggedIn
    },
  },
  mounted () {
      let user = JSON.parse(localStorage.getItem('user')) // Pegando os dados do usuário que está no local storage
      // Setando os estados no Vuex (usando dispatch)
		store.dispatch("setUser", {email: user.email})
  }
}
</script>

<style>

</style>
