import { describe, it, expect, vi, beforeEach } from "vitest";
import { estoqueMedicamentoService } from "../estoqueMedicamentoService";
import { apiService } from "../apiService";

vi.mock("../apiService", () => ({
  apiService: {
    get: vi.fn(),
    patch: vi.fn(),
  },
}));

describe("estoqueMedicamentoService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve listar medicamentos via API", async () => {
    const mockResponse = {
      data: { data: [{ id: 1, nome: "Teste", lote: "L1", validade: "2025-01-01", quantidade: 5 }] },
    };
    vi.mocked(apiService.get).mockResolvedValue(mockResponse as any);

    const result = await estoqueMedicamentoService.listar("1");

    expect(result).toHaveLength(1);
    expect(apiService.get).toHaveBeenCalledWith("/medicamentos?unidadeId=1");
  });

  it("deve retornar lista vazia em caso de erro", async () => {
    vi.mocked(apiService.get).mockRejectedValue(new Error("erro"));

    const result = await estoqueMedicamentoService.listar();

    expect(result).toEqual([]);
  });
});

