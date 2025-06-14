package com.sistemadesaude.backend.mapper;

import com.sistemadesaude.backend.dto.OperadorDTO;
import com.sistemadesaude.backend.model.Operador;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface OperadorMapper {

    // Entidade → DTO (simplificado)
    @Mapping(target = "senha", ignore = true) // Nunca enviar senha para o frontend
    @Mapping(target = "unidadeId", expression = "java(operador.getUnidade() != null ? operador.getUnidade().getId() : null)")
    @Mapping(target = "nomeUnidade", expression = "java(operador.getUnidade() != null ? operador.getUnidade().getNome() : null)")
    @Mapping(target = "unidadeAtualId", expression = "java(operador.getUnidadeAtual() != null ? operador.getUnidadeAtual().getId() : null)")
    @Mapping(target = "nomeUnidadeAtual", expression = "java(operador.getUnidadeAtual() != null ? operador.getUnidadeAtual().getNome() : null)")
    OperadorDTO toDTO(Operador operador);

    // DTO → Entidade (simplificado)
    @Mapping(target = "unidade", ignore = true) // Será definido manualmente no service
    @Mapping(target = "unidadeAtual", ignore = true) // Será definido manualmente no service
    @Mapping(target = "templateId", ignore = true)
    Operador toEntity(OperadorDTO dto);

    // Método auxiliar para atualizar entidade existente
    @Mapping(target = "id", ignore = true) // Não alterar ID
    @Mapping(target = "senha", ignore = true) // Senha será tratada separadamente
    @Mapping(target = "unidade", ignore = true) // Será definido manualmente no service
    @Mapping(target = "unidadeAtual", ignore = true) // Será definido manualmente no service
    @Mapping(target = "templateId", ignore = true)
    void updateEntityFromDTO(OperadorDTO dto, @MappingTarget Operador operador);
}