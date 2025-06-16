package com.sistemadesaude.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "triagens")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Triagem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "paciente_id", nullable = false)
    private String pacienteId;

    private String pressaoArterial;
    private String temperatura;
    private String peso;
    private String altura;
    private String frequenciaCardiaca;
    private String saturacaoOxigenio;
    private String queixaPrincipal;
    private String prioridade;
    private String observacoes;

    private LocalDateTime dataHora = LocalDateTime.now();
}
