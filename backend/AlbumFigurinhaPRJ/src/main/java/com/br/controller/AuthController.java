package com.br.controller;


import com.br.model.LoginRequest;
import com.br.model.LoginResponse;
import com.br.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            LoginResponse response = authService.login(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }
    
    @GetMapping("/audit-log")
    public ResponseEntity<String> lerLog() {
        try {
            String conteudo = new String(
                java.nio.file.Files.readAllBytes(java.nio.file.Paths.get("logs/audit.log"))
            );
            return ResponseEntity.ok(conteudo);
        } catch (Exception e) {
            return ResponseEntity.ok("Nenhum log encontrado.");
        }
    }
}