import React, {Component} from 'react';
//const stylesFile = require('../Styles/styles.js');
//const styles = stylesFile.getStyle();
import './../styles/dash_style.css';
import Modal from 'react-awesome-modal';
import { whileStatement } from '@babel/types';
import Portafolio from './Special/Portafolio';
import EventDetail from './EventDetail';
const Networking = require('./../Network/Networking.js') ;

/**
 * Necesito una lista de eventos, y na foto parq eru pueda
 */
class Dashboard extends Component{
  constructor(props){
    super(props);
    this.state = {
        msg: "Not Connected" ,
        transport: "go to Fake Ini",
        idUser_recived: 0,
       datos_tabla: {Eventos:[]},
       
       flag: false
      
    }
    /**aqui falta la condicional cuando es convocarotira o es evento publicados para asistentes */
    //por defecto es convocatoria por mientras
    Networking.getEventosConvocatoria().then((value) => {
      console.log("lista de envetow convoctarioas",value);
      if(value == null){
         console.log('no hay convocatorias!');
         
      }else {
         console.log('si hay convocatorias:');
         this.setState({datos_tabla:value});
         this.setState({flag:true})
         console.log("asdassadasad",this.state.flag)
         console.log(this.state.datos_tabla);
      }
    });
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
    console.log('redireccionando a ... EventDetail evento');
    
    
    this.handleNextChildComponentChange(EventDetail);
  }

 
 /** */
 shouldComponentUpdate(nextProps, nextState){
   if(nextState.datos_tabla != this.state.datos_tabla){
     console.log("llegue y mori XD");
     return true;
    }
   return false;

 }

  render(){
    return (

        
        <Portafolio 
            setEventos={this.state.datos_tabla} title="Eventos en convocatoria"
            nextChildComponentProps={this.state.nextChildComponentProps}
            onNextChildComponentChange={this.handleNextChildComponentChange}
            onNextChildComponentChangeProps={this.handleNextChildComponentChangeProps}
        ></Portafolio>
        
    
    
 
        
    );
  }
}

export default Dashboard;


































