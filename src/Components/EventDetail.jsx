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
        /*viene de los props */
        event:{
          nombre:"<Nombre de evento>",
          imagen: "http://awscommunitydaydublin.com/wp-content/uploads/2019/09/doom2-3.png",
        },
        /* viene en los props */
        fase: 0,
        proposal:{
          nombre:"nombre de la propuesta",
          detalle:"detalle de la propuesta",
          estado:"estado de la propuesta",
          fase : 0
        }
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
  handleRedireccion = () => {
    console.log('redireccionando a ... FakeNewIni evento');
    /* nuevos props? */
    this.handleNextChildComponentChangeProps(
            {
            /* ... */
            }
    );
    /** a donde redirijir? */
    this.handleNextChildComponentChange(null);
  }
  componentWillMount(){
      /** obtengo  el idUsuario */
      
    let retrievedObject = sessionStorage.getItem('dataUser');
    let retrievedJson = JSON.parse(retrievedObject);  
    this.state.idUser_recived= retrievedJson.infoUsuario.idUsuario;
    console.log(retrievedJson);


 }
 shouldComponentUpdate(nextProps, nextState){
    if(this.state.propuesta != nextState.propuesta){
       return true;
    }
    return false;
 }

  render(){
    return (
<></>
        
    );
  }
}

export default EventDetail;

















