import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Navigation from './components/Nav/Navigation';
import GQLClient from './Graphql/GraphqlConfig';

const client = GQLClient.getIntance()?.getClient()

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Navigation/>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);