package com.sistemadesaude.backend.mapper;

import com.sistemadesaude.backend.dto.PacienteDTO;
import com.sistemadesaude.backend.model.Paciente;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PacienteMapper {
    PacienteDTO toDto(Paciente paciente);
    Paciente toEntity(PacienteDTO pacienteDTO);
}