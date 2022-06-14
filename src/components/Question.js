import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Question.css';
import { changeScore } from '../actions';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 30,
      timeout: false,
    };
  }

  componentDidMount = () => {
    const interval = 1000;
    const { timer } = this.state;
    const countdown = setInterval(this.setCountdown, interval);
    if (!timer) {
      clearInterval(countdown);
    }
  }

  setCountdown = () => {
    const { timer } = this.state;
    if (timer > 0) {
      this.setState(() => ({ timer: timer - 1 }));
    }
    if (!timer) {
      this.setState(({ timeout: true }));
    }
  }

  showAnswers = () => {
    const { answers } = this.props;
    if (!answers) return <h2>Carregando...</h2>;
    const { timeout } = this.state;
    return answers.map((answer, index) => (
      <button
        data-testid={ answer.correct ? 'correct-answer' : `wrong-answer-${index}` }
        key={ index }
        type="button"
        className="btn btn-secondary"
        disabled={ timeout }
        onClick={ this.checkAnswers }
      >
        {this.replaceCharacters(answer.answer)}
      </button>
    ));
  }

  countScore = () => {
    const { timer } = this.state;
    const { question, dispatch } = this.props;
    // eu já disse que odeio o lint e o magicNumbers hoje? // somos 2!!
    const ten = 10;
    const three = 3;
    const hard = ten + (timer * three);
    const medium = ten + (timer * 2);
    const easy = ten + timer;
    const assertions = 1;
    if (question.difficulty === 'hard') {
      dispatch(changeScore({ score: hard, assertions }));
    }
    if (question.difficulty === 'medium') {
      dispatch(changeScore({ score: medium, assertions }));
    }
    if (question.difficulty === 'easy') {
      dispatch(changeScore({ score: easy, assertions }));
    }
  }

  checkAnswers = (e) => {
    const { answers } = this.props;
    const { timeout } = this.state;
    const { enableNext } = this.props;
    if (timeout) return;

    const answer = e.target.innerHTML;
    const correctAnswer = answers.find((a) => a.answer === answer).correct;
    if (correctAnswer) this.countScore();

    this.changeButtonColors();
    enableNext();
  }

  changeButtonColors = () => {
    const { timeout } = this.state;
    if (timeout) return;

    const correctButtons = document.querySelectorAll('[data-testid="correct-answer"]');
    const wrongButtons = document.querySelectorAll('[data-testid^="wrong-answer"]');

    correctButtons.forEach((button) => {
      button.style.backgroundColor = 'rgb(6, 240, 15)';
      button.style.border = '3px solid rgb(6, 240, 15)';
    });

    wrongButtons.forEach((button) => {
      button.style.backgroundColor = 'red';
      button.style.border = '3px solid red';
    });
  }

  lockButtons = () => {
    this.setState(() => ({
      timeout: true,
    }));
  }

  replaceCharacters = (string) => string.replace(/&quot;/img, '"')
    .replace(/&#039;|&prime;|&rsquo;/img, '´')
    .replace(/&atilde;/img, 'ã')
    .replace(/&otilde;/img, 'õ')
    .replace(/&ntilde;/img, 'ñ')
    .replace(/&eacute;/img, 'é')
    .replace(/&aacute;/img, 'á')
    .replace(/&agrave;/img, 'à')
    .replace(/&egrave;/img, 'è')
    .replace(/&auml;/img, 'ä')
    .replace(/&ouml;/img, 'ö')
    .replace(/&acirc;/img, 'â')
    .replace(/&ecirc;/img, 'ê')
    .replace(/&ocirc;/img, 'ô')
    .replace(/&ccedil;/img, 'ç')
    .replace(/&amp;/img, '&')

  render() {
    const { timer } = this.state;
    const { question } = this.props;
    const almostOutOfTime = 6;
    return (
      <>
        <h3 className={ timer < almostOutOfTime && 'timer' }>{timer}</h3>
        <h3 data-testid="question-category">{question.category}</h3>
        <h1 data-testid="question-text">
          {this.replaceCharacters(question.question)}

        </h1>
        <div data-testid="answer-options" className="answers-list">
          {this.showAnswers()}
        </div>
      </>
    );
  }
}

Question.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.shape({ answer: PropTypes.string })),
  question: PropTypes.string,
}.isRequired;

export default connect()(Question);
