package com.sistemadesaude.backend.controller;

import com.sistemadesaude.backend.model.Triagem;
import com.sistemadesaude.backend.repository.TriagemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/triagens")
@CrossOrigin(origins = "*")
public class TriagemController {

    @Autowired
    private TriagemRepository triagemRepository;

    @PostMapping
    public Triagem criar(@RequestBody Triagem triagem) {
        return triagemRepository.save(triagem);
    }

    @GetMapping
    public List<Triagem> listar(@RequestParam String pacienteId) {
        return triagemRepository.findByPacienteIdOrderByDataHoraDesc(pacienteId);
    }
}
