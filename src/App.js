import React, {Component} from 'react';
import logo from './lollipop.svg';
import BannerTop from './Components/General/bannerTop'
import './App.css'; 
import { thisExpression } from '@babel/types';


class App extends Component{
  state = {
    bannTop : BannerTop,
    //bannerBottom : BannerBottom,
    msg: "NotConnected"
  }

  componentWillMount(){
    console.log("AppWillMount")
    this.setterEvento();
  }

  setterEvento(){
    const url = "https://localhost:8000/things";
    fetch(url, {
      method:'GET'
    })
    .then( (response)=> response.json())
    .then( (responseJson)=>{
      this.setState({msg: responseJson})
    })
    .catch((err) => {
      console.log("Error en conexión")
      this.setState({msg: "Intento de conexión fallido"})
      console.log(err)
    })
  }

  render() {
    return (
    <div className="App">
      <this.state.bannTop /> 
      <header className="App-header">
        <p className="logo">EVENTRINET</p>
        <p>Gestionador de eventos academicos</p>
        <p> En mantenimiento...</p>
        <h1>{this.state.msg}</h1>
      </header>
    </div>
  );}
}

export default App;
