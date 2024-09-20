import React from 'react';
import { Link } from 'react-router-dom';
import { HeaderContent } from './styled';
import { FaHome, FaSignInAlt, FaUserAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';

export default function Header(){
    const botaoClicado = useSelector(state => state.botaoClicado);
    return (
    <HeaderContent>
        <section className="header-content">
            <nav>
                <Link href="/">
                    <FaHome size={24}/>
                </Link>
                <Link href="/login">
                    <FaUserAlt size={24}/>
                </Link>
                <Link href="/asdfsdf">
                    <FaSignInAlt size={24}/>
                </Link>
            </nav>
            <a style={{color: 'white'}}>{botaoClicado ? 'Clicado' : 'Não clicado'}</a>
        </section>
    </HeaderContent>
  )
}
