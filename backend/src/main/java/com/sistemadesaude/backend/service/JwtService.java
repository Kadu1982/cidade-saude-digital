package com.sistemadesaude.backend.service;

import com.sistemadesaude.backend.model.Operador;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

@Service
public class JwtService {

    private static final long EXPIRATION = 1000 * 60 * 60 * 8; // 8 horas
    private Key key;

    @PostConstruct
    public void init() {
        this.key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    }

    public String gerarToken(Operador operador) {
        return Jwts.builder()
                .setSubject(operador.getLogin())
                .claim("id", operador.getId())
                .claim("nome", operador.getNome())
                .claim("login", operador.getLogin())
                .claim("isMaster", operador.getIsMaster()) // CORRIGIDO: getIsMaster() em vez de isMaster()
                .claim("perfis", operador.getPerfis())
                .claim("unidadeId", operador.getUnidade() != null ? operador.getUnidade().getId() : null)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(key)
                .compact();
    }
}