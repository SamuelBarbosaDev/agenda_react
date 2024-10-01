import React, { useState } from 'react';
import { Form, Main } from './styled';
import { toast } from 'react-toastify';
import { isEmail } from 'validator'
import axios from '../../services/axios';
import history from '../../services/history';
import get from 'lodash';
import Loading from '../../components/Loading';

export default function Register(){
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState(false);

    async function handleSubmit(e){
        e.preventDefault();

        let formErrors = false;

        if(nome.length < 3 || nome.length > 255){
            formErrors = true;
            toast.error('Nome deve ter entre 3 e 255 caracteres.');
        }

        if(!isEmail(email)){
            formErrors = true;
            toast.error('Email inválido.')
        }

        if(password.length < 6 || password.length > 50){
            formErrors = true;
            toast.error('Senha deve ter entre 6 e 50 caracteres.');
        }

        if(formErrors) return;

        try{
            await axios.post('/users/', {
                nome,
                email,
                password,
            })
            toast.success('Usuário cadastrado com sucesso.')
            history.push('/login');
        }
        catch (error){
            const errors = get(error, 'response.data.errors', []);

            errors.map(error => toast.error(error));
        }
    }

    return (
        <Main>
            <Loading isLoading={isLoading} />
            <section className="main-content">
                <h1>Crie sua conta:</h1>
                <Form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='nome'>Nome:</label>
                        <input
                            name='nome'
                            type='text'
                            placeholder='Seu nome'
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='email'>E-mail:</label>
                        <input
                            name='email'
                            type='email'
                            placeholder='Seu E-mail'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Senha:</label>
                        <input
                            name='password'
                            type='password'
                            placeholder='Sua Senha'
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button type='submit'>Enviar</button>
                </Form>
            </section>
        </Main>
    )
}
