package com.br.controller;

import com.br.album.AlbumConfig;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/album/config")
@CrossOrigin(origins = "*")
public class AlbumConfigController {

    @GetMapping
    public AlbumConfig buscar() {

        return AlbumConfig.carregar();

    }

    @PutMapping
    public AlbumConfig salvar(
            @RequestBody AlbumConfig config
    ) {

        AlbumConfig.salvar(config);

        return config;

    }

}