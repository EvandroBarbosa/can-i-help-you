import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

import api from '../../services/api'

import Logo from '../../assest/logo.png'

import Canhelp from '../../assest/canhelp.png'
import'./styles.css';

export default function Logon() {
  const [id, setId] = useState('')
  const history = useHistory()

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post('sessions', { id });

      localStorage.setItem('ongId', id)
      localStorage.setItem('ongName', response.data.name)

      setId('')

      history.push('/profile')
    } catch (error) {
      alert('Falha ID não existe tente novamente ou se cadastre')
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={Logo} alt="Can Help logo"/>

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>

          <input 
            placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">Entrar</button>

          <Link to="/register" className="back-link">
            <FiLogIn size={16} color="#cf0707" />
            Não tenho cdastro
          </Link>
        </form>
      </section>

      <img src={Canhelp} alt="Can Help"/>
    </div>
  );
}
