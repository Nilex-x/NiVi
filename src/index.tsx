import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Navigation from './components/Nav/Navigation';

const client = new ApolloClient({
  uri: `http://${window.location.hostname}:4000`,
  cache: new InMemoryCache()
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Navigation/>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);