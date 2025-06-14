package com.sistemadesaude.backend.repository;

import com.sistemadesaude.backend.model.UnidadeSaude;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UnidadeSaudeRepository extends JpaRepository<UnidadeSaude, Long> {

    Optional<UnidadeSaude> findByCodigoCnes(String codigoCnes);

    boolean existsByCodigoCnes(String codigoCnes);
}