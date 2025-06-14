package com.sistemadesaude.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "agendamentos") // Define a tabela vinculada a essa entidade
public class Agendamento {

    // 🔑 ID auto-incrementado (chave primária)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 🔗 ID do paciente (relacionamento com tabela 'usuarios')
    @Column(name = "usuario_id", nullable = false)
    private Long usuarioId;

    // 🏷️ Tipo do atendimento: ex: "consulta_medica", "exame_laboratorial"
    @Column(name = "tipo_atendimento", nullable = false)
    private String tipoAtendimento;

    // 🕓 Data e hora marcada para o atendimento
    @Column(name = "data_hora", nullable = false)
    private LocalDateTime dataHora;

    // ✅ Status: "AGENDADO", "REALIZADO", "CANCELADO"
    @Column(name = "status", nullable = false)
    private String status;

    // Getters e Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public String getTipoAtendimento() {
        return tipoAtendimento;
    }

    public void setTipoAtendimento(String tipoAtendimento) {
        this.tipoAtendimento = tipoAtendimento;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
