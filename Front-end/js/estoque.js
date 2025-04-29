document.addEventListener("DOMContentLoaded", async () => {
    const cardsContainer = document.getElementById("cardsContainer");
    const searchBar = document.getElementById("searchBar");

    let produtos = [];

    try {
        // Realiza a requisição GET para buscar os produtos
        const response = await fetch("http://localhost:8080/produtos");
        if (!response.ok) {
            throw new Error("Erro ao buscar produtos");
        }

        produtos = await response.json();

        // Ordena os produtos em ordem alfabética pelo nome
        produtos.sort((a, b) => a.nome.localeCompare(b.nome));

        // Função para renderizar os produtos
        const renderProdutos = (produtosFiltrados) => {
            cardsContainer.innerHTML = ""; // Limpa os cards existentes
            produtosFiltrados.forEach(produto => {
                const card = document.createElement("div");
                card.className = "card";

                card.innerHTML = `
                    <div class="card__header">
                        <h3>${produto.nome}</h3>
                        <button id="excluir__produto" class="excluirProduto" data-id="${produto.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                    <div class="linha2"></div>
                    <p><strong>Categoria</strong>: ${produto.categoria}</p>
                    <p><strong>Valor Unitário</strong>: R$ ${produto.valorUnitario.toFixed(2)}</p>
                    <p><strong>Estocado</strong>: ${produto.quantidadeEstocada}</p>
                    <div class="botoes__card">
                        <button id="verDetalhes" class="verDetalhes" data-id="${produto.id}">
                            <i class="fas fa-info-circle"></i> Detalhes
                        </button>
                        <button id="editarProduto" data-id="${produto.id}">
                            <i class="fas fa-edit"></i> Editar
                        </button>
                    </div>
                `;

                cardsContainer.appendChild(card);
            });
        };

        // Renderiza todos os produtos inicialmente
        renderProdutos(produtos);

        // Adiciona o evento de entrada na barra de pesquisa
        searchBar.addEventListener("input", (event) => {
            const searchTerm = event.target.value.toLowerCase();
            const produtosFiltrados = produtos.filter(produto =>
                produto.nome.toLowerCase().includes(searchTerm)
            );
            renderProdutos(produtosFiltrados);
        });

        // Adiciona o evento de clique para excluir o produto
        cardsContainer.addEventListener("click", async (event) => {
            if (event.target.classList.contains("excluirProduto")) {
                const produtoId = event.target.getAttribute("data-id");

                if (confirm("Tem certeza que deseja excluir este produto?")) {
                    try {
                        const deleteResponse = await fetch(`http://localhost:8080/produtos/${produtoId}`, {
                            method: "DELETE",
                        });

                        if (deleteResponse.ok) {
                            alert("Produto excluído com sucesso!");
                            // Remove o card do DOM
                            event.target.closest(".card").remove();
                        } else {
                            alert("Erro ao excluir o produto.");
                        }
                    } catch (error) {
                        console.error("Erro ao excluir o produto:", error);
                        alert("Erro ao conectar com o servidor.");
                    }
                }
            }
        });
    } catch (error) {
        console.error("Erro ao carregar os produtos:", error);
        cardsContainer.innerHTML = "<p>Erro ao carregar os produtos.</p>";
    }
});