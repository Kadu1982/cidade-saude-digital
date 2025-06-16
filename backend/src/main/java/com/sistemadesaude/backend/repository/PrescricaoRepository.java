package com.sistemadesaude.backend.repository;

import com.sistemadesaude.backend.model.Prescricao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PrescricaoRepository extends JpaRepository<Prescricao, Long> {
    List<Prescricao> findByPacienteIdOrderByDataDesc(String pacienteId);
}
