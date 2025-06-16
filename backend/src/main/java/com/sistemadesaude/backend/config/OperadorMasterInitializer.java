package com.sistemadesaude.backend.config;

import com.sistemadesaude.backend.model.Operador;
import com.sistemadesaude.backend.model.UnidadeSaude;
import com.sistemadesaude.backend.repository.OperadorRepository;
import com.sistemadesaude.backend.repository.UnidadeSaudeRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class OperadorMasterInitializer {

    private final OperadorRepository operadorRepository;
    private final UnidadeSaudeRepository unidadeSaudeRepository;
    private final PasswordEncoder passwordEncoder;

    @PostConstruct
    @Transactional
    public void init() {
        // Verifica se o operador master já existe para não recriá-lo
        if (!operadorRepository.existsByLogin("admin.master")) {

            // 1. Garante que a unidade de saúde padrão exista
            UnidadeSaude unidadePadrao = criarOuBuscarUnidadePadrao();

            // 2. Cria o operador master com a senha codificada
            Operador operador = Operador.builder()
                    .login("admin.master")
                    .senha(passwordEncoder.encode("Admin@123")) // Senha criptografada
                    .nome("Administrador Master")
                    .cargo("Administrador do Sistema")
                    .cpf("00000000000")
                    .perfis(List.of("ADMINISTRADOR_SISTEMA"))
                    .unidade(unidadePadrao)
                    .unidadeAtual(unidadePadrao)
                    .isMaster(true)
                    .build();

            operadorRepository.save(operador);

            System.out.println(">>> Operador master criado com sucesso.");
            System.out.println(">>> Login: admin.master");
            System.out.println(">>> Senha: Admin@123");
        }
    }

    private UnidadeSaude criarOuBuscarUnidadePadrao() {
        // Busca a unidade padrão pelo código CNES ou a cria se não existir
        return unidadeSaudeRepository.findByCodigoCnes("0000001")
                .orElseGet(() -> {
                    UnidadeSaude unidade = UnidadeSaude.builder()
                            .nome("Unidade de Saúde Padrão")
                            .codigoCnes("0000001")
                            .build();

                    UnidadeSaude unidadeSalva = unidadeSaudeRepository.save(unidade);
                    System.out.println(">>> Unidade de saúde padrão criada com ID: " + unidadeSalva.getId());
                    return unidadeSalva;
                });
    }
}