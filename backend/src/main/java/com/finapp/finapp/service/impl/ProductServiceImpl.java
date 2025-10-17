package com.finapp.finapp.service.impl;

import com.finapp.finapp.dto.*;
import com.finapp.finapp.entity.Category;
import com.finapp.finapp.entity.Product;
import com.finapp.finapp.repository.CategoryRepository;
import com.finapp.finapp.repository.ProductRepository;
import com.finapp.finapp.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<ProductDto> list(String q, String category) {
        return productRepository.search(nullIfBlank(q), nullIfBlank(category))
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public ProductDto get(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));
        return toDto(product);
    }

    @Override
    @Transactional
    public ProductDto create(ProductCreateRequestDto request) {
        Category category = getOrCreateCategory(request.category());
        Product p = new Product();
        p.setName(request.name());
        p.setDescription(request.description());
        p.setPrice(request.price());
        p.setImageUrl(request.imageUrl());
        p.setCategory(category);
        productRepository.save(p);
        return toDto(p);
    }

    @Override
    @Transactional
    public ProductDto update(Long id, ProductUpdateRequestDto request) {
        Product p = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));
        Category category = getOrCreateCategory(request.category());
        p.setName(request.name());
        p.setDescription(request.description());
        p.setPrice(request.price());
        p.setImageUrl(request.imageUrl());
        p.setCategory(category);
        return toDto(productRepository.save(p));
    }

    @Override
    public void delete(Long id) {
        if (!productRepository.existsById(id)) {
            throw new IllegalArgumentException("Product not found");
        }
        productRepository.deleteById(id);
    }

    private ProductDto toDto(Product p) {
        String categoryName = p.getCategory() != null ? p.getCategory().getName() : null;
        return new ProductDto(p.getId(), p.getName(), p.getDescription(), p.getPrice(), p.getImageUrl(), categoryName);
    }

    private Category getOrCreateCategory(String name) {
        return categoryRepository.findByName(name)
                .orElseGet(() -> {
                    Category c = new Category();
                    c.setName(name);
                    return categoryRepository.save(c);
                });
    }

    private String nullIfBlank(String s) {
        return (s == null || s.isBlank()) ? null : s;
    }
}



