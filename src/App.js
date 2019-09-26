import React, {Component} from 'react';
import logo from './lollipop.svg';
import './App.css';
import BannerTop from './General/bannerTop';
import BannerBottom from './General/bannerBottom';
import { thisExpression } from '@babel/types';

class App extends Component{
  state = {
    bannerTop : BannerTop,
    bannerBottom : BannerBottom,
    msg: "NotConnected"
  }

  componentDidMount(){
    const url = "https://localhost:5000/eventos";
    fetch(url, {
      method:'GET'
    })
    .then( (response)=> response.json())
    .then( (responseJson)=>{
      this.setState({msg: responseJson[5].username})
    })
    .catch((err) => {
      console.log("Error en conexión")
      console.log(err)
    })
  }

  render() {
    return (
    <div className="App">
      <this.state.bannerTop />
      <this.state.bannerBottom />
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
