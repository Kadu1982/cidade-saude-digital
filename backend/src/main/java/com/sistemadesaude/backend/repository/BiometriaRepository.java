package com.sistemadesaude.backend.repository;

import com.sistemadesaude.backend.model.Biometria;
import com.sistemadesaude.backend.model.Operador;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface BiometriaRepository extends JpaRepository<Biometria, Long> {

    Optional<Biometria> findByOperador(Operador operador);
    List<Biometria> findByOperadorIdOrderByDataCapturaDesc(Long operadorId);
// método necessário para buscar pela entidade Operador
}
