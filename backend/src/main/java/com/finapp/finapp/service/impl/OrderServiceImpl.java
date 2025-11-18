package com.finapp.finapp.service.impl;

import com.finapp.finapp.dto.OrderCreateRequestDto;
import com.finapp.finapp.dto.OrderDto;
import com.finapp.finapp.dto.OrderItemDto;
import com.finapp.finapp.entity.*;
import com.finapp.finapp.repository.OrderRepository;
import com.finapp.finapp.repository.ProductRepository;
import com.finapp.finapp.repository.UserRepository;
import com.finapp.finapp.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private com.finapp.finapp.repository.CartRepository cartRepository;

    @Override
    @Transactional
    public OrderDto placeOrder(String email, OrderCreateRequestDto request) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("User not found"));
        if (request.items() == null || request.items().isEmpty()) {
            throw new IllegalArgumentException("No items to order");
        }
        Order order = new Order();
        order.setUser(user);
        double total = 0.0;
        for (var item : request.items()) {
            Product product = productRepository.findById(item.productId())
                    .orElseThrow(() -> new IllegalArgumentException("Product not found"));
            OrderItem oi = new OrderItem();
            oi.setOrder(order);
            oi.setProduct(product);
            oi.setQuantity(item.quantity());
            oi.setPrice(product.getPrice());
            order.getItems().add(oi);
            total += product.getPrice() * item.quantity();
        }
        order.setTotal(total);
        OrderDto orderDto = toDto(orderRepository.save(order));
        
        // Clear the user's cart after order is placed
        cartRepository.findByUserId(user.getId()).ifPresent(cart -> {
            cart.getItems().clear();
            cartRepository.save(cart);
        });
        
        return orderDto;
    }

    @Override
    public List<OrderDto> myOrders(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("User not found"));
        return orderRepository.findByUserId(user.getId()).stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public OrderDto get(String email, Long id) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("User not found"));
        Order order = orderRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Order not found"));
        if (!order.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("Forbidden");
        }
        return toDto(order);
    }

    @Override
    @Transactional
    public void cancelOrder(String email, Long id) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("User not found"));
        Order order = orderRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Order not found"));
        
        // Verify order belongs to user
        if (!order.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("Forbidden");
        }
        
        // Only allow cancellation of orders that are PLACED
        if (!"PLACED".equalsIgnoreCase(order.getStatus())) {
            throw new IllegalArgumentException("Only PLACED orders can be cancelled");
        }
        
        // Update order status to CANCELLED
        order.setStatus("CANCELLED");
        orderRepository.save(order);
    }

    private OrderDto toDto(Order order) {
        List<OrderItemDto> items = order.getItems().stream().map(oi -> new OrderItemDto(
                oi.getProduct().getId(),
                oi.getProduct().getName(),
                oi.getQuantity(),
                oi.getPrice()
        )).collect(Collectors.toList());
        return new OrderDto(order.getId(), items, order.getTotal(), order.getStatus(), order.getCreatedAt());
    }
}



