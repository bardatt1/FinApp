package com.finapp.finapp.dto;

public record ProductDto(
        Long id,
        String name,
        String description,
        Double price,
        String imageUrl,
        String category
) {}



