import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/style_sheets.css'
import { is } from '@babel/types';
import ReactDOM from 'react-dom';
import NewEventPage from './../../Pages/NewEventPage.jsx';
/**
 * 
 * 

******************************* BOTTON EN CONSTRUCCION XDDDDDDDDDDDDDDDDDDDD (JEREMI SE LA COME)

 */

class ActionButton  extends Component {
   constructor(props) {
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      this.state = {
         //el tipo e boton por default es el plus
         class_for_style: "btn_plus",
         redirect_to : "/#",
         button_class : "fa fa-plus ",
         id_evento: 0,
         idUser_recived: 0,
         nomb_evento: ""
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
   

  
   handleClick = () => {
    console.log('redireccionando a ... update evento');
    sessionStorage.setItem('nextProp',
         JSON.stringify(
                        {   idOrganizador_nextProps: this.state.idUser_recived,
                           id_evento_nextProps: this.state.id_evento,
                           nomb_evento: this.state.nomb_evento
                           
                        }
                     ))
         this.handleNextChildComponentChangeProps({   idOrganizador_nextProps: this.state.idUser_recived,
            id_evento_nextProps: this.state.id_evento,
            nomb_evento: this.state.nomb_evento
            
         });
         this.handleNextChildComponentChange(NewEventPage);
    //window.location.replace("./");
   }
   componentWillMount(){
      this.state.button_class = this.props.button_class;
      this.state.redirect_to = this.props.redirect_to;
      this.state.id_evento = this.props.id_evento;
      this.state.idUser_recived = this.props.idUser_recived;
      this.state.nomb_evento = this.props.nomb_evento;
   }
   componentDidMount(){
      //this.state.idOrganizador = this.props.idOrganizador;
      
   }


  
    render() {
        
        

        return(
            <button class={this.state.class_for_style} onClick={this.handleClick} >
               <a >
                  <i 
                     class={this.state.button_class}
                  >
                  </i>
            </a>
            </button>
        )
        
     }
}

export default ActionButton  //exporting a component make it reusable and this is the beauty of react
