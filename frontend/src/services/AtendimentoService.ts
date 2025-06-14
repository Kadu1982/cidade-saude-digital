// src/services/AtendimentoService.ts

import { apiService } from "@/services/apiService";

export interface Atendimento {
  id: string;
  pacienteId: string;
  cid10: string;
  diagnostico: string;
  prescricao: string;
  dataHora: string;
}

export class AtendimentoService {
  async listarPorPaciente(pacienteId: string): Promise<Atendimento[]> {
    const response = await apiService.get<{
      success: boolean;
      data: Atendimento[];
    }>(`/atendimentos?pacienteId=${pacienteId}`);

    return response.data.data;
  }

  async baixarPdf(atendimentoId: string): Promise<Blob> {
    const response = await apiService.get(
      `/atendimentos/${atendimentoId}/pdf`,
      {
        responseType: "blob",
      },
    );
    return response.data;
  }
}

export const atendimentoService = new AtendimentoService();
