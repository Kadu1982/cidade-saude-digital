package com.sistemadesaude.backend.controller;

import com.sistemadesaude.backend.model.Medicamento;
import com.sistemadesaude.backend.model.Prescricao;
import com.sistemadesaude.backend.repository.PrescricaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prescricoes")
@CrossOrigin(origins = "*")
public class PrescricaoController {

    @Autowired
    private PrescricaoRepository prescricaoRepository;

    @PostMapping
    public Prescricao criar(@RequestBody Prescricao prescricao) {
        return prescricaoRepository.save(prescricao);
    }

    @GetMapping
    public List<Prescricao> listar(@RequestParam String pacienteId) {
        return prescricaoRepository.findByPacienteIdOrderByDataDesc(pacienteId);
    }

    @PutMapping("/{id}/dispensar")
    public Prescricao dispensar(@PathVariable Long id, @RequestBody List<Medicamento> meds) {
        Prescricao prescricao = prescricaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prescricao nao encontrada"));
        prescricao.setStatus("dispensada");
        prescricao.getMedicamentos().clear();
        for (Medicamento m : meds) {
            m.setPrescricao(prescricao);
            prescricao.getMedicamentos().add(m);
        }
        return prescricaoRepository.save(prescricao);
    }

    @PostMapping("/avulsa")
    public Prescricao avulsa(@RequestBody Prescricao prescricao) {
        prescricao.setStatus("dispensada");
        return prescricaoRepository.save(prescricao);
    }
}
