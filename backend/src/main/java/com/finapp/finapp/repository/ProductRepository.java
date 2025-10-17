package com.finapp.finapp.repository;

import com.finapp.finapp.entity.Product;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @EntityGraph(attributePaths = {"category"})
    @Query("SELECT p FROM Product p WHERE (:q IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :q, '%'))) AND (:category IS NULL OR LOWER(p.category.name) = LOWER(:category))")
    List<Product> search(@Param("q") String q, @Param("category") String category);
}



