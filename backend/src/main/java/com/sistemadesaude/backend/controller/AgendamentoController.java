package com.sistemadesaude.backend.controller;

import com.sistemadesaude.backend.model.Agendamento;
import com.sistemadesaude.backend.repository.AgendamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/agendamentos")
public class AgendamentoController {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    @GetMapping("/ativo/{usuarioId}")
    public Map<String, Object> verificarAgendamento(@PathVariable Long usuarioId) {
        LocalDateTime inicio = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);
        LocalDateTime fim = LocalDateTime.now().withHour(23).withMinute(59).withSecond(59);

        Optional<Agendamento> agendamento = agendamentoRepository.findAgendamentoAtivoPorUsuario(usuarioId, inicio, fim);

        if (agendamento.isPresent()) {
            return Map.of(
                    "agendado", true,
                    "tipo", agendamento.get().getTipoAtendimento(),
                    "destino", "/atendimento/" + agendamento.get().getTipoAtendimento()
            );
        } else {
            return Map.of("agendado", false);
        }
    }
}
