package com.br.model;

import java.io.Serializable;
import java.util.List;

public class AlbumExport implements Serializable {

    private static final long serialVersionUID = 1L;

    private String exportadoEm;
    private int totalFigurinhas;
    private List<Sticker> figurinhas;

    public AlbumExport(String exportadoEm, List<Sticker> figurinhas) {
        this.exportadoEm = exportadoEm;
        this.figurinhas = figurinhas;
        this.totalFigurinhas = figurinhas.size();
    }

    public String getExportadoEm() { return exportadoEm; }
    public int getTotalFigurinhas() { return totalFigurinhas; }
    public List<Sticker> getFigurinhas() { return figurinhas; }
}