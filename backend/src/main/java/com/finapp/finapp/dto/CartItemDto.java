package com.finapp.finapp.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record CartItemDto(
        @NotNull Long productId,
        @Min(1) int quantity
) {}



