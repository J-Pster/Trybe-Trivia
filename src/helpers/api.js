import * as local from './localstorage';

const URL_TRIVIA_TOKEN = 'https://opentdb.com/api_token.php?command=request';
const URL_TRIVIA_QUESTION = 'https://opentdb.com/api.php?amount=5&token=';

// Pega um token pelo fetch.
export const fetchTriviaToken = async () => {
  const response = await fetch(URL_TRIVIA_TOKEN);
  const data = await response.json();
  return data.token;
};

// UTILIZE ESSA FUNÇÃO PARA PEGAR O TOKEN
const getTriviaToken = async () => {
  // Pega o token do local storage.
  const localToken = local.getLocalToken();
  if (localToken) return localToken;

  // Gera um novo token se o do local não existir, e seja o token gerado no local.
  const novoToken = await fetchTriviaToken();
  local.setLocalToken(novoToken);
  if (novoToken) return novoToken;
};

// Testa o token atual
const testTriviaToken = async () => {
  // Pega o token, e verifica se ele não é vazio.
  const meuToken = await getTriviaToken();
  if (meuToken === null || meuToken === '') return false;

  // Depois do teste de cima, ele testa se o token é válido
  const response = await fetch(URL_TRIVIA_QUESTION + meuToken);
  const data = await response.json();
  if (data.response_code === 0) return true;

  // Caso não seja válido, ele retorna falso.
  return false;
};

// Reseta o token atual
const resetTriviaToken = async () => {
  const novoToken = await fetchTriviaToken();
  local.setLocalToken(novoToken);
  return null; // para que a tela retorne a página de login
};

// UTILIZE ESSA FUNÇÃO PARA COMEÇAR O GAME.
export const startTriviaGame = async () => {
  // Começa o jogo, testando ou criando um token no localStorage
  if (!await testTriviaToken()) await resetTriviaToken();
  const token = await getTriviaToken();
  const ranking = JSON.parse(local.getLocalRanking());
  return { token, ranking };
};

// USAR ESSA FUNÇÃO PARA PEGAR PERGUNTAS
export const fetchTriviaQuestion = async () => {
  // Testando se o token está válido, se não, reseta o token.
  if (!await testTriviaToken()) {
    return resetTriviaToken();
    // retorna null que fará retornar a pag de login
  }
  // Fazendo o fetch nas perguntas.
  const token = await getTriviaToken();
  const response = await fetch(URL_TRIVIA_QUESTION + token);
  const data = await response.json();
  return data.results;
};

export default fetchTriviaToken;
