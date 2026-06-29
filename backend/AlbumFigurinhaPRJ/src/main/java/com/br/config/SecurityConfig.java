package com.br.config;

import com.br.filter.JwtFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

    http
        .csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(auth -> auth

            // Públicas
            .requestMatchers("/api/auth/**").permitAll()
            .requestMatchers("/swagger-ui/**", "/swagger-ui.html", "/api-docs/**").permitAll()

            // Configuração do álbum (temporariamente pública)
            .requestMatchers("/api/album/config").permitAll()

            // Usuários
            .requestMatchers("/api/users/**").hasRole("ADMIN")

            // Coleção
            .requestMatchers("/api/collection/**")
                .hasAnyRole("COLECIONADOR", "ADMIN")

            // Figurinhas
            .requestMatchers("/api/stickers/**")
                .hasAnyRole("AUTOR", "COLECIONADOR", "ADMIN")

            // Todas as demais
            .anyRequest().authenticated()

        )
        .addFilterBefore(
            new JwtFilter(),
            UsernamePasswordAuthenticationFilter.class
        );

    return http.build();
}

}