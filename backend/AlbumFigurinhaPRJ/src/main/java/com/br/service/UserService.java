package com.br.service;

import com.br.model.Profile;
import com.br.model.User;
import com.br.utils.*;
import com.br.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    public List<User> listarTodos() {
        return repository.findAll();
    }

    public List<User> filtrarPorNome(String nome) {
        return repository.findByNomeContainingIgnoreCase(nome);
    }

    public List<User> filtrarPorPerfil(Profile perfil) {
        return repository.findByPerfil(perfil);
    }

    public User buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado: " + id));
    }

    public User salvar(User user) {
        User salvo = repository.save(user);
        AuditLogUtil.log("ADMIN", "CRIOU_USUARIO: " + user.getNome() + " [" + user.getPerfil() + "]");
        return salvo;
    }

    public User editar(Long id, User dados) {
        User user = buscarPorId(id);
        user.setNome(dados.getNome());
        user.setSenha(dados.getSenha());
        user.setPerfil(dados.getPerfil());
        User salvo = repository.save(user);
        AuditLogUtil.log("ADMIN", "EDITOU_USUARIO: " + user.getNome());
        return salvo;
    }

    public void deletar(Long id) {
        User user = buscarPorId(id);
        repository.deleteById(id);
        AuditLogUtil.log("ADMIN", "REMOVEU_USUARIO: " + user.getNome());
    }

    public User resetarSenha(Long id) {
        User user = buscarPorId(id);
        user.setSenha("123456");
        User salvo = repository.save(user);
        AuditLogUtil.log("ADMIN", "RESETOU_SENHA: " + user.getNome());
        return salvo;
    }
}