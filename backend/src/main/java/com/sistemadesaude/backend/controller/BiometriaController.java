package com.sistemadesaude.backend.controller;

import com.sistemadesaude.backend.model.Operador;
import com.sistemadesaude.backend.repository.OperadorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/biometria")
@RequiredArgsConstructor
public class BiometriaController {

    private final OperadorRepository operadorRepository;

    @GetMapping("/verificar/{cpf}")
    public ResponseEntity<Operador> verificarPorCpf(@PathVariable String cpf) {
        Optional<Operador> operador = operadorRepository.findByCpf(cpf);

        return operador
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/verificar/template/{templateId}")
    public ResponseEntity<Operador> verificarPorTemplateId(@PathVariable String templateId) {
        Optional<Operador> operador = operadorRepository.findByTemplateId(templateId);
        return operador
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

}
