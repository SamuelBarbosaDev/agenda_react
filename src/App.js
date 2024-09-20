import React from 'react';
import store from './store';
import Routes from './routes';
import { Provider } from 'react-redux';
import Header from './components/Header';
import history from './services/history';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import GlobalStyler from './styles/GlobalStyler';

function App() {
    return (
        <Provider store={store}>
            <Router history={history}>
                <Header />
                <Routes />
                <GlobalStyler />
                <ToastContainer autoClose={1000} className="toast-container" />
            </Router>
        </Provider>
    );
}

export default App;
