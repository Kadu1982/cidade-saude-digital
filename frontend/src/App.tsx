// src/App.tsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { OperadorProvider } from './contexts/OperadorContext'; // ou '@/contexts/OperadorContext'
import { Toaster } from "@/components/ui/toaster";
import { AppRoutes } from '@/routes/routes'; // Usando o alias @/

const App: React.FC = () => {
    return (
        <Router>
            <OperadorProvider>
                <main className="h-full"> {/* Garanta que esta <main> não tenha estilos conflitantes também */}
                    <AppRoutes />
                </main>
                <Toaster />
            </OperadorProvider>
        </Router>
    );
};

export default App;