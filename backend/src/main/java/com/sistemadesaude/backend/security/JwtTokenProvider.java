package com.sistemadesaude.backend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException; // Import específico para erros de assinatura
import org.slf4j.Logger; // Para logging
import org.slf4j.LoggerFactory; // Para logging
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct; // Para inicializar a chave
import java.security.Key;
import java.util.Date;
import java.util.List;
import java.util.Base64; // Para codificar a secret se necessário

@Component
public class JwtTokenProvider {

    private static final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);

    @Value("${jwt.secret}")
    private String jwtSecretString; // Renomeado para clareza

    @Value("${jwt.expiration}")
    private Long jwtExpirationMs; // Renomeado para clareza e para indicar milissegundos

    private Key signingKey;

    @PostConstruct // Garante que a chave seja inicializada após a injeção de dependências
    public void init() {
        // Decodificar a secret se ela estiver em Base64 no application.properties
        // byte[] keyBytes = Base64.getDecoder().decode(jwtSecretString);
        // this.signingKey = Keys.hmacShaKeyFor(keyBytes);
        // Se a secret for uma string simples (não recomendável para produção forte):
        this.signingKey = Keys.hmacShaKeyFor(jwtSecretString.getBytes());
    }

    public String generateToken(String username, List<String> roles) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationMs);

        return Jwts.builder()
                .setSubject(username)
                .claim("roles", roles) // Adiciona os perfis como uma claim
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(signingKey, SignatureAlgorithm.HS256) // HS256 é comum, mas considere algoritmos mais fortes para produção crítica
                .compact();
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parserBuilder().setSigningKey(signingKey).build().parseClaimsJws(authToken);
            return true;
        } catch (SignatureException ex) {
            logger.error("Assinatura JWT inválida: {}", ex.getMessage());
        } catch (MalformedJwtException ex) {
            logger.error("Token JWT malformado: {}", ex.getMessage());
        } catch (ExpiredJwtException ex) {
            logger.error("Token JWT expirado: {}", ex.getMessage());
        } catch (UnsupportedJwtException ex) {
            logger.error("Token JWT não suportado: {}", ex.getMessage());
        } catch (IllegalArgumentException ex) {
            logger.error("Claims JWT vazias ou argumento ilegal: {}", ex.getMessage());
        }
        return false;
    }

    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(signingKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    @SuppressWarnings("unchecked") // Para o cast de List<String>
    public List<String> getRolesFromToken(String token) { // Nome do método alterado para clareza
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(signingKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
        // As roles são armazenadas como uma claim. Certifique-se de que o nome "roles" corresponde ao usado em generateToken.
        return claims.get("roles", List.class);
    }
}