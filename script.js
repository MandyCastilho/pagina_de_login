const form = document.getElementById("loginForm");
const mensagemErro = document.getElementById("mensagemErro");
const senhaInput = document.getElementById("senha");
const toggleSenha = document.getElementById("toggleSenha");
const lembrarEmail = document.getElementById("lembrarEmail");
const emailInput = document.getElementById("email");
const toggleTema = document.getElementById("toggleTema");
const btnLimpar = document.getElementById("btnLimpar");
const barraForca = document.getElementById("forcaSenha");
const toggleEmail = document.getElementById("toggleEmail");
const tooltipSenha = document.getElementById("tooltipSenha");
const contadorSenha = document.getElementById("contadorSenha");

// AOS Init
AOS.init();

// Mostrar/ocultar senha
toggleSenha.addEventListener("click", () => {
  const tipo = senhaInput.type === "password" ? "text" : "password";
  senhaInput.type = tipo;
  toggleSenha.textContent = tipo === "password" ? "👁️" : "🙈";
});

// Mostrar/ocultar e-mail
toggleEmail?.addEventListener("click", () => {
  const tipo = emailInput.type === "email" ? "text" : "email";
  emailInput.type = tipo;
  toggleEmail.textContent = tipo === "email" ? "📧" : "🔓";
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
  const senha = senhaInput.value;
  const forca = calcularForcaSenha(senha);
  barraForca.value = forca;
  barraForca.className = `forca-${forca}`;
  contadorSenha.textContent = `${senha.length} caracteres`;
});

senhaInput.addEventListener("focus", () => {
  tooltipSenha.style.display = "block";
});

senhaInput.addEventListener("blur", () => {
  tooltipSenha.style.display = "none";
});

// Destaque visual com erro e animação shake
function destacarErro(input) {
  input.classList.add("erro", "shake");
  setTimeout(() => input.classList.remove("shake"), 500);
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

  if (calcularForcaSenha(senha) < 2) {
    mostrarMensagem("Senha fraca. Use números, letras maiúsculas e símbolos.");
    destacarErro(senhaInput);
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
    contadorSenha.textContent = "";
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
  document.body.classList.add("transicao-tema");
  localStorage.setItem("tema", document.body.classList.contains("dark") ? "escuro" : "claro");
});

// Verifica tema e e-mail salvos
window.addEventListener("DOMContentLoaded", () => {
  const temaSalvo = localStorage.getItem("tema");
  if (temaSalvo === "escuro") {
    document.body.classList.add("dark");
    toggleTema.checked = true;
  }
  setTimeout(() => document.body.classList.add("transicao-tema"), 100);

  const emailSalvo = localStorage.getItem("emailSalvo");
  if (emailSalvo) {
    emailInput.value = emailSalvo;
    lembrarEmail.checked = true;
  }
});

// Botão de limpar formulário com confirmação
btnLimpar?.addEventListener("click", () => {
  const confirmar = confirm("Tem certeza que deseja limpar o formulário?");
  if (confirmar) {
    form.reset();
    barraForca.value = 0;
    mensagemErro.textContent = "";
    contadorSenha.textContent = "";
  }
});

