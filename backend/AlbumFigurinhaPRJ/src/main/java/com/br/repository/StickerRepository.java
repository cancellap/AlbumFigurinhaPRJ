package com.br.repository;

import com.br.model.Sticker;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface StickerRepository extends JpaRepository<Sticker, Long> {
    List<Sticker> findByNomeContainingIgnoreCase(String nome);
    List<Sticker> findByPagina(Integer pagina);
    boolean existsByNumero(Integer numero);
    Optional<Sticker> findByTag(String tag);
}