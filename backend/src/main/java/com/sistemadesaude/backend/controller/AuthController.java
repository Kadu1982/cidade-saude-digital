package com.sistemadesaude.backend.controller;

import com.sistemadesaude.backend.dto.LoginRequest;
import com.sistemadesaude.backend.dto.LoginResponse;
import com.sistemadesaude.backend.dto.OperadorDTO;
import com.sistemadesaude.backend.mapper.OperadorMapper;
import com.sistemadesaude.backend.model.Operador;
import com.sistemadesaude.backend.repository.OperadorRepository;
import com.sistemadesaude.backend.security.JwtTokenProvider;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final OperadorRepository operadorRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final OperadorMapper operadorMapper;
    private final PasswordEncoder passwordEncoder;


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid LoginRequest request) {
        System.out.println(">>> Requisição de login recebida: " + request.getLogin());

        Operador operador = operadorRepository.findByLogin(request.getLogin())
                .orElseThrow(() -> new RuntimeException("Login inválido"));

        if (!passwordEncoder.matches(request.getSenha(), operador.getSenha())) {
            return ResponseEntity.status(401).body("{\"error\": \"Usuário ou senha inválidos\"}");
        }

        String token = jwtTokenProvider.generateToken(
                operador.getLogin(),
                operador.getPerfis()
        );

        OperadorDTO operadorDTO = operadorMapper.toDTO(operador);
        return ResponseEntity.ok(new LoginResponse(token, operadorDTO));
    }
}
