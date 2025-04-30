document.addEventListener("DOMContentLoaded", () => {
    const modalDetalhes = document.getElementById("modalDetalhes");
    const fecharModalDetalhes = document.getElementById("fecharModalDetalhes");
    const detalhesProduto = document.getElementById("detalhesProduto");

    // Função para abrir o modal e preencher os detalhes do produto
    document.getElementById("cardsContainer").addEventListener("click", async (event) => {
        if (event.target.classList.contains("verDetalhes")) {
            const produtoId = event.target.getAttribute("data-id");
    
            try {
                const response = await fetch(`http://localhost:8080/produtos/${produtoId}`);
                if (!response.ok) {
                    throw new Error("Erro ao buscar os detalhes do produto.");
                }
    
                const produto = await response.json();
    
                detalhesProduto.innerHTML = `
                <div class="texto__detalhes">
                    <p><strong>Nome:</strong> ${produto.nome}</p>
                    <p><strong>Categoria:</strong> ${produto.categoria}</p>
                    <p><strong>Quantidade Estocada:</strong> ${produto.quantidadeEstocada}</p>
                    <p><strong>Quantidade Encomendada:</strong> ${produto.quantidadeEncomendada}</p>
                    <p><strong>Valor Unitário:</strong> R$ ${produto.valorUnitario.toFixed(2)}</p>
                    <p><strong>Último Valor Unitário:</strong> R$ ${produto.ultimoValorUnitario.toFixed(2)}</p>
                    <p><strong>Código:</strong> ${produto.codigoProduto}</p>
                </div>
                `;
    
                modalDetalhes.style.display = "flex";
            } catch (error) {
                console.error("Erro ao carregar os detalhes do produto:", error);
                alert("Erro ao carregar os detalhes do produto.");
            }
        }
    });

    // Função para fechar o modal
    fecharModalDetalhes.addEventListener("click", () => {
        modalDetalhes.style.display = "none";
    });
});