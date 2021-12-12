<template>

	<div class="container-fluid">
    <div class="row justify-content-center" id="home">
    <div class="col-md-4 register">
        <div class="card">

        <div class="card-header">
			<h4>Registrar</h4>
		</div>

        <div class="card-body">
            <!-- <div v-if="error" class="alert alert-danger">{{error}}</div> -->

										

				<div class="form-group row">
					<label for="email" class="col-md-4 col-form-label text-md-right">Email</label>

					<div class="col-md-6">
					<input
						id="email"
						type="email"
						class="form-control"
						name="email"
						value
						required
						autofocus
						v-model="email"
					/>
					</div>
				</div>

				<div class="form-group row mt-2">
					<label for="password" class="col-md-4 col-form-label text-md-right">Senha</label>

					<div class="col-md-6">
					<input
						id="password"
						type="password"
						class="form-control"
						name="password"
						required
						v-model="senha"
					/>
					</div>
				</div>

				<div class="form-group row mt-2 mb-0">
					<div class="col-md-8 offset-md-4">
					<button class="btn btn-primary" @click="registrar">Registrar</button>
					</div>
				</div>

        </div>
		<div class="card-footer">
			<div class="row mt-2">
				<div class="col-md-12">
					<p class="mt-2">Já tem uma conta ? <router-link to="/">Login</router-link></p>
				</div>
			</div>				
		</div>
        </div>
    </div>
    </div>
</div>
	
</template>

<script>
import store from '../store' // Importando o Vuex
import firebase from 'firebase/compat/app' // Importando a instância do firebase

export default {
	name: "Registro",
    data() {
        return {
			email: '',
			senha: ''
		}
    },	
    methods: {
		async registrar () {			
			await firebase.auth().createUserWithEmailAndPassword(this.email, this.senha)
			.then( async (resp) => {				
			
			// Setando os estados no Vuex (usando dispatch)
			await store.dispatch("setUser", {email: resp.user.email});
			// Pegando os valores dos estados da Vuex (usando getters)
			let user = store.getters.user			
			// Setando no localStorage
			localStorage.setItem('user', JSON.stringify(user))

			this.$swal("Sua conta foi criada com sucesso", "", "success");
			this.$router.replace('/home')            
			}).catch((error) => {
				console.log(error)
				this.$swal("Oops...", "Algum erro aconteceu!", "error")				
			})
		}
	}
}
</script>

<style scoped>
	.container-fluid {	
		background-color: rgba(24, 28, 46);		
	}

	.register{	
		margin-top: 10%;		
	}
</style>