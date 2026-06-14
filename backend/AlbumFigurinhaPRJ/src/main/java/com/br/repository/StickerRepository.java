package com.br.repository;

import com.br.model.Sticker;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StickerRepository extends JpaRepository<Sticker, Long> {
    List<Sticker> findByNomeContainingIgnoreCase(String nome);
    List<Sticker> findByPagina(Integer pagina);
    boolean existsByNumero(Integer numero);
}