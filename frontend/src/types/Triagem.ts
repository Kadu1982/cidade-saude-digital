export interface Triagem {
  id: number
  pacienteId: string
  pressaoArterial: string
  temperatura: string
  peso: string
  altura: string
  frequenciaCardiaca: string
  saturacaoOxigenio: string
  queixaPrincipal: string
  prioridade: 'baixa' | 'media' | 'alta' | 'urgente'
  observacoes: string
  dataHora: string
}
