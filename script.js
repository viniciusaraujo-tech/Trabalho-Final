const habilidades = [
  { nome: "Lógica de programação", situacao: "Ensinei na monitoria" },
  { nome: "Java", situacao: "Curso em andamento" },
  { nome: "Inglês", situacao: "Curso em andamento" },
  { nome: "Banco de dados", situacao: "Área de interesse" },
  { nome: "Inteligência artificial", situacao: "Quero aprender" },
  { nome: "HTML, CSS e JavaScript", situacao: "Usados neste portfólio" },
];

const projetos = [
  {
    titulo: "Monitoria: Pensamento Computacional",
    descricao: "Auxiliei no ensino de lógica e do básico de programação aos alunos matriculados no projeto.",
    categoria: "monitoria",
    imagem: "img/foto7-pensamento.jpg",
  },
  {
    titulo: "Monitoria: Londrinense Tech",
    descricao: "Auxiliei no ensino de lógica e do básico de programação a alunos do 7º ano do Colégio Londrinense.",
    categoria: "monitoria",
    imagem: "img/foto8-londrinense-tech.jpg",
  },
];

function iniciarMenu() {
  const botao = document.getElementById("botaoMenu");
  const menu = document.getElementById("menuPrincipal");

  botao.addEventListener("click", () => {
    const aberto = menu.classList.toggle("aberto");
    botao.setAttribute("aria-expanded", aberto);
    botao.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  });
}

function lerTema() {
  try {
    return localStorage.getItem("tema");
  } catch (erro) {
    return null;
  }
}

function salvarTema(tema) {
  try {
    localStorage.setItem("tema", tema);
  } catch (erro) {
    console.warn("Não foi possível salvar o tema.", erro);
  }
}

function iniciarTema() {
  const botao = document.getElementById("botaoTema");

  function aplicarTema(tema) {
    const claro = tema === "claro";
    document.body.classList.toggle("tema-claro", claro);
    botao.textContent = claro ? "Tema escuro" : "Tema claro";
  }

  aplicarTema(lerTema());

  botao.addEventListener("click", () => {
    const novoTema = document.body.classList.contains("tema-claro") ? "escuro" : "claro";
    aplicarTema(novoTema);
    salvarTema(novoTema);
  });
}

function mostrarAno() {
  document.getElementById("anoAtual").textContent = new Date().getFullYear();
}

function iniciarBotaoTopo() {
  const botao = document.getElementById("botaoTopo");

  window.addEventListener("scroll", () => {
    botao.classList.toggle("visivel", window.scrollY > 300);
  });

  botao.addEventListener("click", () => {
    window.scrollTo({ top: 0 });
  });
}

function iniciarRevelar() {
  const secoes = document.querySelectorAll(".revelar");
  if (!("IntersectionObserver" in window)) return;

  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.remove("escondido");
        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.1 });

  secoes.forEach((secao) => {
    secao.classList.add("escondido");
    observador.observe(secao);
  });
}

function mostrarSaudacao() {
  const elemento = document.getElementById("saudacao");
  if (!elemento) return;

  const hora = new Date().getHours();
  let saudacao;

  if (hora >= 5 && hora < 12) {
    saudacao = "Bom dia!";
  } else if (hora >= 12 && hora < 18) {
    saudacao = "Boa tarde!";
  } else {
    saudacao = "Boa noite!";
  }

  elemento.textContent = saudacao;
}

function iniciarDigitacao() {
  const elemento = document.getElementById("textoDigitado");
  if (!elemento) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const frases = [
    "estudante de Engenharia de Software",
    "interessado em banco de dados",
    "curioso sobre inteligência artificial",
    "flamenguista",
  ];
  let indiceFrase = 0;
  let indiceLetra = 0;
  let apagando = false;

  function digitar() {
    const frase = frases[indiceFrase];
    indiceLetra += apagando ? -1 : 1;
    elemento.textContent = frase.slice(0, indiceLetra);

    let espera = apagando ? 40 : 80;

    if (!apagando && indiceLetra === frase.length) {
      apagando = true;
      espera = 1800;
    } else if (apagando && indiceLetra === 0) {
      apagando = false;
      indiceFrase = (indiceFrase + 1) % frases.length;
      espera = 400;
    }

    setTimeout(digitar, espera);
  }

  elemento.textContent = "";
  digitar();
}

function mostrarHabilidades() {
  const lista = document.getElementById("listaHabilidades");
  if (!lista) return;

  habilidades.forEach((habilidade, indice) => {
    const item = document.createElement("li");
    item.classList.add("cartao", "habilidade");
    item.style.animationDelay = `${indice * 0.1}s`;
    item.innerHTML = `
      <h3>${habilidade.nome}</h3>
      <span class="etiqueta">${habilidade.situacao}</span>
    `;
    lista.appendChild(item);
  });
}

function criarCartaoProjeto(projeto) {
  const cartao = document.createElement("article");
  cartao.classList.add("cartao", "projeto");
  const nomeCategoria = projeto.categoria === "monitoria" ? "Monitoria" : "Desenvolvimento";
  cartao.innerHTML = `
    <img src="${projeto.imagem}" alt="Imagem de ${projeto.titulo}" width="800" height="450">
    <span class="etiqueta">${nomeCategoria}</span>
    <h2>${projeto.titulo}</h2>
    <p>${projeto.descricao}</p>
  `;

  if (projeto.link) {
    const link = document.createElement("a");
    link.href = projeto.link;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = projeto.textoLink;
    cartao.appendChild(link);
  }
  return cartao;
}

function mostrarProjetos(filtro) {
  const grade = document.getElementById("gradeProjetos");
  const contador = document.getElementById("contadorProjetos");

  const selecionados = projetos.filter(
    (projeto) => filtro === "todos" || projeto.categoria === filtro
  );

  grade.innerHTML = "";
  selecionados.forEach((projeto) => grade.appendChild(criarCartaoProjeto(projeto)));
  contador.textContent = `${selecionados.length} item(ns) encontrado(s)`;
}

function iniciarProjetos() {
  if (!document.getElementById("gradeProjetos")) return;

  const botoes = document.querySelectorAll(".filtro");

  botoes.forEach((botao) => {
    botao.addEventListener("click", () => {
      botoes.forEach((outro) => {
        outro.classList.remove("ativo");
        outro.setAttribute("aria-pressed", "false");
      });
      botao.classList.add("ativo");
      botao.setAttribute("aria-pressed", "true");
      mostrarProjetos(botao.dataset.filtro);
    });
  });

  mostrarProjetos("todos");
}

function validarCampo(campo, idErro, mensagemErro, valido) {
  const erro = document.getElementById(idErro);
  erro.textContent = valido ? "" : mensagemErro;
  campo.parentElement.classList.toggle("invalido", !valido);
  campo.setAttribute("aria-invalid", !valido);
  return valido;
}

function iniciarFormulario() {
  const formulario = document.getElementById("formularioContato");
  if (!formulario) return;

  const nome = document.getElementById("nome");
  const email = document.getElementById("email");
  const assunto = document.getElementById("assunto");
  const mensagem = document.getElementById("mensagem");
  const contador = document.getElementById("contadorCaracteres");
  const retorno = document.getElementById("retornoFormulario");

  mensagem.addEventListener("input", () => {
    contador.textContent = `${mensagem.value.length} / 300 caracteres`;
  });

  formulario.addEventListener("input", () => {
    retorno.textContent = "";
  });

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const nomeOk = validarCampo(nome, "erroNome",
      "Digite pelo menos 3 letras.", nome.value.trim().length >= 3);
    const emailOk = validarCampo(email, "erroEmail",
      "Digite um e-mail válido.", formatoEmail.test(email.value.trim()));
    const mensagemOk = validarCampo(mensagem, "erroMensagem",
      "Escreva pelo menos 10 caracteres.", mensagem.value.trim().length >= 10);

    retorno.textContent = "";
    if (!nomeOk || !emailOk || !mensagemOk) return;

    const destino = document.getElementById("botaoCopiar").dataset.email;
    const corpo = `${mensagem.value.trim()}\n\n${nome.value.trim()} (${email.value.trim()})`;

    const link = document.createElement("a");
    link.href = `mailto:${destino}?subject=${encodeURIComponent(assunto.value)}&body=${encodeURIComponent(corpo)}`;
    link.textContent = "Clique aqui para enviar pelo seu e-mail";

    const aviso = document.createElement("p");
    aviso.textContent = `Tudo certo, ${nome.value.trim()}! Sua mensagem está pronta.`;

    retorno.append(aviso, link);
  });
}

function iniciarCopiaEmail() {
  const botao = document.getElementById("botaoCopiar");
  if (!botao) return;

  const aviso = document.getElementById("avisoCopia");

  botao.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(botao.dataset.email);
      aviso.textContent = "E-mail copiado!";
    } catch (erro) {
      aviso.textContent = `Não foi possível copiar. E-mail: ${botao.dataset.email}`;
    }
  });
}

iniciarTema();
iniciarMenu();
mostrarAno();
iniciarBotaoTopo();
mostrarSaudacao();
iniciarDigitacao();
mostrarHabilidades();
iniciarProjetos();
iniciarFormulario();
iniciarCopiaEmail();
iniciarRevelar();
