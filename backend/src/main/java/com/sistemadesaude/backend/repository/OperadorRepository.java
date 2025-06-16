package com.sistemadesaude.backend.repository;

import com.sistemadesaude.backend.model.Operador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OperadorRepository extends JpaRepository<Operador, Long> {

    // ALTERE A CONSULTA PARA INCLUIR FETCH DAS UNIDADES
    @Query("SELECT o FROM Operador o " +
            "LEFT JOIN FETCH o.perfis " +
            "LEFT JOIN FETCH o.unidade " +
            "LEFT JOIN FETCH o.unidadeAtual " +
            "WHERE o.login = :login")
    Optional<Operador> findByLogin(@Param("login") String login);

    boolean existsByLogin(String login);

    Optional<Operador> findByCpf(String cpf);

    boolean existsByCpf(String cpf);

    Optional<Operador> findByTemplateId(String templateId);
}