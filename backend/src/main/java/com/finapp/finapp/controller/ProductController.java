package com.finapp.finapp.controller;

import com.finapp.finapp.dto.*;
import com.finapp.finapp.payload.ApiResponse;
import com.finapp.finapp.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<ApiResponse<?>> list(@RequestParam(required = false) String q,
                                               @RequestParam(required = false) String category) {
        try {
            List<ProductDto> products = productService.list(q, category);
            return ResponseEntity.ok(ApiResponse.success("Products", products));
        } catch (Exception ex) {
            return com.finapp.finapp.exception.GlobalExceptionHandler.errorResponseEntity(ex.getMessage(), org.springframework.http.HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> get(@PathVariable Long id) {
        try {
            ProductDto product = productService.get(id);
            return ResponseEntity.ok(ApiResponse.success("Product", product));
        } catch (Exception ex) {
            return com.finapp.finapp.exception.GlobalExceptionHandler.errorResponseEntity(ex.getMessage(), org.springframework.http.HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<ApiResponse<?>> create(@Valid @RequestBody ProductCreateRequestDto request) {
        try {
            ProductDto product = productService.create(request);
            return ResponseEntity.ok(ApiResponse.success("Product created", product));
        } catch (Exception ex) {
            return com.finapp.finapp.exception.GlobalExceptionHandler.errorResponseEntity(ex.getMessage(), org.springframework.http.HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> update(@PathVariable Long id, @Valid @RequestBody ProductUpdateRequestDto request) {
        try {
            ProductDto product = productService.update(id, request);
            return ResponseEntity.ok(ApiResponse.success("Product updated", product));
        } catch (Exception ex) {
            return com.finapp.finapp.exception.GlobalExceptionHandler.errorResponseEntity(ex.getMessage(), org.springframework.http.HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> delete(@PathVariable Long id) {
        try {
            productService.delete(id);
            return ResponseEntity.ok(ApiResponse.success("Product deleted", null));
        } catch (Exception ex) {
            return com.finapp.finapp.exception.GlobalExceptionHandler.errorResponseEntity(ex.getMessage(), org.springframework.http.HttpStatus.BAD_REQUEST);
        }
    }
}



