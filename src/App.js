import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import './App.css';

import Field from './components/Field'
import Text from './components/Text'

import TimelineField from './components/TimelineField'

import data from './data/data.json';

// configure our API URI & cache
const uri = process.env.API_URI;
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
        <Field>
          <Text>
            Some Text
          </Text>
          <TimelineField range='800 - 1000' redline='850' data={data}/>
        </Field>
      </div>
    </ApolloProvider>
  );
}

export default App;
