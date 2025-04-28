document.addEventListener("DOMContentLoaded", async () => {
    const cardsContainer = document.getElementById("cardsContainer");

    try {
        // Realiza a requisição GET para buscar os produtos
        const response = await fetch("http://localhost:8080/produtos");
        if (!response.ok) {
            throw new Error("Erro ao buscar produtos");
        }

        const produtos = await response.json();

        // Ordena os produtos em ordem alfabética pelo nome
        produtos.sort((a, b) => a.nome.localeCompare(b.nome));

        // Gera os cards dinamicamente
        produtos.forEach(produto => {
            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
                <div class="card__header">
                <h3>${produto.nome}</h3>
                <button class="excluirProduto" data-id="${produto.id}">Excluir</button>
                </div>
                <p>Categoria: ${produto.categoria}</p>
                <p>Preço Unitário: R$ ${produto.valorUnitario.toFixed(2)}</p>
                <p>Estocado: ${produto.quantidadeEstocada}</p>
                <div class="botoes__card">
                <button id="verDetalhes">Detalhes</button>
                <button id="editarProduto" data-id="${produto.id}">Editar</button>
                </div>
            `;

            cardsContainer.appendChild(card);
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