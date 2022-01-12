import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import rootReducer from './Redux/Reducers'

import App from './Components/App'
import GlobalStyle from './Styles/global'

import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { unstable_createMuiStrictModeTheme } from '@mui/material/styles';

const theme = unstable_createMuiStrictModeTheme();

const store = createStore(rootReducer)

ReactDOM.render(
  <Router>
    <GlobalStyle/>
    
    <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App/>
      </ThemeProvider>
    </Provider>
  </Router>,document.getElementById('root'))
