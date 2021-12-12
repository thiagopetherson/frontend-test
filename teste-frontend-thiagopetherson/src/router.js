import Vue from 'vue' //Importando o Vue
import Router from 'vue-router' //Importando o Vue Router
import Login from  './components/Login.vue' //Importando o componente Home
import Registro from  './components/Registro.vue' //Importando o componente Home
import Home from  './components/Home.vue' //Importando o componente Home
import Usuarios from  './components/Usuarios.vue' //Importando o componente Usuarios

import firebase from 'firebase/compat/app' // Importando a instância do firebase



// Registrando o Plugin Vue Router (com isso podemos acessar o Router dentro dos componetes)
Vue.use(Router)

// Importando um objeto a partir da função Contrutora Router
const router = new Router({     
    mode: 'history',
    routes: [        
        { path: '*', component: Login },
        { path: '/', component: Login },
        { path: '/login', component: Login },
        { path: '/registro', component: Registro },
        { path: '/home', component: Home, meta: { requiresAuth: true } },
        { path: '/usuarios', component: Usuarios,  meta: { requiresAuth: true }} // Esse meta define que só podemos acessar a rota se autenticados
    ]
})

// Usamos esse BeforeEach para verificar se precisamos estar autenticados para acessar a rota
router.beforeEach((to, from, next) => {
    const currentUser = firebase.auth().currentUser; // Recuperando o usuário atual (para ver se ele está autenticado)
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth); // Recuperando o atributo requiresAuth da rota
    
    /* 
        Abaixo Verificamos se a rota precisa de autenticaçaõ e se o usuário está logado. 
        Então fazemos o redirecionamento de acordo com a condição
    */
    if (requiresAuth && !currentUser) next('login');
    else if (!requiresAuth && currentUser) next('home');
    else next();
});

export default router
