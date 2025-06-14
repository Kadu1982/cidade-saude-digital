package com.sistemadesaude.backend.service;

import com.sistemadesaude.backend.dto.UnidadeSaudeDTO;
import com.sistemadesaude.backend.mapper.UnidadeSaudeMapper;
import com.sistemadesaude.backend.model.UnidadeSaude;
import com.sistemadesaude.backend.repository.UnidadeSaudeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UnidadeSaudeService {

    @Autowired
    private UnidadeSaudeRepository unidadeRepo;

    @Autowired
    private UnidadeSaudeMapper unidadeMapper;

    public List<UnidadeSaudeDTO> listarTodas() {
        return unidadeRepo.findAll()
                .stream()
                .map(unidadeMapper::toDTO)
                .toList();
    }

    public UnidadeSaudeDTO buscarPorId(Long id) {
        UnidadeSaude unidade = unidadeRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Unidade não encontrada"));
        return unidadeMapper.toDTO(unidade);
    }

    public UnidadeSaudeDTO criar(UnidadeSaudeDTO dto) {
        UnidadeSaude nova = unidadeMapper.toEntity(dto);
        return unidadeMapper.toDTO(unidadeRepo.save(nova));
    }

    public void deletar(Long id) {
        unidadeRepo.deleteById(id);
    }
}
