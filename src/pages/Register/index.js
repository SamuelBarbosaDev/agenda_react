import React, { useState } from 'react';
import { Form, Main } from './styled';
import { toast } from 'react-toastify';
import { isEmail } from 'validator'
import axios from '../../services/axios';
import history from '../../services/history';
import get from 'lodash';
import Loading from '../../components/Loading';
import {useSelector, useDispatch} from 'react-redux'
import * as actions from '../../store/modules/auth/actions'


export default function Register(){
    const dispatch = useDispatch();
    const id = useSelector(state => state.auth.user.id);
    const nomeStored = useSelector(state => state.auth.user.nome);
    const emailStored = useSelector(state => state.auth.user.email);
    const isLoading = useSelector(state => state.auth.isLoading);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    React.useEffect(() => {
        if(!id) return;

        setNome(nomeStored);
        setEmail(emailStored);
    }, [emailStored, id, nomeStored]);

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

        if(!id && password.length < 6 || password.length > 50){
            formErrors = true;
            toast.error('Senha deve ter entre 6 e 50 caracteres.');
        }

        if(formErrors) return;

        dispatch(actions.registerRequest({nome, email, password, id}));
    }

    return (
        <Main>
            <Loading isLoading={isLoading} />
            <section className="main-content">
                <h1>{id ? 'Editar dados' : 'Crie sua conta:'}</h1>
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
                    <button type='submit'>{id ? 'Salvar' : 'Criar'}</button>
                </Form>
            </section>
        </Main>
    )
}
