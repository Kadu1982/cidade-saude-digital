package com.sistemadesaude.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OperadorDTO {

    private Long id;
    private String login;
    private String senha; // Usado apenas para criação/atualização
    private String nome;
    private String cargo;
    private String cpf;
    private List<String> perfis;
    private Boolean isMaster;

    // Informações da unidade
    private Long unidadeId;
    private String nomeUnidade;

    // Informações da unidade atual
    private Long unidadeAtualId;
    private String nomeUnidadeAtual;
}