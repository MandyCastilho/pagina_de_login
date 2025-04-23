const form = document.getElementById("loginForm");
const mensagemErro = document.getElementById("mensagemErro");
const senhaInput = document.getElementById("senha");
const toggleSenha = document.getElementById("toggleSenha");
const lembrarEmail = document.getElementById("lembrarEmail");
const emailInput = document.getElementById("email");
const toggleTema = document.getElementById("toggleTema");
const btnLimpar = document.getElementById("btnLimpar"); // novo botão
const barraForca = document.getElementById("forcaSenha"); // barra de força da senha

// AOS Init
AOS.init();

// Mostrar/ocultar senha
toggleSenha.addEventListener("click", () => {
  const tipo = senhaInput.type === "password" ? "text" : "password";
  senhaInput.type = tipo;
  toggleSenha.textContent = tipo === "password" ? "👁️" : "🙈";
});

// Validação de e-mail com regex
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Força da senha
function calcularForcaSenha(senha) {
  let forca = 0;
  if (senha.length >= 6) forca++;
  if (/[A-Z]/.test(senha)) forca++;
  if (/[0-9]/.test(senha)) forca++;
  if (/[@$!%*?&]/.test(senha)) forca++;
  return forca;
}

senhaInput.addEventListener("input", () => {
  const forca = calcularForcaSenha(senhaInput.value);
  barraForca.value = forca;
  barraForca.className = `forca-${forca}`; // estilos em CSS para .forca-1 até .forca-4
});

// Destaque visual com erro
function destacarErro(input) {
  input.classList.add("erro");
  setTimeout(() => input.classList.remove("erro"), 2000);
}

// Mensagem temporária
function mostrarMensagem(texto, sucesso = false) {
  mensagemErro.textContent = texto;
  mensagemErro.className = sucesso ? "mensagem sucesso" : "mensagem erro";
  setTimeout(() => mensagemErro.textContent = "", 3000);
}

// Submissão do formulário
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = emailInput.value.trim();
  const senha = senhaInput.value.trim();

  if (!email || !senha) {
    mostrarMensagem("Preencha todos os campos.");
    if (!email) destacarErro(emailInput);
    if (!senha) destacarErro(senhaInput);
    return;
  }

  if (!validarEmail(email)) {
    mostrarMensagem("Digite um e-mail válido.");
    destacarErro(emailInput);
    return;
  }

  if (email === "admin@exemplo.com" && senha === "123456") {
    mostrarMensagem("Login bem-sucedido!", true);

    if (lembrarEmail.checked) {
      localStorage.setItem("emailSalvo", email);
    } else {
      localStorage.removeItem("emailSalvo");
    }

    form.reset();
    barraForca.value = 0;
  } else {
    mostrarMensagem("E-mail ou senha incorretos.");
    destacarErro(emailInput);
    destacarErro(senhaInput);
  }
});

// Atalho Enter
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    form.dispatchEvent(new Event("submit"));
  }
});

// Alternar tema
toggleTema.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  document.body.classList.add("transicao-tema"); // animação CSS
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

// Botão de limpar formulário
btnLimpar?.addEventListener("click", () => {
  form.reset();
  barraForca.value = 0;
  mensagemErro.textContent = "";
});
