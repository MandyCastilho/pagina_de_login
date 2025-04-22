const form = document.getElementById("loginForm");
const mensagemErro = document.getElementById("mensagemErro");
const senhaInput = document.getElementById("senha");
const toggleSenha = document.getElementById("toggleSenha");
const lembrarEmail = document.getElementById("lembrarEmail");
const emailInput = document.getElementById("email");
const toggleTema = document.getElementById("toggleTema");

// AOS Init
AOS.init();

// Mostrar/ocultar senha
toggleSenha.addEventListener("click", () => {
  const tipo = senhaInput.type === "password" ? "text" : "password";
  senhaInput.type = tipo;
  toggleSenha.textContent = tipo === "password" ? "👁️" : "🙈";
});

// Enviar formulário
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = emailInput.value;
  const senha = senhaInput.value;

  if (!email || !senha) {
    mensagemErro.textContent = "Preencha todos os campos.";
    return;
  }

  if (email === "admin@exemplo.com" && senha === "123456") {
    alert("Login bem-sucedido!");

    if (lembrarEmail.checked) {
      localStorage.setItem("emailSalvo", email);
    } else {
      localStorage.removeItem("emailSalvo");
    }

    form.reset();
    mensagemErro.textContent = "";
  } else {
    mensagemErro.textContent = "E-mail ou senha incorretos.";
  }
});

// Modo claro/escuro
toggleTema.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("tema", document.body.classList.contains("dark") ? "escuro" : "claro");
});

// Verifica tema e e-mail salvos
window.addEventListener("DOMContentLoaded", () => {
  const temaSalvo = localStorage.getItem("tema");
  if (temaSalvo === "escuro") {
    document.body.classList.add("dark");
    toggleTema.checked = true;
  }

  const emailSalvo = localStorage.getItem("emailSalvo");
  if (emailSalvo) {
    emailInput.value = emailSalvo;
    lembrarEmail.checked = true;
  }
});