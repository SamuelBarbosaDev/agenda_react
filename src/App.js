import React from 'react';
import Routes from './routes';
import Header from './components/Header';
import { Router } from 'react-router-dom';
import history from './services/history';
import GlobalStyler from './styles/GlobalStyler';
import { ToastContainer } from 'react-toastify';

function App() {
    return (
        <Router history={history}>
            <Header />
            <Routes />
            <GlobalStyler />
            <ToastContainer autoClose={1000} className="toast-container" />
        </Router>
    );
}

export default App;
