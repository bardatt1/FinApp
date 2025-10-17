package com.finapp.finapp.dto;

import java.time.Instant;
import java.util.List;

public record OrderDto(
        Long id,
        List<OrderItemDto> items,
        Double total,
        String status,
        Instant createdAt
) {}



