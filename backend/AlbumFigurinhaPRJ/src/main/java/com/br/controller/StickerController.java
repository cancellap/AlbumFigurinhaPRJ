package com.br.controller;

import com.br.model.Sticker;
import com.br.service.StickerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/stickers")
@CrossOrigin(origins = "*")
public class StickerController {

    @Autowired
    private StickerService service;

    // Listar todas ou filtrar
    @GetMapping
    public List<Sticker> listar(
            @RequestParam(required = false) String nome,
            @RequestParam(required = false) Integer pagina) {

        if (nome != null) return service.filtrarPorNome(nome);
        if (pagina != null) return service.filtrarPorPagina(pagina);
        return service.listarTodos();
    }

    // Buscar por ID
    @GetMapping("/{id}")
    public ResponseEntity<Sticker> buscar(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

 // Criar figurinha com foto
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Sticker> criar(
            @RequestParam("numero") Integer numero,
            @RequestParam("nome") String nome,
            @RequestParam(value = "descricao", required = false) String descricao,
            @RequestParam("pagina") Integer pagina,
            @RequestParam(value = "foto", required = false) MultipartFile foto) {

        Sticker sticker = new Sticker();
        sticker.setNumero(numero);
        sticker.setNome(nome);
        sticker.setDescricao(descricao);
        sticker.setPagina(pagina);

        return ResponseEntity.ok(service.salvar(sticker, foto));
    }

    // Editar figurinha
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Sticker> editar(
            @PathVariable Long id,
            @RequestParam("numero") Integer numero,
            @RequestParam("nome") String nome,
            @RequestParam(value = "descricao", required = false) String descricao,
            @RequestParam("pagina") Integer pagina,
            @RequestParam(value = "foto", required = false) MultipartFile foto) {

        Sticker dados = new Sticker();
        dados.setNumero(numero);
        dados.setNome(nome);
        dados.setDescricao(descricao);
        dados.setPagina(pagina);

        return ResponseEntity.ok(service.editar(id, dados, foto));
    }

    // Deletar figurinha
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }

    // Buscar foto da figurinha
    @GetMapping("/{id}/foto")
    public ResponseEntity<byte[]> foto(@PathVariable Long id) {
        byte[] foto = service.buscarFoto(id);
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(foto);
    }
}