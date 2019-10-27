import React, {Component} from 'react';
import "./../../styles/estilos_ini.css";

class NewIni extends Component{
    state = {
    }

    componentWillMount(){
        console.log("AppWillMount");
        /** AQUI DEBE IR UN FETCH */

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
