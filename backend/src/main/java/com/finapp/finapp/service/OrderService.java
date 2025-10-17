package com.finapp.finapp.service;

import com.finapp.finapp.dto.OrderCreateRequestDto;
import com.finapp.finapp.dto.OrderDto;

import java.util.List;

public interface OrderService {
    OrderDto placeOrder(String email, OrderCreateRequestDto request);
    List<OrderDto> myOrders(String email);
    OrderDto get(String email, Long id);
}



