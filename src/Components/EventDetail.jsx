import React, {Component} from 'react';
//const stylesFile = require('../Styles/styles.js');
//const styles = stylesFile.getStyle();
import './../styles/dash_style.css';
import Modal from 'react-awesome-modal';
import { whileStatement } from '@babel/types';
import Portafolio from '../Components/Special/Portafolio';
/**
 * Necesito una lista de eventos, y na foto parq eru pueda
 */
class EventDetail extends Component{
  constructor(props){
    super(props);
    this.state = {
        msg: "Not Connected" ,
        transport: "go to Fake Ini",
        idUser_recived: 0,
        Evento:null
    }
    this.handleNextChildComponentChange=this.handleNextChildComponentChange.bind(this);
    this.handleNextChildComponentChangeProps=this.handleNextChildComponentChangeProps.bind(this);

  }
  handleNextChildComponentChange(_nextChildComponent){
    console.log('cambiando', _nextChildComponent);
      this.props.onNextChildComponentChange(_nextChildComponent);
      
  }
  handleNextChildComponentChangeProps(_nextChildComponentProps){
      this.props.onNextChildComponentChangeProps(_nextChildComponentProps);
  }
  handleClickCrearActualizar = () => {
    console.log('redireccionando a ... FakeNewIni evento');
    this.handleNextChildComponentChangeProps({  
       idOrganizador_nextProps: this.state.idUser_recived,
       id_evento_nextProps: 0,
       nomb_evento: "none"
       
    });
    
    this.handleNextChildComponentChange(null);
  }
  componentWillMount(){
      
      
    let retrievedObject = sessionStorage.getItem('dataUser');
    let retrievedJson = JSON.parse(retrievedObject);  
    this.state.idUser_recived= retrievedJson.infoUsuario.idUsuario;
    console.log(retrievedJson);


 }
 shouldComponentUpdate(nextProps, nextState){
    if(this.state.datos_tabla != nextState.datos_tabla){
       return true;
    }
    return false;
 }

  render(){
    debugger;
    return (

      <></>
    
 
        
    );
  }
}

export default EventDetail;

















