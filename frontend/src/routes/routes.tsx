import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
// CORREÇÃO: Importando o arquivo de Layout principal e unificado.
import Layout from '../Layout';

// Importação de todas as páginas para criar as rotas
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import Recepcao from '@/pages/Recepcao';
import Triagem from '@/pages/Triagem';
import Agendamento from '@/pages/Agendamento';
import AtendimentoMedico from '@/pages/AtendimentoMedico';
import AtendimentoOdontologico from '@/pages/AtendimentoOdontologico';
import Exames from '@/pages/Exames';
import Vacinas from '@/pages/Vacinas';
import Farmacia from '@/pages/Farmacia';
import Estoque from '@/pages/Estoque';
import Transporte from '@/pages/Transporte';
import Faturamento from '@/pages/Faturamento';
import Epidemiologia from '@/pages/Epidemiologia';
import VigilanciaSanitaria from '@/pages/VigilanciaSanitaria';
import VigilanciaAmbiental from '@/pages/VigilanciaAmbiental';
import Ouvidoria from '@/pages/Ouvidoria';
import NotFound from '@/pages/NotFound';

export const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedRoute />}>
                {/* CORREÇÃO: Usando o componente Layout unificado */}
                <Route element={<Layout />}>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="recepcao" element={<Recepcao />} />
                    <Route path="triagem" element={<Triagem />} />
                    <Route path="agendamento" element={<Agendamento />} />
                    <Route path="atendimento-medico" element={<AtendimentoMedico />} />
                    <Route path="atendimento-odontologico" element={<AtendimentoOdontologico />} />
                    <Route path="exames" element={<Exames />} />
                    <Route path="vacinas" element={<Vacinas />} />
                    <Route path="farmacia" element={<Farmacia />} />
                    <Route path="estoque" element={<Estoque />} />
                    <Route path="transporte" element={<Transporte />} />
                    <Route path="faturamento" element={<Faturamento />} />
                    <Route path="epidemiologia" element={<Epidemiologia />} />
                    <Route path="vigilancia-sanitaria" element={<VigilanciaSanitaria />} />
                    <Route path="vigilancia-ambiental" element={<VigilanciaAmbiental />} />
                    <Route path="ouvidoria" element={<Ouvidoria />} />
                </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};