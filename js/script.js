// array para armazenar as citações
let quoteArray = [];
// indice para controlar a citação atual
let index = 0; 
// posição do texto na citação atual
let textPosition = 0; 
// flag para indicar se uma nova citação está sendo carregada
let flag = true;

// função para carregar uma nova citação da 'API'
loadQuote = () => {
  const url = 'https://api.quotable.io/random';
  fetch(url)
  .then(response => {
    // verifica se a resposta é bem-sucedida
    if (!response.ok) throw Error(response.statusText);
      // converte a resposta para 'JSON'
      return response.json();
  })

   // manipula os dados recebidos da 'API'
  .then(data => {
      // armazena a citação no array
      quoteArray[index] = data.content;
  })

   // manipula erros durante a solicitação
  .catch(error => console.log(error));
}

// função para simular a digitação da citação
typewriter = () => {
  if(flag){
    loadQuote();
    // adiciona um espaço à citação para evitar problemas ao iterar sobre o texto
    quoteArray[index] += ""; 
    // define a flag como falsa para indicar que a citação está sendo exibida
    flag = false;
  }

  // exibe o texto da citação até a posição atual
  document.querySelector("#quote").innerHTML = quoteArray[index].substring(0, textPosition) + '<span>\u25AE</span>';

  // verifica se ainda há caracteres para serem exibidos na citação
  if(textPosition++ != quoteArray[index].length){
    // chama a função novamente após um curto intervalo para simular a digitação
    setTimeout(typewriter, 100);
  }
  else{
    // define um espaço em branco como a citação atual
    quoteArray[index] = ' ';
    // chama a função novamente após um intervalo
    setTimeout(typewriter, 4000);
    // reinicia a posição do texto para exibir a próxima citação desde o início
    textPosition = 0;
    // define a flag como verdadeira para indicar que uma nova citação pode ser carregada
    flag = true;
  }   
}

// Adiciona evento para chamar a função 'typewriter' quando a página é carregada
window.addEventListener('load', typewriter);
