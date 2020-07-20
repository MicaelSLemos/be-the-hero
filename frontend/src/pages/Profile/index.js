import React, {useState, useEffect} from 'react';
import './styles.css';
import logoImg from "../../assets/logo.svg";
import { FiPower, FiTrash2 } from "react-icons/fi";
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';


export default function Profile(){
    const [incidents, setIncidents] = useState([]) 

    const history = useHistory();
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        } )
    }, [ongId]);

    async function handleDeleteIncident( id ){

        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));

        } catch (error) {
            alert('Erro ao deletar caso')
        }

    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');

    }

    return (
        <div className="profile-container">
            <header>

                <img src={logoImg} alt="Logo Be The hero"/>
                <span>Bem vinda, {ongName}</span>

                <Link to="/incidents/new" className="button">Cadastrar </Link>
                <button type="button">
                    <FiPower onClick={() => handleLogout()} size={48} color="#e02041" />
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
               {incidents.map(incident => (
                <li key={incident.id}>
                    <strong>Caso:</strong>
                    <p>{incident.title}</p>

                    <strong>DESCRIÇÃO</strong>
                    <p>{incident.description}</p>

                    <strong>Valor:</strong>
                    <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                    <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                        <FiTrash2 size={20} color="#a8a8b3" />
                    </button>
                </li>
               ) )}

            </ul>

        </div>

    );
};