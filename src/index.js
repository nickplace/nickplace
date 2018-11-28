import React from 'react';
import ReactDOM from 'react-dom';
import SingleProfile from './SingleProfile';
import SinglePatient from './SinglePatient';
import ProfileList from './ProfileList';
import PatientList from './PatientList';
import Nav from './Nav';
import './App.scss';
import 'bootstrap';

import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import { ApolloProvider } from 'react-apollo';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset'

// const httpLink = new HttpLink({ uri:  process.env.API_BASE })
const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjo4sxik93ih50155txkz8m0i' })

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

ReactDOM.render(
    <Router>
      <ApolloProvider client={client}>
      	<div class="App-body">
	        {window.location.pathname.includes('api') ? null :  <Nav /> }
	        <div class="App-content">
		        <Route path="/profiles" component={ProfileList} />
		        <Route path="/patients" component={PatientList} />
		        <Route path="/profile/:id" component={SingleProfile} />
		        <Route path="/patient/:id" component={SinglePatient} />
	        </div>
        </div>
      </ApolloProvider>
    </Router>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
