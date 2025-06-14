package com.sistemadesaude.backend.controller;

import com.sistemadesaude.backend.dto.PacienteDTO;
import com.sistemadesaude.backend.service.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pacientes")
@CrossOrigin(origins = "*")
public class PacienteController {

    @Autowired
    private PacienteService pacienteService;

    @PostMapping
    public PacienteDTO criarPaciente(@RequestBody PacienteDTO dto) {
        return pacienteService.criarPaciente(dto);
    }
}
