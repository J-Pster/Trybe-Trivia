import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchTriviaQuestion } from '../helpers/api';
import Question from '../components/Question';
import './Game.css';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      next: false,
      index: 0,
      allQuestions: [],
      allAnswers: [],
    };
  }

  createAnswers = (allQuestions) => {
    allQuestions.forEach((question) => {
      const {
        incorrect_answers: incorrectAnswers,
        correct_answer: correctAnswer,
      } = question;
      const answers = [{ answer: correctAnswer, correct: true }]
        .concat(incorrectAnswers.map((answer) => ({ answer, correct: false })));

      const sortNumber = 0.5;
      const sortedAnswers = answers.sort(() => Math.random() - sortNumber);

      this.setState((prevState) => ({
        allAnswers: [...prevState.allAnswers, sortedAnswers],
      }));
    });
  }

  componentDidMount = async () => {
    const { history } = this.props;
    const allQuestions = await fetchTriviaQuestion();
    if (allQuestions === null) history.push('/');

    this.setState({
      loading: false,
      index: 0,
      allQuestions,
    }, () => this.createAnswers(allQuestions));
  }

  showQuestion = () => {
    const { allQuestions, allAnswers, index, loading } = this.state;

    if (loading) return <h1>Carregando...</h1>;
    return (<Question
      key={ index }
      question={ allQuestions[index] }
      answers={ allAnswers[index] }
      enableNext={ this.enableNext }
    />);
  }

  changeQuestion = () => {
    const { index, allQuestions } = this.state;
    const { history } = this.props;

    if (index === allQuestions.length - 1) {
      history.push('/feedback');
    } else {
      this.setState((prevState) => ({
        index: prevState.index + 1,
      }), () => { this.setState({ next: false }); });
    }
  }

  enableNext = () => {
    this.setState({
      next: true,
    });
  }

  render() {
    const { next } = this.state;
    return (
      <div className="game-page">
        <Header />
        <div className="game-container content-wrap">
          { this.showQuestion() }
          { next && (
            <button
              data-testid="btn-next"
              type="button"
              onClick={ this.changeQuestion }
            >
              Próxima pergunta
            </button>
          )}
        </div>
        <Footer />
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape(PropTypes.object),
  dispatchLogin: PropTypes.func,
}.isRequired;

Game.defaultProps = {
  history: undefined,
};

export default Game;
