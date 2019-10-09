import React, { Component } from 'react'
import './../../styles/Jtab.css'
const Networking = require('./../../Network/Networking.js') ;

class EvaluadorEventosTable extends Component {
   constructor(props) {
    
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      /*
      console.log("HAAAAAAAAAAAAAAAAAAAAA")
      Networking.populateDataEvaTab(1,1).then((value) => {
            this.setState({datos_tabla: value});   
            
      });*/
   }
   state = {
      datos_tabla: 
      [{  nombre: 'Datos1', 
      fechaLimitePref: '21/03/2019',
      preferencia: 'Por Categoria' }]
   }
   handleClick = () => {
    console.log('this is:', this);
  }
  
   TableData() {
        return this.state.datos_tabla.map((element, index) => {
         const {nombre,  fechaLimitePref,preferencia } = element
            return (
            <tr>
                <td>{nombre}</td>
                <td>{fechaLimitePref}</td>
                <td>{preferencia}</td>
                <td>
                   <button class="btn_plus" onClick={this.handleClick} ><i class="fa fa-plus"></i></button>
               </td>
            </tr>
        )
        })
    }
    TableHeader() {
       return(
      <tr>
         <th width="45%">Lista de eventos</th>
         <th width="20%">Fecha maxima: (Actual / Total) </th>
         <th width="15%">Tipo Preferencia </th>
         <th width="20%">Agregar preferencia </th>
      
      </tr>
       )
     }
  
     render() {
      //this.state.datos_tabla = this.props.data
        return (
            
           <div>
              <br/>
              <h1 id='title'><br/>Elige un evento y agrega tus preferencias</h1><br/>
              <h2><br/></h2>
              <table id='chupetinesGA'>
                 <tbody>
                    {this.TableHeader()}
                    {this.TableData()}
                 </tbody>
              </table>
           </div>
        )
     }
}

export default EvaluadorEventosTable //exporting a component make it reusable and this is the beauty of react
