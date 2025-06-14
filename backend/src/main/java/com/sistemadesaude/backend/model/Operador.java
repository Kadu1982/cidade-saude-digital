package com.sistemadesaude.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "operador")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Operador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "login")
    private String login;

    @Column(name = "senha")
    private String senha;

    @Column(name = "nome")
    private String nome;

    @Column(name = "cargo")
    private String cargo;

    @Column(name = "cpf")
    private String cpf;

    @Column(name = "template_id")
    private String templateId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "unidade_id")
    private UnidadeSaude unidade;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "unidade_atual_id")
    private UnidadeSaude unidadeAtual;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "operador_perfis", joinColumns = @JoinColumn(name = "operador_id"))
    @Column(name = "perfil")
    private List<String> perfis;

    @Column(name = "is_master")
    private Boolean isMaster = false;

    // Construtor adicional para facilitar criação
    public Operador(String login, String senha, String nome, String cargo) {
        this.login = login;
        this.senha = senha;
        this.nome = nome;
        this.cargo = cargo;
        this.isMaster = false;
    }
}