document.getElementById("botaoAdicionar").addEventListener("click", async (event) => {
    event.preventDefault(); // Evita o comportamento padrão do botão

    // Captura os valores do formulário
    const nome = document.querySelector("input[placeholder='Nome']").value;
    const categoria = document.getElementById("categoria").value;
    const quantidadeEstocada = document.querySelector("input[placeholder='Quantidade Estocada']").value;
    const quantidadeEncomendada = document.querySelector("input[placeholder='Quantidade Encomendada']").value;
    const valorUnitario = document.querySelector("input[placeholder='Valor Unitário']").value;
    const codigoProduto = document.querySelector("input[placeholder='Código']").value;

    // Cria o objeto do produto
    const produto = {
        nome,
        categoria,
        quantidadeEstocada: parseInt(quantidadeEstocada),
        quantidadeEncomendada: parseInt(quantidadeEncomendada),
        valorUnitario: parseFloat(valorUnitario),
        codigoProduto
    };

    try {
        // Envia a requisição POST para o backend
        const response = await fetch("http://localhost:8080/produtos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(produto)
        });

        if (response.ok) {
            alert("Produto cadastrado com sucesso!");
            // Limpa o formulário
            // Limpa os campos manualmente
            document.querySelector("input[placeholder='Nome']").value = "";
            document.getElementById("categoria").value = "";
            document.querySelector("input[placeholder='Quantidade Estocada']").value = "";
            document.querySelector("input[placeholder='Quantidade Encomendada']").value = "";
            document.querySelector("input[placeholder='Valor Unitário']").value = "";
            document.querySelector("input[placeholder='Código']").value = "";
        } else {
            const error = await response.json();
            alert(`Erro ao cadastrar produto: ${error.message || "Erro desconhecido"}`);
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro ao conectar com o servidor.");
    }
});