// src/pages/Recepcao.tsx

// ANOTAÇÃO: Importa o hook 'useState' do React para gerenciar o estado do campo de busca.
import { useState } from "react";
// ANOTAÇÃO: Importa os componentes de UI para a construção de cartões.
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// ANOTAÇÃO: Importa o nosso componente de abas.
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// ANOTAÇÃO: Importa o componente de botão.
import { Button } from "@/components/ui/button";
// ANOTAÇÃO: Importa o componente de campo de texto.
import { Input } from "@/components/ui/input";
// ANOTAÇÃO: CORREÇÃO APLICADA. A importação do 'Label' foi REMOVIDA, pois o componente não era utilizado no código, resolvendo o erro TS6133.
// import { Label } from "@/components/ui/label";
// ANOTAÇÃO: Importa todos os ícones necessários da biblioteca 'lucide-react'.
import {
  UserCheck,
  UserPlus,
  Search,
  Users,
  ClipboardList,
} from "lucide-react";

// ANOTAÇÃO: Define o componente funcional 'Recepcao'.
const Recepcao = () => {
  // ANOTAÇÃO: Mantemos o estado para o termo de busca, pois ele é usado para controlar o valor do campo de Input.
  const [searchTerm, setSearchTerm] = useState("");

  return (
      // ANOTAÇÃO: Container principal da página com espaçamento vertical.
      <div className="space-y-6">
        {/* ANOTAÇÃO: Seção do cabeçalho da página. */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            Recepção e Atendimento
          </h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Users className="h-4 w-4 mr-2" />
              Fila de Espera
            </Button>
            <Button variant="outline" size="sm">
              <ClipboardList className="h-4 w-4 mr-2" />
              Relatórios
            </Button>
          </div>
        </div>

        {/* ANOTAÇÃO: O componente 'Tabs' usa 'defaultValue' para definir a aba inicial e gerenciar seu próprio estado. */}
        <Tabs defaultValue="identificacao" className="space-y-6">
          {/* ANOTAÇÃO: A lista de botões que funcionam como gatilhos para trocar de aba. */}
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="identificacao" className="flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              Identificar Paciente
            </TabsTrigger>
            <TabsTrigger value="cadastro" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Novo Cadastro
            </TabsTrigger>
          </TabsList>

          {/* ANOTAÇÃO: Conteúdo da primeira aba, visível quando 'identificacao' está ativa. */}
          <TabsContent value="identificacao" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5 text-blue-600" />
                    Buscar por Nome, CPF ou CNS
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    {/* ANOTAÇÃO: O valor deste Input é controlado pelo estado 'searchTerm'. */}
                    <Input
                        placeholder="Digite para buscar..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button>Buscar</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ANOTAÇÃO: Conteúdo da segunda aba, visível quando 'cadastro' está ativa. */}
          <TabsContent value="cadastro">
            {/* O formulário de novo cadastro de paciente viria aqui. */}
            <Card>
              <CardHeader>
                <CardTitle>Formulário de Novo Cadastro</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Os campos para um novo cadastro aparecerão aqui...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
  );
};

// ANOTAÇÃO: Exporta o componente para ser utilizado no sistema de rotas.
export default Recepcao;