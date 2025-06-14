// src/types/Prescricao.ts

export interface MedicamentoPrescrito {
    nome: string;
    dosagem: string;
    instrucoes: string;
}

export interface Prescricao {
    id: string; // ID único para a prescrição
    pacienteId: string;
    atendimentoId?: string; // ANOTAÇÃO: Tornou-se opcional para suportar dispensação avulsa.
    medicamentos: MedicamentoPrescrito[];
    nomeMedico?: string;
    data: string; // Data em formato ISO
    status: 'pendente' | 'dispensada';
}