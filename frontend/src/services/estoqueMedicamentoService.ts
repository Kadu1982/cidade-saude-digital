import { apiService } from "@/services/apiService";

export interface MedicamentoEstoque {
  id: number;
  nome: string;
  lote: string;
  validade: string;
  quantidade: number;
}

export class EstoqueMedicamentoService {
  async listar(unidadeId?: string): Promise<MedicamentoEstoque[]> {
    try {
      const url = unidadeId ? `/medicamentos?unidadeId=${unidadeId}` : "/medicamentos";
      const res = await apiService.get<{ data: MedicamentoEstoque[] }>(url);
      return res.data.data;
    } catch (error) {
      console.error("Erro ao buscar estoque de medicamentos", error);
      return [];
    }
  }

  async ajustarQuantidade(id: number, quantidade: number): Promise<void> {
    try {
      await apiService.patch(`/medicamentos/${id}`, { quantidade });
    } catch (error) {
      console.error("Erro ao ajustar quantidade de medicamento", error);
    }
  }
}

export const estoqueMedicamentoService = new EstoqueMedicamentoService();

