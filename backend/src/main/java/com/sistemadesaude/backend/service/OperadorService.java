package com.sistemadesaude.backend.service;

import com.sistemadesaude.backend.dto.OperadorDTO;
import com.sistemadesaude.backend.exception.CredenciaisInvalidasException;
import com.sistemadesaude.backend.mapper.OperadorMapper;
import com.sistemadesaude.backend.model.Operador;
import com.sistemadesaude.backend.model.UnidadeSaude;
import com.sistemadesaude.backend.repository.OperadorRepository;
import com.sistemadesaude.backend.repository.UnidadeSaudeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OperadorService {

    private final OperadorRepository operadorRepository;
    private final UnidadeSaudeRepository unidadeSaudeRepository;
    private final OperadorMapper operadorMapper;
    private final PasswordEncoder passwordEncoder;

    /**
     * Autentica um operador a partir do login e senha.
     * Se o operador for "master", ele será autenticado independentemente da senha.
     */
    public Operador autenticar(String login, String senha) {
        Operador operador = operadorRepository.findByLogin(login)
                .orElseThrow(() -> new CredenciaisInvalidasException("Operador não encontrado."));

        if (operador == null) {
            throw new CredenciaisInvalidasException("Operador não encontrado.");
        }

        // ✅ Bypass especial para Operador Master
        if (operador.getIsMaster() != null && operador.getIsMaster()) { // CORRIGIDO: getIsMaster() com null check
            return operador;
        }

        // Verificação padrão para operadores normais
        if (!passwordEncoder.matches(senha, operador.getSenha())) {
            throw new CredenciaisInvalidasException("Senha inválida.");
        }

        return operador;
    }

    // ... resto do código permanece igual ...

    /**
     * Busca todos os operadores
     */
    public List<OperadorDTO> listarTodos() {
        return operadorRepository.findAll()
                .stream()
                .map(operadorMapper::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * Busca operador por ID
     */
    public Optional<OperadorDTO> buscarPorId(Long id) {
        return operadorRepository.findById(id)
                .map(operadorMapper::toDTO);
    }

    /**
     * Busca operador por login
     */
    public Optional<OperadorDTO> buscarPorLogin(String login) {
        return operadorRepository.findByLogin(login)
                .map(operadorMapper::toDTO);
    }

    /**
     * Salva um novo operador
     */
    @Transactional
    public OperadorDTO salvar(OperadorDTO dto) {
        // Validar se login já existe
        if (operadorRepository.existsByLogin(dto.getLogin())) {
            throw new IllegalArgumentException("Login já existe: " + dto.getLogin());
        }

        // Converter DTO para entidade
        Operador operador = operadorMapper.toEntity(dto);

        // Definir unidades se fornecidas
        if (dto.getUnidadeId() != null) {
            UnidadeSaude unidade = unidadeSaudeRepository.findById(dto.getUnidadeId())
                    .orElseThrow(() -> new IllegalArgumentException("Unidade não encontrada: " + dto.getUnidadeId()));
            operador.setUnidade(unidade);
        }

        if (dto.getUnidadeAtualId() != null) {
            UnidadeSaude unidadeAtual = unidadeSaudeRepository.findById(dto.getUnidadeAtualId())
                    .orElseThrow(() -> new IllegalArgumentException("Unidade atual não encontrada: " + dto.getUnidadeAtualId()));
            operador.setUnidadeAtual(unidadeAtual);
        }

        // Criptografar senha se fornecida
        if (dto.getSenha() != null && !dto.getSenha().isEmpty()) {
            operador.setSenha(passwordEncoder.encode(dto.getSenha()));
        }

        // Salvar
        Operador salvo = operadorRepository.save(operador);
        return operadorMapper.toDTO(salvo);
    }

    /**
     * Atualiza um operador existente
     */
    @Transactional
    public OperadorDTO atualizar(Long id, OperadorDTO dto) {
        Operador operadorExistente = operadorRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Operador não encontrado: " + id));

        // Verificar se o login não está sendo usado por outro operador
        if (!operadorExistente.getLogin().equals(dto.getLogin()) &&
                operadorRepository.existsByLogin(dto.getLogin())) {
            throw new IllegalArgumentException("Login já existe: " + dto.getLogin());
        }

        // Atualizar campos básicos
        operadorMapper.updateEntityFromDTO(dto, operadorExistente);

        // Definir unidades se fornecidas
        if (dto.getUnidadeId() != null) {
            UnidadeSaude unidade = unidadeSaudeRepository.findById(dto.getUnidadeId())
                    .orElseThrow(() -> new IllegalArgumentException("Unidade não encontrada: " + dto.getUnidadeId()));
            operadorExistente.setUnidade(unidade);
        }

        if (dto.getUnidadeAtualId() != null) {
            UnidadeSaude unidadeAtual = unidadeSaudeRepository.findById(dto.getUnidadeAtualId())
                    .orElseThrow(() -> new IllegalArgumentException("Unidade atual não encontrada: " + dto.getUnidadeAtualId()));
            operadorExistente.setUnidadeAtual(unidadeAtual);
        }

        // Atualizar senha se fornecida
        if (dto.getSenha() != null && !dto.getSenha().isEmpty()) {
            operadorExistente.setSenha(passwordEncoder.encode(dto.getSenha()));
        }

        // Salvar
        Operador atualizado = operadorRepository.save(operadorExistente);
        return operadorMapper.toDTO(atualizado);
    }

    /**
     * Deleta um operador
     */
    @Transactional
    public void deletar(Long id) {
        if (!operadorRepository.existsById(id)) {
            throw new IllegalArgumentException("Operador não encontrado: " + id);
        }
        operadorRepository.deleteById(id);
    }
}