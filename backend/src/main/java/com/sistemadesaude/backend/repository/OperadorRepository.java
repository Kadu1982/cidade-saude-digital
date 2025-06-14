package com.sistemadesaude.backend.repository;

import com.sistemadesaude.backend.model.Operador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OperadorRepository extends JpaRepository<Operador, Long> {

    Optional<Operador> findByLogin(String login);

    boolean existsByLogin(String login);

    Optional<Operador> findByCpf(String cpf);

    boolean existsByCpf(String cpf);

    // ADICIONAR ESTE MÉTODO:
    Optional<Operador> findByTemplateId(String templateId);
}