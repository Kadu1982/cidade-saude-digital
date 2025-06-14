import type { ReactNode } from "react"; // <-- BOA PRÁTICA: Importando apenas o tipo.
import { useOperador } from "@/contexts/OperadorContext";
import { Button } from "@/components/ui/button";
import { LogOut, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface LayoutAgendamentoProps {
    children: ReactNode; // <-- Usando o tipo diretamente.
}

// Removido o tipo React.FC para um código mais moderno e limpo.
const LayoutAgendamento = ({ children }: LayoutAgendamentoProps) => {
    const { operador, logoutOperador: logout } = useOperador();

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            <header className="bg-white shadow-sm border-b z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900">
                                <ArrowLeft className="h-5 w-5 mr-2" />
                            </Link>
                            <h1 className="text-xl font-semibold text-gray-900">
                                Módulo de Agendamento
                            </h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-sm text-right">
                                <div className="font-medium text-gray-800">{operador?.nome || 'Operador'}</div>
                                <div className="text-gray-500">{operador?.unidadeAtual || 'Unidade'}</div>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={logout}
                                className="flex items-center gap-2"
                            >
                                <LogOut className="h-4 w-4" />
                                Sair
                            </Button>
                        </div>
                    </div>
                </div>
            </header>
            <main className="flex-1 overflow-y-auto p-6">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default LayoutAgendamento;