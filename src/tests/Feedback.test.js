import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

import { mockGood, mockOk, mockBad } from './helpers/initialStates';

describe('Teste page Feedback', () => {
  it('Deve existir uma Header', () => {
    renderWithRouterAndRedux(<App />, "/feedback", mockOk);
    const imagem = screen.getByTestId('header-profile-picture');
    expect(imagem).toBeInTheDocument();
    const name = screen.getByTestId('header-player-name');
    expect(name).toBeInTheDocument();
    const score = screen.getByTestId('header-score');
    expect(score).toBeInTheDocument();
  })

  it('Mensagem de feedback "Well Done!" para pessoa usuaria', () => {
    renderWithRouterAndRedux(<App />, "/feedback", mockGood);
    const mensage = screen.getByTestId('feedback-text');
    const wellDone = screen.getByText(/Well Done!/i);
    expect(wellDone).toBeInTheDocument();
    expect(mensage).toBeInTheDocument();

    renderWithRouterAndRedux(<App />, "/feedback", mockOk);
    expect(wellDone).toBeInTheDocument();
    expect(mensage).toBeInTheDocument();
  })

  it('Mensagem de feedback "Could be better..." para pessoa usuaria', () => {
    renderWithRouterAndRedux(<App />, "/feedback", mockBad);
    const mensage = screen.getByTestId('feedback-text');
    const beBetter = screen.getByText(/Could be better.../i);
    expect(mensage).toBeInTheDocument();
    expect(beBetter).toBeInTheDocument();
  })

  it('Exibe o score do jogador', () => {
    renderWithRouterAndRedux(<App />, "/feedback", mockOk);
    const scoreTestId = screen.getByTestId('feedback-total-score');
    // const score = screen.getByText(/80/i);
    expect(scoreTestId).toBeInTheDocument();
    // expect(score).toBeInTheDocument();
  })

  it('Exibe quantas questões o jogador acertou', () => {
    renderWithRouterAndRedux(<App />, "/feedback", mockOk);
    const assertionsTestId = screen.getByTestId('feedback-total-question');
    const assertions = screen.getByText(/3/i);
    expect(assertionsTestId).toBeInTheDocument();
    expect(assertions).toBeInTheDocument();
  })

  it('Ao apertar "Play Again" a pessoa é levada a tela de login', () => {
    const { history } = renderWithRouterAndRedux(<App />, "/feedback", mockOk);
    const button = screen.getByRole('button', { name: /Jogar novamente/i });
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    expect(history.location.pathname).toBe('/')
  })

  it('Ao apertar "Ranking" a pessoa é levada a tela de Ranking', () => {
    const { history } = renderWithRouterAndRedux(<App />, "/feedback", mockOk);
    const button = screen.getByRole('button', { name: /Ranking/i });
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    expect(history.location.pathname).toBe('/ranking')
  })
})