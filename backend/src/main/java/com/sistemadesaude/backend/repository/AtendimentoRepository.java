// src/main/java/com/sistemadesaude/backend/repository/AtendimentoRepository.java

package com.sistemadesaude.backend.repository;

import com.sistemadesaude.backend.model.Atendimento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AtendimentoRepository extends JpaRepository<Atendimento, String> {
    List<Atendimento> findByPacienteIdOrderByDataHoraDesc(String pacienteId);
}
