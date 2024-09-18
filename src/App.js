import React from 'react';
import Login from './pages/Login'
import GlobalStyler from './styles/GlobalStyler';
import Header from './components/Header'

function App() {
    return (
        <>
        <Header />
        <main className="ma">
            <Login />
            <GlobalStyler />
        </main>
        </>
    );
}

export default App;
