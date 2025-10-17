package com.finapp.finapp.dto;

import java.util.Set;

public record UserDto(
        Long id,
        String fullName,
        String email,
        Set<String> roles
) {}



