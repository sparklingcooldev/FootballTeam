import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './app/store';
import { Provider } from 'react-redux';
import { Auth0Provider } from "@auth0/auth0-react";

import GlobalStyle from './style/Global';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <Auth0Provider
        domain="opensea.io"
        clientId="YOUR_CLIENT_ID"
        redirectUri={window.location.origin}
    >
        <Provider store={store}>
            <GlobalStyle />
            <App />
        </Provider>
    </Auth0Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
