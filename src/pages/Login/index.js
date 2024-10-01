import React from 'react';
import { get } from 'lodash';
import { isEmail } from 'validator';
import { Main, Form } from './styled';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/modules/auth/actions';


export default function Login(props){

    const dispatch = useDispatch();
    const prevPath = get(props, 'location.state.prevPath', '/');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('')

    const handleSubmit = e => {
        e.preventDefault();
        let formErrors = false;

        if(!isEmail(email)){
            formErrors = true;
            toast.error('E-mai inválido.');
        }

        if (password.length < 6 || password.length > 50){
            formErrors = true;
            toast.error('Senha inválida.')
        }

        if(formErrors) return;
        dispatch(actions.loginRequest({email, password, prevPath}));
    };
    return (
        <Main>
            <section className="main-content">
                <h1>Crie sua conta:</h1>
                <Form onSubmit={handleSubmit}>
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
