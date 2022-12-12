import firebase from 'firebase/compat/app';
import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore, query, where, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import 'firebase/database';
import 'firebase/auth';
import { ref as sRef } from 'firebase/storage';
import { useParams } from 'react-router-dom';
import { useDeferredValue, useEffect } from 'react';
import { ref } from 'firebase/database';


// import *as database from 'firebase/compatdatabase'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXkxx1fCnVZQDUAHdSLkVrf-Oq215jLz4",
  authDomain: "teste-b5d2e.firebaseapp.com",
  databaseURL: "https://teste-b5d2e-default-rtdb.firebaseio.com",
  projectId: "teste-b5d2e",
  storageBucket: "teste-b5d2e.appspot.com",
  messagingSenderId: "333079855264",
  appId: "1:333079855264:web:49dbb9897c2cd4662b89c5",
  measurementId: "G-13GNMP6DMM"
};
// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);

const db = getFirestore(app);
const userCollectionRef = collection(db, "users");
const apostasCollectionRef = collection(db, "bets");

export async function recuperar() {
  const data = await getDocs(userCollectionRef)
  console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
}
export async function obterUserPorNickName(nickname) {

  const data = await getDocs(query(userCollectionRef, where('nickname', '==', nickname)));
 
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

export async function obterUserPorId(id) {

  const userDoc = await getDoc(doc(db, "users", id));
  return (userDoc.data())
}
export async function obterBetsPorUserId(user_id) {
  const data = await getDocs(query(apostasCollectionRef, where('user_id', '==', user_id)));
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}


export async function obterBetsPorDia(day) {

  const data = await getDocs(query(apostasCollectionRef, where('dia', '==', day)));
  // console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

export async function adicionarNovoUser(oUser) {

  const user = await addDoc(userCollectionRef, oUser);
  return user;
}
export async function adicionarNovaBet(novaBet) {
  const valorApostado = novaBet.valorApostado;
  const user = obterUserPorId(novaBet.user_id);
  await user.then((result=>{
  
  const betsonCoins = result.betsonCoins;
  
  if(betsonCoins < valorApostado || valorApostado <=0)
  alert("valor apostado inválido, consulte seu saldo para verificar!");
  else
  updateDoc(doc(db, "users", novaBet.user_id), {
    betsonCoins:  betsonCoins - valorApostado,
  });


  }))

  const bet = await addDoc(apostasCollectionRef, novaBet);
  return bet;

}


export async function entrar(user) {
  
  var oUser = await obterUserPorNickName(user.nickname);

  if (oUser.length == 0)
    return false;
  else
    return true;
}


function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}
function formatDate(date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join('-');
}






export async function saldoUser(nickname) {

  var refdata = app.database().ref("users/" + nickname);


  var result = await refdata.get().then((snapshot) => {
    return snapshot.val().betsonCoins;
  })
  return result;
}

export async function recuperarApostasUsuário(user) {

  var refdata = app.database().ref('apostas');


  var result = await refdata.get().then((snapshot) => {
    return snapshot.val();
  })
  return result;
}
