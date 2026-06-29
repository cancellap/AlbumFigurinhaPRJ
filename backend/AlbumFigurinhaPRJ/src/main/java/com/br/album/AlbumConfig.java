package com.br.album;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;

public class AlbumConfig {

    private static final String FILE_NAME = "album-config.json";

    private static final ObjectMapper mapper =
            new ObjectMapper();

    private String nomeAlbum;

    private String descricao;

    private String corPrimaria;

    private String corSecundaria;

    private String fonte;

    private boolean mostrarNumero;

    private boolean mostrarDescricao;

    public AlbumConfig() {

        nomeAlbum = "Meu Álbum";
        descricao = "";
        corPrimaria = "#1565C0";
        corSecundaria = "#FFD600";
        fonte = "Oswald";
        mostrarNumero = true;
        mostrarDescricao = false;

    }

    public static AlbumConfig carregar() {

        File file = new File(FILE_NAME);

        if (!file.exists()) {

            AlbumConfig config =
                    new AlbumConfig();

            salvar(config);

            return config;

        }

        try {

            return mapper.readValue(
                    file,
                    AlbumConfig.class
            );

        } catch (IOException e) {

            return new AlbumConfig();

        }

    }

    public static void salvar(
            AlbumConfig config
    ) {

        try {

            mapper.writerWithDefaultPrettyPrinter()
                    .writeValue(
                            new File(FILE_NAME),
                            config
                    );

        } catch (IOException e) {

            throw new RuntimeException(e);

        }

    }

    public String getNomeAlbum() {
        return nomeAlbum;
    }

    public void setNomeAlbum(String nomeAlbum) {
        this.nomeAlbum = nomeAlbum;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getCorPrimaria() {
        return corPrimaria;
    }

    public void setCorPrimaria(String corPrimaria) {
        this.corPrimaria = corPrimaria;
    }

    public String getCorSecundaria() {
        return corSecundaria;
    }

    public void setCorSecundaria(String corSecundaria) {
        this.corSecundaria = corSecundaria;
    }

    public String getFonte() {
        return fonte;
    }

    public void setFonte(String fonte) {
        this.fonte = fonte;
    }

    public boolean isMostrarNumero() {
        return mostrarNumero;
    }

    public void setMostrarNumero(boolean mostrarNumero) {
        this.mostrarNumero = mostrarNumero;
    }

    public boolean isMostrarDescricao() {
        return mostrarDescricao;
    }

    public void setMostrarDescricao(boolean mostrarDescricao) {
        this.mostrarDescricao = mostrarDescricao;
    }

}