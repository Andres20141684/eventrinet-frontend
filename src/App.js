import React, {Component} from 'react';
import logo from './lollipop.svg';
import BannerTop from './Components/General/bannerTop';
import BannerBottom from './Components/General/bannerBottom';
import './App.css'; 
import { thisExpression } from '@babel/types';
import WorkingSpace from './Components/Special/WorkingSpace';
const Networking = require('./Network/Networking.js') ;


class App extends Component{
  state = {
    bannTop : BannerTop,
    bannBot : BannerBottom,
    workingSpace : WorkingSpace,
    msg: "Not Connected" 
  }

  componentWillMount(){
    console.log("AppWillMount")
    Networking.saludar().then(
      (response)=>{
        
        this.setState({msg:response.message});
        console.log({msg:response.message});
      })
      .catch( (err) =>{
        console.log("error en conexión");
        this.setState({msg:"Intento de conexión fallido"});
        console.log(err);
      })
  }

  setterEvento(){
    const url = "https://localhost:5000/eventos/listar_eventos_activos";
    fetch(url, {
      method:'GET'
    })

    .then( (response)=> response.json())
    .then( (responseJson)=>{
      this.setState({msg: responseJson[0].username})
    })
    .catch((err) => {
      console.log("Error en conexión")
      this.setState({msg: "Intento de conexión fallido"})
      console.log(err)
    })
  }

  render() {
    return (
      <div>
    <div className="App">
      <this.state.bannTop /> 
      <div>
      <this.state.workingSpace/>
    </div>
    </div>
    <this.state.bannBot/>
    </div>
  );}
}

export default App;
