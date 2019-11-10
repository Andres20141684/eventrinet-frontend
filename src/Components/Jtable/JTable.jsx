import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/style_sheets.css'
import { is } from '@babel/types';
import ActionButton from './ActionButton';
import NewEventPage from './../../Pages/NewEventPage'
const Networking = require('./../../Network/Networking.js') ;


class JTable  extends Component {
   constructor(props){
      super(props);
      this.state = {
          msg: "Not Connected" ,
          transport: "go to Fake Ini",
          idUser_recived: 0,
         datos_tabla: { }
      }

    }
    
   
   componentWillMount(){
      
   }
   shouldComponentUpdate(nextProps, nextState){
      if(this.state.datos_tabla != nextState.datos_tabla){
         return true;
      }
      if(this.props.datos_tabla != nextProps.datos_tabla){
        return true;
     }
      return false;
   }
  
   tableData() {
        return this.props.renderBody();
    }
   renderHeaders(){
        return this.props.renderHeaders();

   }
  
     render() {
         return (
           <div class="panel panel mypanel" >
              <div  class="table-responsive">
                <table class="table  table-hover">
                    <thead style={{backgroundColor:"#002D3D", color:"#6CDCD6"}}>
                        {this.renderHeaders()}
                    </thead>
                    <tbody>{this.tableData()}</tbody>
                </table>
              </div>
           </div>
        )
     }
}

export default JTable;  //exporting a component make it reusable and this is the beauty of react
