// Importa o Axios, biblioteca HTTP
import axios from 'axios'

// Cria uma instância reutilizável do Axios
const apiService = axios.create({
    baseURL: 'http://localhost:5011/api', // URL base do backend (ajustar se necessário)
    headers: {
        'Content-Type': 'application/json' // Define o tipo de conteúdo padrão como JSON
    },
    timeout: 10000, // Limite de tempo para requisições (10 segundos)
    withCredentials: false // Não envia cookies por padrão (ajustar se backend usar sessões)
})

// Exporta a instância para ser usada em qualquer serviço/função
export default apiService
