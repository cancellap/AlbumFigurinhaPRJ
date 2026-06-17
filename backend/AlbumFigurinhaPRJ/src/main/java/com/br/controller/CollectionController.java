package com.br.controller;

import com.br.model.CollectionResponse;
import com.br.service.CollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/collection")
@CrossOrigin(origins = "*")
public class CollectionController {

    @Autowired
    private CollectionService service;

    // lista todas as figurinhas do usuário
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CollectionResponse>> listar(@PathVariable Long userId) {
        return ResponseEntity.ok(service.listarPorUsuario(userId));
    }

    // lista figurinhas do usuário por página do álbum
    @GetMapping("/user/{userId}/pagina/{pagina}")
    public ResponseEntity<List<CollectionResponse>> listarPorPagina(
            @PathVariable Long userId,
            @PathVariable Integer pagina) {
        return ResponseEntity.ok(service.listarPorPagina(userId, pagina));
    }

    // adiciona figurinha à coleção
    @PostMapping("/user/{userId}/sticker/{stickerId}")
    public ResponseEntity<?> adicionar(
            @PathVariable Long userId,
            @PathVariable Long stickerId) {
        try {
            return ResponseEntity.ok(service.adicionar(userId, stickerId));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // remove figurinha da coleção
    @DeleteMapping("/user/{userId}/sticker/{stickerId}")
    public ResponseEntity<?> remover(
            @PathVariable Long userId,
            @PathVariable Long stickerId) {
        try {
            service.remover(userId, stickerId);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // verifica se usuário possui a figurinha
    @GetMapping("/user/{userId}/sticker/{stickerId}/possui")
    public ResponseEntity<Boolean> possui(
            @PathVariable Long userId,
            @PathVariable Long stickerId) {
        return ResponseEntity.ok(service.possui(userId, stickerId));
    }
}