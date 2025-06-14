package com.sistemadesaude.backend.controller;

import com.sistemadesaude.backend.dto.UnidadeSaudeDTO;
import com.sistemadesaude.backend.service.UnidadeSaudeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/unidades")
public class UnidadeSaudeController {

    @Autowired
    private UnidadeSaudeService unidadeService;

    @GetMapping
    public List<UnidadeSaudeDTO> listar() {
        return unidadeService.listarTodas();
    }

    @GetMapping("/{id}")
    public UnidadeSaudeDTO buscar(@PathVariable Long id) {
        return unidadeService.buscarPorId(id);
    }

    @PostMapping
    public UnidadeSaudeDTO criar(@RequestBody UnidadeSaudeDTO dto) {
        return unidadeService.criar(dto);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        unidadeService.deletar(id);
    }
}
