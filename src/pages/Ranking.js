import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { reset } from '../actions/index';
import logo from '../trivia.png';
import Footer from '../components/Footer';
import './Ranking.css';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      storage: [],
    };
  }

  componentDidMount = async () => {
    const { name, score, gravatarEmail } = this.props;
    const emailHash = md5(gravatarEmail).toString();
    this.addLocalRanking(name, score, emailHash);
    this.setState({
      storage: JSON.parse(localStorage.getItem('ranking')),
    });
  };

  getLocalRanking = () => {
    const meuLocal = localStorage.getItem('ranking');
    if (meuLocal) {
      return meuLocal;
    }
    const meuNovoLocal = [];
    localStorage.setItem('ranking', JSON.stringify(meuNovoLocal));
    return localStorage.getItem('ranking');
  };

  addLocalRanking = (name, score, picture) => {
    const meuLocal = JSON.parse(this.getLocalRanking());
    const meuNovoLocal = [...meuLocal, { name, score, picture }];
    localStorage.setItem('ranking', JSON.stringify(meuNovoLocal));
  };

  emOrdem = (players) => {
    const menos1 = -1;
    players.sort((a, b) => {
      if (parseInt(a.score, 10) > parseInt(b.score, 10)) {
        return menos1;
      }
      if (parseInt(a.score, 10) < parseInt(b.score, 10)) {
        return 1;
      }
      return 0;
    });
    return players;
  }

  render() {
    const { dispatchZerar } = this.props;
    const { storage } = this.state;
    const ranking = this.emOrdem(storage);
    const { name: nameHeader, score: scoreHeader, gravatarEmail } = this.props;
    const picture = md5(gravatarEmail).toString();

    return (
      <div className="ranking-page">
        <div className="container-user-info">
          <img src={ logo } className="Trivia-logo Login-logo" alt="logo" />
          <div className="usuario">
            <div className="jogador">
              <h6>Jogador</h6>
              <p>{nameHeader}</p>
            </div>
            <div className="pontuacao">
              <h6>Pontuação</h6>
              <p>{scoreHeader}</p>
            </div>
          </div>
          <img
            data-testid="header-profile-picture"
            className="avatar"
            src={ `https://www.gravatar.com/avatar/${picture}` }
            alt={ `Gravatar de ${nameHeader}` }
          />
        </div>
        <h1 data-testid="ranking-title">RANKING</h1>
        <div className="ranking-container content-wrap">
          {ranking.map(({ name, score, emailHash }, index) => (
            <div key={ index } className="ranking-item">
              <h4>
                <span>
                  {`${index + 1}º. `}
                  {' '}
                </span>
                <span data-testid={ `player-name-${index}` }>{name}</span>
              </h4>
              <h4 data-testid={ `player-score-${index}` }>{score}</h4>
              <img
                className="avatar"
                src={ `https://www.gravatar.com/avatar/${emailHash}` }
                alt={ `Gravatar de ${name}` }
              />
            </div>
          ))}
          <Link to="/">
            <input
              data-testid="btn-go-home"
              type="button"
              value="Inicio"
              onClick={ () => dispatchZerar() }
            />
          </Link>
          <Footer />
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  dispatchZerar: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  assertions: state.player.assertions,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchZerar: () => { dispatch(reset()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
