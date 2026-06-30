package com.br.service;


import com.br.model.AlbumExport;
import com.br.model.Sticker;
import com.br.repository.StickerRepository;
import com.br.utils.AuditLogUtil;
import com.br.utils.BinaryUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class ExportService {

    @Autowired
    private StickerRepository stickerRepository;


    // exporta todas as figurinhas para arquivo binário
    public AlbumExport exportar() {
        List<Sticker> figurinhas = stickerRepository.findAll();
        String agora = LocalDateTime.now()
                .format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        AlbumExport export = new AlbumExport(agora, figurinhas);
        BinaryUtil.exportar(export);
        AuditLogUtil.log("SISTEMA", "EXPORT_BINARIO: " + figurinhas.size() + " figurinhas");
        return export;
    }

    // importa figurinhas do arquivo binário e salva no banco
    public AlbumExport importar() {
        AlbumExport export = BinaryUtil.importar();

        for (Sticker sticker : export.getFigurinhas()) {
            // só importa se não existir no banco
            if (!stickerRepository.existsByNumero(sticker.getNumero())) {
                sticker.setId(null); // reseta o id para o banco gerar um novo
                stickerRepository.save(sticker);
            }
        }

        AuditLogUtil.log("SISTEMA", "IMPORT_BINARIO: " + export.getTotalFigurinhas() + " figurinhas");
        return export;
    }

    // verifica se existe arquivo de export
    public boolean exportExists() {
        return BinaryUtil.exportExists();
    }
}