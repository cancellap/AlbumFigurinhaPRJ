package com.br.service;


import com.br.model.LoginRequest;
import com.br.model.LoginResponse;
import com.br.model.User;
import com.br.repository.UserRepository;
import com.br.utils.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public LoginResponse login(LoginRequest request) {
        List<User> usuarios = userRepository
                .findByNomeContainingIgnoreCase(request.getNome());

        User user = usuarios.stream()
                .filter(u -> u.getNome().equalsIgnoreCase(request.getNome()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (!user.getSenha().equals(request.getSenha())) {
            AuditLogUtil.log(request.getNome(), "LOGIN_FALHOU");
            throw new RuntimeException("Senha incorreta");
        }

        AuditLogUtil.log(user.getNome(), "LOGIN | perfil: " + user.getPerfil());

        String token = JwtUtil.gerarToken(user.getNome(), user.getPerfil().name());
        return new LoginResponse(user.getId(), user.getNome(), user.getPerfil(), token);
    }
}