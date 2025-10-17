package com.finapp.finapp.dto;

import jakarta.validation.constraints.NotEmpty;
import java.util.List;

public record OrderCreateRequestDto(
        @NotEmpty List<CartItemDto> items
) {}



