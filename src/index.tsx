import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Navigation from './components/Nav/Navigation';
import GQLClient from './Graphql/GraphqlConfig';

const client = GQLClient.getIntance()?.getClient()

ReactDOM.render(
    <ApolloProvider client={client}>
      <Navigation/>
    </ApolloProvider>,
  document.getElementById('root')
);