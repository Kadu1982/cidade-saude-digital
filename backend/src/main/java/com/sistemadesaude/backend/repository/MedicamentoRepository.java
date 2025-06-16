package com.sistemadesaude.backend.repository;

import com.sistemadesaude.backend.model.Medicamento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicamentoRepository extends JpaRepository<Medicamento, Long> {
}
