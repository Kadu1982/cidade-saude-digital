// src/components/usuario/CadastroUsuario.tsx

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { apiService } from "@/services/apiService";

interface UsuarioForm {
  nome: string;
  nomeSocial?: string;
  cpf: string;
  justificativaCPF?: string;
  cns: string;
  nomeMae: string;
  nomePai?: string;
  sexo?: string;
  nacionalidade?: string;
  paisNascimento?: string;
  dataChegadaBrasil?: string;
  naturalizado?: boolean;
  numeroPortaria?: string;
  unidadeSaudeId?: number;
}

const CadastroUsuario = () => {
  const [form, setForm] = useState<UsuarioForm>({
    nome: "",
    cpf: "",
    cns: "",
    nomeMae: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiService.post("/pacientes", form);
      alert("Cadastro realizado com sucesso!");
      setForm({ nome: "", cpf: "", cns: "", nomeMae: "" });
    } catch (error) {
      alert("Erro ao salvar paciente.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold">
        Cadastro do Usuário - Situação Cadastral
      </h2>

      <fieldset className="border p-4 rounded-md space-y-4">
        <legend className="font-semibold text-lg">Identificação</legend>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="nome">Nome completo *</Label>
            <Input
              id="nome"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="nomeSocial">Nome social</Label>
            <Input
              id="nomeSocial"
              name="nomeSocial"
              value={form.nomeSocial || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="cpf">CPF *</Label>
            <Input
              id="cpf"
              name="cpf"
              value={form.cpf}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="justificativaCPF">
              Justificativa de ausência de CPF
            </Label>
            <Input
              id="justificativaCPF"
              name="justificativaCPF"
              value={form.justificativaCPF || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="cns">CNS *</Label>
            <Input
              id="cns"
              name="cns"
              value={form.cns}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="nomeMae">Nome da mãe *</Label>
            <Input
              id="nomeMae"
              name="nomeMae"
              value={form.nomeMae}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="nomePai">Nome do pai</Label>
            <Input
              id="nomePai"
              name="nomePai"
              value={form.nomePai || ""}
              onChange={handleChange}
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="border p-4 rounded-md space-y-4">
        <legend className="font-semibold text-lg">Dados Complementares</legend>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="sexo">Sexo</Label>
            <Input
              id="sexo"
              name="sexo"
              value={form.sexo || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="nacionalidade">Nacionalidade</Label>
            <Input
              id="nacionalidade"
              name="nacionalidade"
              value={form.nacionalidade || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="paisNascimento">País de nascimento</Label>
            <Input
              id="paisNascimento"
              name="paisNascimento"
              value={form.paisNascimento || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="dataChegadaBrasil">Data de chegada ao Brasil</Label>
            <Input
              id="dataChegadaBrasil"
              name="dataChegadaBrasil"
              type="date"
              value={form.dataChegadaBrasil || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="naturalizado">Naturalizado?</Label>
            <input
              type="checkbox"
              id="naturalizado"
              name="naturalizado"
              checked={form.naturalizado || false}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="numeroPortaria">Número da Portaria</Label>
            <Input
              id="numeroPortaria"
              name="numeroPortaria"
              value={form.numeroPortaria || ""}
              onChange={handleChange}
            />
          </div>
        </div>
      </fieldset>

      <div className="flex justify-end">
        <Button type="submit">Salvar Cadastro</Button>
      </div>
    </form>
  );
};

export default CadastroUsuario;
