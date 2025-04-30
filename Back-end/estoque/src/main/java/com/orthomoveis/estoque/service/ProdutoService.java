package com.orthomoveis.estoque.service;

import com.orthomoveis.estoque.model.Produto;
import com.orthomoveis.estoque.repository.ProdutoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;

@Service
public class ProdutoService {

    private final ProdutoRepository repository;

    public ProdutoService(ProdutoRepository repository) {
        this.repository = repository;
    }

    public Produto salvar(Produto produto) {
        if (repository.existsByCodigoProduto(produto.getCodigoProduto())) {
            throw new IllegalArgumentException("Já existe um produto com este código.");
        }
        produto.setUltimoValorUnitario(produto.getValorUnitario()); // Define o último valor como o valor atual
        return repository.save(produto);
    }

    public List<Produto> listarTodos() {
        return repository.findAll();
    }

    public Produto buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Produto não encontrado."));
    }

    public Produto atualizar(Long id, Produto produtoAtualizado) {
        Produto existente = buscarPorId(id);
    
        if (!existente.getCodigoProduto().equals(produtoAtualizado.getCodigoProduto())
                && repository.existsByCodigoProduto(produtoAtualizado.getCodigoProduto())) {
            throw new IllegalArgumentException("Código de produto já cadastrado.");
        }
    
        existente.setUltimoValorUnitario(existente.getValorUnitario()); // Atualiza o último valor com o valor atual
        existente.setNome(produtoAtualizado.getNome());
        existente.setCategoria(produtoAtualizado.getCategoria());
        existente.setQuantidadeEstocada(produtoAtualizado.getQuantidadeEstocada());
        existente.setQuantidadeEncomendada(produtoAtualizado.getQuantidadeEncomendada());
        existente.setValorUnitario(produtoAtualizado.getValorUnitario());
        existente.setCodigoProduto(produtoAtualizado.getCodigoProduto());
    
        return repository.save(existente);
    }

    public void remover(Long id) {
        Produto produto = buscarPorId(id);
        repository.delete(produto);
    }

    public BigDecimal calcularValorTotalEmEstoque() {
        List<Produto> produtos = repository.findAll();
        return produtos.stream()
                .map(p -> p.getValorUnitario().multiply(BigDecimal.valueOf(p.getQuantidadeEstocada())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public int calcularTotalProdutosEstocados() {
        List<Produto> produtos = repository.findAll();
        return produtos.stream()
                .mapToInt(Produto::getQuantidadeEstocada)
                .sum();
    }

    public int calcularTotalProdutosEncomendados() {
        List<Produto> produtos = repository.findAll();
        return produtos.stream()
                .mapToInt(Produto::getQuantidadeEncomendada)
                .sum();
    }

    public String buscarProdutoMaisCaro() {
        return repository.findAll().stream()
                .max(Comparator.comparing(Produto::getValorUnitario))
                .map(p -> p.getNome() + " - R$" + p.getValorUnitario())
                .orElse("Nenhum produto encontrado");
    }

    public String buscarProdutoMaiorEstoque() {
        return repository.findAll().stream()
                .max(Comparator.comparing(Produto::getQuantidadeEstocada))
                .map(p -> p.getNome() + " - Estoque: " + p.getQuantidadeEstocada())
                .orElse("Nenhum produto encontrado");
    }

    public String buscarProdutoMaiorEncomenda() {
        return repository.findAll().stream()
                .max(Comparator.comparing(Produto::getQuantidadeEncomendada))
                .map(p -> p.getNome() + " - Encomendados: " + p.getQuantidadeEncomendada())
                .orElse("Nenhum produto encontrado");
    }
}
