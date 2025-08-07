# 🗃️ Sistema de Gerenciamento de Estoque – Joaquim Vilela

Este repositório contém um sistema **full stack** para gerenciamento de estoque, desenvolvido utilizando **Spring Boot** com banco de dados **MySQL** no back-end e **HTML + CSS e JavaScript** no front-end.  
A aplicação permite realizar o **cadastro de produtos**, **controle de entrada e saída**, além de acompanhar o **estoque em tempo real** de forma simples e eficiente.

---

## 📁 Estrutura do Repositório

| Pasta              | Conteúdo Principal                                      |
|--------------------|----------------------------------------------------------|
| `Back-end/estoque` | API REST em Spring Boot + conexão com banco MySQL       |
| `Front-end`        | Páginas HTML + estilização em CSS + scripts JavaScript  |
| `.vscode`          | Arquivos de configuração da IDE Visual Studio Code      |

---

## ▶️ Como utilizar

### 🔧 Requisitos

- Java 17 ou superior
- Node.js (opcional, se quiser usar Vite ou outras ferramentas)
- MySQL instalado e rodando
- IDE (como IntelliJ ou VS Code)

---

### ⚙️ Back-end

1. Acesse a pasta do back-end:
   ```bash
   cd Estoque-Full-Stack/Back-end/estoque
   ```

2. Configure o banco de dados no arquivo `application.properties`:
   ```
   spring.datasource.url=jdbc:mysql://localhost:3306/estoque
   spring.datasource.username=seu_usuario
   spring.datasource.password=sua_senha
   ```

3. Execute o projeto (via IDE ou terminal):
   ```bash
   ./mvnw spring-boot:run
   ```

---

### 🎨 Front-end

1. Acesse a pasta:
   ```bash
   cd Estoque-Full-Stack/Front-end
   ```

2. Abra o `index.html` no navegador ou sirva os arquivos com uma extensão como Live Server no VS Code.

---

## 👨‍💻 Autor

**Joaquim Guilherme de Carvalho Vilela Silva**  
Estudante de Engenharia de Software – PUC Minas  
Full-Stack Developer  

🔗 **Links importantes:**
* GitHub: [@JoaquimGCVS](https://github.com/JoaquimGCVS)  
* LinkedIn: [Joaquim Vilela](https://www.linkedin.com/in/joaquim-vilela/)  
* Currículo: [Download PDF](public/Joaquim_Curriculo.pdf)

---

⭐ **Se este projeto te inspirou ou ajudou de alguma forma, deixe uma estrela!**
