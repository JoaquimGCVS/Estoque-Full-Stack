package com.orthomoveis.estoque.service;

import com.orthomoveis.estoque.model.Produto;
import com.orthomoveis.estoque.repository.ProdutoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

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
        return repository.save(produto);
    }

    public List<Produto> listarTodos() {
        return repository.findAll();
    }

    public Produto buscarPorId(Long id) {
        return repository.findById(id).orElseThrow(() -> new EntityNotFoundException("Produto não encontrado."));
    }

    public Produto atualizar(Long id, Produto produtoAtualizado) {
        Produto existente = buscarPorId(id);

        if (!existente.getCodigoProduto().equals(produtoAtualizado.getCodigoProduto())
                && repository.existsByCodigoProduto(produtoAtualizado.getCodigoProduto())) {
            throw new IllegalArgumentException("Código de produto já cadastrado.");
        }

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
}
