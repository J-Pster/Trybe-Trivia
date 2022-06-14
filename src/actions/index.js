export const loginUser = (loginInfo) => ({
  type: 'LOGIN_USER',
  payload: {
    name: loginInfo.name,
    email: loginInfo.email,
  },
});

export const changeScore = (setScore) => ({
  type: 'CHANGE_SCORE',
  payload: {
    score: setScore.score,
    assertions: setScore.assertions,
  },
});

export const reset = () => ({ type: 'RESET_STORE' });
