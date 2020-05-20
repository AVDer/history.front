import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import './App.css';

import data from './data/data.json';
import MainPage from './pages/main'

// configure our API URI & cache
const uri = process.env.REACT_APP_API_URI;

const cache = new InMemoryCache();

// configure Apollo Client
const client = new ApolloClient({
  uri,
  cache,
  connectToDevTools: true
});

function App() {


  return (
    <ApolloProvider client={client}>
      <div className="App">
        <MainPage/>
      </div>
    </ApolloProvider>
  );
}

export default App;
