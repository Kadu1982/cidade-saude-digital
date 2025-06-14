package com.sistemadesaude.backend.service;

import com.sistemadesaude.backend.dto.PacienteDTO;
import com.sistemadesaude.backend.mapper.PacienteMapper;
import com.sistemadesaude.backend.model.Paciente;
import com.sistemadesaude.backend.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PacienteService {

    @Autowired
    private PacienteRepository pacienteRepository;

    @Autowired
    private PacienteMapper pacienteMapper;

    public PacienteDTO criarPaciente(PacienteDTO dto) {
        // Validação: CPF é obrigatório, exceto se houver justificativa
        if ((dto.getCpf() == null || dto.getCpf().isBlank()) &&
                (dto.getJustificativaAusenciaCpf() == null || dto.getJustificativaAusenciaCpf().isBlank())) {
            throw new RuntimeException("CPF é obrigatório, exceto nos casos justificados (ex: recém-nascidos).");
        }

        // Verifica duplicidade
        if (dto.getCpf() != null && !dto.getCpf().isBlank()) {
            if (pacienteRepository.existsByCpf(dto.getCpf())) {
                throw new RuntimeException("Já existe um paciente cadastrado com este CPF.");
            }
        }

        Paciente paciente = pacienteMapper.toEntity(dto);
        return pacienteMapper.toDto(pacienteRepository.save(paciente));
    }
}
