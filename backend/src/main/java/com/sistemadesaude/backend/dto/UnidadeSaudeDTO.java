package com.sistemadesaude.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * DTO para transferência de dados essenciais da Unidade de Saúde.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UnidadeSaudeDTO {

    private Long id;
    private String nome;
    private String codigoCnes; // Adicionado para interoperabilidade com o MS
}
