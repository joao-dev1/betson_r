import { useState, useEffect } from 'react';
import './components.css';
import { adicionarNovaBet } from '../pages/sql'
import {BrowserRouter, Route, Routes, Navigate, useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-custom-alert';

  
function Apostar() {
    const user_id = JSON.parse(localStorage.getItem("user")).user_Id;
    const nick_name = JSON.parse(localStorage.getItem("user")).nickname;
    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
      }
      
      function formatDate(date) {
        return [
          padTo2Digits(date.getDate()),
          padTo2Digits(date.getMonth() + 1),
          date.getFullYear(),
        ].join('/');
      }
    
    
      
  const [dia, setDia] = useState(formatDate(new Date()));
  const [horario, setHorario] = useState('');
  const [user_Id, setUser_Id] = useState('');
  const [valorApostado, setValorApostado] = useState('');
 function limparCamposAposta(){
 setHorario('');
 setValorApostado(0);
 }
  async function CriarAposta(e){
    e.preventDefault();
    var aposta ={
        dia: dia,
        horario: horario,
        user_id:user_id,
        valorApostado: valorApostado,
        nickname:nick_name,
    }
    await adicionarNovaBet(aposta);
    alert('aposta criada!');
    limparCamposAposta();
  }
  return (
<div className="minhasApostas">
  <form onSubmit={CriarAposta} class="form-control">
    <label>horário</label>
<input type="time" min="11:00" max="12:30" name="horario" id="horario" className="input" placeholder="horário" value={horario} onChange={(e) => setHorario(e.target.value)} required />
<label>valor</label>
<input type="number" name="valorApostado" id="valorApostado" className="input" placeholder="00" value={valorApostado} onChange={(e) => setValorApostado(e.target.value)} required />


<button className="entrar" type='submit'>Apostar</button>

</ form>


</div>

  );
}

export default Apostar;