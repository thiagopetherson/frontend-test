import './style.css'
import Vue from 'vue'
import App from './App.vue'
import VueSweetalert2 from 'vue-sweetalert2' // Importando a biblioteca sweet alert
import 'sweetalert2/dist/sweetalert2.min.css' // CSS do Sweet Alert
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue' // importando o Bootstrap Vue
import 'bootstrap/dist/css/bootstrap.css' // Importando CSS do Bootstrap Vue
import 'bootstrap-vue/dist/bootstrap-vue.css' // Importando CSS do Bootstrap Vue
import store from "./store"; // Importando o Vuex
import router from './router.js' // Importando o arquivo de configuração das rotas com Vue Router
import firebase from 'firebase/compat/app' // Importando a instância do firebase
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

Vue.use(VueSweetalert2) // Adicionando a biblioteca do Sweet Alert na aplicação Vue
Vue.use(BootstrapVue) // Adicionando o bootstrap vue na aplicação vue
Vue.use(IconsPlugin) // Adicionando o plugin de ícones do bootstrap vue na aplicação vue

Vue.config.productionTip = false


// Inicializando firebase

const firebaseConfig = {
    apiKey: "AIzaSyB3fuPlMiMrGmbNc6TWHMCsSg_4FAkaqro",
    authDomain: "teste-frontend-a7ee9.firebaseapp.com",
    projectId: "teste-frontend-a7ee9",
    storageBucket: "teste-frontend-a7ee9.appspot.com",
    messagingSenderId: "953362865050",
    appId: "1:953362865050:web:2729f96b7db31f76d1f823",
    measurementId: "${config.measurementId}"
};
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);  
// Fim da configuração do firebase

let app = '';
firebase.auth().onAuthStateChanged(() => {
  // Só vamos inicializar a instância do Vue quando o firebase estiver inicializado
  if (!app) {
    app = new Vue({
      router: router,
      store: store,
      render: h => h(App)
    }).$mount('#app');
  }
});




