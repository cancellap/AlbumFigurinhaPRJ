package com.br.model;

public class LoginResponse {
    private Long id;
    private String nome;
    private Profile perfil;
    private String token;

    public LoginResponse(Long id, String nome, Profile perfil, String token) {
        this.id = id;
        this.nome = nome;
        this.perfil = perfil;
        this.token = token;
    }

    public Long getId() { return id; }
    public String getNome() { return nome; }
    public Profile getPerfil() { return perfil; }
    public String getToken() { return token; }
}