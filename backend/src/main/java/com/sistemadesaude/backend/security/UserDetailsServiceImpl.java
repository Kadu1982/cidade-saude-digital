package com.sistemadesaude.backend.security;

import com.sistemadesaude.backend.model.Operador;
import com.sistemadesaude.backend.repository.OperadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private OperadorRepository operadorRepository;

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        Operador operador = operadorRepository.findByLogin(login)
                .orElseThrow(() -> new UsernameNotFoundException("Operador não encontrado: " + login));

        return org.springframework.security.core.userdetails.User.builder()
                .username(operador.getLogin())
                .password(operador.getSenha())
                .roles(operador.getPerfis().toArray(new String[0]))
                .build();
    }
}
