import React, {Component} from 'react';
import "./../../styles/estilos_ini.css";
const Networking = require('./../../Network/Networking.js') ;

class NewIni extends Component{
    state = {
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
    

  render() {
    return (
      <header className="App-header">
        <p className="logo">EVENTRINET</p>
        <p>Gestión de tus eventos academicos</p>
        <p> En mantenimiento...</p>
        <h1>{this.state.msg}</h1>
        
      </header>
  );}
}

export default NewIni;
