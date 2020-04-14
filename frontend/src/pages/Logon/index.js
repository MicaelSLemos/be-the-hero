import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import heoresImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import { FiLogIn } from 'react-icons/fi';
import api from '../../services/api';

export default function Logon(){
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogon(e){
        e.preventDefault();


        try {
            const response = await api.post('sessions', { id })

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        } catch (error) {
            alert("Não foi possível logar. Verifique seu ID")
        }
    };

    return (
        <div className="Logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The hero"/>
                <form onSubmit={handleLogon}>
                    <h1>Faça seu logon</h1>
                    <input
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className= "button" type="submit">Entrar</button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heoresImg} alt="Heroes" />
        </div>
    );
}
