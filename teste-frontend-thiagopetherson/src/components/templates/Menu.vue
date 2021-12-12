<template>   
    <b-navbar class="navbar navbar-expand-md navbar-light navbar-laravel bg-dark text-light">
        <div class="container">            
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto"></ul>
            <ul class="navbar-nav ml-auto">
            <template>                
                               
                <li class="nav-item">
                    <router-link to="/home" class="nav-link text-light fw-bold">Home</router-link>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-light fw-bold" style="cursor: pointer" @click.prevent="sair">Sair</a>
                </li>
            </template>            
            </ul>
        </div>
        </div>
    </b-navbar>
</template>

<script>
import store from '../../store' // Importando o Vuex
import firebase from 'firebase/compat/app' // Importando a instância do firebase


export default {
    name: "Menu",
    data() {
        return {		
            email: null,
            loggedIn: false
		}
    },	
	methods: {
        // Método que faz o logout do usuário logado
        async sair () {
            // signOut do firebase
            await firebase.auth().signOut()
            .then( async (/*resp*/) => {
                //console.log(resp)

                // Chamando a action que dispara a mutation de logout do usuário (que deixa os estados com os seus 'estados' iniciais)
			await store.dispatch("logoutUser")
                // Removendo o item do localStorage
                localStorage.removeItem('user')
                // Redirecionando o usuário para a área de login
                this.$router.replace('login')

                this.email = null
                this.loggedIn = false      
            })
        }
    },
    computed: {
        emailComputed () {
            return this.email
        },
        loggedInComputed () {
            return this.loggedIn
        }
    },
    mounted () {
        // Esse método do ciclo de vida é chamado toda vez que o componente é mountado (um pouco depois dele ser criado)
        //console.log(this.email)
        //console.log(this.loggedIn)
        let user = JSON.parse(localStorage.getItem('user')) // Pegando os dados do usuário que está no local storage
        this.email = user.email
        this.loggedIn = user.loggedIn 

        // Setando os estados no Vuex (usando dispatch)
		store.dispatch("setUser", {email: this.email})

    }
}
</script>

<style>

</style>
