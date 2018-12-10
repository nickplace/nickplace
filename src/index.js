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
import { persistCache } from 'apollo-cache-persist';
import {QueueMutationLink} from './QueueMutationLink'
import {SyncOfflineMutation} from './SyncOfflineMutation'
import {onError} from 'apollo-link-error'
import {ApolloLink} from 'apollo-link'


const setupApolloClient = async () => {

  var storage = window.localStorage
  var cache = new InMemoryCache()
  const queueLink = new QueueMutationLink({storage})

  persistCache({
    cache,
    storage: storage,
  })

  // const httpLink = new HttpLink({ uri: 'http://172.20.10.2:60000/simple/v1/cjo8zndw700060105tz4pbbc5' })
  const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjo4sxik93ih50155txkz8m0i' })
  const onErrorLink = onError(({response, graphQLErrors, networkError}) => {
    console.log(networkError)
    console.log(graphQLErrors)
    response = {errors: null}
  })

  let link = ApolloLink.from([queueLink, onErrorLink, httpLink])

  const apolloClient = new ApolloClient({
      link: link,
      cache: cache
    })

  window.addEventListener('online', () => queueLink.open({apolloClient}))
  window.addEventListener('offline', () => queueLink.close())

  const syncOfflineMutation = new SyncOfflineMutation({apolloClient, storage})
  await syncOfflineMutation.init()
  await syncOfflineMutation.sync()

  return apolloClient
}

setupApolloClient().then(function(apolloClient) {

  ReactDOM.render(
      <Router>
        <ApolloProvider client={apolloClient}>
        	<div class="App-body">
  	        {window.location.pathname.includes('api') ? null :  <Nav /> }
  	        <div class="App-content">
              <Route exact path="/" component={ProfileList} />
  		        <Route path="/profiles" component={ProfileList} />
  		        <Route path="/patients" component={PatientList} />
  		        <Route path="/profile/:id" component={SingleProfile} />
  		        <Route path="/patient/:id" component={SinglePatient} />
  	        </div>
          </div>
        </ApolloProvider>
      </Router>
  , document.getElementById('root'));
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister  ();
