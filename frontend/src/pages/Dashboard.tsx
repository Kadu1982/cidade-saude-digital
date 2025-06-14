
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Stethoscope,
  Calendar,
  Users,
  Package,
  Activity,
  LogOut
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">
              Sistema de Saúde - Conexão Digital
            </h1>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Dashboard</h2>
            <p className="text-gray-600">
              Bem-vindo ao sistema de gestão em saúde
            </p>
          </div>

          {/* Cards de Navegação */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <Card className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => navigate("/atendimento-medico")}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Stethoscope className="mr-2 h-5 w-5 text-blue-600" />
                  Atendimento Médico
                </CardTitle>
                <CardDescription>
                  Realizar consultas e atendimentos médicos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  Acessar
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => navigate("/atendimento-odontologico")}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="mr-2 h-5 w-5 text-green-600" />
                  Atendimento Odontológico
                </CardTitle>
                <CardDescription>
                  Atendimentos odontológicos e odontograma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  Acessar
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => navigate("/agendamento")}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-purple-600" />
                  Agendamento
                </CardTitle>
                <CardDescription>
                  Agendar consultas e exames
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  Acessar
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => navigate("/recepcao")}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-orange-600" />
                  Recepção
                </CardTitle>
                <CardDescription>
                  Cadastro e atualização de pacientes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  Acessar
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => navigate("/estoque")}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="mr-2 h-5 w-5 text-red-600" />
                  Estoque
                </CardTitle>
                <CardDescription>
                  Controle de medicamentos e insumos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  Acessar
                </Button>
              </CardContent>
            </Card>

          </div>
        </main>
      </div>
  );
};

export default Dashboard;