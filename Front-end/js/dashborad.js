//PRIMEIRA LINHA

document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Fetch para obter o valor total em estoque
        const valorTotalResponse = await fetch("http://localhost:8080/produtos/valor-total-estoque");
        const valorTotal = await valorTotalResponse.json();
        document.getElementById("valorTotalEstoque").textContent = `R$ ${valorTotal.toFixed(2)}`;

        // Fetch para obter o total de produtos em estoque
        const totalProdutosResponse = await fetch("http://localhost:8080/produtos/total-produtos-estocados");
        const totalProdutos = await totalProdutosResponse.json();
        document.getElementById("totalProdutosEstoque").textContent = totalProdutos;

        // Fetch para obter o total de produtos encomendados
        const totalProdutosEncomendadosResponse = await fetch("http://localhost:8080/produtos/total-produtos-encomendados");
        const totalProdutosEncomendados = await totalProdutosEncomendadosResponse.json();
        document.getElementById("totalProdutosEncomendados").textContent = totalProdutosEncomendados;
    } catch (error) {
        console.error("Erro ao carregar os dados do dashboard:", error);
    }
});

//SEGUNDA LINHA

// Função para formatar os textos dos enums
function formatarTextoEnum(texto) {
    return texto
        .toLowerCase() // Converte para minúsculas
        .replace(/_/g, " ") // Substitui underscores por espaços
        .replace(/\b\w/g, (letra) => letra.toUpperCase()); // Capitaliza a primeira letra de cada palavra
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Fetch para obter o produto mais caro
        const produtoMaisCaroResponse = await fetch("http://localhost:8080/produtos/produto-mais-caro");
        const produtoMaisCaro = await produtoMaisCaroResponse.text();
        document.getElementById("produtoMaisCaro").textContent = produtoMaisCaro;

        // Fetch para obter o produto mais estocado
        const produtoMaisEstocadoResponse = await fetch("http://localhost:8080/produtos/produto-maior-estoque");
        const produtoMaisEstocado = await produtoMaisEstocadoResponse.text();
        document.getElementById("produtoMaisEstocado").textContent = produtoMaisEstocado;

        // Fetch para obter o produto mais encomendado
        const produtoMaisEncomendadoResponse = await fetch("http://localhost:8080/produtos/produto-maior-encomenda");
        const produtoMaisEncomendado = await produtoMaisEncomendadoResponse.text();
        document.getElementById("produtoMaisEncomendado").textContent = produtoMaisEncomendado;

        // Fetch para obter o total de produtos cadastrados
        const totalProdutosCadastradosResponse = await fetch("http://localhost:8080/produtos");
        const totalProdutosCadastrados = await totalProdutosCadastradosResponse.json();
        document.getElementById("totalProdutosCadastrados").textContent = totalProdutosCadastrados.length;
    } catch (error) {
        console.error("Erro ao carregar os dados da visão geral:", error);
    }
});

document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Fetch para obter os produtos
        const response = await fetch("http://localhost:8080/produtos");
        const produtos = await response.json();

        // Agrupa os produtos por categoria
        const categorias = produtos.reduce((acc, produto) => {
            acc[produto.categoria] = (acc[produto.categoria] || 0) + produto.quantidadeEstocada;
            return acc;
        }, {});

        // Prepara os dados para o gráfico
        const labels = Object.keys(categorias).map(formatarTextoEnum); // Formata os textos
        const data = Object.values(categorias);

        // Configura o gráfico de pizza
        const ctx = document.getElementById("graficoCategorias").getContext("2d");
        new Chart(ctx, {
            type: "pie",
            data: {
                labels: labels,
                datasets: [{
                    label: "Distribuição de Categorias",
                    data: data,
                    backgroundColor: [
                        "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false // Oculta a legenda do gráfico
                    },
                    tooltip: {
                        callbacks: {
                            label: function (tooltipItem) {
                                const total = data.reduce((sum, value) => sum + value, 0);
                                const percentage = ((tooltipItem.raw / total) * 100).toFixed(2);
                                return `${tooltipItem.label}: ${tooltipItem.raw} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });

        // Preenche os dados escritos ao lado do gráfico
        const dadosCategorias = document.getElementById("dadosCategorias");
        Object.keys(categorias).forEach((categoria, index) => {
            const total = data.reduce((sum, value) => sum + value, 0);
            const percentage = ((data[index] / total) * 100).toFixed(2);
            const li = document.createElement("li");
            li.textContent = `${formatarTextoEnum(categoria)}: ${data[index]} (${percentage}%)`;
            dadosCategorias.appendChild(li);
        });
    } catch (error) {
        console.error("Erro ao carregar os dados do gráfico:", error);
    }
});