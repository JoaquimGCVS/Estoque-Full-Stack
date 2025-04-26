package com.orthomoveis.estoque.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;

@Entity
@Table(name = "produtos", uniqueConstraints = @UniqueConstraint(columnNames = "codigoProduto"))
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O nome é obrigatório.")
    private String nome;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "A categoria é obrigatória.")
    private Categoria categoria;

    private int quantidadeEstocada = 0;

    private int quantidadeEncomendada = 0;

    @NotNull(message = "O valor unitário é obrigatório.")
    @DecimalMin(value = "0.0", inclusive = false, message = "O valor unitário deve ser maior que zero.")
    private BigDecimal valorUnitario;

    @Column(nullable = false, unique = true)
    @NotBlank(message = "O código do produto é obrigatório.")
    private String codigoProduto;

    // Getters e Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public int getQuantidadeEstocada() {
        return quantidadeEstocada;
    }

    public void setQuantidadeEstocada(int quantidadeEstocada) {
        this.quantidadeEstocada = quantidadeEstocada;
    }

    public int getQuantidadeEncomendada() {
        return quantidadeEncomendada;
    }

    public void setQuantidadeEncomendada(int quantidadeEncomendada) {
        this.quantidadeEncomendada = quantidadeEncomendada;
    }

    public BigDecimal getValorUnitario() {
        return valorUnitario;
    }

    public void setValorUnitario(BigDecimal valorUnitario) {
        this.valorUnitario = valorUnitario;
    }

    public String getCodigoProduto() {
        return codigoProduto;
    }

    public void setCodigoProduto(String codigoProduto) {
        this.codigoProduto = codigoProduto;
    }
}
