import React, { Component } from 'react'
import './../../styles/Jtab.css'

const Networking = require('./../../Network/Networking.js') ;

class PresiCalificacionFinalPapersTable extends Component {
   constructor(props) {
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      console.log("HAAAAAAAAAAAAAAAAAAAAA")
      Networking.populateDataPresiTab_en_fase_evaluacion(4).then((value) => {
            this.setState({datos_tabla: value});   
            
      });
      console.log("rzwetxrytcvygbuhnj"+this.props);
   }
   state = {
      datos_tabla: [
        /* {  nombre: 'Simposio agujeros Negros', 
            fases: '1/2', 
            fechalimite: '25/08/2019', 
            calEva: 'Si',
            calPresi:'No'
         }*/] 
  }
   handleClick = () => {
    console.log('this is:', this);
  }
  
   renderTableData() {
        return this.state.datos_tabla.map((element, index) => {
        const { nombre, fases, fechalimite, calEva,calPresi} = element //destructuring
        return (
            <tr>
                <td>{nombre}</td>
                <td>{fases}</td>
                <td>{fechalimite}</td>
                <td>{calEva}-{calPresi}</td>
                <td>
                   <button class="btn_plus" onClick={this.handleClick} ><i class="fa fa-plus"></i></button>
               </td>    
            </tr>
        )
        })
    }
    renderTableHeader() {
        return (
         <thead  style={{backgroundColor:"#002D3D", color:"#6CDCD6"}}>
         <tr>
            <th width="40%">Lista de eventos</th>
            <th width="15%">Fase actual/Num. Fases </th>
            <th width="25%">Fecha Limite</th>
            <th width="25%">Calificación (Evaluador - Presidente) </th>
            <th width="15%">Aprobar Propuestas</th>
         </tr>
         </thead>
        )
     }
  
     render() {
        return (
            
         <div  class="table-responsive">
         <table class="table  table-hover" >
            {this.renderTableHeader()}
            <tbody>                    
               {this.renderTableData()}
            </tbody>
         </table>
         </div>
        )
     }
}

export default PresiCalificacionFinalPapersTable //exporting a component make it reusable and this is the beauty of react
