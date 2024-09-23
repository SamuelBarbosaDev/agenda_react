import React from 'react';
import { Title } from './styled';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import * as exampleActions from '../../store/modules/example/actions';

export default function Login(){
    const message = () => {
        toast.success('Sucesso')
        toast.error('Erro')
    }

    const dispatch = useDispatch();

    function handleClick(e){
        e.preventDefault();
        console.log(exampleActions.clicaBotaoRequest())
        dispatch(exampleActions.clicaBotaoRequest());
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
