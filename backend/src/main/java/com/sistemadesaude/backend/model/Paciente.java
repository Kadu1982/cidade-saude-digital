package com.sistemadesaude.backend.model;

import jakarta.persistence.*;
import lombok.*;
import jakarta.persistence.Column;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder


public class Paciente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomeCompleto;

    @Column(unique = true, nullable = true)
    private String cpf;

    // Justificativa para ausência de CPF em recém-nascidos ou situações excepcionais
    private String justificativaAusenciaCpf;

    private String cns;
    private String sexo;
    private String dataNascimento;

    private Boolean acamado;
    private Boolean domiciliado;
    private Boolean condSaudeMental;
    private Boolean usaPlantas;
    private String outrasCondicoes;

    private String municipio;
    private String cep;
    private String logradouro;
    private String numero;
    private String bairro;
    private String complemento;

    private String telefoneCelular;
    private String telefoneContato;

    private String tipoSanguineo;
    private String cbo;

    private String rg;
    private String orgaoEmissor;
    private String certidaoNascimento;
    private String carteiraTrabalho;
    private String tituloEleitor;

    private String prontuarioFamiliar;
    private String corRaca;
    private String etnia;
    private String escolaridade;
    private String situacaoFamiliar;
}
