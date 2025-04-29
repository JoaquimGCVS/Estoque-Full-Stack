document.addEventListener("DOMContentLoaded", () => {
    const botaoEntrar = document.getElementById("botao__entrar");

    botaoEntrar.addEventListener("click", async (event) => {
        event.preventDefault();

        // Captura os valores dos campos de email e senha
        const email = document.querySelector("input[type='email']").value;
        const password = document.querySelector("input[type='password']").value;

        try {
            // Envia a requisição POST para o backend
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const isAuthenticated = await response.json();
                if (isAuthenticated) {
                    alert("Login realizado com sucesso!");
                    // Redireciona para a página principal
                    window.location.href = "../pages/dashboard.html";
                } else {
                    alert("Credenciais inválidas. Tente novamente.");
                }
            } else {
                alert("Erro ao realizar login. Verifique o servidor.");
            }
        } catch (error) {
            console.error("Erro ao conectar com o servidor:", error);
            alert("Erro ao conectar com o servidor.");
        }
    });
});