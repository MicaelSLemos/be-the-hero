//conceito de estado no React
//Importar o useState
//import React, {useState} from 'react';
import React from 'react';
import './global.css';
import Routes from './routes';


function App() {
/* //useState retorna um Array, onde
//[valor, funcaoDeAtualizacao]
//counter vai guardar o valor 0 que está setado no useState(0)
//setcounter é a função que será chamada para incrementar a variável valor
  const [counter, setCounter] = useState(0);

  function increment(){
    setCounter(counter + 1);
    
  }; */

  return (
 <Routes />
  );
}

export default App;
