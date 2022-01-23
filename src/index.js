import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import 'popular-message/index.css';
import rootReducer from "./Redux/Reducers";
import $message from 'popular-message';
import App from "./Components/App";
import GlobalStyle from "./Styles/global";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";

const store = createStore(rootReducer);

window._M = $message
ReactDOM.render(
    <Router>
        <GlobalStyle />
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </Provider>
    </Router>,
    document.getElementById("root")
);
