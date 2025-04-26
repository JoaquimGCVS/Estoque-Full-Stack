package com.orthomoveis.estoque.repository;

import com.orthomoveis.estoque.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    Optional<Produto> findByCodigoProduto(String codigoProduto);
    boolean existsByCodigoProduto(String codigoProduto);
}
