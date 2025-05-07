document.addEventListener("DOMContentLoaded", async () => {
    const cardsContainer = document.getElementById("cardsContainer");
    const searchBar = document.getElementById("searchBar");
    const filtroCategoria = document.getElementById("filtroCategoria");

    let produtos = [];

    // Função para formatar a categoria
    const formatarCategoria = (categoria) => {
        const categoriasFormatadas = {
            "COLCHAO_DE_MOLA": "Colchão de Mola",
            "COLCHAO_DE_ESPUMA": "Colchão de Espuma",
            "TRAVESSEIRO": "Travesseiro",
            "BOX": "Box"
        };

        return categoriasFormatadas[categoria] || categoria; // Retorna o valor formatado ou o original caso não encontre
    };

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
                        <button class="excluir__produto" id="excluir__produto" data-id="${produto.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                    <div class="linha2"></div>
                    <p><strong>Categoria</strong>: ${formatarCategoria(produto.categoria)}</p>
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

                // Adiciona o evento de exclusão ao botão
                card.querySelector(".excluir__produto").addEventListener("click", async (event) => {
                    const produtoId = event.target.closest("button").getAttribute("data-id");
                    if (confirm("Tem certeza que deseja excluir este produto?")) {
                        try {
                            const deleteResponse = await fetch(`http://localhost:8080/produtos/${produtoId}`, {
                                method: "DELETE",
                            });

                            if (deleteResponse.ok) {
                                alert("Produto excluído com sucesso!");
                                // Remove o produto da lista e re-renderiza os produtos
                                produtos = produtos.filter(produto => produto.id !== parseInt(produtoId));
                                renderProdutos(produtos);
                            } else {
                                alert("Erro ao excluir o produto.");
                            }
                        } catch (error) {
                            console.error("Erro ao excluir o produto:", error);
                            alert("Erro ao conectar com o servidor.");
                        }
                    }
                });

                cardsContainer.appendChild(card);
            });
        };

        // Renderiza todos os produtos inicialmente
        renderProdutos(produtos);

        // Função para filtrar os produtos
        const filtrarProdutos = () => {
            const searchTerm = searchBar.value.toLowerCase();
            const categoriaSelecionada = filtroCategoria.value;

            const produtosFiltrados = produtos.filter(produto => {
                const nomeIncluiTermo = produto.nome.toLowerCase().includes(searchTerm);
                const categoriaCorreta = categoriaSelecionada === "TODAS" || produto.categoria === categoriaSelecionada;
                return nomeIncluiTermo && categoriaCorreta;
            });

            renderProdutos(produtosFiltrados);
        };

        // Adiciona eventos de entrada na barra de pesquisa e mudança no filtro
        searchBar.addEventListener("input", filtrarProdutos);
        filtroCategoria.addEventListener("change", filtrarProdutos);

    } catch (error) {
        console.error("Erro ao carregar os produtos:", error);
        cardsContainer.innerHTML = "<p>Erro ao carregar os produtos.</p>";
    }
});