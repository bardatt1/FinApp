package com.finapp.finapp.controller;

import com.finapp.finapp.dto.CartDto;
import com.finapp.finapp.dto.CartItemDto;
import com.finapp.finapp.payload.ApiResponse;
import com.finapp.finapp.service.CartService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping
    public ResponseEntity<ApiResponse<?>> get(@AuthenticationPrincipal UserDetails principal) {
        try {
            CartDto cart = cartService.getCart(principal.getUsername());
            return ResponseEntity.ok(ApiResponse.success("Cart", cart));
        } catch (Exception ex) {
            return com.finapp.finapp.exception.GlobalExceptionHandler.errorResponseEntity(ex.getMessage(), org.springframework.http.HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<ApiResponse<?>> add(@AuthenticationPrincipal UserDetails principal,
                                              @Valid @RequestBody CartItemDto request) {
        try {
            CartDto cart = cartService.addItem(principal.getUsername(), request);
            return ResponseEntity.ok(ApiResponse.success("Item added", cart));
        } catch (Exception ex) {
            return com.finapp.finapp.exception.GlobalExceptionHandler.errorResponseEntity(ex.getMessage(), org.springframework.http.HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<ApiResponse<?>> update(@AuthenticationPrincipal UserDetails principal,
                                                 @Valid @RequestBody CartItemDto request) {
        try {
            CartDto cart = cartService.updateItem(principal.getUsername(), request);
            return ResponseEntity.ok(ApiResponse.success("Item updated", cart));
        } catch (Exception ex) {
            return com.finapp.finapp.exception.GlobalExceptionHandler.errorResponseEntity(ex.getMessage(), org.springframework.http.HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<ApiResponse<?>> remove(@AuthenticationPrincipal UserDetails principal,
                                                 @PathVariable Long productId) {
        try {
            CartDto cart = cartService.removeItem(principal.getUsername(), productId);
            return ResponseEntity.ok(ApiResponse.success("Item removed", cart));
        } catch (Exception ex) {
            return com.finapp.finapp.exception.GlobalExceptionHandler.errorResponseEntity(ex.getMessage(), org.springframework.http.HttpStatus.BAD_REQUEST);
        }
    }
}



