import { hot } from 'react-hot-loader';
import React  from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import Body from './Body';

library.add(faImages);

const App = (): JSX.Element => <Home />;

class Home extends React.Component {
  render(): JSX.Element {
    return (
      <Body/>
    );
  }
}

export default hot(module)(App);
