import React from "react";
import { FaHome, FaSignInAlt, FaUserAlt } from 'react-icons/fa'
import { HeaderContent } from "./styled";

export default function Header(){
  return (
    <HeaderContent>
        <section className="header-content">
            <nav>
                <a href="/">
                    <FaHome size={24}/>
                </a>
                <a href="/login">
                    <FaUserAlt size={24}/>
                </a>
                <a href="/asdfsdf">
                    <FaSignInAlt size={24}/>
                </a>
            </nav>
        </section>
    </HeaderContent>
  )
}
