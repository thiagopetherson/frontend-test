import vue from 'vue' // Importando o vue
import axios from 'axios' // Importando o Axios

// Definindo a URL base (para acessarmos o backend) que usaremos o Axios
axios.defaults.baseURL = ""

Vue.use({
    install(vue) {
        // Essa propriedade ($http) que estará disponível de forma global para fazermos as requisições com essa URL padrão
        Vue.prototype.$http = axios
    }
})