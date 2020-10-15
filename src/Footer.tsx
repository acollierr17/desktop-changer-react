import React, { Component } from 'react';

class Footer extends Component {
  public render(): JSX.Element {
    return (
      <>
        <div>
          <p>Made with <span style={{ color: '#e25555' }}>&#9829;</span> by <a href="http://github.com/acollierr17" target="_blank" rel="noreferrer">Anthony Collier</a></p>
          <p>Images sourced from <a href="https://unsplash.com" target="_blank" rel="noreferrer">Unsplash.com</a></p>
          <p>Contribute on <a href="http://github.com/acollierr17/desktop-changer" target="_blank" rel="noreferrer">GitHub</a></p>
        </div>
      </>
    );
  }
}

export default Footer;
