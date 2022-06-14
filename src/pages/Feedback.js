import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Feedback.css';

class Feedback extends Component {
  render() {
    const { assertions, score } = this.props;
    const condition = 3;
    return (
      <div className="feedback-page">
        <Header />
        <div className="feedback-container content-wrap">
          <div data-testid="feedback-text">
            {assertions < condition ? 'Could be better...' : 'Well Done!'}
          </div>
          <div>
            Pontuação final:
            <span data-testid="feedback-total-score">{score}</span>
          </div>
          <div>
            Respostas certas:
            <span data-testid="feedback-total-question">{assertions}</span>
          </div>
          <Link to="/">
            <input
              data-testid="btn-play-again"
              type="button"
              value="Jogar Novamente"
            />
          </Link>
          <Link to="/ranking">
            <input
              data-testid="btn-ranking"
              type="button"
              value="Ranking"
            />
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
