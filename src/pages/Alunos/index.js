import { get } from 'lodash'
import { toast } from 'react-toastify';
import axios from '../../services/axios';
import { Main, ListaAlunos } from './styled';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Loading from '../../components/Loading';
import {
    FaEdit,
    FaWindowClose,
    FaUserCircle,
    FaExclamation
} from 'react-icons/fa'


export default function Alunos(){
    const [ alunos, setAlunos ] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function getData() {
            const response = await axios.get('/alunos');
            setAlunos(response.data);
        }
        getData();
    }, []);

    const handleDeleteAsk = e => {
        e.preventDefault();
        const exclamation = e.currentTarget.nextSibling;
        exclamation.setAttribute('display', 'block');
        e.currentTarget.remove();
    }

    const handleDelete = async(e, id, index) => {
        e.persist();

        try{
            setIsLoading(true);
            await axios.delete(`/alunos/${id}`);
            const novosAlunos = [...alunos];
            novosAlunos.splice(index, 1);
            setAlunos(novosAlunos);
            setIsLoading(false);
        }
        catch(err){
            const status = get(err, 'response.status', 0)

            if(status === 401){
                toast.error('Você precisa fazer login.');
            }
            else{
                toast.error('Ocorreu um erro ao excluir aluno.')
            }
            setIsLoading(false)
        }
    }
    return (
    <Main>
        <Loading isLoading={isLoading} />
        <section className="main-content">
        <h1>Alunos</h1>
        <ListaAlunos>
            {alunos.map((aluno, index) => (
                <li key={String(aluno.id)}>
                    <section className='student-content'>
                        <div className='profile-picture'>
                            {
                                get(aluno, 'Fotos[0].url', false) ? (
                                    <img src={aluno.Fotos[0].url} alt=''/>
                                ) : (
                                    <FaUserCircle size={36}/>
                                )
                            }
                        </div>
                        <div>
                            <p>{aluno.nome}</p>
                        </div>
                        <div>
                            <p>{aluno.email}</p>
                        </div>
                    </section>
                    <div className='student-buttons'>
                        <Link to={`/aluno/${aluno.id}/edit`}>
                            <FaEdit className='student-button-edit' />
                        </Link>
                        <Link onClick={handleDeleteAsk} to={`/aluno/${aluno.id}/delete`}>
                            <FaWindowClose className='student-button-delete' />
                        </Link>
                        <FaExclamation
                            size={16}
                            display="none"
                            cursor="pointer"
                            onClick={e => handleDelete(e, aluno.id, index)}
                        />
                    </div>
                </li>
            ))}
        </ListaAlunos>
        </section>
    </Main>
  )
}
