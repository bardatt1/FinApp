package com.finapp.finapp.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record ProductUpdateRequestDto(
        @NotBlank String name,
        String description,
        @NotNull @Positive Double price,
        String imageUrl,
        @NotBlank String category
) {}



