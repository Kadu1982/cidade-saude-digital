// src/services/cidService.ts

import { apiService } from "@/services/apiService";

export interface Cid {
  id: string;
  codigo: string;
  descricao: string;
}

export class CidService {
  async buscar(query: string): Promise<Cid[]> {
    const response = await apiService.get<{ success: boolean; data: Cid[] }>(
      `/cids?busca=${encodeURIComponent(query)}`,
    );
    return response.data.data;
  }
}

export const cidService = new CidService();
