package com.orthomoveis.estoque.controller;

import com.orthomoveis.estoque.model.Produto;
import com.orthomoveis.estoque.service.ProdutoService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    private final ProdutoService service;

    public ProdutoController(ProdutoService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Produto> criar(@RequestBody @Valid Produto produto) {
        return ResponseEntity.ok(service.salvar(produto));
    }

    @GetMapping
    public ResponseEntity<List<Produto>> listarTodos() {
        return ResponseEntity.ok(service.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produto> atualizar(@PathVariable Long id, @RequestBody @Valid Produto produto) {
        return ResponseEntity.ok(service.atualizar(id, produto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        service.remover(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/valor-total-estoque")
    public ResponseEntity<BigDecimal> calcularValorTotalEmEstoque() {
        return ResponseEntity.ok(service.calcularValorTotalEmEstoque());
    }

    @GetMapping("/total-produtos-estocados")
    public ResponseEntity<Integer> calcularTotalProdutosEstocados() {
        return ResponseEntity.ok(service.calcularTotalProdutosEstocados());
    }

    @GetMapping("/total-produtos-encomendados")
    public ResponseEntity<Integer> calcularTotalProdutosEncomendados() {
        return ResponseEntity.ok(service.calcularTotalProdutosEncomendados());
    }

    @GetMapping("/produto-mais-caro")
    public ResponseEntity<String> buscarProdutoMaisCaro() {
        return ResponseEntity.ok(service.buscarProdutoMaisCaro());
    }

    @GetMapping("/produto-maior-estoque")
    public ResponseEntity<String> buscarProdutoMaiorEstoque() {
        return ResponseEntity.ok(service.buscarProdutoMaiorEstoque());
    }

    @GetMapping("/produto-maior-encomenda")
    public ResponseEntity<String> buscarProdutoMaiorEncomenda() {
        return ResponseEntity.ok(service.buscarProdutoMaiorEncomenda());
    }
}
