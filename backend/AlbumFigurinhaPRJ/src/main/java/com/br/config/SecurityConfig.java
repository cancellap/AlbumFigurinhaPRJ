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
                // rotas públicas
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/swagger-ui/**", "/api-docs/**").permitAll()
                // rotas protegidas por perfil
                .requestMatchers("/api/users/**").hasRole("ADMIN")
                .requestMatchers("/api/collection/**").hasAnyRole("COLECIONADOR", "ADMIN")
                .requestMatchers("/api/stickers/**").hasAnyRole("AUTOR", "COLECIONADOR", "ADMIN")
                .anyRequest().authenticated()
            )
            .addFilterBefore(new JwtFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
//	@Bean
//	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//	    http
//	        .csrf(csrf -> csrf.disable())
//	        .authorizeHttpRequests(auth -> auth
//	            .anyRequest().permitAll() // libera tudo temporariamente
//	        )
//	        .addFilterBefore(new JwtFilter(), UsernamePasswordAuthenticationFilter.class);
//
//	    return http.build();
//	}
}