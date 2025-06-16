import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Minus } from "lucide-react";
import { estoqueMedicamentoService, MedicamentoEstoque } from "@/services/estoqueMedicamentoService";
import apiService from "@/services/apiService";
import { UnidadeSaude } from "@/types/Paciente";

interface EstoqueMedicamentosProps {
  unidadeId: string;
}

export const EstoqueMedicamentos: React.FC<EstoqueMedicamentosProps> = ({ unidadeId }) => {
  const [unidades, setUnidades] = useState<UnidadeSaude[]>([]);
  const [selecionada, setSelecionada] = useState<string>(unidadeId);
  const [medicamentos, setMedicamentos] = useState<MedicamentoEstoque[]>([]);

  useEffect(() => {
    apiService
      .get("/unidades")
      .then((res) => setUnidades(res.data.data))
      .catch((err) => console.error("Falha ao carregar unidades", err));
  }, []);

  useEffect(() => {
    if (!selecionada) return;
    estoqueMedicamentoService
      .listar(selecionada)
      .then(setMedicamentos)
      .catch(() => setMedicamentos([]));
  }, [selecionada]);

  const ajustar = (id: number, delta: number) => {
    const item = medicamentos.find((m) => m.id === id);
    if (!item) return;
    const quantidade = item.quantidade + delta;
    setMedicamentos((prev) =>
      prev.map((m) => (m.id === id ? { ...m, quantidade } : m)),
    );
    estoqueMedicamentoService.ajustarQuantidade(id, quantidade).catch(() => {});
  };

  return (
    <Card className="mt-2">
      <CardHeader>
        <CardTitle>Controle de Medicamentos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center gap-2">
          <Select value={selecionada} onValueChange={setSelecionada}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Selecione a unidade" />
            </SelectTrigger>
            <SelectContent>
              {unidades.map((u) => (
                <SelectItem key={u.id} value={String(u.id)}>{u.nome}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Lote</TableHead>
              <TableHead>Validade</TableHead>
              <TableHead className="text-right">Quantidade</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {medicamentos.map((m) => (
              <TableRow key={m.id}>
                <TableCell>{m.nome}</TableCell>
                <TableCell>{m.lote}</TableCell>
                <TableCell>{m.validade}</TableCell>
                <TableCell className="text-right">{m.quantidade}</TableCell>
                <TableCell className="text-center space-x-2">
                  <Button size="icon" variant="outline" onClick={() => ajustar(m.id, 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline" onClick={() => ajustar(m.id, -1)}>
                    <Minus className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {medicamentos.length === 0 && (
          <p className="pt-4 text-sm text-muted-foreground">Nenhum medicamento encontrado.</p>
        )}
      </CardContent>
    </Card>
  );
};

