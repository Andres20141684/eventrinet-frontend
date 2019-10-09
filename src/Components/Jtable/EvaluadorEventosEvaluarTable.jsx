import React, { Component } from 'react'
import './../../styles/Jtab.css'
import { stringify } from 'querystring';
const Networking = require('./../../Network/Networking.js') ;

class EvaluadorEventosEvaluarTable extends Component {
   constructor(props) {
    
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      /*
      console.log("HAAAAAAAAAAAAAAAAAAAAA")
      Networking.populateDataEvaTab(1,2).then((value) => {
            this.setState({datos_tabla: value});   
            
      });*/
   }
   state = {
      datos_tabla: [{  nombre: 'Datos1', 
      fechaLimitePref: '21/03/2019',
      preferencia: 'Por Categoria' }]
   }
   handleClick = () => {
    console.log('this is:', this);
  }
  
   renderTableData() {
        return this.state.datos_tabla.map((element, index) => {
         const {nombre,  fechaLimitePref,preferencia } = element
         return (
            <tr>
                <td>{nombre}</td>
                <td>3/9</td>
                
                <td>no calificado_Evaluador</td>
                  
                  
                <td>{fechaLimitePref}</td>
                <td><button class="btn_plus" onClick={this.handleClick} ><i class="fa fa-plus"></i></button>
                </td>
            </tr>
        )
        })
    }
    renderTableHeader() {
       return(
      <tr>
         <th width="35%">Lista de eventos</th>
         <th width="15%">Fases: (Actual / Total) </th>
         <th width="15%">Calificado Evaluador </th>
         <th width="20%">Fecha límite </th>
         <th width="15%">Evaluar Fase </th>
      
      </tr>)
     }
  
     render() {
      //this.state.datos_tabla = this.props.data
        return (
            
           <div><br/><br/>
              <h1 id='title'>Elige un evento y evalua las propuestas asignadas</h1><br/><br/>
              <table id='chupetinesGA'>
                 <tbody>
                    {this.renderTableHeader()}
                    {this.renderTableData()}
                 </tbody>
              </table>
           </div>
        )
     }
}

export default EvaluadorEventosEvaluarTable //exporting a component make it reusable and this is the beauty of react
