document.getElementById("botaoAdicionar").addEventListener("click", async (event) => {
    event.preventDefault(); // Evita o comportamento padrão do botão

    // Captura os valores do formulário
    const nome = document.querySelector("input[placeholder='Nome']").value.trim();
    const categoria = document.getElementById("categoria").value.trim();
    const quantidadeEstocada = document.querySelector("input[placeholder='Quantidade Estocada']").value.trim();
    const quantidadeEncomendada = document.querySelector("input[placeholder='Quantidade Encomendada']").value.trim();
    const valorUnitario = document.querySelector("input[placeholder='Valor Unitário']").value.trim();
    const codigoProduto = document.querySelector("input[placeholder='Código']").value.trim();

    // Lista de campos obrigatórios e suas mensagens
    const camposObrigatorios = [
        { campo: nome, mensagem: "O campo Nome é obrigatório." },
        { campo: categoria, mensagem: "O campo Categoria é obrigatório." },
        { campo: valorUnitario, mensagem: "O campo Valor Unitário é obrigatório." },
        { campo: codigoProduto, mensagem: "O campo Código é obrigatório." }
    ];

    // Verifica quais campos obrigatórios estão vazios
    const camposNaoPreenchidos = camposObrigatorios.filter(c => !c.campo);

    if (camposNaoPreenchidos.length > 0) {
        // Exibe as mensagens de erro para os campos não preenchidos
        const mensagensErro = camposNaoPreenchidos.map(c => c.mensagem).join("\n");
        alert(`Por favor, preencha os seguintes campos obrigatórios:\n\n${mensagensErro}`);
        return; // Interrompe o envio se houver campos não preenchidos
    }

    // Cria o objeto do produto
    const produto = {
        nome,
        categoria,
        quantidadeEstocada: parseInt(quantidadeEstocada) || 0, // Valores opcionais podem ser 0
        quantidadeEncomendada: parseInt(quantidadeEncomendada) || 0, // Valores opcionais podem ser 0
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