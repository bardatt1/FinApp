package com.finapp.finapp.service;

import com.finapp.finapp.dto.CartDto;
import com.finapp.finapp.dto.CartItemDto;

public interface CartService {
    CartDto getCart(String email);
    CartDto addItem(String email, CartItemDto item);
    CartDto updateItem(String email, CartItemDto item);
    CartDto removeItem(String email, Long productId);
}



