package com.br.utils;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;

public class JwtUtil {

    private static final String SECRET = "album-figurinhas-secret-key-2026-segura";
    private static final long EXPIRACAO = 1000 * 60 * 60 * 8; // 8 horas
    private static final Key KEY = Keys.hmacShaKeyFor(SECRET.getBytes());

    public static String gerarToken(String nome, String perfil) {
        return Jwts.builder()
                .subject(nome)
                .claim("perfil", perfil)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + EXPIRACAO))
                .signWith(KEY)
                .compact();
    }

    public static Claims validarToken(String token) {
        return Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(SECRET.getBytes()))
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public static String extrairNome(String token) {
        return validarToken(token).getSubject();
    }

    public static String extrairPerfil(String token) {
        return validarToken(token).get("perfil", String.class);
    }
}