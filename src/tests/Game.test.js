// import React from 'react';
// import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event'
// import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
// import App from '../App';
// import { fetchTriviaQuestion } from '../helpers/api';
// import { tokenQuebrado, triviaQuestions } from './helpers/mockapi';

// const apiResponseToken = Promise.resolve({
//   json: () => Promise.resolve(tokenQuebrado.token),
//   ok: true,
// });

// const mockedExchangeToken = jest.spyOn(global, 'fetch').mockImplementation(() => apiResponseToken);

// const apiResponseQuestion = Promise.resolve({
//   json: () => Promise.resolve(triviaQuestions),
//   ok: true,
// });

// const mockedExchangeTrivia = jest.spyOn(global, 'fetch').mockImplementation(() => apiResponseQuestion);

// afterEach(() => jest.clearAllMocks());

// describe('Teste page Game', () => {
 
//   it('O token deve ser requisitado', () => {
//     renderWithRouterAndRedux(<App />, "/game");

//     expect(mockedExchangeToken).toBeCalled();
//     expect(mockedExchangeToken).toBeCalledWith('https://opentdb.com/api_token.php?command=request');

//   })

  // it('Mensagem de feedback "Well Done!" para pessoa usuaria', () => {
  //   renderWithRouterAndRedux(<App />, mockGood, "/feedback");
  //   const mensage = screen.getByTestId('feedback-text');
  //   const wellDone = screen.getByText(/Well Done!/i);
  //   expect(wellDone).toBeInTheDocument();
  //   expect(mensage).toBeInTheDocument();

  //   renderWithRouterAndRedux(<App />, mockOk, "/feedback");
  //   expect(wellDone).toBeInTheDocument();
  //   expect(mensage).toBeInTheDocument();
  // })

  // it('Mensagem de feedback "Could be better..." para pessoa usuaria', () => {
  //   renderWithRouterAndRedux(<App />, mockBad, "/feedback");
  //   const mensage = screen.getByTestId('feedback-text');
  //   const beBetter = screen.getByText(/Could be better.../i);
  //   expect(mensage).toBeInTheDocument();
  //   expect(beBetter).toBeInTheDocument();
  // })

  // it('Exibe o score do jogador', () => {
  //   renderWithRouterAndRedux(<App />, mockOk, "/feedback");
  //   const scoreTestId = screen.getByTestId('feedback-total-score');
  //   // const score = screen.getByText(/80/i);
  //   expect(scoreTestId).toBeInTheDocument();
  //   // expect(score).toBeInTheDocument();
  // })

  // it('Exibe quantas questões o jogador acertou', () => {
  //   renderWithRouterAndRedux(<App />, mockOk, "/feedback");
  //   const assertionsTestId = screen.getByTestId('feedback-total-question');
  //   const assertions = screen.getByText(/3/i);
  //   expect(assertionsTestId).toBeInTheDocument();
  //   expect(assertions).toBeInTheDocument();
  // })

  // it('Ao apertar "Play Again" a pessoa é levada a tela de login', () => {
  //   const { history } = renderWithRouterAndRedux(<App />, mockOk, "/feedback");
  //   const button = screen.getByRole('button', { name: /Jogar novamente/i });
  //   expect(button).toBeInTheDocument();
  //   userEvent.click(button);
  //   expect(history.location.pathname).toBe('/')
  // })

  // it('Ao apertar "Ranking" a pessoa é levada a tela de Ranking', () => {
  //   const { history } = renderWithRouterAndRedux(<App />, mockOk, "/feedback");
  //   const button = screen.getByRole('button', { name: /Ranking/i });
  //   expect(button).toBeInTheDocument();
  //   userEvent.click(button);
  //   expect(history.location.pathname).toBe('/ranking')
  // })
// })