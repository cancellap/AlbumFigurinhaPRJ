package com.br.service;


import com.br.model.LoginRequest;
import com.br.model.LoginResponse;
import com.br.model.User;
import com.br.repository.UserRepository;
import com.br.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public LoginResponse login(LoginRequest request) {
        // busca usuário pelo nome
        List<User> usuarios = userRepository
                .findByNomeContainingIgnoreCase(request.getNome());

        User user = usuarios.stream()
                .filter(u -> u.getNome().equalsIgnoreCase(request.getNome()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        // valida senha
        if (!user.getSenha().equals(request.getSenha())) {
            throw new RuntimeException("Senha incorreta");
        }

        // gera token JWT
        String token = JwtUtil.gerarToken(user.getNome(), user.getPerfil().name());

        return new LoginResponse(user.getId(), user.getNome(), user.getPerfil(), token);
    }
}