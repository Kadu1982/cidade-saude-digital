// src/pages/AtendimentoMedico.tsx

import { AtendimentoForm, AtendimentoFormData } from "@/components/atendimento/AtendimentoForm";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const AtendimentoMedico = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // ANOTAÇÃO: Esta função será passada para o componente do formulário.
  // Ela recebe os dados do formulário quando ele é submetido com sucesso.
  const handleSaveAtendimento = (data: AtendimentoFormData) => {
    setIsLoading(true);
    console.log("Dados do Atendimento Médico:", data);

    // Simula uma chamada de API
    setTimeout(() => {
      toast({
        title: "Sucesso!",
        description: "Atendimento médico salvo com sucesso.",
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
      <div className="container mx-auto py-8">
        {/*
        ANOTAÇÃO: CORREÇÃO APLICADA.
        Renderizamos o formulário genérico, passando os textos específicos
        e a função de 'callback' para salvar os dados.
      */}
        <AtendimentoForm
            title="Registro de Atendimento Médico"
            description="Preencha os dados do atendimento clínico abaixo."
            onSave={handleSaveAtendimento}
            isLoading={isLoading}
        />
      </div>
  );
};

export default AtendimentoMedico;