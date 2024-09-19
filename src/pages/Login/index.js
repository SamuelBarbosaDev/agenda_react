import React from "react";
import { Title } from "./styled"
import { toast } from 'react-toastify'

export default function Login(){
    const message = () => {
        toast.success('Sucesso')
        toast.error('Erro')
    }
    return (
    <main>
        <section className="main-content">
        <Title>Login</Title>
        <button onClick={message}>Enviar</button>
        </section>
    </main>
  )
}
