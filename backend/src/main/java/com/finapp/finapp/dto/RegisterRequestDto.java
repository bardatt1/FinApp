package com.finapp.finapp.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequestDto(
        @NotBlank @Size(min = 2, max = 100) String fullName,
        @NotBlank @Email String email,
        @NotBlank @Size(min = 6, max = 100) String password
) {
    public RegisterRequestDto {
        // compact constructor for validation already via annotations
    }
}



