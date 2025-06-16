import apiService from './apiService'
import { Prescricao } from '@/types/Prescricao'

export const criarPrescricao = async (
  prescricao: Omit<Prescricao, 'id' | 'data'>,
): Promise<Prescricao> => {
  const response = await apiService.post<{ data: Prescricao }>(
    '/prescricoes',
    prescricao,
  )
  return response.data.data
}

export const buscarPrescricoes = async (
  pacienteId: string,
): Promise<Prescricao[]> => {
  const response = await apiService.get<{ data: Prescricao[] }>('/prescricoes', {
    params: { pacienteId },
  })
  return response.data.data
}

export const dispensarPrescricao = async (
  id: number,
  medicamentos: Prescricao['medicamentos'],
): Promise<Prescricao> => {
  const response = await apiService.put<{ data: Prescricao }>(
    `/prescricoes/${id}/dispensar`,
    medicamentos,
  )
  return response.data.data
}

export const criarDispensacaoAvulsa = async (
  prescricao: Omit<Prescricao, 'id' | 'data'>,
): Promise<Prescricao> => {
  const response = await apiService.post<{ data: Prescricao }>(
    '/prescricoes/avulsa',
    prescricao,
  )
  return response.data.data
}
