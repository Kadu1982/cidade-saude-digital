// src/services/farmaciaService.ts

import { Prescricao } from '@/types/Prescricao';

const PRESCRICOES_STORAGE_KEY = 'prescricoes_farmacia';

// ANOTAÇÃO: Busca todas as prescrições salvas no armazenamento local.
const getPrescricoes = (): Prescricao[] => {
    const data = localStorage.getItem(PRESCRICOES_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

// ANOTAÇÃO: Salva o array de prescrições no armazenamento local.
const savePrescricoes = (prescricoes: Prescricao[]) => {
    localStorage.setItem(PRESCRICOES_STORAGE_KEY, JSON.stringify(prescricoes));
};

// ANOTAÇÃO: Cria uma nova prescrição com status 'pendente' e a salva.
export const criarPrescricao = (prescricao: Omit<Prescricao, 'id' | 'data' | 'status'>): Promise<Prescricao> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const prescricoes = getPrescricoes();
            const novaPrescricao: Prescricao = {
                ...prescricao,
                id: `presc_${new Date().getTime()}`,
                data: new Date().toISOString(),
                status: 'pendente',
            };
            prescricoes.push(novaPrescricao);
            savePrescricoes(prescricoes);
            console.log("Prescrição enviada para a farmácia:", novaPrescricao);
            resolve(novaPrescricao);
        }, 500);
    });
};

// ANOTAÇÃO: Nova função para criar uma dispensação que não se origina de uma prescrição (avulsa).
// Ela já é criada com o status 'dispensada'.
export const criarDispensacaoAvulsa = (dispensacao: { pacienteId: string; medicamentos: Prescricao['medicamentos'] }): Promise<Prescricao> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const prescricoes = getPrescricoes();
            const novaDispensacao: Prescricao = {
                ...dispensacao,
                id: `disp_avulsa_${new Date().getTime()}`,
                data: new Date().toISOString(),
                status: 'dispensada',
                // atendimentoId fica undefined, indicando que é avulsa.
            };
            prescricoes.push(novaDispensacao);
            savePrescricoes(prescricoes);
            console.log("Dispensação avulsa criada:", novaDispensacao);
            resolve(novaDispensacao);
        }, 500);
    });
};


// ANOTAÇÃO: Busca as prescrições com status 'pendente' para um paciente específico.
export const buscarPrescricoesPendentes = (pacienteId: string): Promise<Prescricao[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const prescricoes = getPrescricoes();
            const pendentes = prescricoes.filter(p => p.pacienteId.toLowerCase() === pacienteId.toLowerCase() && p.status === 'pendente');
            console.log(`Prescrições pendentes encontradas para ${pacienteId}:`, pendentes);
            resolve(pendentes);
        }, 500);
    });
};

// ANOTAÇÃO: Atualiza o status de uma prescrição para 'dispensada'.
export const dispensarPrescricao = (prescricaoId: string, medicamentosDispensados: Prescricao['medicamentos']): Promise<Prescricao> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const prescricoes = getPrescricoes();
            const index = prescricoes.findIndex(p => p.id === prescricaoId);
            if (index !== -1) {
                prescricoes[index].status = 'dispensada';
                prescricoes[index].medicamentos = medicamentosDispensados; // Atualiza com a lista final
                savePrescricoes(prescricoes);
                console.log("Prescrição dispensada:", prescricoes[index]);
                resolve(prescricoes[index]);
            } else {
                reject(new Error("Prescrição não encontrada."));
            }
        }, 500);
    });
};