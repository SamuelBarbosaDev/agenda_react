import React from 'react';
import {get} from 'lodash';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Title, Form, ProfilePicture } from './styled';
import { Link } from 'react-router-dom';
import axios from '../../services/axios';
import {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import history from '../../services/history';
import Loading from '../../components/Loading';
import { isEmail, isInt, isFloat } from 'validator';
import { FaUserCircle, FaEdit } from 'react-icons/fa';
import * as actions from '../../store/modules/auth/actions';


export default function Aluno({ match }){
    const dispatch = useDispatch();
    const id = get(match, 'params.id', '');
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [idade, setIdade] = useState('');
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [foto, setfoto] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(!id) return;

        async function getData(){
            try{
                setIsLoading(true);
                const { data } = await axios.get(`/alunos/${id}`);
                const Foto = get(data, 'Fotos[0].url', '');

                setNome(data.nome);
                setSobrenome(data.sobrenome);
                setEmail(data.email);
                setIdade(data.idade);
                setPeso(data.peso);
                setAltura(data.altura);

                setIsLoading(false);
            }
            catch(error){
                setIsLoading(false);
                const status = get(error, 'response.status', 0);
                const errors = get(error, 'response.data.errors', []);

                if(status === 400) errors.map(error => toast.error(error));
                history.pushState('/');
            }
        }
        getData();
    }, [id]);

    const handleSubmit = async e => {
        e.preventDefault();
        let formErrors = false;

        if(nome.length < 3 || sobrenome.length > 255){
            toast.error('Nome precisa ter entre 3 e 255 caracteres.');
            formErrors = true;
        };

        if(sobrenome.length < 3 || sobrenome.length > 255){
            toast.error('Sobrenome precisa ter entre 3 e 255 caracteres');
            formErrors = true;
        };

        if(!isEmail(email)){
            toast.error('E-mail inválido');
            formErrors = true;
        };

        if(!isInt(String(idade))){
            toast.error('Idade inválida');
            formErrors = true;
        };

        if(!isFloat(String(peso))){
            toast.error('Peso inválido');
            formErrors = true;
        };

        if(!isFloat(String(altura))){
            toast.error('Altura inválida');
            formErrors = true;
        }

        if(formErrors) return;

        try{
            setIsLoading(true);

            if(id){
                await axios.put(`/alunos/${id}`, {
                    nome,
                    sobrenome,
                    email,
                    idade,
                    peso,
                    altura,
                })
                toast.success('Aluno editado com sucesso!');
            }

            else{
                const { data } = await axios.post(`/alunos/`, {
                    nome,
                    sobrenome,
                    email,
                    idade,
                    peso,
                    altura,
                });
                toast.success('Aluno criado com sucesso!');
                history.pushState(`/aluno/${data.id}/edit`);
            }
            setIsLoading(false);
        }
        catch (error){
            const status = get(error, 'response.status', 0);
            const data = get(error, 'response.data', {});
            const errors = get(data, 'errors', []);

            if(errors.length > 0){
                errors.map(error => toast.error(error));
            }
            else{
                toast.error('Erro desconhecido');
            };

            if (status === 401) dispatch(actions.loginFailure());
        }
    };


    return (
    <main>
        <section className="main-content">
            <Loading isLoading={isLoading} />

            <Title>{id ? 'Editar Aluno' : 'Novo Aluno'}</Title>

            {
                id && (
                    <ProfilePicture>
                        {foto ? <img src={foto} alt={nome} /> : <FaUserCircle size={180} />}
                        <a href={`/fotos/${id}`}>
                            <FaEdit size={24} />
                        </a>
                    </ProfilePicture>
                )
            }

            <Form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label>
                    <input
                        type='text'
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                        placeholder='Nome'
                    />
                </div>
                <div>
                    <label>Sobrenome:</label>
                    <input
                        type="text"
                        value={sobrenome}
                        onChange={e => setSobrenome(e.target.value)}
                        placeholder="Sobrenome"
                    />
                </div>
                <div>
                    <label>E-mail:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                </div>
                <div>
                    <label>Idade:</label>
                    <input
                        type="number"
                        value={idade}
                        onChange={e => setIdade(e.target.value)}
                        placeholder="Idade"
                    />
                </div>
                <div>
                    <label>Peso:</label>
                    <input
                        type="number"
                        value={peso}
                        onChange={e => setPeso(e.target.value)}
                        placeholder="Peso"
                    />
                </div>
                <div>
                    <label>Altura:</label>
                    <input
                        type="number"
                        value={altura}
                        onChange={e => setAltura(e.target.value)}
                        placeholder="Altura"
                    />
                </div>

                <button type='submit'>Enviar</button>
            </Form>
        </section>
    </main>
  )
}

Aluno.propTypes = {
    match: PropTypes.shape({}).isRequired,
}
