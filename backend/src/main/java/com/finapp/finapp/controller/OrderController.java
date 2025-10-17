package com.finapp.finapp.controller;

import com.finapp.finapp.dto.OrderCreateRequestDto;
import com.finapp.finapp.dto.OrderDto;
import com.finapp.finapp.payload.ApiResponse;
import com.finapp.finapp.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<ApiResponse<?>> place(@AuthenticationPrincipal UserDetails principal,
                                                @Valid @RequestBody OrderCreateRequestDto request) {
        try {
            OrderDto order = orderService.placeOrder(principal.getUsername(), request);
            return ResponseEntity.ok(ApiResponse.success("Order placed", order));
        } catch (Exception ex) {
            return com.finapp.finapp.exception.GlobalExceptionHandler.errorResponseEntity(ex.getMessage(), org.springframework.http.HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public ResponseEntity<ApiResponse<?>> myOrders(@AuthenticationPrincipal UserDetails principal) {
        try {
            List<OrderDto> orders = orderService.myOrders(principal.getUsername());
            return ResponseEntity.ok(ApiResponse.success("Orders", orders));
        } catch (Exception ex) {
            return com.finapp.finapp.exception.GlobalExceptionHandler.errorResponseEntity(ex.getMessage(), org.springframework.http.HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> get(@AuthenticationPrincipal UserDetails principal, @PathVariable Long id) {
        try {
            OrderDto order = orderService.get(principal.getUsername(), id);
            return ResponseEntity.ok(ApiResponse.success("Order", order));
        } catch (Exception ex) {
            return com.finapp.finapp.exception.GlobalExceptionHandler.errorResponseEntity(ex.getMessage(), org.springframework.http.HttpStatus.NOT_FOUND);
        }
    }
}



