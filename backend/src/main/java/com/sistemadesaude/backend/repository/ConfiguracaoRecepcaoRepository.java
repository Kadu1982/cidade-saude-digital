package com.sistemadesaude.backend.repository;

import com.sistemadesaude.backend.model.ConfiguracaoRecepcao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConfiguracaoRecepcaoRepository extends JpaRepository<ConfiguracaoRecepcao, Long> {
}