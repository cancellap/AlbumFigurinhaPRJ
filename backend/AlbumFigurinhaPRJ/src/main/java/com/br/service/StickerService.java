package com.br.service;

import com.br.model.Sticker;
import com.br.repository.StickerRepository;
import com.br.utils.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class StickerService {

    @Autowired
    private StickerRepository repository;

    public List<Sticker> listarTodos() {
        return repository.findAll();
    }

    public List<Sticker> filtrarPorNome(String nome) {
        return repository.findByNomeContainingIgnoreCase(nome);
    }

    public List<Sticker> filtrarPorPagina(Integer pagina) {
        return repository.findByPagina(pagina);
    }

    public Sticker buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Figurinha não encontrada: " + id));
    }

    public Sticker buscarPorTag(String tag) {
    return repository.findByTag(tag)
            .orElseThrow(() -> new RuntimeException("Figurinha não encontrada."));
    }

    public Sticker salvar(Sticker sticker, MultipartFile foto) {
        try {
            if (foto != null && !foto.isEmpty()) {
                byte[] bytes = foto.getBytes();
                sticker.setFoto(bytes);
                sticker.setTag(Md5Util.calcular(bytes));
            }
            Sticker salvo = repository.save(sticker);
            AuditLogUtil.log("AUTOR", "CRIOU_FIGURINHA: #" + sticker.getNumero() + " " + sticker.getNome());
            return salvo;
        } catch (Exception e) {
            throw new RuntimeException("Erro ao salvar figurinha", e);
        }
    }

    public Sticker editar(Long id, Sticker dados, MultipartFile foto) {
        Sticker sticker = buscarPorId(id);
        sticker.setNumero(dados.getNumero());
        sticker.setNome(dados.getNome());
        sticker.setDescricao(dados.getDescricao());
        sticker.setPagina(dados.getPagina());

        if (foto != null && !foto.isEmpty()) {
            try {
                byte[] bytes = foto.getBytes();
                sticker.setFoto(bytes);
                sticker.setTag(Md5Util.calcular(bytes));
            } catch (Exception e) {
                throw new RuntimeException("Erro ao processar imagem", e);
            }
        }
        Sticker salvo = repository.save(sticker);
        AuditLogUtil.log("AUTOR", "EDITOU_FIGURINHA: #" + sticker.getNumero() + " " + sticker.getNome());
        return salvo;
    }

    public void deletar(Long id) {
        Sticker sticker = buscarPorId(id);
        repository.deleteById(id);
        AuditLogUtil.log("AUTOR", "REMOVEU_FIGURINHA: #" + sticker.getNumero() + " " + sticker.getNome());
    }

    public byte[] buscarFoto(Long id) {
        Sticker sticker = buscarPorId(id);
        return sticker.getFoto();
    }
}