import React, {Component} from 'react';
import logo from './lollipop.svg';
import './App.css';
import BannerTop from './General/bannerTop';
import BannerBottom from './General/bannerBottom';
import { thisExpression } from '@babel/types';


class App extends Component{
  state = {
    bannerTop : BannerTop,
    bannerBottom : BannerBottom
  }
  render() {
    const saludo = saludar();
    const saludo2 = callEventos();
    return (
    <div className="App">
      <this.state.bannerTop />
      <this.state.bannerBottom />
      <header className="App-header">
        <p className="logo">EVENTRINET</p>
        <p>Gestionador de eventos academicos</p>
        <p> En mantenimiento...</p>
        <h1 id="render">{saludo2}</h1>
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
      console.log("Conexión a rest service");
      return responseJson;
    })
    .catch((err) => {
      console.log("Error en conexión")
      console.log(err)
    })
}

function callEventos(){
  const url = "https://localhost:5000/eventos";
    fetch(url, {
      method:'GET'
    })
    .then( (response)=> response.json())
    .then( (responseJson)=>{
      console.log(responseJson);
      return responseJson;
    })
    .catch((err) => {
      console.log("Error en conexión")
      console.log(err)
    })
}


export default App;
