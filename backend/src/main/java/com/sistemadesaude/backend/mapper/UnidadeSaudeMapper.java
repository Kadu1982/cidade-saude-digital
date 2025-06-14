package com.sistemadesaude.backend.mapper;

import com.sistemadesaude.backend.dto.UnidadeSaudeDTO;
import com.sistemadesaude.backend.model.UnidadeSaude;
import org.springframework.stereotype.Component;

/**
 * Mapper responsável por converter entre UnidadeSaude e UnidadeSaudeDTO.
 */
@Component
public class UnidadeSaudeMapper {

    /**
     * Converte uma entidade UnidadeSaude para DTO.
     * @param unidadeSaude entidade original
     * @return DTO com dados essenciais
     */
    public UnidadeSaudeDTO toDTO(UnidadeSaude unidadeSaude) {
        if (unidadeSaude == null) {
            return null;
        }

        return UnidadeSaudeDTO.builder()
                .id(unidadeSaude.getId())
                .nome(unidadeSaude.getNome())
                .codigoCnes(unidadeSaude.getCodigoCnes())
                .build();
    }

    /**
     * Converte um DTO para entidade UnidadeSaude.
     * @param dto objeto com dados recebidos da camada externa
     * @return entidade pronta para persistência ou atualização
     */
    public UnidadeSaude toEntity(UnidadeSaudeDTO dto) {
        if (dto == null) {
            return null;
        }

        UnidadeSaude unidade = new UnidadeSaude();
        unidade.setId(dto.getId());
        unidade.setNome(dto.getNome());
        unidade.setCodigoCnes(dto.getCodigoCnes());
        return unidade;
    }
}
