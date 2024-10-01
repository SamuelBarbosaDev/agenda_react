import React from 'react';
import { Link } from 'react-router-dom';
import { HeaderContent } from './styled';
import { FaHome, FaSignInAlt, FaUserAlt } from 'react-icons/fa';

export default function Header(){
    return (
    <HeaderContent>
        <section className="header-content">
            <nav>
                <Link to="/">
                    <FaHome size={24}/>
                </Link>
                <Link to="/register">
                    <FaUserAlt size={24}/>
                </Link>
                <Link to="/login">
                    <FaSignInAlt size={24}/>
                </Link>
            </nav>
        </section>
    </HeaderContent>
  )
}
