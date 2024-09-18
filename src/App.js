import React from 'react';
import Routes from './routes';
import Header from './components/Header';
import { Router } from 'react-router-dom';
import history from './services/history';
import GlobalStyler from './styles/GlobalStyler';


function App() {
    return (
        <Router history={history}>
            <Header />
            <Routes />
            <GlobalStyler />
        </Router>
    );
}

export default App;
