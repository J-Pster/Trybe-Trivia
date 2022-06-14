import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

import { mockGood, mockOk, mockBad } from './helpers/initialStates';

// beforeEach(() => {
//   localStorage.clear();
//   jest.restoreAllMocks();
// });

describe('Teste page Ranking', () => {
  it('Possui um botão que te redireciona  para página de Login', () => {
    const { history } = renderWithRouterAndRedux(<App />, "/ranking", mockBad); // score 20
    const button = screen.getByRole('button', { name: /Inicio/i });
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    expect(history.location.pathname).toBe('/');
  })

  it('Testa se a informações do jogador 1 são salvas no LocalStorage', () => {
    const getItem = jest.spyOn(Storage.prototype, 'getItem');
    renderWithRouterAndRedux(<App />, "/ranking", mockOk); // score 80
    expect(getItem).toHaveBeenCalled();
  })

  it('Testa se os jogadores são rankeados', () => {
    const getItem = jest.spyOn(Storage.prototype, 'getItem');
    renderWithRouterAndRedux(<App />, "/ranking", mockGood); // score 120
    expect(getItem).toHaveBeenCalled();
    const score1 = screen.getByTestId('player-score-0');
    expect(score1).toHaveTextContent('120');
    const score2 = screen.getByTestId('player-score-1');
    expect(score2).toHaveTextContent('80');
    const score3 = screen.getByTestId('player-score-2');
    expect(score3).toHaveTextContent('20');
  })
})