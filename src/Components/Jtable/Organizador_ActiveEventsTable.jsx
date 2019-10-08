import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const Networking = require('./../../Network/Networking.js') ;


class Organizador_ActiveEventsTable  extends Component {
   constructor(props) {
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      
      console.log("rzwetxrytcvygbuhnj"+this.props);
   }
   state = {
      datos_tabla1: []
  }
   handleClick = () => {
    console.log('this is:', this);
  }
  POPULATEDATA(){
   console.log("HAAAAAAAAAAAAAAAAAAAAA")
   Networking.Login(4).then((value) => {
       this.setState({datos_tabla1: value});   





   });



  }
   tableData() {
      console.log("HAAAAAAAAAAAAAAAAAAAAA")
        Networking.Login(4).then((value) => {
            this.setState({datos_tabla1: value});   
        });
        
    }
  
     render() {
        //this.state = this.props.data
        //console.log('this.props.data:', this.props.data);
        return (
           <div >
              <h2 class="card-title" id='title' >Lista de Eventos activos</h2>
              <div  class="table-responsive">
              <table class="table-light" id='chupetinesGA'>
                  <thead class="thead-light">
                  <tr>
                     <th scope="col">Lista de eventos</th>
                     <th scope="col">Call for Papers-> Prog. comp. </th>
                     <th scope="col">Editar</th>
                     <th scope="col">Seg. de fases</th>
                     <th scope="col">Publicar evento</th>
                     <th scope="col">Cancelar</th>
                  </tr>
               </thead>
              <tbody>{this.tableData()}</tbody>
              </table>
              </div>
           </div>
        )
     }
}

export default Organizador_ActiveEventsTable  //exporting a component make it reusable and this is the beauty of react
