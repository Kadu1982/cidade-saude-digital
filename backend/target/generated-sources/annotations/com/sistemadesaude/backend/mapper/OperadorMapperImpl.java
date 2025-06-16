package com.sistemadesaude.backend.mapper;

import com.sistemadesaude.backend.dto.OperadorDTO;
import com.sistemadesaude.backend.model.Operador;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-16T01:55:38-0300",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.12 (Azul Systems, Inc.)"
)
@Component
public class OperadorMapperImpl implements OperadorMapper {

    @Override
    public OperadorDTO toDTO(Operador operador) {
        if ( operador == null ) {
            return null;
        }

        OperadorDTO.OperadorDTOBuilder operadorDTO = OperadorDTO.builder();

        operadorDTO.id( operador.getId() );
        operadorDTO.login( operador.getLogin() );
        operadorDTO.nome( operador.getNome() );
        operadorDTO.cargo( operador.getCargo() );
        operadorDTO.cpf( operador.getCpf() );
        List<String> list = operador.getPerfis();
        if ( list != null ) {
            operadorDTO.perfis( new ArrayList<String>( list ) );
        }
        operadorDTO.isMaster( operador.getIsMaster() );

        operadorDTO.unidadeId( operador.getUnidade() != null ? operador.getUnidade().getId() : null );
        operadorDTO.nomeUnidade( operador.getUnidade() != null ? operador.getUnidade().getNome() : null );
        operadorDTO.unidadeAtualId( operador.getUnidadeAtual() != null ? operador.getUnidadeAtual().getId() : null );
        operadorDTO.nomeUnidadeAtual( operador.getUnidadeAtual() != null ? operador.getUnidadeAtual().getNome() : null );

        return operadorDTO.build();
    }

    @Override
    public Operador toEntity(OperadorDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Operador.OperadorBuilder operador = Operador.builder();

        operador.id( dto.getId() );
        operador.login( dto.getLogin() );
        operador.senha( dto.getSenha() );
        operador.nome( dto.getNome() );
        operador.cargo( dto.getCargo() );
        operador.cpf( dto.getCpf() );
        List<String> list = dto.getPerfis();
        if ( list != null ) {
            operador.perfis( new ArrayList<String>( list ) );
        }
        operador.isMaster( dto.getIsMaster() );

        return operador.build();
    }

    @Override
    public void updateEntityFromDTO(OperadorDTO dto, Operador operador) {
        if ( dto == null ) {
            return;
        }

        operador.setLogin( dto.getLogin() );
        operador.setNome( dto.getNome() );
        operador.setCargo( dto.getCargo() );
        operador.setCpf( dto.getCpf() );
        if ( operador.getPerfis() != null ) {
            List<String> list = dto.getPerfis();
            if ( list != null ) {
                operador.getPerfis().clear();
                operador.getPerfis().addAll( list );
            }
            else {
                operador.setPerfis( null );
            }
        }
        else {
            List<String> list = dto.getPerfis();
            if ( list != null ) {
                operador.setPerfis( new ArrayList<String>( list ) );
            }
        }
        operador.setIsMaster( dto.getIsMaster() );
    }
}
