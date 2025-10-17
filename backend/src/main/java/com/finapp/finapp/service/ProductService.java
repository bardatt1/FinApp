package com.finapp.finapp.service;

import com.finapp.finapp.dto.*;

import java.util.List;

public interface ProductService {
    List<ProductDto> list(String q, String category);
    ProductDto get(Long id);
    ProductDto create(ProductCreateRequestDto request);
    ProductDto update(Long id, ProductUpdateRequestDto request);
    void delete(Long id);
}



