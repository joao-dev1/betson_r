import { useState, useEffect } from 'react';
import './page.css';
import { obterUserPorId } from './sql.js'
import Apostar from '../components/Apostar';
import ApostasDoDia from '../components/ApostasDoDia';
import MinhasApostas from '../components/MinhasApostas';
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from "react-router-dom"
import { isCompositeComponent } from 'react-dom/test-utils';
import { ToastContainer, toast } from 'react-custom-alert';
function Home() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isvalid, setIsValid] = useState(false);
  const [oPapostar, setoPapostar] = useState(false);
  const [opMinhasAPostas, setopMinhasAPostas] = useState(false);
  const [opApostasDoDia, setopApostasDoDia] = useState(false);
  const [saldo, setSaldo] = useState(0);
  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      navigate("/home");
    }
  }, [isvalid, navigate]);

  useEffect(() => {

    obterUserPorId(JSON.parse(localStorage.getItem("user")).user_Id).then((user) => {
    
        setSaldo(user.betsonCoins);
    
      });
    
  }, []);
  function apostar() {
    setoPapostar(true);
    setopMinhasAPostas(false);
    setopApostasDoDia(false);
  }
  function minhasApostas() {
    setoPapostar(false);
    setopMinhasAPostas(true);
    setopApostasDoDia(false);
  }
  function apostasDoDia() {
    setoPapostar(false);
    setopMinhasAPostas(false);
    setopApostasDoDia(true);
  }

  return (
    <div className='home'>
      <div className='menu'>
        <button className='button-primary' onClick={apostasDoDia}>Apostas do dia</button>
        <button className='button-primary' onClick={apostar}>Apostar</button>
        <button className='button-primary' onClick={minhasApostas}>Minhas Apostas</button>
        <div>
          <p>saldo: {saldo}🪙</p>
        </div>
      </div>
      <div className="content">


        <h3>betson</h3>
        {oPapostar ? <Apostar /> : null}
        {opMinhasAPostas ? <MinhasApostas /> : null}
        {opApostasDoDia ? <ApostasDoDia /> : null}



      </div>
    </div>

  );
}

export default Home;