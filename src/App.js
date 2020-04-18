import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import logo from './logo.jpg';
import './App.css';
import Launches from './components/Launches';
import Launch from './components/Launch'

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
});
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <img src={logo} style={{ width: '300px', display: 'block', margin: 'auto' }}></img>
        </div>
        <Route exact path="/" component={Launches}/>
        <Route exact path="/launch/:flight_number" component={Launch}/>
      </Router>
    </ApolloProvider>
  );
}

export default App;
