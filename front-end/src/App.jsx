import { useState, useEffect } from 'react'
import { fazerLogin } from './features/auth/services/authService';
import { salvarToken } from './shared/services/tokenStorage';
import './App.css'

function App() {
  useEffect(() => {
    fazerLogin("pauloc", "123456")
    .then((dados) => console.log(dados))
    .catch((erro) => console.log(erro.response.data));
  }, [])

  return (
    <>
    <h1>Testando</h1>
    </>
  )
}

export default App
  