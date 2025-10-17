package com.finapp.finapp.controller;

import com.finapp.finapp.dto.UserDto;
import com.finapp.finapp.payload.ApiResponse;
import com.finapp.finapp.repository.OrderRepository;
import com.finapp.finapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping("/users")
    public ResponseEntity<ApiResponse<?>> users() {
        try {
            List<UserDto> users = userRepository.findAll().stream().map(u -> new UserDto(
                    u.getId(), u.getFullName(), u.getEmail(), u.getRoles().stream().map(r -> r.getName()).collect(Collectors.toSet())
            )).collect(Collectors.toList());
            return ResponseEntity.ok(ApiResponse.success("Users", users));
        } catch (Exception ex) {
            return com.finapp.finapp.exception.GlobalExceptionHandler.errorResponseEntity(ex.getMessage(), org.springframework.http.HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<ApiResponse<?>> delete(@PathVariable Long id) {
        try {
            userRepository.deleteById(id);
            return ResponseEntity.ok(ApiResponse.success("User deleted", null));
        } catch (Exception ex) {
            return com.finapp.finapp.exception.GlobalExceptionHandler.errorResponseEntity(ex.getMessage(), org.springframework.http.HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/orders")
    public ResponseEntity<ApiResponse<?>> orders() {
        try {
            var orders = orderRepository.findAll();
            return ResponseEntity.ok(ApiResponse.success("Orders", orders));
        } catch (Exception ex) {
            return com.finapp.finapp.exception.GlobalExceptionHandler.errorResponseEntity(ex.getMessage(), org.springframework.http.HttpStatus.BAD_REQUEST);
        }
    }
}



