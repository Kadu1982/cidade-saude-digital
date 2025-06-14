package com.sistemadesaude.backend.mapper;

import com.sistemadesaude.backend.dto.PacienteDTO;
import com.sistemadesaude.backend.model.Paciente;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-14T01:41:38-0300",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.12 (Azul Systems, Inc.)"
)
@Component
public class PacienteMapperImpl implements PacienteMapper {

    @Override
    public PacienteDTO toDto(Paciente paciente) {
        if ( paciente == null ) {
            return null;
        }

        PacienteDTO.PacienteDTOBuilder pacienteDTO = PacienteDTO.builder();

        pacienteDTO.id( paciente.getId() );
        pacienteDTO.nomeCompleto( paciente.getNomeCompleto() );
        pacienteDTO.cpf( paciente.getCpf() );
        pacienteDTO.justificativaAusenciaCpf( paciente.getJustificativaAusenciaCpf() );
        pacienteDTO.cns( paciente.getCns() );
        pacienteDTO.sexo( paciente.getSexo() );
        pacienteDTO.dataNascimento( paciente.getDataNascimento() );
        pacienteDTO.acamado( paciente.getAcamado() );
        pacienteDTO.domiciliado( paciente.getDomiciliado() );
        pacienteDTO.condSaudeMental( paciente.getCondSaudeMental() );
        pacienteDTO.usaPlantas( paciente.getUsaPlantas() );
        pacienteDTO.outrasCondicoes( paciente.getOutrasCondicoes() );
        pacienteDTO.municipio( paciente.getMunicipio() );
        pacienteDTO.cep( paciente.getCep() );
        pacienteDTO.logradouro( paciente.getLogradouro() );
        pacienteDTO.numero( paciente.getNumero() );
        pacienteDTO.bairro( paciente.getBairro() );
        pacienteDTO.complemento( paciente.getComplemento() );
        pacienteDTO.telefoneCelular( paciente.getTelefoneCelular() );
        pacienteDTO.telefoneContato( paciente.getTelefoneContato() );
        pacienteDTO.tipoSanguineo( paciente.getTipoSanguineo() );
        pacienteDTO.cbo( paciente.getCbo() );
        pacienteDTO.rg( paciente.getRg() );
        pacienteDTO.orgaoEmissor( paciente.getOrgaoEmissor() );
        pacienteDTO.certidaoNascimento( paciente.getCertidaoNascimento() );
        pacienteDTO.carteiraTrabalho( paciente.getCarteiraTrabalho() );
        pacienteDTO.tituloEleitor( paciente.getTituloEleitor() );
        pacienteDTO.prontuarioFamiliar( paciente.getProntuarioFamiliar() );
        pacienteDTO.corRaca( paciente.getCorRaca() );
        pacienteDTO.etnia( paciente.getEtnia() );
        pacienteDTO.escolaridade( paciente.getEscolaridade() );
        pacienteDTO.situacaoFamiliar( paciente.getSituacaoFamiliar() );

        return pacienteDTO.build();
    }

    @Override
    public Paciente toEntity(PacienteDTO pacienteDTO) {
        if ( pacienteDTO == null ) {
            return null;
        }

        Paciente.PacienteBuilder paciente = Paciente.builder();

        paciente.id( pacienteDTO.getId() );
        paciente.nomeCompleto( pacienteDTO.getNomeCompleto() );
        paciente.cpf( pacienteDTO.getCpf() );
        paciente.justificativaAusenciaCpf( pacienteDTO.getJustificativaAusenciaCpf() );
        paciente.cns( pacienteDTO.getCns() );
        paciente.sexo( pacienteDTO.getSexo() );
        paciente.dataNascimento( pacienteDTO.getDataNascimento() );
        paciente.acamado( pacienteDTO.getAcamado() );
        paciente.domiciliado( pacienteDTO.getDomiciliado() );
        paciente.condSaudeMental( pacienteDTO.getCondSaudeMental() );
        paciente.usaPlantas( pacienteDTO.getUsaPlantas() );
        paciente.outrasCondicoes( pacienteDTO.getOutrasCondicoes() );
        paciente.municipio( pacienteDTO.getMunicipio() );
        paciente.cep( pacienteDTO.getCep() );
        paciente.logradouro( pacienteDTO.getLogradouro() );
        paciente.numero( pacienteDTO.getNumero() );
        paciente.bairro( pacienteDTO.getBairro() );
        paciente.complemento( pacienteDTO.getComplemento() );
        paciente.telefoneCelular( pacienteDTO.getTelefoneCelular() );
        paciente.telefoneContato( pacienteDTO.getTelefoneContato() );
        paciente.tipoSanguineo( pacienteDTO.getTipoSanguineo() );
        paciente.cbo( pacienteDTO.getCbo() );
        paciente.rg( pacienteDTO.getRg() );
        paciente.orgaoEmissor( pacienteDTO.getOrgaoEmissor() );
        paciente.certidaoNascimento( pacienteDTO.getCertidaoNascimento() );
        paciente.carteiraTrabalho( pacienteDTO.getCarteiraTrabalho() );
        paciente.tituloEleitor( pacienteDTO.getTituloEleitor() );
        paciente.prontuarioFamiliar( pacienteDTO.getProntuarioFamiliar() );
        paciente.corRaca( pacienteDTO.getCorRaca() );
        paciente.etnia( pacienteDTO.getEtnia() );
        paciente.escolaridade( pacienteDTO.getEscolaridade() );
        paciente.situacaoFamiliar( pacienteDTO.getSituacaoFamiliar() );

        return paciente.build();
    }
}
