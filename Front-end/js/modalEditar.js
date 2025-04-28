document.addEventListener("DOMContentLoaded", () => {
    const modalEditar = document.getElementById("modalEditar");
    const formEditar = document.getElementById("formEditar");
    const fecharModal = document.getElementById("fecharModal");

    // Função para abrir o modal e preencher os campos com os dados do produto
    document.getElementById("cardsContainer").addEventListener("click", async (event) => {
        if (event.target.id === "editarProduto") {
            const produtoId = event.target.getAttribute("data-id");

            try {
                // Busca os dados do produto pelo ID
                const response = await fetch(`http://localhost:8080/produtos/${produtoId}`);
                if (!response.ok) {
                    throw new Error("Erro ao buscar os dados do produto.");
                }

                const produto = await response.json();

                // Preenche os campos do modal com os dados do produto
                document.getElementById("editarNome").value = produto.nome;
                document.getElementById("editarCategoria").value = produto.categoria;
                document.getElementById("editarQuantidadeEstocada").value = produto.quantidadeEstocada;
                document.getElementById("editarQuantidadeEncomendada").value = produto.quantidadeEncomendada;
                document.getElementById("editarValorUnitario").value = produto.valorUnitario;
                document.getElementById("editarCodigo").value = produto.codigoProduto;

                // Armazena o ID do produto no formulário para uso posterior
                formEditar.setAttribute("data-id", produtoId);

                // Abre o modal
                modalEditar.style.display = "flex";
            } catch (error) {
                console.error("Erro ao carregar os dados do produto:", error);
                alert("Erro ao carregar os dados do produto.");
            }
        }
    });

    // Função para fechar o modal
    fecharModal.addEventListener("click", () => {
        modalEditar.style.display = "none";
    });

    // Função para enviar a requisição PUT e atualizar o produto
    formEditar.addEventListener("submit", async (event) => {
        event.preventDefault();

        const produtoId = formEditar.getAttribute("data-id");

        // Captura os valores atualizados do formulário
        const produtoAtualizado = {
            nome: document.getElementById("editarNome").value,
            categoria: document.getElementById("editarCategoria").value,
            quantidadeEstocada: parseInt(document.getElementById("editarQuantidadeEstocada").value),
            quantidadeEncomendada: parseInt(document.getElementById("editarQuantidadeEncomendada").value),
            valorUnitario: parseFloat(document.getElementById("editarValorUnitario").value),
            codigoProduto: document.getElementById("editarCodigo").value,
        };

        try {
            // Envia a requisição PUT para atualizar o produto
            const response = await fetch(`http://localhost:8080/produtos/${produtoId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(produtoAtualizado),
            });

            if (response.ok) {
                alert("Produto atualizado com sucesso!");
                modalEditar.style.display = "none";
                location.reload(); // Recarrega a página para atualizar os dados
            } else {
                const error = await response.json();
                alert(`Erro ao atualizar o produto: ${error.message || "Erro desconhecido"}`);
            }
        } catch (error) {
            console.error("Erro ao atualizar o produto:", error);
            alert("Erro ao conectar com o servidor.");
        }
    });
});