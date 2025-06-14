import React from "react";
import { useAtendimentos } from "@/hooks/useAtendimentos";
import { atendimentoService } from "@/services/atendimentoService";
import { Button } from "@/components/ui/button";

type Props = {
  pacienteId: string;
};

export const HistoricoAtendimentos: React.FC<Props> = ({ pacienteId }) => {
  const {
    data: atendimentos,
    isLoading,
    isError,
  } = useAtendimentos(pacienteId);

  const downloadPdf = async (id: string) => {
    const blob = await atendimentoService.baixarPdf(id);
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `atendimento_${id}.pdf`);
    document.body.appendChild(link);
    link.click();
  };

  if (isLoading) return <p>Carregando histórico...</p>;
  if (isError || !atendimentos) return <p>Erro ao carregar atendimentos.</p>;

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Histórico de Atendimentos</h2>
      {atendimentos.length === 0 && <p>Nenhum atendimento encontrado.</p>}
      {atendimentos.map((a) => (
        <div key={a.id} className="border p-4 rounded bg-gray-50">
          <p>
            <strong>Data:</strong> {new Date(a.dataHora).toLocaleString()}
          </p>
          <p>
            <strong>CID:</strong> {a.cid10}
          </p>
          <p>
            <strong>Diagnóstico:</strong> {a.diagnostico}
          </p>
          <p>
            <strong>Prescrição:</strong> {a.prescricao}
          </p>
          <Button onClick={() => downloadPdf(a.id)}>Baixar PDF</Button>
        </div>
      ))}
    </div>
  );
};
