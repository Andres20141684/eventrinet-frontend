import React, {Component}from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component{
  render() {
    const saludo = saludar();
    return (
    <div className="App">
      <header className="App-header">
        <p className="logo">EVENTRINET</p>
        <p>Gestionador de eventos academicos </p>
        <p> En mantenimiento...</p>
        <p> EL BACKEND DICE {JSON.stringify(saludo)}</p>
      </header>
    </div>
  );}
}

function saludar(){
  const url = "https://localhost:5000/";
    fetch(url, {
      method:'GET'
    })
    .then( (response)=> response.json())
    .then( (responseJson)=>{
      return responseJson;
    })
    .catch((err) => {
      console.log(err)
    })
}

export default App;
