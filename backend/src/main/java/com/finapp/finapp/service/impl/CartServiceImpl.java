package com.finapp.finapp.service.impl;

import com.finapp.finapp.dto.CartDto;
import com.finapp.finapp.dto.CartItemDto;
import com.finapp.finapp.entity.Cart;
import com.finapp.finapp.entity.CartItem;
import com.finapp.finapp.entity.Product;
import com.finapp.finapp.entity.User;
import com.finapp.finapp.repository.CartRepository;
import com.finapp.finapp.repository.ProductRepository;
import com.finapp.finapp.repository.UserRepository;
import com.finapp.finapp.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    @Transactional
    public CartDto getCart(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("User not found"));
        Cart cart = cartRepository.findByUserId(user.getId()).orElseGet(() -> createCart(user));
        return toDto(cart);
    }

    @Override
    @Transactional
    public CartDto addItem(String email, CartItemDto itemDto) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("User not found"));
        Cart cart = cartRepository.findByUserId(user.getId()).orElseGet(() -> createCart(user));
        Product product = productRepository.findById(itemDto.productId()).orElseThrow(() -> new IllegalArgumentException("Product not found"));
        Optional<CartItem> existing = cart.getItems().stream().filter(ci -> ci.getProduct().getId().equals(product.getId())).findFirst();
        if (existing.isPresent()) {
            existing.get().setQuantity(existing.get().getQuantity() + Math.max(1, itemDto.quantity()));
        } else {
            CartItem ci = new CartItem();
            ci.setCart(cart);
            ci.setProduct(product);
            ci.setQuantity(Math.max(1, itemDto.quantity()));
            cart.getItems().add(ci);
        }
        return toDto(cartRepository.save(cart));
    }

    @Override
    @Transactional
    public CartDto updateItem(String email, CartItemDto itemDto) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("User not found"));
        Cart cart = cartRepository.findByUserId(user.getId()).orElseThrow(() -> new IllegalArgumentException("Cart not found"));
        Product product = productRepository.findById(itemDto.productId()).orElseThrow(() -> new IllegalArgumentException("Product not found"));
        CartItem existing = cart.getItems().stream().filter(ci -> ci.getProduct().getId().equals(product.getId())).findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Item not in cart"));
        existing.setQuantity(Math.max(1, itemDto.quantity()));
        return toDto(cartRepository.save(cart));
    }

    @Override
    @Transactional
    public CartDto removeItem(String email, Long productId) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("User not found"));
        Cart cart = cartRepository.findByUserId(user.getId()).orElseThrow(() -> new IllegalArgumentException("Cart not found"));
        List<CartItem> retained = cart.getItems().stream().filter(ci -> !ci.getProduct().getId().equals(productId)).collect(Collectors.toList());
        cart.getItems().clear();
        cart.getItems().addAll(retained);
        return toDto(cartRepository.save(cart));
    }

    private Cart createCart(User user) {
        Cart cart = new Cart();
        cart.setUser(user);
        cart.setItems(new ArrayList<>());
        return cartRepository.save(cart);
    }

    private CartDto toDto(Cart cart) {
        List<CartDto.CartLine> lines = cart.getItems().stream().map(ci -> {
            Product p = ci.getProduct();
            String cat = p.getCategory() != null ? p.getCategory().getName() : null;
            double lineTotal = p.getPrice() * ci.getQuantity();
            return new CartDto.CartLine(p.getId(), p.getName(), cat, p.getPrice(), ci.getQuantity(), lineTotal);
        }).collect(Collectors.toList());
        double total = lines.stream().mapToDouble(CartDto.CartLine::lineTotal).sum();
        return new CartDto(cart.getId(), lines, total);
    }
}



