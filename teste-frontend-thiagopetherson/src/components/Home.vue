<template>
	<div class="container-fluid">
		<div id="home">
			<div class="row alinhamento-direita">
				<div class="col-md-10 offset-md-1">
					<span class="text-primary fw-bold">Usuário Ativo: </span><span class="text-primary">{{ activeUser }}</span>
				</div>
			</div>
			<div class="row">
				<div class="col-md-10 offset-md-1 py-3">
					<h2 class="text-secondary border-bottom border-dark">Lista de Usuários</h2>
				</div>
			</div>
			<div class="row alinhamento-direita">
				<div class="col-md-10 offset-md-1 mb-2">
					<b-button variant="primary" @click="showSaveModal">Novo Usuário</b-button>
				</div>
			</div>
			<div class="col-md-10 offset-md-1">		

				<b-table id="my-table" table-variant="secondary" bordered sticky-header striped hover :items="listUsers" :per-page="perPage" :current-page="currentPage" :fields="fields" responsive>
					<template v-slot:cell(actions)="data">					
						<b-button size="sm" variant="success" @click="showEditModal(data.item)">Editar</b-button>					
						<b-button size="sm" class="mx-1" variant="danger" @click="excluir(data.item.id)">Excluir</b-button>					
					</template>
				</b-table>
				
		
				<b-pagination
				v-model="currentPage"
				:total-rows="rows"
				:per-page="perPage"
				aria-controls="my-table"
				></b-pagination>

				<p class="mt-3 fw-bold">Pagina Atual: {{ currentPage }}</p>

			</div>

			<!--<b-button v-b-modal.modal-prevent-closing>Open Modal</b-button>-->


			<b-modal id="modal-prevent-closing" ref="modal" :title="modalTitle" :visible="modalShow" :hide-footer="true">				

				<form ref="form" @submit.prevent="salvarUsuario">
						
					<b-form-input id="id-input" v-model="formFields.id" hidden></b-form-input>

					<b-form-group label="Name" label-for="name-input" invalid-feedback="O campo nome é obrigatório">           
						<b-form-input id="name-input" v-model="formFields.nome" required></b-form-input>
					</b-form-group>
					<b-form-group label="Email" label-for="email-input" invalid-feedback="O campo email é obrigatório">           
						<b-form-input id="email-input" v-model="formFields.email" required></b-form-input>
					</b-form-group>
					<b-form-group label="Data Nascimento" label-for="nascimento-input" invalid-feedback="O campo data de nascimento é obrigatório">           
						<b-form-input id="nascimento-input" v-model="formFields.nascimento" required></b-form-input>
					</b-form-group>
					<b-form-group label="Signo" label-for="signo-input" invalid-feedback="O campo signo é obrigatório">           
						<b-form-input id="signo-input" v-model="formFields.signo" required></b-form-input>
					</b-form-group>
					<b-form-group label="Time" label-for="time-input" invalid-feedback="O campo time é obrigatório">           
						<b-form-input id="time-input" v-model="formFields.time" required></b-form-input>  
					</b-form-group>	
					<b-form-group class="mt-3">           
						<b-button type="submit" variant="primary">Salvar</b-button>
					</b-form-group>	    
					
				</form>
			</b-modal>
		</div>
	</div>
	
</template>

<script>
// import store from '../store' // Importando o Vuex
import firebase from 'firebase/compat/app' // Importando a instância do firebase

export default {	
    data() {
        return {
			activeUser: '',
			perPage: 5,
			currentPage: 1,
			fields: [
				{
					key: 'id',
					sortable: false					
				},
				{
					key: 'nome',
					sortable: false
				},
				{
					key: 'email',				
					sortable: false
				},
				{
					key: 'nascimento',				
					sortable: false
				},
				{
					key: 'signo',				
					sortable: false
				},
				{
					key: 'time',				
					sortable: false
				},
				{
				key: 'actions',
				label: 'Ações',
			}
			],
			listUsers: [],
			modalShow: false,
			modalTitle: "",
			formFields: {                
                id: '',
                nome: '',
                email: '',
                nascimento: '',
                signo: '',
                time: ''
            },
		}
    },       
    methods: {
		async getUsers () {
			let usersData = []

			// Fazendo a busca dos usuários
			await firebase.firestore().collection('usuarios').orderBy('nome', 'asc').limit(50)
			.get()
			.then((snapshot) => {
				// console.log(snapshot)
				
				snapshot.forEach((doc) => {
					usersData.push({
						id: doc.id,
						nome: doc.data().nome,
						email: doc.data().email,
						nascimento: doc.data().nascimento,
						signo: doc.data().signo,
						time: doc.data().time					
					});
					// console.log(doc.id, " => ", doc.data());
				});

				this.listUsers = usersData
			})
			.catch(error => {
				console.log(error)			
			})
		},
		showSaveModal() {
			this.modalTitle = "Salvar"
			this.formFields.id = ""
			this.formFields.nome = ""
			this.formFields.email = ""
			this.formFields.nascimento = ""
			this.formFields.signo = ""
			this.formFields.time = ""		

			this.modalShow = !this.modalShow	
		},
		showEditModal (data) {
			// console.log(data)
			this.modalTitle = "Editar"
			this.formFields.id = data.id
			this.formFields.nome = data.nome
			this.formFields.email = data.email
			this.formFields.nascimento = data.nascimento
			this.formFields.signo = data.signo
			this.formFields.time = data.time			

			this.modalShow = !this.modalShow			
		},
		async salvarUsuario () {
			console.log(this.formFields.id)
			if (this.formFields.id) {
				// Usamos o método update, do firebase, para alterar os dados do usuário no banco do firebase
				await firebase.firestore().collection('usuarios')
				.doc(this.formFields.id)
				.update({
					nome: this.formFields.nome,
					email: this.formFields.email,
					nascimento: this.formFields.nascimento,
					signo: this.formFields.signo,
					time: this.formFields.time 
				}).then(() => {	
					this.modalShow = !this.modalShow			
					this.$swal("Dados do usuário atualizados!", "", "success");
				
					
				}).catch((error) => {
					this.$swal("Oops...", "Algum erro aconteceu!", "error");
					console.log(error)
				})
			} else {

				await firebase.firestore().collection('usuarios')
				.add({
					created: new Date(),
					nome: this.formFields.nome,
					email: this.formFields.email,
					nascimento: this.formFields.nascimento,
					signo: this.formFields.signo,
					time: this.formFields.time 
				})
				.then(() => {					
					this.$swal("Usuário cadastrado com sucesso!", "", "success");
				})
				.catch((error) => {
					console.log(error)
					this.$swal("Oops...", "Algum erro aconteceu!", "error");
				})

			}

		},
		excluir (id) {		

			firebase.firestore().collection("usuarios")
			.doc(id)
			.delete()
			.then(() => {
				this.$swal("Sucesso", "Usuário removido!", "success");
			})
			.catch((error) => {
				this.$swal("Oops...", "Algum erro aconteceu!", "error");
				console.error(error);
			});
		}
		
    },
    computed: {
      rows() {
        return this.listUsers.length
      }
    },
	mounted() {
		let user = JSON.parse(localStorage.getItem('user')) // Pegando os dados do usuário que está no local storage
		this.activeUser = user.email
		console.log(this.activeUser)
        this.getUsers()
    },
	updated () {
		this.getUsers()
	}
}
</script>

<style scoped>
	.container-fluid {		
		color: white;
	}

	.alinhamento-direita {
		text-align: right;		
	}
</style>