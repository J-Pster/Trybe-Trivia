import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import logo from '../trivia.png';
import './Header.css';

class Header extends Component {
  render() {
    const { name, score, gravatarEmail } = this.props;
    const emailHash = md5(gravatarEmail).toString();

    return (
      <div className="container-user-info">
        <img src={ logo } className="Trivia-logo Login-logo" alt="logo" />
        <div className="usuario">
          <div className="jogador">
            <h6>Jogador</h6>
            <p data-testid="header-player-name">{name}</p>
          </div>
          <div className="pontuacao">
            <h6>Pontuação</h6>
            <p data-testid="header-score">{score}</p>
          </div>
        </div>
        <img
          data-testid="header-profile-picture"
          className="avatar"
          src={ `https://www.gravatar.com/avatar/${emailHash}` }
          alt={ `Gravatar de ${name}` }
        />
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(Header);
