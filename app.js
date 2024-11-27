let listaDeNumerosSorteados = []; // Array para armazenar os números já sorteados
let numeroLImite = 10; // Limite superior para o número aleatório
let numeroSecreto = gerarNumeroAleatorio(); // Gera o número secreto aleatório e armazena na variável
let tentativas = 1; // Inicializa o contador de tentativas com 1

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag); // Seleciona o elemento HTML com a tag especificada
    campo.innerHTML = texto; // Atualiza o conteúdo do elemento com o texto fornecido
    if ('speechSynthesis' in window) { // Verifica se a API de síntese de voz está disponível no navegador
        let utterance = new SpeechSynthesisUtterance(texto); // Cria uma instância para síntese de fala com o texto fornecido
        utterance.lang = 'pt-BR'; // Define o idioma para português do Brasil
        utterance.rate = 1.2; // Define a velocidade da fala
        window.speechSynthesis.speak(utterance); // Faz o navegador "falar" o texto
    } else {
        console.log("Web Speech API não suportada neste navegador."); // Exibe uma mensagem de erro no console se a API não for suportada
    }
}

function exibirMensagemInicial() {
    exibirTextoNaTela("h1", "Jogo do número secreto 2.0"); // Define o título principal do jogo
    exibirTextoNaTela("p", "Escolha um número de 1 a 10"); // Define a mensagem inicial
}

exibirMensagemInicial(); // Exibe a mensagem inicial ao carregar o jogo

function verificarChute() { // Função para verificar se o chute do jogador está correto
    let chute = document.querySelector("input").value; // Obtém o valor digitado no campo de entrada

    if (chute == numeroSecreto) { // Verifica se o chute é igual ao número secreto
        exibirTextoNaTela("h1", "Acertou!"); // Exibe a mensagem de acerto no título

        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa"; // Define o plural ou singular da palavra "tentativa" com base na quantidade
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`; // Monta a mensagem sobre as tentativas

        exibirTextoNaTela("p", mensagemTentativas); // Exibe a mensagem sobre as tentativas no parágrafo
        document.getElementById("reiniciar").removeAttribute("disabled"); // Habilita o botão "reiniciar" ao acertar
    } else { // Caso o chute esteja errado
        if (chute > numeroSecreto) { // Se o chute for maior que o número secreto
            exibirTextoNaTela("p", "O número é menor"); // Exibe a mensagem que o número é menor
        } else { // Se o chute for menor que o número secreto
            exibirTextoNaTela("p", "O número é maior"); // Exibe a mensagem que o número é maior
        }
        tentativas++; // Incrementa o contador de tentativas
        limparCampo(); // Chama a função para limpar o campo de entrada
    }
}

function gerarNumeroAleatorio() { // Função para gerar um número aleatório entre 1 e 10
    let numeroEscolhido = parseInt(Math.random() * numeroLImite + 1); // Gera um número entre 1 e o número limite e converte para inteiro
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length; // Obtém a quantidade de números na lista de sorteados

    if (quantidadeDeElementosNaLista == numeroLImite) { // Se todos os números já tiverem sido sorteados
        listaDeNumerosSorteados = []; // Reseta a lista de números sorteados
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) { // Verifica se o número já foi sorteado
        return gerarNumeroAleatorio(); // Tenta gerar outro número aleatório
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido); // Adiciona o número à lista de sorteados
        console.log(listaDeNumerosSorteados); // Exibe no console os números sorteados até o momento
        return numeroEscolhido; // Retorna o número escolhido
    }
}

function limparCampo() { // Função para limpar o campo de entrada do chute
    let chute = document.querySelector("input"); // Seleciona o campo de entrada
    chute.value = ""; // Limpa o valor do campo de entrada
}

function reiniciarJogo() { // Função para reiniciar o jogo
    numeroSecreto = gerarNumeroAleatorio(); // Gera um novo número secreto
    limparCampo(); // Limpa o campo de entrada
    tentativas = 1; // Reseta o contador de tentativas
    exibirMensagemInicial(); // Exibe a mensagem inicial novamente
    document.getElementById("reiniciar").setAttribute("disabled", true); // Desativa o botão de reiniciar
}
