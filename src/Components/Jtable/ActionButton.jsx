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
   }
   componentWillMount(){
      this.state.button_class = this.props.button_class;
      this.state.redirect_to = this.props.redirect_to;
      this.state.id_evento = this.props.id_evento;
   }
   componentDidMount(){
      sessionStorage.setItem('nextProp', JSON.stringify({id_evento_nextProps: this.state.id_evento}))
      console.log("STATE STORAGED");
      let retrievedObject = sessionStorage.getItem('nextProp');
      let retrievedJson = JSON.parse(retrievedObject); 
      console.log("lo que se guardo fue:");
      console.log(retrievedJson);
   }


  
    render() {
        
        

        return(
            <button class={this.state.class_for_style} onClick={this.handleClick} >
               <a href={this.state.redirect_to}>
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
