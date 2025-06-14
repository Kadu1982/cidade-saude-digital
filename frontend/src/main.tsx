import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// CORREÇÃO: Adicionando a importação dos arquivos de estilo globais.
import './index.css'
import './App.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)