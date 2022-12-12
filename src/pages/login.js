import { useState, useEffect } from 'react';
import './page.css';
import { criar, entrar, recuperarApostasDoDia, obterUserPorNickName } from './sql.js'
import Home from "./home"
import {BrowserRouter, Route, Routes, Navigate, useNavigate} from "react-router-dom"
import { isCompositeComponent } from 'react-dom/test-utils';
function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [isvalid, setIsValid] = useState(false);
  


  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      navigate("/home");
    }
  }, [isvalid, navigate]);

  async function handleEntrar() {
   
    const user = {
      nickname: nickname,
      email: email,
    }
  
    if (await entrar(user)) {
      
      var oUser =  await obterUserPorNickName(nickname);
      console.log(oUser);
        localStorage.setItem('user', JSON.stringify({
          nickname: nickname,
          email: email,
          user_Id: oUser[0].id,
        }))
        setIsValid(true);
    }


  }


  function handleCriar() {
    const user = {
      nickname: nickname,
      email: email,
    }
    
  }

  return (

    <div className="content">

      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      <h3>betson</h3>


      <input type="text" name="nickname" id="nickname" className="input" placeholder="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />

      <input type="email" name="email" id="email" className="input" placeholder="seuemail@host.com" value={email} onChange={(e) => setEmail(e.target.value)} />


      <button className="entrar" onClick={handleEntrar}>Entrar</button>




    </div>
  );
}

export default Login;