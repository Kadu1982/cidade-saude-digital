package com.sistemadesaude.backend.controller;

import com.sistemadesaude.backend.dto.LoginRequest;
import com.sistemadesaude.backend.dto.LoginResponse;
import com.sistemadesaude.backend.dto.OperadorDTO;
import com.sistemadesaude.backend.mapper.OperadorMapper;
import com.sistemadesaude.backend.model.Operador;
import com.sistemadesaude.backend.service.JwtService;
import com.sistemadesaude.backend.service.OperadorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/operadores")
@RequiredArgsConstructor
public class OperadorController {

    private final OperadorService operadorService;
    private final JwtService jwtService;
    private final OperadorMapper operadorMapper;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        Operador operador = operadorService.autenticar(request.getLogin(), request.getSenha());
        String token = jwtService.gerarToken(operador);
        OperadorDTO dto = operadorMapper.toDTO(operador);
        return ResponseEntity.ok(new LoginResponse(token, dto));
    }
}
