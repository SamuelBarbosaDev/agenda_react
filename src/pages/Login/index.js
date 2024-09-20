import React from 'react';
import { Title } from './styled';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

export default function Login(){
    const message = () => {
        toast.success('Sucesso')
        toast.error('Erro')
    }

    const dispatch = useDispatch();

    function handleClick(e){
        e.preventDefault();

        dispatch({
            type: 'BOTAO_CLICADO',
        })
    }
    return (
    <main>
        <section className="main-content">
        <Title>Login</Title>
        <button onClick={handleClick}>Enviar</button>
        </section>
    </main>
  )
}
