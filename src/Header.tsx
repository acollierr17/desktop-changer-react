import React, { Component } from 'react';

class Header extends Component {
  public render(): JSX.Element {
    return (
      <>
        <div id="header">
          <h1 className="title appTitle" id="mainSection">🖥 Desktop Background Changer</h1>
          <p className="subtitle appDescription">Import an image link and change your desktop background on the fly!</p>
        </div>
      </>
    );
  }
}

export default Header;
