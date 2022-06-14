export const getLocalToken = () => {
  const meuLocal = localStorage.getItem('token');
  if (meuLocal) {
    return meuLocal;
  }

  const meuNovoLocal = '';

  localStorage.setItem('token', meuNovoLocal);
  return localStorage.getItem('token');
};

export const setLocalToken = (token) => {
  localStorage.setItem('token', token);
};

export const getLocalRanking = () => {
  const meuLocal = localStorage.getItem('ranking');
  if (meuLocal) {
    return meuLocal;
  }

  const meuNovoLocal = [];

  localStorage.setItem('ranking', JSON.stringify(meuNovoLocal));
  return localStorage.getItem('ranking');
};

export const addLocalRanking = (name, score, picture) => {
  const meuLocal = JSON.parse(getLocalRanking);
  const meuNovoLocal = [...meuLocal, { name, score, picture }];
  localStorage.setItem('ranking', JSON.stringify(meuNovoLocal));
};

// export default getLocalToken;
