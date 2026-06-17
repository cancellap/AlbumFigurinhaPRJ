package com.br.service;

import com.br.model.Collection;
import com.br.model.CollectionResponse;
import com.br.model.Sticker;
import com.br.model.User;
import com.br.repository.CollectionRepository;
import com.br.repository.StickerRepository;
import com.br.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CollectionService {

    @Autowired
    private CollectionRepository collectionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StickerRepository stickerRepository;

    // lista todas as figurinhas do usuário
    public List<CollectionResponse> listarPorUsuario(Long userId) {
        User user = buscarUsuario(userId);
        return collectionRepository.findByUser(user)
                .stream()
                .map(CollectionResponse::new)
                .collect(Collectors.toList());
    }

    // lista figurinhas do usuário por página
    public List<CollectionResponse> listarPorPagina(Long userId, Integer pagina) {
        User user = buscarUsuario(userId);
        //debug
        List<Collection> todas = collectionRepository.findByUser(user);
        System.out.println("Total na coleção: " + todas.size());
        todas.forEach(c -> System.out.println(
            "Sticker: " + c.getSticker().getNome() + 
            " | Pagina: " + c.getSticker().getPagina()
        ));
        return collectionRepository.findByUserAndPagina(user, pagina)
                .stream()
                .map(CollectionResponse::new)
                .collect(Collectors.toList());
    }
    
    // adiciona figurinha à coleção
    public CollectionResponse adicionar(Long userId, Long stickerId) {
        User user = buscarUsuario(userId);
        Sticker sticker = buscarFigurinha(stickerId);

        if (collectionRepository.existsByUserAndSticker(user, sticker)) {
            throw new RuntimeException("Figurinha já está na coleção");
        }

        Collection collection = new Collection();
        collection.setUser(user);
        collection.setSticker(sticker);

        return new CollectionResponse(collectionRepository.save(collection));
    }

    // remove figurinha da coleção
    public void remover(Long userId, Long stickerId) {
        User user = buscarUsuario(userId);
        Sticker sticker = buscarFigurinha(stickerId);

        Collection collection = collectionRepository
                .findByUserAndSticker(user, sticker)
                .orElseThrow(() -> new RuntimeException("Figurinha não está na coleção"));

        collectionRepository.delete(collection);
    }

    // verifica se usuário tem a figurinha
    public boolean possui(Long userId, Long stickerId) {
        User user = buscarUsuario(userId);
        Sticker sticker = buscarFigurinha(stickerId);
        return collectionRepository.existsByUserAndSticker(user, sticker);
    }

    private User buscarUsuario(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado: " + userId));
    }

    private Sticker buscarFigurinha(Long stickerId) {
        return stickerRepository.findById(stickerId)
                .orElseThrow(() -> new RuntimeException("Figurinha não encontrada: " + stickerId));
    }
}