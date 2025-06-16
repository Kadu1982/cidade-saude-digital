package com.sistemadesaude.backend.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Filtro de autenticação JWT.
 * Este filtro intercepta todas as requisições HTTP e verifica se há um token JWT válido.
 * Se o token for válido, configura a autenticação no contexto de segurança do Spring.
 * Implementa OncePerRequestFilter para garantir que seja executado apenas uma vez por requisição.
 */
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    // Provedor de tokens JWT para validação e extração de informações
    private final JwtTokenProvider tokenProvider;

    /**
     * Construtor que recebe o provedor de tokens JWT.
     *
     * @param tokenProvider Provedor de tokens JWT para validação e extração de informações
     */
    public JwtAuthenticationFilter(JwtTokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    /**
     * Método principal do filtro que é executado para cada requisição.
     * Verifica se há um token JWT válido e configura a autenticação.
     *
     * @param request Requisição HTTP
     * @param response Resposta HTTP
     * @param filterChain Cadeia de filtros para continuar o processamento
     * @throws ServletException Se ocorrer um erro durante o processamento do servlet
     * @throws IOException Se ocorrer um erro de I/O
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        try {
            // Obtém o caminho da requisição
            String path = request.getServletPath();

            // Ignora a filtragem para endpoints públicos que não requerem autenticação
            if (path.startsWith("/api/auth") ||
                    path.startsWith("/api/test") ||
                    path.startsWith("/api/operadores/login") ||
                    path.startsWith("/v3/api-docs") ||
                    path.startsWith("/swagger-ui")) {

                // Passa a requisição para o próximo filtro na cadeia
                filterChain.doFilter(request, response);
                return;
            }

            // Obtém o cabeçalho de autorização da requisição
            String authHeader = request.getHeader("Authorization");

            // Se não houver cabeçalho de autorização ou não começar com "Bearer ", continua sem autenticar
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                filterChain.doFilter(request, response);
                return;
            }

            // Extrai o token JWT do cabeçalho (remove o prefixo "Bearer ")
            String token = authHeader.substring(7);

            // Valida o token JWT
            if (!tokenProvider.validateToken(token)) {
                logger.warn("Token JWT inválido na requisição para: {}", path);
                filterChain.doFilter(request, response);
                return;
            }

            // Extrai o nome de usuário do token
            String username = tokenProvider.getUsernameFromToken(token);

            // Se o nome de usuário for válido e não houver autenticação no contexto de segurança
            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                // Extrai as roles (perfis) do token
                List<String> roles = tokenProvider.getRolesFromToken(token);

                // Cria um token de autenticação com o nome de usuário e as roles
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        username,
                        null, // Credenciais não são necessárias após a autenticação
                        roles != null ?
                                // CORREÇÃO: Adiciona o prefixo "ROLE_" para consistência com UserDetailsImpl
                                roles.stream().map(role -> new SimpleGrantedAuthority("ROLE_" + role)).collect(Collectors.toList()) :
                                Collections.emptyList()
                );

                // Adiciona detalhes da requisição ao token de autenticação
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // Configura a autenticação no contexto de segurança
                SecurityContextHolder.getContext().setAuthentication(authToken);

                logger.debug("Usuário '{}' autenticado com sucesso via JWT", username);
            }

            // Passa a requisição para o próximo filtro na cadeia
            filterChain.doFilter(request, response);

        } catch (Exception e) {
            // Registra qualquer exceção não tratada e continua a cadeia de filtros
            logger.error("Erro ao processar autenticação JWT: {}", e.getMessage(), e);
            filterChain.doFilter(request, response);
        }
    }
}