package com.sistemadesaude.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "medicamentos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Medicamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "prescricao_id")
    private Prescricao prescricao;

    private String nome;
    private String dosagem;
    private String instrucoes;
}
