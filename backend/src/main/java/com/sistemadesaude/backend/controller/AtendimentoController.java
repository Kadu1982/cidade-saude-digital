package com.sistemadesaude.backend.controller;

import com.sistemadesaude.backend.model.Atendimento;
import com.sistemadesaude.backend.model.LogSistema;
import com.sistemadesaude.backend.repository.AtendimentoRepository;
import com.sistemadesaude.backend.repository.LogSistemaRepository;
import com.sistemadesaude.backend.service.AtendimentoPdfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/atendimentos")
public class AtendimentoController {

    @Autowired
    private AtendimentoRepository atendimentoRepository;

    @Autowired
    private LogSistemaRepository logRepository;

    @Autowired
    private AtendimentoPdfService pdfService;

    @PostMapping
    public Map<String, Object> salvar(@RequestBody Atendimento atendimento) {
        Atendimento salvo = atendimentoRepository.save(atendimento);

        LogSistema log = new LogSistema();
        log.setUsuarioId("sistema"); // Substituir pelo usuário logado no futuro
        log.setAcao("CRIAR_ATENDIMENTO");
        log.setTabela("atendimentos");
        log.setRegistroId(salvo.getId());
        logRepository.save(log);

        return Map.of("success", true, "data", salvo);
    }

    @GetMapping
    public Map<String, Object> listarPorPaciente(@RequestParam String pacienteId) {
        List<Atendimento> lista = atendimentoRepository.findByPacienteIdOrderByDataHoraDesc(pacienteId);
        return Map.of("success", true, "data", lista);
    }

    @GetMapping("/{id}/pdf")
    public ResponseEntity<byte[]> gerarPdf(@PathVariable String id) {
        Atendimento atendimento = atendimentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Atendimento não encontrado"));

        byte[] pdf = pdfService.gerarPdf(atendimento);

        return ResponseEntity.ok()
                .header("Content-Type", "application/pdf")
                .header("Content-Disposition", "attachment; filename=atendimento_" + id + ".pdf")
                .body(pdf);
    }
}
