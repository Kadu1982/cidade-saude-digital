package com.sistemadesaude.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "unidades_saude")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UnidadeSaude {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome", nullable = false)
    private String nome;

    @Column(name = "codigo_cnes", length = 7, nullable = false, unique = true)
    private String codigoCnes;

    // Construtor adicional para facilitar criação
    public UnidadeSaude(String nome, String codigoCnes) {
        this.nome = nome;
        this.codigoCnes = codigoCnes;
    }
}