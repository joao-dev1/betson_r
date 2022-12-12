import { useState, useEffect } from 'react';
import './components.css';
import { obterBetsPorDia } from '../pages/sql'
import {BrowserRouter, Route, Routes, Navigate, useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-custom-alert';

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

function ApostasDodia() {


 

  const [apostasDoDia, setApostasDoDia] = useState([]);
  useEffect(() => {
    const apostas = async ()=>{return(await obterBetsPorDia(formatDate(new Date())))} 
    apostas().then(result =>{
      setApostasDoDia(result);
    })
   
   
  }, []);
  useEffect(() => {
    console.log(apostasDoDia);
  }, [apostasDoDia]);

  return (
    
    <div className="apostasDoDia">
    

   
      <table class="styled-table">
    <thead>
        <tr>
             <th>usuário</th>
            <th>horário</th>
            <th>dia</th>
            <th>valor apostado</th>
        </tr>
    </thead>
    <tbody>
      {
        apostasDoDia.map((aposta, index)=>{
          return(
            <tr key={index}>
            <td key={index}>{aposta.nickname}</td>
            <td key={index}>{aposta.horario}</td>
            <td key={index}> {aposta.dia}</td>
            <td key={index}>{aposta.valorApostado}</td>
           </tr>
       
          )
        })
        
      }
    
    </tbody>
</table>
     
        


    </div>

  );
}

export default ApostasDodia;