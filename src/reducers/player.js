// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'LOGIN_USER':
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  case 'CHANGE_SCORE':
    return {
      ...state,
      score: state.score + action.payload.score,
      assertions: state.assertions + action.payload.assertions,
    };
  case 'RESET_STORE':
    return {
      ...state,
      name: '',
      gravatarEmail: '',
      score: 0,
      assertions: 0,
    };
  default:
    return state;
  }
}

export default player;
