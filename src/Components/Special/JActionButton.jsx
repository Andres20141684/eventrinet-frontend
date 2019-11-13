import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/style_sheets.css'
/*******************
 * 
 * 
******** BOTTON EN CONSTRUCCION *********
*
*
*/

class JActionButton  extends Component {
   constructor(props) {
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      this.state = {
         //el tipo e boton por default es el plus
         class_for_style: "btn_plus",
         button_class : "fa fa-plus ",
         clickeable: true
      }
    }
    handleClick = () => {
       /* recibo por parametro una funcion lo que debe suceder al hacerle clic */
        console.log('redireccionando a ... update evento');
        this.props.onClick();
    }
    componentWillMount(){
        this.state.button_class = this.props.button_class;
        this.state.clickeable = this.props.clickeable;      
    }
    componentDidMount(){
        //this.state.idOrganizador = this.props.idOrganizador;
        
    }
    render() {
        return(
            <button 
                class={this.state.class_for_style} 
                onClick={this.handleClick} >
                <a > <i  class={this.state.button_class} >
                  </i>
                </a>
            </button>
        )
     }
}

export default JActionButton  //exporting a component make it reusable and this is the beauty of react
