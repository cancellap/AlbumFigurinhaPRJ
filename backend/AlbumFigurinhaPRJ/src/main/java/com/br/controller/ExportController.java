package com.br.controller;

import com.br.model.AlbumExport;
import com.br.service.ExportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/export")
@CrossOrigin(origins = "*")
public class ExportController {

    @Autowired
    private ExportService exportService;

    // exporta o álbum e retorna info do export
    @PostMapping
    public ResponseEntity<?> exportar() {
        try {
            AlbumExport export = exportService.exportar();
            return ResponseEntity.ok(
                "Export realizado com sucesso! " +
                export.getTotalFigurinhas() + " figurinhas exportadas em " +
                export.getExportadoEm()
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // importa o álbum do arquivo binário
    @PostMapping("/import")
    public ResponseEntity<?> importar() {
        try {
            AlbumExport export = exportService.importar();
            return ResponseEntity.ok(
                "Import realizado com sucesso! " +
                export.getTotalFigurinhas() + " figurinhas importadas de " +
                export.getExportadoEm()
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // faz download do arquivo binário
    @GetMapping("/download")
    public ResponseEntity<byte[]> download() {
        try {
            if (!exportService.exportExists()) {
                return ResponseEntity.notFound().build();
            }

            byte[] arquivo = Files.readAllBytes(Paths.get("export/album.bin"));

            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=\"album.bin\"")
                    .body(arquivo);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // verifica se existe arquivo de export
    @GetMapping("/status")
    public ResponseEntity<String> status() {
        if (exportService.exportExists()) {
            return ResponseEntity.ok("Arquivo de export disponível em export/album.bin");
        }
        return ResponseEntity.ok("Nenhum export encontrado");
    }
}