package com.sistemadesaude.backend.security;

import com.sistemadesaude.backend.model.Operador;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class UserDetailsImpl implements UserDetails {

    private final Operador operador;

    public UserDetailsImpl(Operador operador) {
        this.operador = operador;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Adapte isso se quiser usar perfis como ROLE_ADMIN, etc.
        return Collections.emptyList();
    }

    @Override
    public String getPassword() {
        return operador.getSenha();
    }

    @Override
    public String getUsername() {
        return operador.getLogin();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
