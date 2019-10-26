import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/style_sheets.css'
import { is } from '@babel/types';


class ActionButton  extends Component {
   constructor(props) {
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      console.log("HAAAAAAAAAAAAAAAAAAAAA");
      
      console.log("PROPS del active events"+this.props);
   }


   state = {
      button_class : "fa fa-plus "
   }

  
   handleClick = () => {
    console.log('this is:', this);
  }
 

  
    render() {
        this.state.button_class = this.props.button_class;
        return(
            <button class="btn_plus" onClick={this.handleClick} ><i class={this.state.button_class}></i></button>
        )
        
     }
}

export default ActionButton  //exporting a component make it reusable and this is the beauty of react
