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

        // Agora, simplesmente retornamos a nossa implementação customizada de UserDetails
        return new UserDetailsImpl(operador);
    }
}