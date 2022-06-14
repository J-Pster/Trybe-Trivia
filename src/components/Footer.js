import React from 'react';
import '../index.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <p>
          Feito com
          {' '}
          <span role="img" aria-label="Heart">❤️</span>
          {' '}
          por João Pster, Luísa V. Boas, Jamile, Guilherme S. Garcia.
        </p>
      </footer>
    );
  }
}

export default Footer;
