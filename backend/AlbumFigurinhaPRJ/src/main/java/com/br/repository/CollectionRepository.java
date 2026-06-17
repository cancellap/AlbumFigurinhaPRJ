package com.br.repository;

import com.br.model.Collection;
import com.br.model.User;
import com.br.model.Sticker;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CollectionRepository extends JpaRepository<Collection, Long> {
    List<Collection> findByUser(User user);
    @Query("SELECT c FROM Collection c WHERE c.user = :user AND c.sticker.pagina = :pagina")
    List<Collection> findByUserAndPagina(@Param("user") User user, @Param("pagina") Integer pagina);
    Optional<Collection> findByUserAndSticker(User user, Sticker sticker);
    boolean existsByUserAndSticker(User user, Sticker sticker);
}