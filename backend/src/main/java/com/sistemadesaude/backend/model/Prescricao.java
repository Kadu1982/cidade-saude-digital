package com.sistemadesaude.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "prescricoes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Prescricao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "paciente_id", nullable = false)
    private String pacienteId;

    @Column(name = "nome_medico")
    private String nomeMedico;

    private LocalDateTime data = LocalDateTime.now();

    private String status;

    @OneToMany(mappedBy = "prescricao", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Medicamento> medicamentos = new ArrayList<>();
}
