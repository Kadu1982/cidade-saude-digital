package com.sistemadesaude.backend.repository;

import com.sistemadesaude.backend.model.Triagem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TriagemRepository extends JpaRepository<Triagem, Long> {
    List<Triagem> findByPacienteIdOrderByDataHoraDesc(String pacienteId);
}
