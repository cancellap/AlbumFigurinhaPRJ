package com.br.model;

import jakarta.persistence.*;

@Entity
@Table(name = "collections",
       uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "sticker_id"}))
public class Collection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "sticker_id", nullable = false)
    private Sticker sticker;

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Sticker getSticker() { return sticker; }
    public void setSticker(Sticker sticker) { this.sticker = sticker; }
}