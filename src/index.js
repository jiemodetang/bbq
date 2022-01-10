import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import rootReducer from './Redux/Reducers'

import App from './Components/App'
import GlobalStyle from './Styles/global'

const store = createStore(rootReducer)



ReactDOM.render(
  <Router>
    <GlobalStyle/>
    <Provider store={store}>
      <App/>
    </Provider>
  </Router>,document.getElementById('root'))
