package com.sistemadesaude.backend.config;

import com.sistemadesaude.backend.security.JwtAuthenticationFilter;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.header.writers.XXssProtectionHeaderWriter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

import static org.springframework.security.config.Customizer.withDefaults;


/**
 * Configuração de segurança da aplicação.
 * Esta classe configura o Spring Security para proteger os endpoints da API,
 * definir políticas de autenticação e autorização, e configurar filtros de segurança.
 */
@Configuration // Indica que esta classe é uma configuração do Spring
@RequiredArgsConstructor // Gera um construtor com parâmetros para todos os campos final
public class SecurityConfig {

    // Filtro JWT que intercepta e processa tokens de autenticação
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    // Serviço que carrega detalhes do usuário para autenticação
    private final UserDetailsService userDetailsService;

    /**
     * Configura a cadeia de filtros de segurança HTTP.
     * Define regras de acesso, gerenciamento de sessão e tratamento de exceções.
     *
     * @param http Configuração de segurança HTTP
     * @return Cadeia de filtros de segurança configurada
     * @throws Exception Se ocorrer um erro durante a configuração
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                // Habilita a configuração de CORS definida no bean corsConfigurationSource
                .cors(withDefaults())
                // Desabilita CSRF pois usamos tokens JWT para autenticação
                .csrf(csrf -> csrf.disable())

                // Configura cabeçalhos de segurança para mitigar vulnerabilidades comuns
                .headers(headers -> headers
                        .xssProtection(xss -> xss
                                .headerValue(XXssProtectionHeaderWriter.HeaderValue.ENABLED_MODE_BLOCK))
                        .contentSecurityPolicy(csp ->
                                csp.policyDirectives("default-src 'self'; frame-ancestors 'self'"))
                )

                // Define regras de autorização para requisições HTTP
                .authorizeHttpRequests(auth -> auth
                        // Permite acesso público ao endpoint de login
                        .requestMatchers("/api/auth/login").permitAll()
                        // Permite requisições OPTIONS para suportar CORS
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        // Permite acesso público à documentação da API
                        .requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()
                        // Permite acesso público ao endpoint de saúde para monitoramento
                        .requestMatchers("/api/monitoring/health").permitAll()
                        // Endpoints de monitoramento restritos a administradores
                        .requestMatchers("/api/monitoring/**").hasRole("ADMINISTRADOR_SISTEMA")
                        // Todas as outras requisições precisam de autenticação
                        .anyRequest().authenticated()
                )

                // Configura gerenciamento de sessão como stateless (sem estado)
                // Necessário para autenticação baseada em token
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // Configura tratamento de exceções de autenticação
                .exceptionHandling(exception -> exception
                        .authenticationEntryPoint((request, response, authException) -> {
                            // Define resposta para tentativas de acesso não autorizadas
                            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                            response.setContentType("application/json");
                            response.getWriter().write("{\"error\": \"Não autorizado\"}");
                        })
                )

                // Adiciona o filtro JWT antes do filtro padrão de autenticação
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    /**
     * Configura a política de CORS (Cross-Origin Resource Sharing) para a aplicação.
     * Permite que o frontend (rodando em http://localhost:5011) acesse a API.
     * @return A fonte de configuração de CORS.
     */
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // Define as origens permitidas (o seu frontend)
        configuration.setAllowedOrigins(List.of("http://localhost:5011"));
        // Define os métodos HTTP permitidos
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"));
        // Define os cabeçalhos permitidos
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        // Permite o envio de credenciais (como cookies ou tokens de autenticação)
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // Aplica a configuração a todos os paths da API
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }


    /**
     * Configura o provedor de autenticação.
     * Define como os usuários serão autenticados e como as senhas serão verificadas.
     *
     * @return Provedor de autenticação configurado
     */
    @Bean
    public AuthenticationProvider authenticationProvider() {
        // Cria um provedor de autenticação baseado em DAO
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        // Define o serviço que carrega os detalhes do usuário
        provider.setUserDetailsService(userDetailsService);
        // Define o codificador de senha para verificar senhas
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    /**
     * Configura o codificador de senha para hash e verificação de senhas.
     * Usa BCrypt, um algoritmo de hash seguro para senhas.
     *
     * @return Codificador de senha configurado
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        // BCrypt é um algoritmo de hash seguro para senhas
        // com salt automático e fator de trabalho configurável
        return new BCryptPasswordEncoder();
    }

    /**
     * Configura o gerenciador de autenticação.
     * Responsável por processar tentativas de autenticação.
     *
     * @param config Configuração de autenticação
     * @return Gerenciador de autenticação configurado
     * @throws Exception Se ocorrer um erro durante a configuração
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        // Obtém o gerenciador de autenticação da configuração
        return config.getAuthenticationManager();
    }
}