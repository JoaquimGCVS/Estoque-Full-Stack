document.addEventListener("DOMContentLoaded", () => {
    const botaoLogout = document.getElementById("botao__logout");

    botaoLogout.addEventListener("click", () => {
        // Limpa os dados de autenticação (exemplo: localStorage ou sessionStorage)
        localStorage.removeItem("authToken");
        sessionStorage.removeItem("authToken");

        // Redireciona para a página de login
        window.location.href = "../pages/login.html";
    });
});