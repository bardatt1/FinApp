package com.finapp.finapp.dto;

import java.util.List;

public record CartDto(
        Long id,
        List<CartLine> items,
        Double total
) {
    public static record CartLine(
            Long productId,
            String name,
            String category,
            Double price,
            int quantity,
            Double lineTotal
    ) {}
}



