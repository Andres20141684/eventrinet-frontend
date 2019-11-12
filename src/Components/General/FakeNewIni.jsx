import React, {Component} from 'react';
import "./../../styles/estilos_ini.css";
import NewIni from './NewIni';
const Networking = require('./../../Network/Networking.js') ;

class FakeNewIni extends Component{
    constructor(props){
        super(props);
        this.state = {
            msg: "Not Connected" ,
            transport: "go to Real Ini"
        }
        this.handleNextChildComponentChange=this.handleNextChildComponentChange.bind(this);
        this.handleNextChildComponentChangeProps=this.handleNextChildComponentChangeProps.bind(this);
  
    }
    handleNextChildComponentChange(_nextChildComponent){
        this.props.onNextChildComponentChange(_nextChildComponent);
        
    }
    handleNextChildComponentChangeProps(_nextChildComponentProps){
        this.props.onNextChildComponentChangeProps(_nextChildComponentProps);
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
    
    handleClick = () => {
      console.log('redireccionando a ... NewIni evento');
      this.handleNextChildComponentChange(NewIni);
    }
  render() {
    return (
      <header className="App-header">
        <p className="logo">EVENTRINET(fake)</p>
        <p>Gestión de tus eventos academicos</p>        
        <h1>{this.state.msg}</h1>
        <button onClick={this.handleClick} >
               {this.state.transport}
        </button>
        
      </header>
  );}
}

export default FakeNewIni;
