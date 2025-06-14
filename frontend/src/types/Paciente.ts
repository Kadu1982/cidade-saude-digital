/**
 * Define a estrutura de dados completa para o cadastro de um paciente.
 */
export interface Paciente {
  id: string;
  nome: string;
  dataNascimento: string;
  cpf: string;
  cns: string; // Cartão Nacional de Saúde
  cartaoSus: string;
  sexo: "M" | "F" | "outro";
  email: string;
  telefone: string;
  endereco: string;
  nomeMae?: string;
  cpfMae?: string;
  nomePai: string;
  unidadeSaude: string;
  microarea: string;
  equipeESF: string;
  acs?: string;
  condicoesCronicas?: string[];
  ultimaConsulta?: string;
}

/**
 * Representa um operador do sistema com suas permissões e perfis.
 */
export interface Operador {
  id: string;
  nome: string;
  permissoes: string[];
  perfis: string[];
  unidadeAtual?: string;
  unidadeId?: string;

}


/**
 * Representa um profissional de saúde no sistema.
 */
export interface Profissional {
  id: string;
  nome: string;
  conselho: string; // Ex: CRM, COREN
  numeroConselho: string;
  especialidades: string[];
  unidadesAtendimento: string[]; // IDs das unidades onde atende
  ativo: boolean;
}

/**
 * Representa uma unidade de saúde (UBS, PSF, etc.).
 */
export interface UnidadeSaude {
  id:string;
  nome: string;
  cnes: string; // Cadastro Nacional de Estabelecimentos de Saúde
  endereco: string;
  telefone: string;
  tipo: 'UBS' | 'PSF' | 'Hospital' | 'Clínica' | 'Laboratório';
  ativo: boolean;
}

/**
 * Define um horário disponível (slot) na agenda de um profissional.
 */
export interface SlotHorario {
  hora: string; // Formato "HH:mm"
  disponivel: boolean;
  tipo: 'normal' | 'encaixe' | 'retorno';
  pacienteId?: string; // ID do paciente se o horário estiver ocupado
}

/**
 * Representa a agenda de um profissional para um dia específico em uma unidade.
 */
export interface Agenda {
  id: string;
  profissionalId: string;
  unidadeId: string;
  especialidade: string;
  data: Date;
  horarios: SlotHorario[];
  cotaTotal: number;
  cotaUtilizada: number;
  cotaReservada: number;
  bloqueada: boolean;
  motivoBloqueio?: string;
  criadaEm: Date;
  atualizadaEm: Date;
}

/**
 * Representa um agendamento de consulta ou exame.
 */
export interface Agendamento {
  id: string;
  pacienteId: string;
  agendaId: string;
  slotHora: string;
  tipo: 'consulta' | 'exame' | 'procedimento';
  status: 'agendado' | 'confirmado' | 'cancelado' | 'realizado' | 'faltou';
  dataCriacao: Date;
  observacoes?: string;
}