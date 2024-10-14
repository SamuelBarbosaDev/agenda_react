import React from 'react';
import {get} from 'lodash';
import {toast} from 'react-toastify';
import propTypes from 'prop-types';
import Loading from '../../components/Loading';
import { Form } from './styled';
import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';
import { useDispatch } from 'react-redux';


export default function Fotos({match}){
    const dispatch = useDispatch();
    const id = get(match, 'params.id', '');
    const [isLoading, setIsLoading] = React.useState(false);
    const [foto, setFoto] = React.useState('');

    React.useEffect(() => {
        const getData = async () => {
            try{
                setIsLoading(true);
                const { data } = await axios.get(`/alunos/${id}`);
                setFoto(get(data, 'Fotos[0].url', ''));
                setIsLoading(false);
            }
            catch{
                toast.error('Erro ao obter imagem');
                setIsLoading(false);
                history.push('/');
            }
        }
        getData();
    }, [id]);

    const handleChange = async e => {
        const file = e.target.files[0];
        const fotoURL = URL.createObjectURL(file)

        setFoto(fotoURL);

        const formData = new FormData();
        formData.append('aluno_id', id);
        formData.append('foto', file);

        try{
            setIsLoading(true);

            await axios.post('/fotos/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            toast.success('Fotos enviada com sucesso!');

            setIsLoading(false);
        }
        catch(erro){
            setIsLoading(false);
            const {status} = get(erro, 'response', '');
            toast.error('Erro ao enviar foto.');

            if (status === 401) dispatch(actions.loginFailure());
        }
    }


    return (
    <main>
        <section className="main-content">
            <h1>Fotos</h1>
            <Loading isLoading={isLoading} />
            <Form>
                <label htmlFor="foto">
                {foto ? <img src={foto} alt="Foto" /> : 'Selecionar'}
                <input type="file" id="foto" onChange={handleChange} />
                </label>
            </Form>
        </section>
    </main>
  )
}

Fotos.propTypes = {
    match: propTypes.shape({}).isRequired,
}
