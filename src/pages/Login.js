import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Login.css';
import logo from '../trivia.png';
import Footer from '../components/Footer';
import * as actions from '../actions';
import * as api from '../helpers/api';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      buttonDisabled: true,
    };
  }

  changeInput = ({ target }) => {
    const { id, value } = target;
    this.setState({ [id]: value });

    this.setState({ buttonDisabled: true }, () => {
      if (this.emailValidation() && this.nameValidation()) {
        this.setState({
          buttonDisabled: false,
        });
      }
    });
  }

  onClickButton = async () => {
    // Redux
    const { name, email } = this.state;
    const loginInfo = { name, email };
    const { dispatchLogin } = this.props;
    dispatchLogin(loginInfo);

    // Api
    const API_GAME = await api.startTriviaGame();
    console.log(API_GAME);

    // Redirect
    // const { history } = this.props;
    // history.push('/game');
  };

  emailValidation() {
    const { email } = this.state;
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!email || regex.test(email) === false) {
      return false;
    }

    return true;
  }

  nameValidation() {
    const { name } = this.state;
    const minLeg = 3;
    if (name.length < minLeg) {
      return false;
    }

    return true;
  }

  render() {
    // const { history } = this.props;
    const { name, email, buttonDisabled } = this.state;

    return (
      <div className="Login">
        <div className="Login-body">
          <img src={ logo } className="Login-logo" alt="logo" />
          <div className="form-group form">
            <h4>Bem vindo, faça login para jogar.</h4>
            <label htmlFor="name">
              Nome:
              {' '}
              <input
                required
                data-testid="input-player-name"
                className="form-control"
                id="name"
                type="text"
                value={ name }
                onChange={ this.changeInput }
              />
            </label>
            <label htmlFor="email">
              E-mail:
              {' '}
              <input
                required
                data-testid="input-gravatar-email"
                className="form-control"
                id="email"
                type="email"
                value={ email }
                onChange={ this.changeInput }
              />
            </label>
            <Link to="/game">
              <input
                data-testid="btn-play"
                className="btn btn-primary"
                type="button"
                onClick={ this.onClickButton }
                value="Play"
                disabled={ buttonDisabled }
              />
            </Link>
            <Link to="/settings">
              <input
                data-testid="btn-settings"
                className="btn btn-primary"
                type="button"
                // onClick={ () => { history.push('/settings'); } }
                value="Configurações"
              />
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape(PropTypes.object),
  dispatchLogin: PropTypes.func,
}.isRequired;

Login.defaultProps = {
  history: undefined,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchLogin: (loginInfo) => dispatch(actions.loginUser(loginInfo)),
});

export default connect(null, mapDispatchToProps)(Login);
