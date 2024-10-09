import { get } from 'lodash';
import * as types from '../types';
import * as actions from './actions';
import { toast } from 'react-toastify';
import axios from '../../../services/axios';
import history from '../../../services/history';
import { call, put, all, takeLatest } from 'redux-saga/effects';

function* loginRequest({payload}){
    try{
        const response = yield call(axios.post, '/tokens', payload);
        yield put(actions.loginSuccess({...response.data}));

        toast.success('Sucesso! Você entrou com seu usuário.')
        axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

        history.push(payload.prevPath);
    }
    catch(e){
        toast.error('Usuário ou senha inválida.')
        yield put(actions.loginFailure());
    }
}

function persistRehydrate({payload}){
    const token = get(payload, 'auth.token', '');
    if(!token) return;
    axios.defaults.headers.Authorization = `Bearer ${token}`;
}

function* registerRequest({payload}){
    const {id, nome, email, password} = payload;

    try{
        if(id){
            yield call(axios.put, '/users', {
                email,
                nome,
                password: password || undefined,
            });

            toast.success('Conta alterada com sucesso!');
            yield put(actions.registerUpdatedSuccess({nome, email, password}));
        }
        else {
            yield call(axios.post, '/users', {
                email,
                nome,
                password,
            });
        }
        toast.success('Conta criada com sucesso!');
        yield put(actions.registerCreatedSuccess({nome, email, password}));
        history.push('/login');
    }
    catch(e){
        const errors = get(e, 'response.data.errors', []);
        const status = get(e, 'response.status', 0);

        if(status === 401){
            toast.error('Você precisa fazer login novamente.');
            yield put(actions.loginFailure());
            return history.push('/login');
        }

        if(errors.length > 0){
            errors.map(error => toast.error(error));
        }
        else{
            toast.error('Erro desconhecido');
        }

        yield put(actions.registerFailure());
    }
}

export default all([
    takeLatest(types.LOGIN_REQUEST, loginRequest),
    takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
    takeLatest(types.REGISTER_REQUEST, registerRequest)
]);
