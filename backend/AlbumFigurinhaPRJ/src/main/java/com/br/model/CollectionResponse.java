package com.br.model;

public class CollectionResponse {
    private Long id;
    private Long userId;
    private String userNome;
    private Long stickerId;
    private Integer stickerNumero;
    private String stickerNome;
    private Integer stickerPagina;
    private String stickerTag;

    public CollectionResponse(Collection c) {
        this.id = c.getId();
        this.userId = c.getUser().getId();
        this.userNome = c.getUser().getNome();
        this.stickerId = c.getSticker().getId();
        this.stickerNumero = c.getSticker().getNumero();
        this.stickerNome = c.getSticker().getNome();
        this.stickerPagina = c.getSticker().getPagina();
        this.stickerTag = c.getSticker().getTag();
    }

    public Long getId() { return id; }
    public Long getUserId() { return userId; }
    public String getUserNome() { return userNome; }
    public Long getStickerId() { return stickerId; }
    public Integer getStickerNumero() { return stickerNumero; }
    public String getStickerNome() { return stickerNome; }
    public Integer getStickerPagina() { return stickerPagina; }
    public String getStickerTag() { return stickerTag; }
}