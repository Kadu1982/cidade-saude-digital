package com.sistemadesaude.backend.repository;

import com.sistemadesaude.backend.model.Agendamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.Optional;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {

    @Query("SELECT a FROM Agendamento a WHERE a.usuarioId = :usuarioId AND a.status = 'AGENDADO' AND a.dataHora BETWEEN :inicio AND :fim ORDER BY a.dataHora ASC")
    Optional<Agendamento> findAgendamentoAtivoPorUsuario(Long usuarioId, LocalDateTime inicio, LocalDateTime fim);
}
