import { useEffect, useState } from 'react'
import { AuthProvider, useAuth } from './context/authContext';
import { login } from "./api/authApi";
import './App.css'


function TelaDeTeste() {
  const { usuario, entrar, sair } = useAuth();

  useEffect(() => {
    login(import.meta.env.SECRET_LOGIN, import.meta.env.SECRET_SENHA).then((res) => {
      entrar(res.data.token);
    })
  }, []);

  return (
    <div><p>Usuario atual: {usuario ? usuario.login : "ninguém logado"}</p></div>
  )
}

function App() {
  return (
    <AuthProvider>
      <TelaDeTeste />
    </AuthProvider>
  );
}

export default App;
