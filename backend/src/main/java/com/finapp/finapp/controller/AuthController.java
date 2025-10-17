package com.finapp.finapp.controller;

import com.finapp.finapp.dto.*;
import com.finapp.finapp.payload.ApiResponse;
import com.finapp.finapp.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<?>> register(@Valid @RequestBody RegisterRequestDto request) {
        try {
            AuthResponseDto response = authService.register(request);
            return ResponseEntity.ok(ApiResponse.success("Registered successfully", response));
        } catch (Exception ex) {
            return com.finapp.finapp.exception.GlobalExceptionHandler.errorResponseEntity(ex.getMessage(), org.springframework.http.HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<?>> login(@Valid @RequestBody LoginRequestDto request) {
        try {
            AuthResponseDto response = authService.login(request);
            return ResponseEntity.ok(ApiResponse.success("Logged in successfully", response));
        } catch (Exception ex) {
            return com.finapp.finapp.exception.GlobalExceptionHandler.errorResponseEntity(ex.getMessage(), org.springframework.http.HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<?>> me(@AuthenticationPrincipal UserDetails principal) {
        try {
            if (principal == null) {
                throw new IllegalArgumentException("Unauthorized");
            }
            UserDto user = authService.me(principal.getUsername());
            return ResponseEntity.ok(ApiResponse.success("Profile", user));
        } catch (Exception ex) {
            return com.finapp.finapp.exception.GlobalExceptionHandler.errorResponseEntity(ex.getMessage(), org.springframework.http.HttpStatus.UNAUTHORIZED);
        }
    }
}



