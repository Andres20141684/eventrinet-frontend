import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/style_sheets.css'
import { is } from '@babel/types';
import ReactDOM from 'react-dom';
import NewEventPage from './../../Pages/NewEventPage';
/**
 * 
 * 

******************************* BOTTON EN CONSTRUCCION XDDDDDDDDDDDDDDDDDDDD (JEREMI SE LA COME)




 */

class ActionButton  extends Component {
   constructor(props) {
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      console.log("ACTION BUTTON");
      
      console.log("PROPS del ACTION BUTTON"+this.props);
   }


   state = {
      //el tipo e boton por default es el plus
      class_for_style: "btn_plus",
      redirect_to : "/#",
      button_class : "fa fa-plus ",
      id_evento: "1"
   }

  
   handleClick = () => {
    console.log('redireccionando a ... update evento');
    //window.location.replace("./");
    const div = document.createElement('div');
    ReactDOM.render(<NewEventPage idEvent_recived = {this.state.id_evento} />, div);
    
  ReactDOM.unmountComponentAtNode(div);
  }
 

  
    render() {
        this.state.button_class = this.props.button_class;
        this.state.redirect_to = this.props.redirect_to;
        this.state.id_evento = this.props.id_evento;
        console.log("STATE BUTTON");
        console.log(this.state);
        return(
            <button class={this.state.class_for_style} onClick={this.handleClick} >
               
                  <i 
                     class={this.state.button_class}
                  >
                  </i>
            
            </button>
        )
        
     }
}

export default ActionButton  //exporting a component make it reusable and this is the beauty of react
