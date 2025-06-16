import apiService from './apiService'
import { Triagem } from '@/types/Triagem'

export const registrarTriagem = async (
  dados: Omit<Triagem, 'id' | 'dataHora'>,
): Promise<Triagem> => {
  const response = await apiService.post<{ data: Triagem }>('/triagens', dados)
  return response.data.data
}

export const listarTriagens = async (pacienteId: string): Promise<Triagem[]> => {
  const response = await apiService.get<{ data: Triagem[] }>('/triagens', {
    params: { pacienteId },
  })
  return response.data.data
}
