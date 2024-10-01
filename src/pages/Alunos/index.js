import { get } from 'lodash'
import axios from '../../services/axios';
import { Main, ListaAlunos } from './styled';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaWindowClose, FaUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Loading from '../../components/Loading';


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
    return (
    <Main>
        <Loading isLoading={isLoading} />
        <section className="main-content">
        <h1>Alunos</h1>
        <ListaAlunos>
            {alunos.map(aluno => (
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
                        <Link to={`/aluno/${aluno.id}/delete`}>
                            <FaWindowClose className='student-button-delete' />
                        </Link>
                    </div>
                </li>
            ))}
        </ListaAlunos>
        </section>
    </Main>
  )
}
