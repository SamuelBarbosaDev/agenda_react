import React from 'react';
import { Link } from 'react-router-dom';
import { HeaderContent } from './styled';
import history from '../../services/history';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/modules/auth/actions';
import {
    FaHome,
    FaSignInAlt,
    FaUserAlt,
    FaCircle,
    FaPowerOff
} from 'react-icons/fa';

export default function Header(){
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    const handleLogout = e => {
        e.preventDefault();
        dispatch(actions.loginFailure());
        history.push('/');
    }
    return (
    <HeaderContent>
        <section className="header-content">
            <nav>
                <a href="/">
                    <FaHome size={24}/>
                </a>
                <a href="/register">
                    <FaUserAlt size={24}/>
                </a>
                { isLoggedIn ? (
                    <a onClick={handleLogout} href="/logout">
                        <FaPowerOff size={24}/>
                    </a>
                ) : (
                    <a href="/login">
                        <FaSignInAlt size={24}/>
                    </a>
                )}

                {isLoggedIn && <FaCircle size={24} color='#66ff33'/>}
            </nav>
        </section>
    </HeaderContent>
  )
}
