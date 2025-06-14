import { useQuery } from "@tanstack/react-query";
import { atendimentoService } from "@/services/atendimentoService";

export function useAtendimentos(pacienteId: string) {
  return useQuery({
    queryKey: ["atendimentos", pacienteId],
    queryFn: () => atendimentoService.listarPorPaciente(pacienteId),
    enabled: !!pacienteId,
  });
}
