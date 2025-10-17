package com.finapp.finapp.dto;

public record OrderItemDto(
        Long productId,
        String name,
        int quantity,
        Double price
) {}



