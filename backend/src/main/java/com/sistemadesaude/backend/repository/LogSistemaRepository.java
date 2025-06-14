package com.sistemadesaude.backend.repository;

import com.sistemadesaude.backend.model.LogSistema;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LogSistemaRepository extends JpaRepository<LogSistema, String> {
}
